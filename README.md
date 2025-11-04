# Time Tracking System

A modern, full-featured time tracking application built with Next.js 16, React 19, and TypeScript. Track your work hours, manage projects, and analyze your productivity with detailed reports and visualizations.

## Features

### Timer
- **Real-time Timer**: Start and stop tracking time instantly
- **Project Assignment**: Assign tracked time to specific projects
- **Task Description**: Add task details to each time entry
- **Today's Summary**: Quick overview of hours logged today
- **Recent Entries**: View your most recent time entries at a glance

### Entries Management
- **View All Entries**: Complete list of all time entries with filtering options
- **Edit Entries**: Modify existing time entries including duration, project, and task
- **Manual Entry**: Manually add time entries for past work
- **Billable Toggle**: Mark entries as billable or non-billable for accurate reporting
- **Date-based Filtering**: Filter entries by date or date range

### Projects
- **Create Projects**: Set up new projects with custom configurations
- **Hourly Rates**: Define billing rates for each project
- **Color Coding**: Assign colors to projects for visual organization
- **Project Management**: Edit or delete projects as needed

### Reports & Analytics
- **Time Summary Cards**: Display total time, billable hours, and average daily tracking
- **Earnings Calculation**: Automatic calculation of earnings based on billable hours and project rates
- **Pie Chart**: Visualize time distribution across projects
- **Daily Trend Line Chart**: Track productivity trends over time
- **Date Range Selection**: Generate reports for custom date ranges (daily, weekly, monthly)
- **Export-Ready Data**: All metrics calculated and displayed in a professional format

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19.2** - UI library with latest hooks and features
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework

### State Management & Data
- **Zustand 5** - Lightweight state management with localStorage persistence
- **React Hook Form** - Efficient form management
- **Zod 4** - Runtime type validation

### UI Components & Charts
- **shadcn/ui** - High-quality React components

- **Recharts 3.3** - Composable charting library
- **Lucide React** - Beautiful icon library


## Getting Started

### Prerequisites
- Node.js 18+ or npm/yarn package manager
- Git (optional, for version control)

### Installation



2. **Install Dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the Development Server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

This creates an optimized production build and starts the server.

## Project Structure

\`\`\`
time-tracker/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page with feature overview
│   ├── timer/              # Timer page
│   ├── entries/            # Entries management page
│   ├── projects/           # Projects management page
│   ├── reports/            # Reports and analytics page
│   └── globals.css         # Global styles and design tokens
├── features/
│   ├── timer/              # Timer feature (store + components)
│   ├── entries/            # Entries feature (store + components)
│   ├── projects/           # Projects feature (store + components)
│   ├── reports/            # Reports feature (store + analytics)
│   └── shared/             # Shared types and navigation
├── components/
│   └── ui/                 # shadcn/ui components
├── lib/
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
\`\`\`


### State Management with Zustand

The app uses **Zustand stores** with localStorage persistence:

- **timerStore** - Manages active timer state and time tracking
- **entriesStore** - Stores all time entries and provides filtering
- **projectStore** - Manages project configurations and settings
- **statsStore** - Calculates analytics and report data on-demand




**Note**: Data is local to your browser. Clearing browser storage will delete all data.






