import React, { useState } from 'react';
import {
    Bot,
    ArrowRight,
    Mail,
    Lock,
    Sparkles,
    ShieldCheck,
    Zap,
    Globe
} from 'lucide-react';
import { useAuth } from '../hook/useAuth';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import PageLoader from '../../../components/Loader/PageLoader';

export default function Login() {
    const { handleLogin } = useAuth()
    const { isUserLoading } = useSelector((s) => s.auth);
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin(identifier, password)
    };

    if (isUserLoading) return <PageLoader />

    return (
        <div className="min-h-screen bg-[#030303] text-gray-100 flex font-sans antialiased selection:bg-zinc-800 selection:text-white">

            {/* Left Column: Ambient/Branding Section (Hidden on mobile) */}
            <div className="relative hidden w-1/2 overflow-hidden border-r border-zinc-800/80 bg-gradient-to-b from-zinc-900 to-black lg:flex lg:flex-col lg:justify-between p-12">
                {/* Subtle grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

                {/* Glowing Ambient Orb */}
                <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[150px]" />
                <div className="absolute -bottom-40 right-0 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[120px]" />

                {/* Top Branding */}
                <div className="relative z-10 flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 shadow-xl shadow-black/50">
                        <Bot className="h-5 w-5 text-zinc-200" />
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-white">Fairy AI</span>
                    <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-[10px] font-medium tracking-wider text-zinc-400 uppercase border border-zinc-700/50">MOON RISE</span>
                </div>

                {/* Core Marketing / Tech Visual */}
                <div className="relative z-10 my-auto max-w-lg space-y-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur-sm">
                            <Sparkles className="h-3 w-3 text-yellow-500/80" />
                            <span>Next-Gen Agentic Intelligence Now Live</span>
                        </div>
                        <h1 className="text-4xl font-medium tracking-tight text-white leading-[1.15] sm:text-5xl">
                            Deploy autonomous workflows in seconds.
                        </h1>
                        <p className="text-base text-zinc-400 font-normal leading-relaxed">
                            Experience an AI assistant designed with full tools access, self-correcting logic, and enterprise-grade isolation layers.
                        </p>
                    </div>

                    {/* Micro Features Grid */}
                    <div className="grid grid-cols-2 gap-4 border-t border-zinc-800/60 pt-8">
                        <div className="flex items-start gap-3">
                            <Zap className="mt-1 h-4 w-4 text-zinc-400" />
                            <div>
                                <h4 className="text-sm font-medium text-zinc-200">Sub-100ms Latency</h4>
                                <p className="text-xs text-zinc-500 mt-0.5">Optimized routing protocols.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <ShieldCheck className="mt-1 h-4 w-4 text-zinc-400" />
                            <div>
                                <h4 className="text-sm font-medium text-zinc-200">SOC2 Type II Certified</h4>
                                <p className="text-xs text-zinc-500 mt-0.5">Zero-retention data privacy.</p>
                            </div>
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
                        <span>Don't have an account?</span>
                        <button className="font-medium text-white hover:underline underline-offset-4">Contact Sales</button>
                    </div>
                </div>

                {/* Main Card Wrapper */}
                <div className="mx-auto my-auto w-full max-w-md space-y-7">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
                            Welcome back
                        </h2>
                        <p className="text-sm text-zinc-400">
                            Sign in to manage your agents and production environment.
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
                            Or continue with
                        </span>
                    </div>

                    {/* Interactive Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label htmlFor="identifier" className="text-xs font-medium text-zinc-400">
                                Work identifier
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                                <input
                                    id="identifier"
                                    type="identifier"
                                    required
                                    placeholder="name@company.com"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/30 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 transition-all duration-200 focus:border-zinc-600 focus:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-xs font-medium text-zinc-400">
                                    Password
                                </label>
                                <a href="#" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" />
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-lg border border-zinc-800 bg-zinc-900/30 py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-600 transition-all duration-200 focus:border-zinc-600 focus:bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-600"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="group flex w-full items-center justify-center gap-1.5 rounded-lg bg-zinc-100 px-4 py-2.5 text-sm font-medium text-black hover:bg-white transition-all duration-200 active:scale-[0.99] mt-6"
                        >
                            <span>Continue to Workspace</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </form>

                    <div className='flex gap-2 text-xs justify-center items-center  text-zinc-600'>
                        <p>Do not have any Account ?</p>
                        <Link to='/signup' className='text-amber-400 underline'>
                            Click Me
                        </Link>
                    </div>

                    {/* SSO Notice */}
                    <p className="text-center text-xs text-zinc-600">
                        Single Sign-On (SSO) configurations apply automatically.
                    </p>
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