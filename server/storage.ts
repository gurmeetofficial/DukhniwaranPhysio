import { getDb } from './db';
import bcrypt from "bcrypt";
import { ObjectId } from 'mongodb';
import { type User, type InsertUser, type Therapy, type InsertTherapy, type Booking, type InsertBooking, type Contact, type InsertContact, type Physiotherapist, type InsertPhysiotherapist } from "@shared/schema";

export class MongoStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const db = await getDb();
    return db.collection('users').findOne({ _id: new ObjectId(id) });
  }
  async getUserByEmail(email: string): Promise<User | undefined> {
    const db = await getDb();
    return db.collection('users').findOne({ email });
  }
  async createUser(user: InsertUser): Promise<User> {
    const db = await getDb();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const result = await db.collection('users').insertOne({ ...user, password: hashedPassword });
    const created = await db.collection('users').findOne({ _id: result.insertedId });
    if (!created) throw new Error('User creation failed');
    return created;
  }

  // Therapies
  async getTherapies(): Promise<Therapy[]> {
    console.log("Before connecting to database");
    const db = await getDb();
    console.log("Fetching therapies from database");
    return db.collection('therapies').find({ isActive: true }).toArray();
  }
  async getTherapy(id: string): Promise<Therapy | undefined> {
    const db = await getDb();
    return db.collection('therapies').findOne({ _id: new ObjectId(id) });
  }
  async createTherapy(therapy: InsertTherapy): Promise<Therapy> {
    const db = await getDb();
    const result = await db.collection('therapies').insertOne(therapy);
    const created = await db.collection('therapies').findOne({ _id: result.insertedId });
    if (!created) throw new Error('Therapy creation failed');
    return created;
  }
  async updateTherapy(id: string, updates: Partial<InsertTherapy>): Promise<Therapy | undefined> {
    const db = await getDb();
    await db.collection('therapies').updateOne({ _id: new ObjectId(id) }, { $set: updates });
    return db.collection('therapies').findOne({ _id: new ObjectId(id) });
  }

  // Bookings
  async getBookings(): Promise<Booking[]> {
    const db = await getDb();
    return db.collection('bookings').find().toArray();
  }
  async getBookingsByUser(userId: string): Promise<Booking[]> {
    const db = await getDb();
    return db.collection('bookings').find({ userId }).toArray();
  }
  async getBooking(id: string): Promise<Booking | undefined> {
    const db = await getDb();
    return db.collection('bookings').findOne({ _id: new ObjectId(id) });
  }
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const db = await getDb();
    const result = await db.collection('bookings').insertOne(booking);
    const created = await db.collection('bookings').findOne({ _id: result.insertedId });
    if (!created) throw new Error('Booking creation failed');
    return created;
  }
  async updateBooking(id: string, updates: Partial<InsertBooking>): Promise<Booking | undefined> {
    const db = await getDb();
    await db.collection('bookings').updateOne({ _id: new ObjectId(id) }, { $set: updates });
    return db.collection('bookings').findOne({ _id: new ObjectId(id) });
  }
  async deleteBooking(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db.collection('bookings').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }

  // Contacts
  async getContacts(): Promise<Contact[]> {
    const db = await getDb();
    return db.collection('contacts').find().toArray();
  }
  async createContact(contact: InsertContact): Promise<Contact> {
    const db = await getDb();
    const result = await db.collection('contacts').insertOne(contact);
    const created = await db.collection('contacts').findOne({ _id: result.insertedId });
    if (!created) throw new Error('Contact creation failed');
    return created;
  }
  async getContact(id: string): Promise<Contact | undefined> {
    const db = await getDb();
    return db.collection('contacts').findOne({ _id: new ObjectId(id) });
  }

  // Physiotherapists
  async getPhysiotherapists(): Promise<Physiotherapist[]> {
    const db = await getDb();
    return db.collection('physiotherapists').find({ isActive: true }).toArray();
  }
  async getPhysiotherapist(id: string): Promise<Physiotherapist | undefined> {
    const db = await getDb();
    return db.collection('physiotherapists').findOne({ _id: new ObjectId(id) });
  }
  async createPhysiotherapist(physio: InsertPhysiotherapist): Promise<Physiotherapist> {
    const db = await getDb();
    const result = await db.collection('physiotherapists').insertOne(physio);
    const created = await db.collection('physiotherapists').findOne({ _id: result.insertedId });
    if (!created) throw new Error('Physiotherapist creation failed');
    return created;
  }
  async updatePhysiotherapist(id: string, updates: Partial<InsertPhysiotherapist>): Promise<Physiotherapist | undefined> {
    const db = await getDb();
    await db.collection('physiotherapists').updateOne({ _id: new ObjectId(id) }, { $set: updates });
    return db.collection('physiotherapists').findOne({ _id: new ObjectId(id) });
  }
  async deletePhysiotherapist(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db.collection('physiotherapists').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  }
}

export const storage = new MongoStorage();
