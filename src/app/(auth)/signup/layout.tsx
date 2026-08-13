import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Your Account & Start Earning',
  description: 'Sign up for Earnova, select your membership plan (Basic, Advanced, or Ultra), and unlock daily verified earning opportunities.',
  alternates: {
    canonical: '/signup',
  },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
