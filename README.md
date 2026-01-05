# Course Admin Dashboard

A modern admin dashboard for managing courses built with React, TypeScript, and Vite.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **TanStack Query (React Query)** - Server state management
- **Axios** - HTTP client
- **Lucide React** - Icon library
- **React Router** - Client-side routing (ready to add)

## Features

- View all courses in a table
- Create new courses with a modal form
- Edit existing courses
- Delete courses with confirmation
- View course details
- Real-time data updates with React Query
- Responsive design with TailwindCSS
- Type-safe API calls
- Loading states and error handling

## Prerequisites

- Node.js 20.x or higher
- Backend API running (default: http://localhost:3000)

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your backend API URL:
   ```
   VITE_API_URL=http://localhost:3000
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Label.tsx
│   │   ├── Select.tsx
│   │   └── Dialog.tsx
│   ├── CourseForm.tsx   # Course create/edit form
│   ├── CourseTable.tsx  # Course list table
│   └── CourseDetails.tsx # Course detail view
├── pages/
│   └── CourseDashboard.tsx # Main dashboard page
├── hooks/
│   └── useCourses.ts    # React Query hooks for courses
├── lib/
│   ├── api/             # Modular API clients
│   │   ├── client.ts    # Axios instance with interceptors
│   │   ├── course.api.ts   # Course endpoints
│   │   ├── module.api.ts   # Module endpoints
│   │   ├── user.api.ts     # User endpoints
│   │   ├── auth.api.ts     # Auth endpoints
│   │   └── index.ts        # API exports
│   └── query-client.ts  # React Query configuration
├── types/
│   ├── course.ts        # Course interfaces
│   ├── module.ts        # Module interfaces
│   ├── user.ts          # User interfaces
│   └── auth.ts          # Auth interfaces
├── App.tsx
├── main.tsx
└── index.css
```

## API Endpoints

The dashboard connects to the following backend endpoints:

- `GET /course` - Get all courses
- `GET /course/:id` - Get course by ID
- `POST /course` - Create new course
- `PUT /course/:id` - Update course
- `DELETE /course/:id` - Delete course

## Course Data Model

```typescript
interface Course {
  _id: string;
  name: string;
  description?: string;
  instructor_id: string;
  category: string;
  level: string; // Beginner, Intermediate, Advanced
  thumbnail?: string;
  is_published: boolean;
  modules: string[];
  createdAt?: string;
  updatedAt?: string;
}
```

## Development

- The app uses React Query for automatic caching and refetching
- All forms include validation
- Error states are handled gracefully
- Loading states provide user feedback

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Notes

- Make sure the backend server is running before starting the frontend
- The default API URL is `http://localhost:3000`
- All API calls are type-safe with TypeScript

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
