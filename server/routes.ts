import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertBookingSchema, insertContactSchema, insertTherapySchema, insertPhysiotherapistSchema, loginSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware to verify JWT token
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

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
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
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
        isAdmin: user.isAdmin 
      }, JWT_SECRET);

      res.json({ 
        token, 
        user: { 
          id: user.id, 
          email: user.email, 
          firstName: user.firstName, 
          lastName: user.lastName,
          phone: user.phone,
          isAdmin: user.isAdmin 
        } 
      });
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
        isAdmin: user.isAdmin 
      }, JWT_SECRET);

      res.json({ 
        token, 
        user: { 
          id: user.id, 
          email: user.email, 
          firstName: user.firstName, 
          lastName: user.lastName,
          phone: user.phone,
          isAdmin: user.isAdmin 
        } 
      });
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

      res.json({ 
        id: user.id, 
        email: user.email, 
        firstName: user.firstName, 
        lastName: user.lastName,
        phone: user.phone,
        isAdmin: user.isAdmin 
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Therapies routes
  app.get("/api/therapies", async (req, res) => {
    try {
      const therapies = await storage.getTherapies();
      res.json(therapies);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/therapies/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const therapy = await storage.getTherapy(id);
      if (!therapy) {
        return res.status(404).json({ message: "Therapy not found" });
      }
      res.json(therapy);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/therapies", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const therapyData = insertTherapySchema.parse(req.body);
      const therapy = await storage.createTherapy(therapyData);
      res.json(therapy);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put("/api/therapies/:id", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const therapyData = insertTherapySchema.partial().parse(req.body);
      const therapy = await storage.updateTherapy(id, therapyData);
      if (!therapy) {
        return res.status(404).json({ message: "Therapy not found" });
      }
      res.json(therapy);
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
      res.json(bookings);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/bookings", async (req, res) => {
    try {
      const bookingData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(bookingData);
      res.json(booking);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put("/api/bookings/:id", authenticateToken, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const bookingData = insertBookingSchema.partial().parse(req.body);
      
      // Check if user owns this booking or is admin
      const booking = await storage.getBooking(id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      
      if (!req.user.isAdmin && booking.userId !== req.user.id) {
        return res.status(403).json({ message: "Not authorized to update this booking" });
      }

      const updatedBooking = await storage.updateBooking(id, bookingData);
      res.json(updatedBooking);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/bookings/:id", authenticateToken, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // Check if user owns this booking or is admin
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
      res.json(contact);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/contacts", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Physiotherapists routes
  app.get("/api/physiotherapists", async (req, res) => {
    try {
      const physiotherapists = await storage.getPhysiotherapists();
      res.json(physiotherapists);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/physiotherapists/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const physiotherapist = await storage.getPhysiotherapist(id);
      if (!physiotherapist) {
        return res.status(404).json({ message: "Physiotherapist not found" });
      }
      res.json(physiotherapist);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/physiotherapists", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const physiotherapistData = insertPhysiotherapistSchema.parse(req.body);
      const physiotherapist = await storage.createPhysiotherapist(physiotherapistData);
      res.json(physiotherapist);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put("/api/physiotherapists/:id", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
      const physiotherapistData = insertPhysiotherapistSchema.partial().parse(req.body);
      const physiotherapist = await storage.updatePhysiotherapist(id, physiotherapistData);
      if (!physiotherapist) {
        return res.status(404).json({ message: "Physiotherapist not found" });
      }
      res.json(physiotherapist);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/physiotherapists/:id", authenticateToken, requireAdmin, async (req: any, res) => {
    try {
      const id = parseInt(req.params.id);
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
