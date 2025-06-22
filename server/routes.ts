import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertBookingSchema, insertContactSchema, insertTherapySchema, insertPhysiotherapistSchema, loginSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware to verify JWT token s   
const authenticateToken = (req: any, res: any, next: any) => {
  const token = req.cookies?.token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }
  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Middleware to verify admin
const requireAdmin = (req: any, res: any, next: any) => {
  console.log('Checking admin access for user:', req.user);
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Utility to convert snake_case keys to camelCase
function toCamel(obj: any) {
  if (Array.isArray(obj)) return obj.map(toCamel);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [
        k.replace(/_([a-z])/g, (_, c) => c.toUpperCase()),
        toCamel(v)
      ])
    );
  }
  return obj;
}

// Utility to convert _id to id and snake_case to camelCase
function mongoToApp(obj: any) {
  if (!obj) return obj;
  if (Array.isArray(obj)) return obj.map(mongoToApp);
  const { _id, ...rest } = obj;
  const camel = toCamel(rest);
  return { id: _id?.toString(), ...camel };
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.use(cookieParser());
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await storage.createUser(userData);
      const token = jwt.sign({ 
        id: user.id, 
        email: user.email, 
        isAdmin: user.is_admin 
      }, JWT_SECRET);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
      res.json({ user: mongoToApp(user) });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ 
        id: user.id, 
        email: user.email, 
        isAdmin: user.is_admin 
      }, JWT_SECRET);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
      res.json({ user: mongoToApp(user) });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/auth/me", authenticateToken, async (req: any, res) => {
    try {
      const user = await storage.getUser(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(mongoToApp(user));
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Therapies routes
  app.get("/api/therapies", async (req, res) => {
    try {
      const therapies = await storage.getTherapies();
      console.log('therapies fetched:', therapies);
      res.json(mongoToApp(therapies));
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/therapies/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const therapy = await storage.getTherapy(id);
      if (!therapy) {
        return res.status(404).json({ message: "Therapy not found" });
      }
      res.json(mongoToApp(therapy));
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/therapies", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const therapyData = insertTherapySchema.parse(req.body);
      const therapy = await storage.createTherapy(therapyData);
      res.json(mongoToApp(therapy));
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put("/api/therapies/:id", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const id = req.params.id;
      const therapyData = insertTherapySchema.partial().parse(req.body);
      const therapy = await storage.updateTherapy(id, therapyData);
      if (!therapy) {
        return res.status(404).json({ message: "Therapy not found" });
      }
      res.json(mongoToApp(therapy));
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Bookings routes
  app.get("/api/bookings", authenticateToken, async (req: any, res) => {
    try {
      let bookings;
      if (req.user.isAdmin) {
        bookings = await storage.getBookings();
      } else {
        bookings = await storage.getBookingsByUser(req.user.id);
      }
      res.json(mongoToApp(bookings));
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.json(mongoToApp(booking));
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put("/api/bookings/:id", authenticateToken, async (req: any, res) => {
    try {
      const id = req.params.id;
      const bookingData = insertBookingSchema.partial().parse(req.body);
      const booking = await storage.getBooking(id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      if (!req.user.isAdmin && booking.userId !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to update this booking" });
      }
      const updatedBooking = await storage.updateBooking(id, bookingData);
      res.json(mongoToApp(updatedBooking));
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/bookings/:id", authenticateToken, async (req: any, res) => {
    try {
      const id = req.params.id;
      const booking = await storage.getBooking(id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      if (!req.user.isAdmin && booking.userId !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to delete this booking" });
      }
      const deleted = await storage.deleteBooking(id);
      if (!deleted) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json({ message: "Booking deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Contact routes
  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json(mongoToApp(contact));
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/contacts", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(mongoToApp(contacts));
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/contacts/:id", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const id = req.params.id;
      const contact = await storage.getContact(id);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json(mongoToApp(contact));
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Physiotherapists routes
  app.get("/api/physiotherapists", async (req, res) => {
    try {
      const physiotherapists = await storage.getPhysiotherapists();
      res.json(mongoToApp(physiotherapists));
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/physiotherapists/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const physiotherapist = await storage.getPhysiotherapist(id);
      if (!physiotherapist) {
        return res.status(404).json({ message: "Physiotherapist not found" });
      }
      res.json(mongoToApp(physiotherapist));
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/physiotherapists", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const physiotherapistData = insertPhysiotherapistSchema.parse(req.body);
      const physiotherapist = await storage.createPhysiotherapist(physiotherapistData);
      res.json(mongoToApp(physiotherapist));
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put("/api/physiotherapists/:id", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const id = req.params.id;
      const physiotherapistData = insertPhysiotherapistSchema.partial().parse(req.body);
      const physiotherapist = await storage.updatePhysiotherapist(id, physiotherapistData);
      if (!physiotherapist) {
        return res.status(404).json({ message: "Physiotherapist not found" });
      }
      res.json(mongoToApp(physiotherapist));
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/physiotherapists/:id", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const id = req.params.id;
      const deleted = await storage.deletePhysiotherapist(id);
      if (!deleted) {
        return res.status(404).json({ message: "Physiotherapist not found" });
      }
      res.json({ message: "Physiotherapist deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
