import React, { useState } from 'react';
import {
  Bot,
  ArrowRight,
  Mail,
  Lock,
  User,
  Sparkles,
  CheckCircle2,
  Building,
  Terminal
} from 'lucide-react';
import { useAuth } from '../hook/useAuth';
import { useSelector } from 'react-redux';
import PageLoader from '../../../components/Loader/PageLoader';

export default function SignupPage() {
  const { handleRegister } = useAuth()
  const { isUserLoading } = useSelector((s) => s.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await handleRegister(email , name, password)
  };
  if(isUserLoading) return <PageLoader />

  return (
    <div className="min-h-screen bg-[#030303] text-gray-100 flex font-sans antialiased selection:bg-zinc-800 selection:text-white">

      {/* Left Column: Ambient/Branding Section (Hidden on mobile) */}
      <div className="relative hidden w-1/2 overflow-hidden border-r border-zinc-800/80 bg-gradient-to-b from-zinc-900 to-black lg:flex lg:flex-col lg:justify-between p-12">
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

        {/* Glowing Ambient Orb */}
        <div className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[150px]" />
        <div className="absolute -top-40 right-0 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />

        {/* Top Branding */}
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 shadow-xl shadow-black/50">
            <Bot className="h-5 w-5 text-zinc-200" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">Juhi</span>
          <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] font-medium tracking-wider text-zinc-400 uppercase border border-zinc-700/50">MOON RISE</span>
        </div>

        {/* Testimonial / Social Proof Tech Visual */}
        <div className="relative z-10 my-auto max-w-lg space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur-sm">
              <Terminal className="h-3 w-3 text-purple-400" />
              <span>Developer API Access Included</span>
            </div>
            <h1 className="text-4xl font-medium tracking-tight text-white leading-[1.15] sm:text-5xl">
              Build the future of autonomous systems.
            </h1>
            <p className="text-base text-zinc-400 font-normal leading-relaxed">
              Get immediate access to state-of-the-art agent frameworks, cognitive architectures, and sandbox environments optimized for production orchestration.
            </p>
          </div>

          {/* Quick Checklist */}
          <div className="space-y-3 border-t border-zinc-800/60 pt-8">
            <div className="flex items-center gap-3 text-sm text-zinc-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              <span>Free tier includes 100,000 agentic execution steps/mo</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              <span>Full compliance protocols (HIPAA, GDPR, SOC2)</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-300">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              <span>Native integrations with Slack, GitHub, and Jira</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 flex items-center justify-between text-xs text-zinc-500">
          <span>© 2026 Juhi Labs Inc.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Right Column: Interaction Form */}
      <div className="flex w-full flex-col justify-between p-6 sm:p-12 lg:w-1/2 bg-black">

        {/* Header Navigation for Mobile */}
        <div className="flex items-center justify-between lg:justify-end">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900">
              <Bot className="h-4 w-4 text-zinc-200" />
            </div>
            <span className="text-sm font-semibold text-white">JuhiOS</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>Already have an account?</span>
            <button className="font-medium text-white hover:underline underline-offset-4">Sign In</button>
          </div>
        </div>

        {/* Main Card Wrapper */}
        <div className="mx-auto my-auto w-full max-w-md space-y-7">
          <div className="space-y-2">
            <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
              Create your account
            </h2>
            <p className="text-sm text-zinc-400">
              Start building and deploying autonomous agents today.
            </p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm font-medium text-zinc-200 hover:bg-zinc-800/80 hover:text-white transition-all duration-200 active:scale-[0.99]">
              <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="h-4 w-4" />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm font-medium text-zinc-200 hover:bg-zinc-800/80 hover:text-white transition-all duration-200 active:scale-[0.99]">
              <img src="https://authjs.dev/img/providers/github.svg" alt="GitHub" className="h-4 w-4 invert brightness-90" />
              <span>GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center py-2">
            <div className="w-full border-t border-zinc-800/80"></div>
            <span className="absolute bg-black px-3 text-xs font-medium uppercase tracking-wider text-zinc-600">
              Or sign up with email
            </span>
          </div>

          {/* Interactive Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-medium text-zinc-400">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Sarah Connor"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/30 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 transition-all duration-200 focus:border-zinc-600 focus:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-medium text-zinc-400">
                Work Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/30 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 transition-all duration-200 focus:border-zinc-600 focus:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-medium text-zinc-400">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-zinc-800 bg-zinc-900/30 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 transition-all duration-200 focus:border-zinc-600 focus:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                id="terms"
                type="checkbox"
                required
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mt-1 h-3.5 w-3.5 rounded border-zinc-800 bg-zinc-900 text-zinc-100 accent-zinc-100 focus:ring-0 focus:ring-offset-0"
              />
              <label htmlFor="terms" className="text-xs text-zinc-400 leading-normal">
                I agree to the{' '}
                <a href="#" className="text-zinc-200 hover:underline underline-offset-2">Terms of Service</a>{' '}
                and{' '}
                <a href="#" className="text-zinc-200 hover:underline underline-offset-2">Data Processing Addendum</a>.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-1.5 rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-medium text-black hover:bg-white transition-all duration-200 active:scale-[0.99] mt-6"
            >
              <span>Create Free Account</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>

        {/* Mobile Footer */}
        <div className="mt-8 flex items-center justify-center gap-4 text-center text-xs text-zinc-600 lg:hidden">
          <span>© 2026 Juhi Labs Inc.</span>
          <a href="#" className="hover:text-zinc-400">Privacy</a>
          <a href="#" className="hover:text-zinc-400">Terms</a>
        </div>
      </div>
    </div>
  );
}