# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check for code issues

## Project Architecture

This is a fully functional Next.js 15 expense tracker application with Thai language support, built using App Router architecture with TypeScript and Tailwind CSS v4.

### Tech Stack
- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v4 with PostCSS processing
- **State Management**: React Context API with useReducer
- **Data Persistence**: localStorage for client-side storage
- **Fonts**: Geist Sans and Geist Mono via next/font/google
- **Build Tool**: Turbopack for development (via --turbopack flag)

### Core Architecture

**State Management:**
- Uses React Context (`ExpenseContext`) with useReducer for global state
- Centralized state includes `transactions` and `categories` arrays
- Automatic localStorage persistence for data across sessions
- Actions for CRUD operations on both transactions and categories

**Data Models:**
- `Transaction`: Core expense/income records with amount, type, category, description, and date
- `Category`: Expense/income categories with icon, color, and type classification
- `TransactionSummary`: Calculated summary data (total income, expense, net amount)
- Date filtering types: 'today', 'week', 'month', 'all'

**Component Structure:**
- `app/page.tsx` - Main dashboard with transaction list and summary
- `components/SummaryCard.tsx` - Financial summary display
- `components/TransactionForm.tsx` - Add/edit transaction modal form
- `components/TransactionItem.tsx` - Individual transaction display
- `components/DateFilter.tsx` - Time period filtering controls
- `components/CategoryPicker.tsx` - Category selection interface

**Business Logic:**
- `utils/calculations.ts` - Financial calculations, date filtering, and formatting
- `data/mockData.ts` - Initial seed data for development
- Thai locale formatting for currency (THB) and dates

### Key Features
- **Bilingual Support**: Thai language UI with Thai locale formatting
- **Real-time Calculations**: Automatic summary updates (income, expense, net amount)
- **Date Filtering**: View transactions by today, week, month, or all time
- **Modal Forms**: Add/edit transactions with category selection
- **Dark Mode**: Supports system preference with CSS custom properties
- **Responsive Design**: Mobile-first layout with responsive grid system
- **Data Persistence**: Automatic localStorage backup and restore

### File Structure
```
app/
├── layout.tsx          # Root layout with ExpenseProvider wrapper
├── page.tsx           # Main dashboard component
└── globals.css        # Global styles with Tailwind and CSS variables

components/
├── CategoryPicker.tsx  # Category selection UI
├── DateFilter.tsx     # Time period filters
├── SummaryCard.tsx    # Financial summary display
├── TransactionForm.tsx # Transaction add/edit modal
└── TransactionItem.tsx # Individual transaction row

contexts/
└── ExpenseContext.tsx  # Global state management with React Context

types/
└── index.ts           # TypeScript interfaces and types

utils/
└── calculations.ts    # Business logic and formatting functions

data/
└── mockData.ts        # Development seed data
```

### Development Notes
- All monetary amounts stored as positive numbers; type field determines income/expense
- Uses Thai locale (th-TH) for currency and date formatting
- Transaction IDs generated using timestamp + random string
- Categories have both emoji icons and color coding for visual organization