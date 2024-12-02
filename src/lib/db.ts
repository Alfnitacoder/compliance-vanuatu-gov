import { MongoClient, ServerApiVersion, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

if (!uri) {
  throw new Error('MongoDB URI is not defined in environment variables');
}

if (!dbName) {
  throw new Error('MongoDB database name is not defined in environment variables');
}

let db: Db | null = null;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectToDb() {
  try {
    if (!db) {
      await client.connect();
      db = client.db(dbName);
      console.log('Successfully connected to MongoDB.');
    }
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export const Collections = {
  USERS: 'users',
  DEPARTMENTS: 'departments',
  PROVINCES: 'provinces',
  COMPLIANCE_ITEMS: 'compliance_items',
  REPORTS: 'reports',
  ACTIONS: 'actions',
  NOTIFICATIONS: 'notifications',
} as const;

export async function closeConnection() {
  if (client) {
    await client.close();
    db = null;
  }
}

// Helper function to get the database instance
export async function getDb() {
  if (!db) {
    db = await connectToDb();
  }
  return db;
}