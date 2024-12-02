import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'vanuatu_compliance_hub';

if (!uri) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

const client = new MongoClient(uri);

async function verifyConnection() {
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB.');
    
    const db = client.db(dbName);
    await db.command({ ping: 1 });
    console.log("Pinged deployment. Connection verified!");

    // List collections
    const collections = await db.listCollections().toArray();
    console.log('\nCollections:', collections.map(c => c.name).join(', '));

    // Get collection counts
    const counts = await Promise.all([
      db.collection('departments').countDocuments(),
      db.collection('users').countDocuments(),
      db.collection('provinces').countDocuments(),
    ]);

    console.log('\nCollection counts:');
    console.log('- Departments:', counts[0]);
    console.log('- Users:', counts[1]);
    console.log('- Provinces:', counts[2]);

  } catch (error) {
    console.error('Database verification failed:', error);
    throw error;
  } finally {
    await client.close();
  }
}

verifyConnection().catch(console.error);