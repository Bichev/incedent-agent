/**
 * Seed Pinecone with historical SAP incidents
 * 
 * Usage:
 *   npx ts-node scripts/seed-pinecone.ts
 * 
 * Required environment variables:
 *   OPENAI_API_KEY - Your OpenAI API key
 *   PINECONE_API_KEY - Your Pinecone API key  
 *   PINECONE_INDEX_HOST - Your Pinecone index host URL
 */

// Load environment variables from .env file
import * as dotenv from 'dotenv';
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY';
const PINECONE_API_KEY = process.env.PINECONE_API_KEY || 'YOUR_PINECONE_API_KEY';
const PINECONE_INDEX_HOST = process.env.PINECONE_INDEX_HOST || 'YOUR_INDEX_HOST';

// Historical incidents to seed
const historicalIncidents = [
  {
    id: "INC000123",
    title: "Authorization Error DYNP 138 - Profile Sync",
    description: "User unable to access SAP GUI due to authorization popup DYNP 138. Profile not synchronized after role change. User was able to login yesterday.",
    error_code: "DYNP 138",
    component: "SAP Authorization",
    severity: "Medium",
    resolution: "1. Open transaction SU01\n2. Enter username in User field\n3. Navigate to Roles tab\n4. Click User Compare button\n5. Execute profile regeneration\n6. Run SU25 to verify\n7. Test user login",
    root_cause: "User profile not synchronized after authorization role assignment change",
    resolution_time: "30 minutes",
    category: "Access/Authorization"
  },
  {
    id: "INC000089",
    title: "User Profile Not Synchronized After Role Change",
    description: "After assigning new roles in PFCG, user cannot access new transactions. Authorization check failing with message 'No authorization to execute transaction'.",
    error_code: "AUTH_SYNC",
    component: "SAP Authorization",
    severity: "Medium", 
    resolution: "1. Run transaction SU01 for user\n2. Execute User Compare function\n3. Run PFUD to adjust user master profiles\n4. Verify with SU53 for authorization trace",
    root_cause: "Profile generation not triggered after PFCG role modification",
    resolution_time: "45 minutes",
    category: "Access/Authorization"
  },
  {
    id: "INC000156",
    title: "DYNP Authorization Popup on Login",
    description: "Multiple users getting authorization popup with DYNP error code when logging into SAP GUI. Started after password change campaign.",
    error_code: "DYNP 138",
    component: "SAP Authorization",
    severity: "Medium",
    resolution: "1. Clear user buffer with transaction SU10\n2. Regenerate profiles in SU01 for affected users\n3. Check profile parameters in RZ10\n4. Restart login if needed",
    root_cause: "User buffer corruption after mass password reset",
    resolution_time: "20 minutes",
    category: "Access/Authorization"
  },
  {
    id: "INC000201",
    title: "VA01 Performance Degradation After Transport",
    description: "Sales order creation in transaction VA01 taking over 60 seconds. Issue started after transport K900123 was applied yesterday. Database statistics may be stale.",
    error_code: "TIMEOUT",
    component: "SAP SD",
    severity: "High",
    resolution: "1. Check DB02 for table statistics age\n2. Run DB20 to update statistics on VBAK, VBAP, VBEP tables\n3. Review transport K900123 contents for index changes\n4. Run ST05 SQL trace to identify slow queries\n5. Consider index rebuild if needed",
    root_cause: "Database statistics outdated after transport modified table structures",
    resolution_time: "2 hours",
    category: "Performance"
  },
  {
    id: "INC000178",
    title: "Sales Order Timeout in Peak Hours",
    description: "Transaction VA01 and VA02 experiencing timeouts during peak hours 9-11 AM. Multiple users in Sales department affected. Response time exceeds acceptable limits.",
    error_code: "TIMEOUT",
    component: "SAP SD",
    severity: "High",
    resolution: "1. Increase dialog work processes temporarily in RZ10\n2. Check for table locks in SM12\n3. Analyze database performance in ST04\n4. Review batch job scheduling to avoid peak hours\n5. Consider index optimization on frequently accessed tables",
    root_cause: "Insufficient work processes during peak load combined with suboptimal database queries",
    resolution_time: "3 hours",
    category: "Performance"
  },
  {
    id: "INC000045",
    title: "Extended Memory Exhaustion - ABAP Dumps",
    description: "TSV_TNEW_PAGE_ALLOC_FAILED dumps occurring frequently in production. Extended memory parameters appear insufficient. Batch jobs consuming excess memory.",
    error_code: "TSV_TNEW_PAGE_ALLOC_FAILED",
    component: "SAP Basis",
    severity: "Critical",
    resolution: "1. Check ST02 for current memory utilization\n2. Increase em/initial_size_MB parameter in RZ10\n3. Review and reschedule memory-intensive batch jobs\n4. Consider application server restart during maintenance window\n5. Monitor with SM50 for process memory usage",
    root_cause: "Extended memory pool exhausted due to concurrent batch processing",
    resolution_time: "4 hours",
    category: "System Error"
  }
];

async function createEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text,
      // Using default 1536 dimensions to match Pinecone index
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

async function upsertToPinecone(vectors: { id: string; values: number[]; metadata: Record<string, string> }[]) {
  // Handle both formats: with or without https://
  const host = PINECONE_INDEX_HOST.replace(/^https?:\/\//, '');
  const response = await fetch(`https://${host}/vectors/upsert`, {
    method: 'POST',
    headers: {
      'Api-Key': PINECONE_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      vectors,
      namespace: '',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Pinecone API error: ${response.status} - ${error}`);
  }

  return response.json();
}

async function main() {
  console.log('🚀 Seeding Pinecone with historical SAP incidents...\n');

  const vectors = [];

  for (const incident of historicalIncidents) {
    console.log(`📝 Processing: ${incident.id} - ${incident.title}`);
    
    // Create text for embedding
    const embeddingText = `${incident.title} ${incident.description} ${incident.error_code} ${incident.component}`;
    
    // Generate embedding
    const embedding = await createEmbedding(embeddingText);
    console.log(`   ✓ Generated embedding (${embedding.length} dimensions)`);

    vectors.push({
      id: incident.id,
      values: embedding,
      metadata: {
        title: incident.title,
        description: incident.description,
        error_code: incident.error_code,
        component: incident.component,
        severity: incident.severity,
        resolution: incident.resolution,
        root_cause: incident.root_cause,
        resolution_time: incident.resolution_time,
        category: incident.category,
      },
    });

    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  console.log('\n📤 Uploading vectors to Pinecone...');
  const result = await upsertToPinecone(vectors);
  console.log(`   ✓ Upserted ${result.upsertedCount} vectors\n`);

  console.log('✅ Seeding complete! Your Pinecone index now has sample data.\n');
  console.log('Incidents loaded:');
  historicalIncidents.forEach(inc => {
    console.log(`   - ${inc.id}: ${inc.title} (${inc.error_code})`);
  });
}

main().catch(console.error);
