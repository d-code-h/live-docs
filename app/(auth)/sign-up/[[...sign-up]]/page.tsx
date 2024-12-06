// Import the SignUp component from Clerk for user registration
import { SignUp } from '@clerk/nextjs';

// The SignUpPage component renders the SignUp form from Clerk
const SignUpPage = () => (
  // Main wrapper for the sign-up page
  <main className="auth-page">
    {/* The SignUp component provided by Clerk for user registration */}
    <SignUp />
  </main>
);

export default SignUpPage;
