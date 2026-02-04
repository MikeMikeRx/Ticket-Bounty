# Ticket Bounty

A modern ticket management system built with Next.js App Router, React Server Actions, Prisma, and Shadcn UI.

**Live Demo**: [View on Vercel](https://ticket-bounty-seven.vercel.app/)

![tickets-page](./screenshots/Ticket-Bounty.png)

---

## Overview

Ticket Bounty is a learning-focused project that explores **modern Next.js patterns**:
- Server Actions for mutations
- App Router with layouts and route guards
- Session-based authentication
- Form state management with useActionState
- Zod validation and cache revalidation

This project is built while studying *The Road to Next* by Robin Wieruch.

---

## Features

### Authentication & Authorization
- **User Registration**: Sign up with username, email, and password
- **Session-Based Auth**: Secure HTTP-only cookies with 30-day TTL
- **Password Security**: Argon2 hashing for secure password storage
- **Protected Routes**: Layout-based route guards for authenticated sections
- **Ownership Checks**: Users can only edit/delete their own tickets

### Ticket Management
- **Ticket CRUD**: Create, view, edit, and delete tickets with confirmation dialogs
- **Status Workflow**: Update ticket status (Open → In Progress → Done) via dropdown menu
- **Deadline & Bounty**: Date picker for deadlines, currency input with cent-precision (big.js)
- **Scoped Views**: "All Tickets" (public) and "My Tickets" (user's own)

### Server-Side Architecture
- **Server Actions**: All mutations handled server-side (no API routes)
- **Server Components**: Direct database queries in async components
- **Cache Revalidation**: Efficient path-based cache invalidation

### Form Handling
- **Zod Validation**: Schema-based validation with field-level error messages
- **ActionState Pattern**: Track form submission state across client/server
- **Loading States**: useFormStatus for automatic pending UI
- **Toast Notifications**: Sonner toasts including post-redirect feedback via cookies
- **Input Persistence**: Form values retained on validation failure
- **DatePicker Reset**: Imperative reset on successful submission

### User Interface
- **Sidebar Navigation**: Expandable sidebar with hover animations
- **Dark/Light Mode**: Theme toggle with next-themes
- **Modern UI**: Shadcn UI components + Tailwind CSS v4
- **Loading Skeletons**: Suspense boundaries with spinner fallbacks
- **Error Boundaries**: Custom error pages for exceptions
- **Confirmation Dialogs**: Alert dialogs for destructive actions

### Database & Type Safety
- **PostgreSQL**: Database via Prisma with native pg adapter
- **Prisma v7**: Type-safe ORM with auto-generated types
- **End-to-End TypeScript**: Full type coverage from database to UI

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Database** | PostgreSQL (Supabase) |
| **ORM** | Prisma v7 with native pg adapter |
| **Authentication** | Custom session-based auth |
| **Password Hashing** | Argon2 |
| **Validation** | Zod v4 |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | Shadcn UI (Radix UI primitives) |
| **Icons** | Lucide React |
| **Notifications** | Sonner |
| **Theme** | next-themes |
| **Date Handling** | date-fns + react-day-picker |
| **Currency** | big.js |

---

## Project Structure

```
ticket-bounty/
├── app/
│   ├── page.tsx                    # Home page (All Tickets)
│   ├── layout.tsx                  # Root layout (Header, Sidebar, ThemeProvider)
│   ├── template.tsx                # Route template with RedirectToast
│   ├── globals.css                 # Global styles and theme
│   ├── sign-in/page.tsx            # Sign-in page
│   ├── sign-up/page.tsx            # Sign-up page
│   └── tickets/
│       ├── layout.tsx              # Auth guard layout
│       ├── page.tsx                # My Tickets + create form
│       ├── error.tsx               # Error boundary
│       └── [ticketId]/
│           ├── page.tsx            # Ticket detail page
│           ├── loading.tsx         # Loading skeleton
│           ├── not-found.tsx       # 404 page
│           └── edit/page.tsx       # Ticket edit page (owner-only)
├── actions/
│   └── cookies.ts                  # Cookie server actions (get, set, consume)
├── components/
│   ├── ui/                         # Shadcn UI components
│   ├── form/                       # Form components (SubmitButton, FieldError)
│   │   ├── hooks/                  # useActionFeedback hook
│   │   └── utils/                  # ActionState utilities
│   ├── sidebar/                    # Sidebar navigation
│   │   ├── components/             # Sidebar, SidebarItem
│   │   ├── constants.tsx           # Nav items configuration
│   │   └── types.ts                # NavItem type
│   ├── theme/                      # ThemeProvider, ThemeSwitcher
│   ├── header.tsx                  # Top navigation bar
│   ├── date-picker.tsx             # Calendar popover date picker
│   ├── confirm-dialog.tsx          # Confirmation dialog hook + UI
│   ├── redirect-toast.tsx          # Post-redirect toast via cookies
│   ├── heading.tsx                 # Section heading component
│   └── card-compact.tsx            # Reusable card wrapper
├── features/
│   ├── auth/
│   │   ├── actions/                # sign-in, sign-up, sign-out
│   │   ├── components/             # SignInForm, SignUpForm
│   │   ├── queries/                # getAuth, getAuthOrRedirect
│   │   ├── hooks/                  # useAuth client hook
│   │   └── utils/                  # isOwner utility
│   └── ticket/
│       ├── actions/                # upsert, delete, status
│       ├── components/             # TicketList, TicketItem, TicketUpsertForm
│       ├── queries/                # getTicket, getTickets
│       ├── constants.tsx           # Status icons and labels
│       └── types.ts                # TicketWithMetadata type
├── constants/
│   └── paths.ts                    # Route path constants
├── lib/
│   ├── auth/                       # Authentication utilities
│   │   ├── password.ts             # Argon2 hash/verify
│   │   ├── session.ts              # Session create/validate/delete
│   │   └── cookies.ts              # Session cookie management
│   ├── prisma.ts                   # Prisma client singleton
│   ├── big.ts                      # big.js configuration
│   └── utils.ts                    # Utility functions (cn)
├── utils/
│   └── currency.ts                 # Currency conversion (toCent, fromCent)
└── prisma/
    ├── schema.prisma               # Database schema (User, Session, Ticket)
    ├── seed.ts                     # Database seeding script
    └── migrations/                 # Migration history
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
npm run lint         # Run ESLint
npm run type         # Run TypeScript type checking
npm run db:push      # Push schema changes to database
npm run db:seed      # Seed the database
npx prisma studio    # Open Prisma Studio (database GUI)
```

---

## Database Schema

```prisma
model User {
  id           String    @id @default(cuid())
  username     String    @unique
  email        String    @unique
  passwordHash String
  sessions     Session[]
  tickets      Ticket[]
}

model Session {
  id        String   @id
  expiresAt DateTime
  userId    String
  user      User     @relation(...)
}

model Ticket {
  id        String       @id @default(cuid())
  createdAt DateTime     @default(now())
  updatedAt DateTime     @updatedAt
  title     String
  content   String       @db.VarChar(1024)
  status    TicketStatus @default(OPEN)
  deadline  String
  bounty    Int          // Stored in cents
  userId    String
  user      User         @relation(...)
}

enum TicketStatus {
  OPEN
  IN_PROGRESS
  DONE
}
```

---

## Architecture Highlights

### Authentication Flow
1. User signs up/in with credentials
2. Password hashed with Argon2
3. Session created in database (30-day TTL)
4. Session ID stored in HTTP-only cookie
5. `getAuth()` validates session on each request

### Authorization Pattern
- **UI Layer**: Hide edit/delete buttons for non-owners
- **Server Actions**: Check `isOwner()` before mutations
- **Layout Guards**: Protected routes redirect if unauthenticated

### ActionState Pattern
```typescript
type ActionState = {
  status?: "SUCCESS" | "ERROR"
  message: string
  payload?: FormData    // Preserve values on error
  fieldErrors: Record<string, string[]>
  timestamp: number
}
```

## Current Status

**Implemented**
- Full authentication system (sign-up, sign-in, sign-out)
- Session-based auth with HTTP-only cookies
- Ownership-based authorization
- Core ticket CRUD operations
- Server Actions + Zod validation
- Form UX with ActionState pattern
- Cache revalidation on mutations
- Ticket status workflow (Open → In Progress → Done)
- Deadline and bounty fields with currency handling
- Toast notifications and post-redirect feedback
- Confirmation dialogs for destructive actions
- Sidebar navigation with All Tickets / My Tickets views
- Dark/light theme toggle
- Error boundaries and loading skeletons

**Planned**
- Search & filtering
- Pagination
- User profiles
- Ticket assignments
