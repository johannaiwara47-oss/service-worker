# ServiceWorker

A location-based service marketplace connecting service providers with customers within a 50 km radius in Nigeria.

## Features

- **Location-Based Search**: Find service providers within 50km using LocationIQ geocoding
- **Provider Profiles**: Individual and business providers with work images and ratings
- **Direct Contact**: WhatsApp and phone integration for instant communication
- **Rating System**: 5-star ratings with comments
- **Report System**: Users can report providers, admins can moderate
- **Admin Dashboard**: Block/unblock providers, manage reports, send notifications
- **Auto-Deletion**: Blocked providers are automatically deleted after 24 hours
- **Responsive Design**: Mobile-first responsive UI with Tailwind CSS
- **Animations**: Smooth transitions with Framer Motion

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (email/password)
- **Storage**: Supabase Storage
- **Geocoding**: LocationIQ
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- LocationIQ API key
- Vercel account (for deployment)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd serviceworker
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
   - Copy \`.env.local.template\` to \`.env.local\`
   - Fill in your Supabase credentials
   - Add your LocationIQ API key
   - Set admin credentials

4. Database setup is already complete via migrations applied to Supabase.

5. Create storage bucket in Supabase:
   - Go to Storage in Supabase dashboard
   - Create a public bucket named \`provider-images\`

6. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a \`.env.local\` file with the following variables:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# LocationIQ API
NEXT_PUBLIC_LOCATIONIQ_API_KEY=your_locationiq_api_key

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Admin Credentials
ADMIN_SECRET_USERNAME=your_admin_username
ADMIN_SECRET_PASSWORD=your_admin_password
\`\`\`

### Getting Your Keys

**Supabase:**
1. Create a project at [supabase.com](https://supabase.com)
2. Go to Project Settings > API
3. Copy the Project URL and anon/public key
4. Copy the service_role key (keep this secret!)

**LocationIQ:**
1. Sign up at [locationiq.com](https://locationiq.com)
2. Get your API key from the dashboard

## Database Schema

The database includes the following tables:

- **users**: User profiles with role-based access (user, provider, admin)
- **categories**: Service categories (50 pre-seeded Nigerian services)
- **service_providers**: Provider profiles with location and contact info
- **ratings**: User ratings for providers (1-5 stars)
- **reports**: User reports against providers
- **notifications**: System notifications for users

All tables have Row Level Security (RLS) enabled with appropriate policies.

## Deployment to Vercel

### 1. Push to GitHub

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo>
git push -u origin main
\`\`\`

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   - Copy all variables from \`.env.local\`
   - Add them in the Vercel project settings
5. Click "Deploy"

### 3. Set Up Scheduled Job (Optional)

To automatically delete blocked providers after 24 hours:

1. In Vercel project settings, go to "Cron Jobs"
2. Create a new cron job:
   - Path: \`/api/cron/delete-blocked\`
   - Schedule: \`0 * * * *\` (hourly)

Or use Supabase Edge Function with pg_cron.

## Project Structure

\`\`\`
serviceworker/
├── app/
│   ├── api/                    # API routes
│   ├── login/                  # Login page
│   ├── signup/                 # Signup page
│   ├── provider-setup/         # Multi-step provider setup
│   ├── dashboard/              # User and provider dashboards
│   ├── search/                 # Search page
│   ├── provider/[id]/          # Provider detail page
│   ├── admin-login/            # Admin login
│   └── admin-dashboard/        # Admin dashboard
├── components/                 # Reusable components
├── lib/                        # Utility functions and Supabase clients
├── types/                      # TypeScript type definitions
└── supabase/                   # Supabase edge functions
\`\`\`

## Key Features Implementation

### Location-Based Search
- Uses LocationIQ for geocoding and autocomplete
- Server-side Haversine formula for distance calculation
- Returns providers within 50km sorted by distance

### Provider Setup Wizard
- Multi-step form with Framer Motion animations
- Image upload to Supabase Storage
- Location selection via GPS or LocationIQ autocomplete

### Rating System
- One rating per user per provider
- Auto-recalculates average rating via database trigger
- Displays star ratings with comments

### Admin Moderation
- View all providers and reports
- Block/unblock providers
- Blocked providers deleted after 24 hours
- Send notifications to users

### Contact Integration
- WhatsApp: Opens WhatsApp with pre-filled message
- Phone: Direct tel: link for calling

## Security

- Row Level Security (RLS) on all tables
- Authentication required for all operations
- Admin operations verified server-side
- Service role key never exposed to client
- Proper input validation and sanitization

## API Routes

- \`GET /api/search\` - Search providers by location and category
- \`GET /api/provider/[id]\` - Get provider details
- \`POST /api/provider/create\` - Create provider profile
- \`POST /api/rating\` - Submit rating
- \`POST /api/report\` - Submit report
- \`POST /api/admin/*\` - Admin operations (protected)

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
