import { MongoClient } from 'mongodb';
import CryptoJS from 'crypto-js';
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

function hashPassword(password) {
  return CryptoJS.SHA256(password).toString();
}

async function seed() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);

    // Clear existing data
    await Promise.all([
      db.collection('departments').deleteMany({}),
      db.collection('provinces').deleteMany({}),
      db.collection('users').deleteMany({}),
    ]);

    // Insert departments
    const departmentsResult = await db.collection('departments').insertMany([
      {
        id: 'DEPC',
        name: 'Department of Environmental Protection and Conservation',
        description: 'Environmental protection and conservation initiatives',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'DoE',
        name: 'Department of Energy',
        description: 'Energy policy and renewable energy initiatives',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'VMGD',
        name: 'Vanuatu Meteorological & Geohazard Department',
        description: 'Weather monitoring and geological hazard assessment',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'DoCC',
        name: 'Department of Climate Change',
        description: 'Climate change policy and adaptation strategies',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'NDMO',
        name: 'National Disaster Management Office',
        description: 'Disaster preparedness and emergency response',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    console.log('Departments inserted:', departmentsResult.insertedCount);

    // Insert provinces
    const provincesResult = await db.collection('provinces').insertMany([
      { id: 'TORBA', name: 'Torba', created_at: new Date() },
      { id: 'SANMA', name: 'Sanma', created_at: new Date() },
      { id: 'PENAMA', name: 'Penama', created_at: new Date() },
      { id: 'MALAMPA', name: 'Malampa', created_at: new Date() },
      { id: 'SHEFA', name: 'Shefa', created_at: new Date() },
      { id: 'TAFEA', name: 'Tafea', created_at: new Date() },
    ]);
    console.log('Provinces inserted:', provincesResult.insertedCount);

    // Insert admin user
    const userResult = await db.collection('users').insertOne({
      email: 'admin@example.com',
      name: 'System Admin',
      password_hash: hashPassword('admin123'),
      role: 'admin',
      status: 'active',
      created_at: new Date(),
      updated_at: new Date(),
    });
    console.log('Admin user created:', userResult.insertedId);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await client.close();
  }
}

seed().catch(console.error);