# Ticket Bounty

A modern ticket management system built with Next.js App Router, React Server Actions, Prisma, and Shadcn UI.

**Live Demo**: [View on Vercel](https://ticket-bounty-seven.vercel.app/)

![tickets-page](./screenshots/Ticket-Bounty.png)

---

## Overview

Ticket Bounty is a learning-focused project that explores **modern Next.js patterns**:
- Server Actions
- App Router data mutations
- Form state management
- Validation and cache revalidation

This project is built while studying *The Road to Next* by Robin Wieruch.

🚧 The project is functional but **still evolving**.

---

## Features

- **Ticket CRUD**: Create, view, edit, and delete tickets with confirmation dialogs
- **Status Workflow**: Update ticket status (Open → In Progress → Done) via dropdown menu
- **Deadline & Bounty**: Date picker for deadlines, currency input with cent-precision (big.js)
- **Server Actions**: Mutations handled server-side (no API routes)
- **Form Validation**: Zod validation with field-level error messages
- **Form UX**:
  - Loading states with useFormStatus
  - Toast notifications (Sonner) including post-redirect feedback via cookies
  - Input persistence on validation failure
  - DatePicker reset on successful submission
- **Database Integration**: PostgreSQL via Prisma (Supabase)
- **Dynamic Routing**: Ticket detail and edit pages with error boundaries and loading skeletons
- **Dark Mode**: Light/dark theme toggle with next-themes
- **Modern UI**: Shadcn UI + Tailwind CSS
- **Type Safety**: End-to-end TypeScript with Prisma-generated types

---

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma v7
- **Validation**: Zod
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI (Radix UI primitives)
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Theme**: next-themes
- **Date**: date-fns + react-day-picker
- **Currency**: big.js

---

## Project Structure

```
ticket-bounty/
├── app/
│   ├── page.tsx                    # Home page
│   ├── layout.tsx                  # Root layout (Header, Toaster, ThemeProvider)
│   ├── template.tsx                # Route template wrapper
│   ├── globals.css                 # Global styles and theme
│   └── tickets/
│       ├── page.tsx                # Tickets list + create form
│       ├── error.tsx               # Error boundary
│       └── [ticketId]/
│           ├── page.tsx            # Ticket detail page
│           ├── loading.tsx         # Loading skeleton
│           ├── not-found.tsx       # 404 page
│           └── edit/
│               └── page.tsx        # Ticket edit page
├── actions/
│   └── cookies.ts                  # Cookie server actions (get, set, consume)
├── components/
│   ├── ui/                         # Shadcn UI components
│   ├── form/                       # Form components (SubmitButton, FieldError)
│   │   ├── hooks/                  # useActionFeedback hook
│   │   └── utils/                  # ActionState utilities
│   ├── theme/                      # ThemeProvider, ThemeSwitcher
│   ├── date-picker.tsx             # Calendar popover date picker
│   ├── confirm-dialog.tsx          # Confirmation dialog
│   ├── redirect-toast.tsx          # Post-redirect toast via cookies
│   ├── heading.tsx                 # Reusable heading component
│   └── card-compact.tsx            # Reusable card wrapper
├── features/
│   └── ticket/
│       ├── actions/                # Server actions (upsert, delete, status)
│       ├── components/             # Ticket components (list, item, form, more-menu)
│       ├── queries/                # Data fetching queries
│       └── constants.tsx           # Ticket icons and status labels
├── constants/
│   └── paths.ts                    # Route path constants
├── lib/
│   ├── prisma.ts                   # Prisma client instance
│   └── big.ts                      # big.js configuration
├── utils/
│   └── currency.ts                 # Currency conversion (toCent, fromCent)
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
- Ticket status workflow (Open → In Progress → Done)
- Deadline and bounty fields with currency handling
- Toast notifications and post-redirect feedback
- Confirmation dialogs for destructive actions
- Dark/light theme toggle
- Error boundaries and loading skeletons

**Planned**
- Authentication
- Ownership & assignments
- Search & filtering
- Pagination
