# All The Best - Quiz Game

This is a fun, interactive quiz game application.

## Project Overview

The application allows users to:
-   Enter a nickname.
-   Join or create game sessions.
-   Select teams.
-   Participate in a quiz.
-   Reveal prizes through a "Scratch Card" feature after the game (for the host).

## Technologies Used

This project is built with:
-   **Vite:** For fast frontend tooling and development server.
-   **React:** For building the user interface.
-   **TypeScript:** For static typing and improved code quality.
-   **Tailwind CSS:** For utility-first styling.
-   **shadcn/ui:** For pre-built UI components.
-   **Firebase:** (Assumed for backend/database, based on `firebase.ts` - please confirm if this is actively used for the quiz functionality).
-   **React Router:** For client-side routing.

## Getting Started Locally

To run this project on your local machine, follow these steps:

1.  **Clone the repository (if you haven't already):**
    ```sh
    git clone https://github.com/Waaajid/allthebest.git
    cd allthebest
    ```

2.  **Install dependencies:**
    This project uses `npm` as its package manager.
    ```sh
    npm install
    ```

3.  **Start the development server:**
    This command will start the Vite development server, usually on `http://localhost:5173`.
    ```sh
    npm run dev
    ```
    The application should open automatically in your default web browser.

## Key Features Implemented

-   **Nickname Entry:** Users start by providing a nickname.
-   **Team Selection:** Users can join existing teams or, if hosting, manage game sessions.
-   **Quiz Gameplay:** Core quiz logic (details to be added as developed).
-   **Scratch Card Page:** A "Half-Day Friday" themed scratch card game to reveal prizes. This page replaces the old "Dice Roll" functionality.
    -   Accessible via a "Reveal Prizes" button on the `TeamSelection` page (visible only to the session host).
    -   Features a 3-card reveal with winning/losing messages.
    -   Card distribution logic changes over a 3-attempt cycle.

## Deployment

### Local Development
The application runs locally using `npm run dev`.

### GitHub
The codebase is hosted on GitHub: [https://github.com/Waaajid/allthebest.git](https://github.com/Waaajid/allthebest.git)

### Vercel (Deployment In Progress)
Attempts to deploy to Vercel have been made. However, there is currently an issue where the `npm install` command fails during Vercel's build process. The cause is under investigation by checking the Vercel deployment logs.

**Latest Vercel Deployment Logs (for troubleshooting):**
`https://vercel.com/q-f132f39d/quiz-red-ready/9d54veEdChuD9zyZhdmT69kHuqaQ/logs`

## Project Structure Highlights

-   `src/pages/`: Contains the main page components like `Index.tsx`, `TeamSelection.tsx`, `Quiz.tsx`, and `ScratchCardPage.tsx`.
-   `src/components/`: Contains reusable UI components, including `ScratchCard.tsx` and UI elements from `shadcn/ui`.
-   `src/context/QuizContext.tsx`: Manages the global state for the quiz application.
-   `src/App.tsx`: Defines the main application routes.
-   `public/`: Contains static assets.

## Next Steps & Known Issues
-   Resolve the Vercel deployment failure related to `npm install`.
-   (Add any other known issues or planned features here)

---
This README was last updated on May 25, 2025.
