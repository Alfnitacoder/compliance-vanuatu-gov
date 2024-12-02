import { getDb, Collections } from './db';
import CryptoJS from 'crypto-js';
import { User } from '../types/auth';

export async function findUserByEmail(email: string): Promise<User | null> {
  const db = await getDb();
  const user = await db.collection(Collections.USERS).findOne({ email });
  return user as User | null;
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  const hash = CryptoJS.SHA256(password).toString();
  return hash === hashedPassword;
}

export async function createUser(user: Partial<User>, password: string): Promise<User> {
  const db = await getDb();
  const hashedPassword = CryptoJS.SHA256(password).toString();
  
  const newUser = {
    ...user,
    password_hash: hashedPassword,
    created_at: new Date(),
    updated_at: new Date(),
  };

  const result = await db.collection(Collections.USERS).insertOne(newUser);
  return { ...newUser, id: result.insertedId.toString() } as User;
}

export async function updateUserLastLogin(userId: string): Promise<void> {
  const db = await getDb();
  await db.collection(Collections.USERS).updateOne(
    { _id: userId },
    { $set: { last_login: new Date() } }
  );
}