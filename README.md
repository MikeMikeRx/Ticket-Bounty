# Ticket Bounty

A modern ticket management system built with Next.js App Router, React Server Actions, Prisma, and Shadcn UI.

**Live Demo**: [View on Vercel](https://ticket-bounty-seven.vercel.app/)

![tickets-page](./screenshots/tickets-page.png)

---

## Overview

Ticket Bounty is a learning-focused project that explores **modern Next.js patterns**:
- Server Actions
- App Router data mutations
- Form state management
- Validation and cache revalidation

🚧 The project is functional but **still evolving**.

---

## Features

- **Ticket CRUD**: Create, view, edit, and delete tickets
- **Server Actions**: Mutations handled server-side (no API routes)
- **Form Validation**: Zod validation with field-level error messages
- **Form UX**:
  - Loading states
  - Success/error feedback
  - Input persistence on validation failure
- **Database Integration**: PostgreSQL via Prisma (Supabase)
- **Dynamic Routing**: Ticket detail and edit pages
- **Modern UI**: Shadcn UI + Tailwind CSS
- **Type Safety**: End-to-end TypeScript

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Validation**: Zod
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI
- **Icons**: Lucide React

---

## Project Structure

```
ticket-bounty/
├── app/
│   ├── page.tsx                    # Home page
│   ├── tickets/
│   │   ├── page.tsx                # Tickets list page with create form
│   │   └── [ticketId]/
│   │       ├── page.tsx            # Individual ticket detail page
│   │       └── edit/
│   │           └── page.tsx        # Ticket edit page
│   ├── layout.tsx                  # Root layout with navigation
│   └── globals.css                 # Global styles and theme
├── components/
│   ├── ui/                         # Shadcn UI components
│   ├── form/                       # Form components (SubmitButton, FieldError)
│   ├── heading.tsx                 # Reusable heading component
│   └── card-compact.tsx            # Reusable card wrapper
├── features/
│   └── ticket/
│       ├── actions/                # Server actions (upsert, delete)
│       ├── components/             # Ticket components (list, item, form)
│       ├── queries/                # Data fetching queries
│       └── constants.tsx           # Ticket-related constants
├── constants/
│   └── paths.ts                    # Route path constants
├── lib/
│   └── prisma.ts                   # Prisma client instance
└── prisma/
    ├── schema.prisma               # Database schema
    └── seed.ts                     # Database seeding script
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database (or Supabase account)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ticket-bounty.git
cd ticket-bounty

# Install dependencies
npm install

# Set up environment variables
# Create .env file with:
# DATABASE_URL="postgresql://..."

# Run Prisma migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run type         # Run TypeScript type checking
npx prisma studio    # Open Prisma Studio (database GUI)
```

## Current Status

**Implemented**
- Core ticket CRUD
- Server Actions + validation
- Form UX and error handling
- Cache revalidation

**Planned**
- Ticket status workflow
- Authentication
- Ownership & assignments
- Search & filtering
- Pagination
