# MERN Blog - Frontend

A modern React blog platform built with Vite, featuring multilingual support (English/Urdu), dark/light theme, authentication, analytics, and a responsive design.

## Tech Stack

- **React 19** - UI library
- **Vite 8** - Build tool and dev server
- **React Router DOM 7** - Routing
- **i18next / react-i18next** - Internationalization (English & Urdu)
- **Axios** - HTTP client for API communication
- **Lucide React** - Icon library
- **date-fns** - Date formatting
- **react-datepicker** - Date picking component
- **recharts** - Charts for skill matching
- **react-ga4** - Google Analytics 4 integration
- **Context API** - State management (Auth, Theme, Language, Analytics, Toast)

## Features

- **Multilingual**: Full English and Urdu (اردو) language support with toggle
- **Dark/Light Mode**: Theme toggle with persistent preferences
- **Authentication**: User registration, login, and protected routes
- **Content Types**: Articles, Posts, Stories, and Consultancy pages
- **Skill Matching**: Interactive skill assessment with chart-based results
- **Analytics**: Page view and event tracking via Google Analytics 4
- **Responsive**: Mobile-first responsive design across all pages
- **SEO Friendly**: Structured routing and page transitions
- **Error Boundaries**: Graceful error handling with fallback UI
- **Toast Notifications**: User feedback via toast messages
- **Protected Routes**: Route-level access control for authenticated users

## Pages & Routes

| Route                     | Component              | Description                          |
| ------------------------- | ---------------------- | ------------------------------------ |
| `/`                       | Home                   | Landing page with featured content   |
| `/about`                  | About                  | About the platform                   |
| `/articles`               | Articles               | Browse all articles                  |
| `/articles/:id`           | ArticleDetail          | View a single article                |
| `/posts`                  | Posts                  | Browse all posts                     |
| `/posts/:id`              | PostDetail             | View a single post                   |
| `/stories`                | Stories                | Browse success stories               |
| `/stories/:id`            | StoryDetail            | View a single story                  |
| `/skills`                 | Skills                 | Skill assessment form                |
| `/skills/matches`         | MatchResults           | Skill match results with charts      |
| `/consultancy`            | Consultancy            | Consultancy services page            |
| `/contact`                | Contact                | Contact form and info                |
| `/register`               | Register               | User registration                    |

## Project Structure

```
src/
├── components/
│   ├── Common/           # Reusable UI components
│   │   ├── Breadcrumbs.jsx
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── Loader.jsx
│   │   └── ProtectedRoute.jsx
│   ├── Layout/           # Layout components
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── LanguageToggle.jsx
│   └── ThemeToggle.jsx
├── context/              # React Context providers
│   ├── AnalyticsContext.jsx
│   ├── AuthContext.jsx
│   ├── LanguageContext.jsx
│   ├── ThemeContext.jsx
│   └── ToastContext.jsx
├── i18n/                 # Internationalization
│   ├── index.js
│   └── locales/
│       ├── en.json
│       └── ur.json
├── pages/                # Page components
│   ├── Articles/
│   ├── Auth/
│   ├── Posts/
│   ├── Skills/
│   ├── Stories/
│   ├── About.jsx
│   ├── Consultancy.jsx
│   ├── Contact.jsx
│   ├── Home.jsx
│   ├── SkillMatch.jsx
│   └── SubmitStory.jsx
├── services/
│   └── api.js            # Axios API client
├── styles/
│   ├── components.css
│   ├── themes.css
│   └── variables.css
└── utils/
    ├── analytics.js      # Google Analytics utilities
    └── contentValidator.js
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
git clone https://github.com/dev-mzainulabideen/mern-blog-frontend.git
cd mern-blog-frontend
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build

```bash
npm run build
```

The build output is in `dist/`.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Internationalization

The app supports English and Urdu out of the box. Translation files are in `src/i18n/locales/`. To add a new language:

1. Create a new JSON file in `src/i18n/locales/` (e.g., `fr.json`)
2. Register it in `src/i18n/index.js`

## Styling

- **CSS Variables** are used for consistent theming across the app
- **Theme system** (light/dark) is managed via CSS custom properties
- All styles are co-located with their components or in the `styles/` directory
- Responsive design uses CSS Grid and Flexbox

## API Integration

All API calls go through `src/services/api.js` (Axios instance). The frontend expects a matching backend API — see the [MERN Blog Backend](https://github.com/dev-mzainulabideen/mern-blog-backend) repository.

## License

This project is licensed under the MIT License.
