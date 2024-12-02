import { getDb, Collections } from '../lib/db';
import { hash } from 'bcrypt';

async function seed() {
  const db = await getDb();

  try {
    // Clear existing data
    await Promise.all([
      db.collection(Collections.DEPARTMENTS).deleteMany({}),
      db.collection(Collections.PROVINCES).deleteMany({}),
      db.collection(Collections.USERS).deleteMany({}),
    ]);

    // Insert departments
    await db.collection(Collections.DEPARTMENTS).insertMany([
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

    // Insert provinces
    await db.collection(Collections.PROVINCES).insertMany([
      { id: 'TORBA', name: 'Torba', created_at: new Date() },
      { id: 'SANMA', name: 'Sanma', created_at: new Date() },
      { id: 'PENAMA', name: 'Penama', created_at: new Date() },
      { id: 'MALMPA', name: 'Malampa', created_at: new Date() },
      { id: 'SHEFA', name: 'Shefa', created_at: new Date() },
      { id: 'TAFEA', name: 'Tafea', created_at: new Date() },
    ]);

    // Insert admin user
    const passwordHash = await hash('admin123', 10);
    await db.collection(Collections.USERS).insertOne({
      email: 'admin@example.com',
      name: 'System Admin',
      password_hash: passwordHash,
      role: 'admin',
      status: 'active',
      created_at: new Date(),
      updated_at: new Date(),
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

seed().catch(console.error);