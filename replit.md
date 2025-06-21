# Dukhniwaran Physiotherapy Clinic System

## Overview

This is a full-stack web application for Dukhniwaran Physiotherapy Clinic, built to manage patient bookings, therapy services, and clinic administration. The system provides a modern, user-friendly interface for patients to book appointments and for administrators to manage the clinic operations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom medical theme colors
- **Build Tool**: Vite for fast development and building
- **Form Management**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Authentication**: JWT-based authentication with bcrypt for password hashing
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful API architecture

### Database Design
- **Database**: PostgreSQL (configured via Neon Database)
- **Schema Management**: Drizzle Kit for migrations
- **Tables**:
  - `users`: User accounts with admin role support
  - `therapies`: Available treatment services
  - `bookings`: Patient appointment records
  - `contacts`: Contact form submissions

## Key Components

### Authentication System
- JWT token-based authentication
- Role-based access control (admin vs regular users)
- Secure password hashing with bcrypt
- Protected routes and middleware

### Booking System
- Patient appointment scheduling
- Therapy service selection
- Personal information collection
- Appointment status management (pending, confirmed, cancelled)

### Admin Dashboard
- Booking management and status updates
- Therapy service management (CRUD operations)
- Contact form submissions review
- User management capabilities

### Therapy Management
- Dynamic therapy service catalog
- Pricing range configuration
- Service duration settings
- Active/inactive status control

## Data Flow

1. **User Registration/Login**: 
   - Users register with personal details
   - JWT tokens issued for authenticated sessions
   - Admin users get elevated permissions

2. **Booking Process**:
   - Users browse available therapies
   - Fill booking form with patient details
   - System creates booking record with pending status
   - Admin reviews and updates booking status

3. **Admin Operations**:
   - Admin accesses protected dashboard routes
   - Manages bookings, therapies, and contacts
   - Updates system data through API endpoints

4. **Contact System**:
   - Public contact form submissions
   - Admin review of inquiries
   - No authentication required for contact form

## External Dependencies

### Production Dependencies
- **@neondatabase/serverless**: Neon PostgreSQL database driver
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI primitives
- **drizzle-orm**: TypeScript ORM
- **express**: Node.js web framework
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT authentication
- **zod**: Schema validation
- **wouter**: React routing

### Development Dependencies
- **vite**: Build tool and dev server
- **typescript**: Type checking
- **tailwindcss**: Utility-first CSS framework
- **@types/***: TypeScript definitions

## Deployment Strategy

### Environment Configuration
- **Development**: Uses tsx for TypeScript execution
- **Production**: Builds with Vite and esbuild
- **Database**: PostgreSQL via environment variable `DATABASE_URL`
- **Security**: JWT secret via `JWT_SECRET` environment variable

### Build Process
1. Frontend assets built with Vite to `dist/public`
2. Backend bundled with esbuild to `dist/index.js`
3. Static file serving in production mode
4. Database migrations handled via Drizzle Kit

### Hosting Platform
- **Platform**: Replit with autoscale deployment
- **Port Configuration**: Internal port 5000, external port 80
- **Modules**: Node.js 20, Web, PostgreSQL 16
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`

## Recent Changes

### June 21, 2025 - Major Updates
- ✓ Added comprehensive physiotherapist management system for admin
- ✓ Implemented complete SEO optimization with structured data
- ✓ Enhanced typography with Inter and Poppins fonts
- ✓ Added advanced animations and visual effects
- ✓ Integrated Google Maps for location display
- ✓ Updated all pages with location-specific content for Panipat
- ✓ Added API routes for physiotherapist CRUD operations
- ✓ Enhanced admin panel with team management capabilities

### SEO Features Added
- Meta tags optimization for all pages
- Structured data (JSON-LD) for business information
- Location-specific keywords targeting Panipat
- Open Graph and Twitter Card meta tags
- Canonical URLs and proper heading structure

### Typography & Design Enhancements
- Google Fonts integration (Inter + Poppins)
- Custom animations and transitions
- Gradient text effects and custom shadows
- Improved spacing and visual hierarchy
- Enhanced mobile responsiveness

## User Preferences

Preferred communication style: Simple, everyday language.
Requested features: Admin management for physiotherapists, SEO optimization, enhanced typography.