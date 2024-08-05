# Sticky Notes App

## Table of Contents
1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Project Structure](#project-structure)
5. [Setup and Installation](#setup-and-installation)
6. [Running the Application](#running-the-application)
7. [API Endpoints](#api-endpoints)
8. [Component Overview](#component-overview)
9. [Styling](#styling)
10. [Database](#database)
11. [Deployment](#deployment)
12. [Contributing](#contributing)
13. [License](#license)

## Introduction

The Sticky Notes App is a web-based application that allows users to create, organize, and manage digital sticky notes. It provides a user-friendly interface for adding, editing, and deleting notes across different categories or headers. This application is built using modern web technologies and follows best practices for scalable and maintainable code.

## Features

- Create and manage multiple note categories (headers)
- Add, edit, and delete sticky notes within each category
- Customizable note colors
- Responsive design for various screen sizes
- Real-time updates using a backend API
- Smooth and intuitive user interface

## Technologies Used

- Frontend:
  - Next.js 14
  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide React (for icons)
  - shadcn/ui components
- Backend:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose ORM)
- Development Tools:
  - ESLint
  - Prettier
  - PostCSS
- Deployment:
  - Vercel (for frontend)
  - Custom server deployment (for backend)

## Project Structure

```
my-sticky-notes/
│
├── public/
│   └── (static files)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── StickyNoteBoard.tsx
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       └── textarea.tsx
│   │
│   └── lib/
│       └── utils.ts
│
├── server.js
├── tailwind.config.js
├── postcss.config.js
├── next.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/fired/Sticky-Note.git
   cd Sticky-Note
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
   - Ensure MongoDB is installed and running on your system
   - Create a new database named `stickynotesdb`

## Running the Application

1. Start the backend server:
   ```
   node server.js
   ```

2. In a separate terminal, start the Next.js development server:
   ```
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:7980` to view the application.

## API Endpoints

- `GET /api/notes`: Retrieve all notes
- `POST /api/notes`: Create a new note
- `PUT /api/notes/:id`: Update an existing note
- `DELETE /api/notes/:id`: Delete a note

## Component Overview

### StickyNoteBoard

The main component that renders the entire sticky note board. It manages the state of headers and notes, and provides functionality for adding, editing, and deleting notes and headers.

### UI Components

- `Button`: Reusable button component with various styles
- `Input`: Customizable input field component
- `Textarea`: Textarea component for multiline input

## Styling

The project uses Tailwind CSS for styling. Custom styles can be added in the `src/app/globals.css` file. The `tailwind.config.js` file contains the configuration for Tailwind, including custom theme extensions.

## Database

The application uses MongoDB to store note data. The `NoteSchema` defines the structure of note documents:

```javascript
const NoteSchema = new mongoose.Schema({
  header: String,
  text: String,
  color: String
});
```

## Deployment

- Frontend: The Next.js application can be deployed on Vercel or any other platform that supports Next.js applications.
- Backend: The Express server can be deployed on platforms like Heroku, DigitalOcean, or AWS.

Ensure that you set the appropriate environment variables on your deployment platform.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).