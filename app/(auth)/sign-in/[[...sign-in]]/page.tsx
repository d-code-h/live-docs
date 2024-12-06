// Import the SignIn component from Clerk for authentication
import { SignIn } from '@clerk/nextjs';

// The SignInPage component renders the SignIn form from Clerk
const SignInPage = () => (
  // Main wrapper for the sign-in page
  <main className="auth-page">
    {/* The SignIn component provided by Clerk */}
    <SignIn />
  </main>
);

export default SignInPage;
