import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In to Your Dashboard',
  description: 'Log in to Earnova to access your active micro-task queue, freelance client jobs, and wallet payouts.',
  alternates: {
    canonical: '/login',
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
