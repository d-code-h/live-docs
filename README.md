# LiveDocs 📄💻

LiveDocs is a collaborative real-time document editor that enables seamless teamwork and editing experience for users. Built using **Next.js** and **Clerk** for authentication, **Liveblocks** for collaborative editing, and **Lexical** for rich text editing, this app empowers teams to work together on documents with real-time updates. 🚀

![Live docs](/public/assets/live-docs.png)

## Features ✨

- **Real-time Collaboration** 🕒: Multiple users can edit documents simultaneously.
- **User Authentication** 🔐: Integrated with **Clerk** for secure sign-in and sign-up.
- **Rich Text Editing** 📝: Powered by **Lexical**, users can create, edit, and format content easily.
- **Responsive Design** 📱💻: Optimized for all devices, ensuring a smooth experience across platforms.

## Getting Started 🚀

To get started with LiveDocs locally, follow these steps:

### Prerequisites 📋

- Ensure you have [Bun](https://bun.sh/) installed as your package manager.
- Node.js (v16 or above) and NPM installed.

### Installation 🛠️

1. Clone the repository:

   ```
   git clone https://github.com/d-code-h/live-docs.git
   cd live-docs
   ```

2. Install the dependencies using Bun:
   `bun install`

### Running Locally 🏃‍♂️

To start the development server:
`bun run dev`
This will run the application in development mode with Turbopack enabled for faster builds.

To run the app with Sentry in development mode, use:
`bun run dev::sentry`

### Building the Project 🏗️

To build the app for production:
`bun run build`

### Starting the Production Server 🚢

To start the app in production mode:
`bun run start`

### Linting Code 📏

To check your code for linting issues:
`bun run lint`

## Tech Stack ⚙️

- **Next.js:** React framework for building server-side rendered and static web applications.
- **Clerk:** Authentication and user management for secure login and signup flows.
- **Liveblocks:** Real-time collaboration for multiple users editing documents.
- **Lexical:** A flexible, extensible rich text editor framework.
- **Tailwind CSS:** Utility-first CSS framework for custom styling.
- **Shadcn/Radix UI:** Low-level UI components to build high-quality accessible design systems.
- **Sentry:** Error tracking and performance monitoring.

## Folder Structure 📂

```
├── components/           # React components (e.g., Buttons, Modals, etc.)
├── lib/                  # Utilities and business logic
├── app/                # Next.js page components
├── styles/               # TailwindCSS styles
├── public/               # Static assets like images, icons, etc.
└── .env                  # Environment variables
```

## Environment Variables 🌿

Make sure to add the necessary environment variables to .env for Clerk and Liveblocks:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
LIVEBLOCKS_SECRET_KEY=
SENTRY_AUTH_TOKEN=
```

## Contributing 🤝

We welcome contributions! Please fork the repository and submit a pull request with your changes. Ensure that your code follows the established coding conventions and passes the linting checks.

## License 📄

This project is licensed under the MIT License
