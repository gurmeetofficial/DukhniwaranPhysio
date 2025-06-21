import { users, therapies, bookings, contacts, physiotherapists, type User, type InsertUser, type Therapy, type InsertTherapy, type Booking, type InsertBooking, type Contact, type InsertContact, type Physiotherapist, type InsertPhysiotherapist } from "@shared/schema";
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
  
  // Physiotherapists
  getPhysiotherapists(): Promise<Physiotherapist[]>;
  getPhysiotherapist(id: number): Promise<Physiotherapist | undefined>;
  createPhysiotherapist(physiotherapist: InsertPhysiotherapist): Promise<Physiotherapist>;
  updatePhysiotherapist(id: number, physiotherapist: Partial<InsertPhysiotherapist>): Promise<Physiotherapist | undefined>;
  deletePhysiotherapist(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private therapies: Map<number, Therapy>;
  private bookings: Map<number, Booking>;
  private contacts: Map<number, Contact>;
  private physiotherapists: Map<number, Physiotherapist>;
  private currentUserId: number;
  private currentTherapyId: number;
  private currentBookingId: number;
  private currentContactId: number;
  private currentPhysiotherapistId: number;

  constructor() {
    this.users = new Map();
    this.therapies = new Map();
    this.bookings = new Map();
    this.contacts = new Map();
    this.physiotherapists = new Map();
    this.currentUserId = 1;
    this.currentTherapyId = 1;
    this.currentBookingId = 1;
    this.currentContactId = 1;
    this.currentPhysiotherapistId = 1;
    
    // Initialize with default data
    this.initializeTherapies();
    this.initializePhysiotherapists();
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
      isAdmin: insertUser.isAdmin || false,
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
    const therapy: Therapy = { 
      ...insertTherapy, 
      id,
      isActive: insertTherapy.isActive !== undefined ? insertTherapy.isActive : true
    };
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
      userId: insertBooking.userId || null,
      patientEmail: insertBooking.patientEmail || null,
      patientAge: insertBooking.patientAge || null,
      additionalNotes: insertBooking.additionalNotes || null,
      status: insertBooking.status || "pending",
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
      phone: insertContact.phone || null,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  private initializePhysiotherapists() {
    const defaultPhysiotherapists = [
      {
        name: "Dr. Sarah Miller",
        role: "Lead Physiotherapist",
        description: "Specialized in orthopedic rehabilitation and sports injury treatment with advanced certifications in manual therapy.",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        experience: "15+ years",
        specializations: "Orthopedic Rehabilitation, Sports Injuries, Manual Therapy",
        isActive: true
      },
      {
        name: "Dr. James Wilson",
        role: "Senior Therapist",
        description: "Expert in dry needling, IASTM therapy, and chronic pain management with focus on evidence-based treatment approaches.",
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        experience: "12+ years",
        specializations: "Dry Needling, IASTM, Chronic Pain Management",
        isActive: true
      },
      {
        name: "Dr. Lisa Zhang",
        role: "Rehabilitation Specialist",
        description: "Specialist in neurological rehabilitation, postural correction, and movement analysis with advanced training in functional movement.",
        image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        experience: "10+ years",
        specializations: "Neurological Rehabilitation, Postural Correction, Movement Analysis",
        isActive: true
      }
    ];

    defaultPhysiotherapists.forEach(physio => {
      const physioWithId: Physiotherapist = {
        id: this.currentPhysiotherapistId++,
        ...physio,
        createdAt: new Date(),
      };
      this.physiotherapists.set(physioWithId.id, physioWithId);
    });
  }

  // Physiotherapists
  async getPhysiotherapists(): Promise<Physiotherapist[]> {
    return Array.from(this.physiotherapists.values()).filter(physio => physio.isActive);
  }

  async getPhysiotherapist(id: number): Promise<Physiotherapist | undefined> {
    return this.physiotherapists.get(id);
  }

  async createPhysiotherapist(insertPhysiotherapist: InsertPhysiotherapist): Promise<Physiotherapist> {
    const id = this.currentPhysiotherapistId++;
    const physiotherapist: Physiotherapist = {
      ...insertPhysiotherapist,
      id,
      image: insertPhysiotherapist.image || null,
      isActive: insertPhysiotherapist.isActive !== undefined ? insertPhysiotherapist.isActive : true,
      createdAt: new Date(),
    };
    this.physiotherapists.set(id, physiotherapist);
    return physiotherapist;
  }

  async updatePhysiotherapist(id: number, updates: Partial<InsertPhysiotherapist>): Promise<Physiotherapist | undefined> {
    const physiotherapist = this.physiotherapists.get(id);
    if (!physiotherapist) return undefined;
    
    const updatedPhysiotherapist = { ...physiotherapist, ...updates };
    this.physiotherapists.set(id, updatedPhysiotherapist);
    return updatedPhysiotherapist;
  }

  async deletePhysiotherapist(id: number): Promise<boolean> {
    return this.physiotherapists.delete(id);
  }
}

export const storage = new MemStorage();
