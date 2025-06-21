import { users, therapies, bookings, contacts, type User, type InsertUser, type Therapy, type InsertTherapy, type Booking, type InsertBooking, type Contact, type InsertContact } from "@shared/schema";
import bcrypt from "bcrypt";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Therapies
  getTherapies(): Promise<Therapy[]>;
  getTherapy(id: number): Promise<Therapy | undefined>;
  createTherapy(therapy: InsertTherapy): Promise<Therapy>;
  updateTherapy(id: number, therapy: Partial<InsertTherapy>): Promise<Therapy | undefined>;
  
  // Bookings
  getBookings(): Promise<Booking[]>;
  getBookingsByUser(userId: number): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBooking(id: number, booking: Partial<InsertBooking>): Promise<Booking | undefined>;
  deleteBooking(id: number): Promise<boolean>;
  
  // Contacts
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private therapies: Map<number, Therapy>;
  private bookings: Map<number, Booking>;
  private contacts: Map<number, Contact>;
  private currentUserId: number;
  private currentTherapyId: number;
  private currentBookingId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.therapies = new Map();
    this.bookings = new Map();
    this.contacts = new Map();
    this.currentUserId = 1;
    this.currentTherapyId = 1;
    this.currentBookingId = 1;
    this.currentContactId = 1;
    
    // Initialize with default therapies
    this.initializeTherapies();
    this.initializeAdminUser();
  }

  private async initializeAdminUser() {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const admin: User = {
      id: this.currentUserId++,
      email: "admin@dukhniwaran.com",
      password: hashedPassword,
      firstName: "Admin",
      lastName: "User",
      phone: "+91 9876543210",
      isAdmin: true,
      createdAt: new Date(),
    };
    this.users.set(admin.id, admin);
  }

  private initializeTherapies() {
    const defaultTherapies = [
      { name: "Cupping Therapy", description: "Traditional Chinese therapy using suction cups to improve blood flow and reduce muscle tension.", priceMin: 800, priceMax: 1200, duration: 60, isActive: true },
      { name: "Hijama Therapy", description: "Islamic wet cupping therapy for detoxification and treatment of various health conditions.", priceMin: 1000, priceMax: 1500, duration: 45, isActive: true },
      { name: "IASTM Therapy", description: "Instrument-Assisted Soft Tissue Mobilization for breaking down scar tissue and adhesions.", priceMin: 1200, priceMax: 1800, duration: 45, isActive: true },
      { name: "Dry Needling", description: "Targeted needle therapy to release muscle knots and trigger points for pain relief.", priceMin: 1000, priceMax: 1500, duration: 30, isActive: true },
      { name: "Tennis Elbow Treatment", description: "Specialized treatment for lateral epicondylitis using manual therapy and exercises.", priceMin: 800, priceMax: 1200, duration: 45, isActive: true },
      { name: "Sciatica Treatment", description: "Comprehensive approach to treat sciatic nerve pain through targeted therapy techniques.", priceMin: 1000, priceMax: 1500, duration: 60, isActive: true },
      { name: "Frozen Shoulder", description: "Progressive mobilization and stretching techniques to restore shoulder range of motion.", priceMin: 1200, priceMax: 1800, duration: 45, isActive: true },
      { name: "Posture Correction", description: "Comprehensive postural assessment and corrective exercises for better alignment.", priceMin: 800, priceMax: 1200, duration: 60, isActive: true },
    ];

    defaultTherapies.forEach(therapy => {
      const therapyWithId: Therapy = {
        id: this.currentTherapyId++,
        ...therapy,
      };
      this.therapies.set(therapyWithId.id, therapyWithId);
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      password: hashedPassword,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  // Therapies
  async getTherapies(): Promise<Therapy[]> {
    return Array.from(this.therapies.values()).filter(therapy => therapy.isActive);
  }

  async getTherapy(id: number): Promise<Therapy | undefined> {
    return this.therapies.get(id);
  }

  async createTherapy(insertTherapy: InsertTherapy): Promise<Therapy> {
    const id = this.currentTherapyId++;
    const therapy: Therapy = { ...insertTherapy, id };
    this.therapies.set(id, therapy);
    return therapy;
  }

  async updateTherapy(id: number, updates: Partial<InsertTherapy>): Promise<Therapy | undefined> {
    const therapy = this.therapies.get(id);
    if (!therapy) return undefined;
    
    const updatedTherapy = { ...therapy, ...updates };
    this.therapies.set(id, updatedTherapy);
    return updatedTherapy;
  }

  // Bookings
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => booking.userId === userId);
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentBookingId++;
    const booking: Booking = {
      ...insertBooking,
      id,
      createdAt: new Date(),
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBooking(id: number, updates: Partial<InsertBooking>): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking = { ...booking, ...updates };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  async deleteBooking(id: number): Promise<boolean> {
    return this.bookings.delete(id);
  }

  // Contacts
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
