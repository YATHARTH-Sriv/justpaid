'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signIn('freshbooks', { redirect: false, callbackUrl: '/dashboard' });
      if (result?.error) {
        console.error('Login failed:', result.error);
        // Handle error, e.g., show error message to user
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h2 className="text-3xl">Sign in to FreshBooks</h2>
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          {isLoading ? 'Signing in...' : 'Sign in with FreshBooks'}
        </button>
      </div>
    </div>
  );
}
