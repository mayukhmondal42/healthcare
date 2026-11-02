"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Mail, Github, Linkedin } from "lucide-react";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Footer() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  const checkLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/profile/getuser`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data?.user || null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkLogin();
    }, 300);
    return () => clearTimeout(timer);
  }, [pathname]);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements[0] as HTMLInputElement).value;
    if (!email) return;
    Swal.fire("Subscribed!", "Thanks for subscribing to HealthAI updates.", "success");
    form.reset();
  };

  return (
    <footer className="liquid-nav mt-16 text-gray-700">
      <div className="max-w-7xl mx-auto px-5 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 animate-fade-in">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer w-fit">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-primary/40 blur-lg rounded-full transition-all duration-300 group-hover:bg-primary/70 group-hover:scale-125 group-hover:blur-xl"></div>
              <div className="relative w-8 h-8 bg-primary rounded-[10px] flex items-center justify-center shadow-[0_6px_14px_rgba(37,99,235,0.45)] border border-white/40 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_25px_rgba(37,99,235,0.6)] group-hover:rounded-[14px]">
                <Heart className="w-4 h-4 text-white fill-white transition-all duration-300 group-hover:scale-125 group-hover:animate-bounce" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center shadow transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg]">
                  <span className="text-primary text-[7px] font-black leading-none">+</span>
                </div>
              </div>
            </div>
            <span className="text-[20px] font-black tracking-tighter text-gray-900 leading-none transition-all duration-300 group-hover:text-primary">
              Health<span className="text-primary group-hover:text-gray-900 transition-colors duration-300">AI</span>
            </span>
          </Link>
          <p className="text-sm text-gray-500 leading-relaxed">
            Your personal AI health assistant — upload reports, track vitals, and
            get AI insights powered by Gemini.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-900">Quick Links</h3>
          <ul className="space-y-2">
            {user ? (
              <>
                <li>
                  <Link href="/dashboard" className="text-gray-500 hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/vitals" className="text-gray-500 hover:text-primary transition-colors">
                    Vitals
                  </Link>
                </li>
                <li>
                  <Link href="/reports" className="text-gray-500 hover:text-primary transition-colors">
                    Reports
                  </Link>
                </li>
                <li>
                  <Link href="/insights" className="text-gray-500 hover:text-primary transition-colors">
                    AI Insights
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/#login" className="text-gray-500 hover:text-primary transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/#register" className="text-gray-500 hover:text-primary transition-colors">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-900">Contact</h3>
          <a href="mailto:mayukhmondal42@gmail.com" className="text-gray-500 hover:text-primary flex items-center gap-2 mb-2 transition-colors">
            <Mail className="w-4 h-4" /> mayukhmondal42@gmail.com
          </a>
          <div className="flex gap-3 mt-3">
            <a href="https://github.com/mayukhmondal42" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-2xl bg-white/60 backdrop-blur-md border border-white/50 flex items-center justify-center hover:bg-white hover:scale-110 transition shadow-sm">
              <Github className="w-5 h-5 text-gray-800" />
            </a>
            <a href="https://www.linkedin.com/in/mayukh-mondal42" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-2xl bg-white/60 backdrop-blur-md border border-white/50 flex items-center justify-center hover:bg-white hover:scale-110 transition shadow-sm">
              <Linkedin className="w-5 h-5 text-blue-600" />
            </a>
            <a href="mailto:mayukhmondal42@gmail.com" className="w-10 h-10 rounded-2xl bg-white/60 backdrop-blur-md border border-white/50 flex items-center justify-center hover:bg-white hover:scale-110 transition shadow-sm">
              <Mail className="w-5 h-5 text-red-500" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-900">
            Stay Updated
          </h3>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <input
              type="email"
              required
              placeholder="Your email"
              className="px-3 py-2.5 rounded-2xl border border-white/50 bg-white/60 backdrop-blur-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="liquid-button px-3 py-2.5"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/50 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HealthAI. Made with ❤️ by <a href="https://www.linkedin.com/in/mayukh-mondal42" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">Mayukh Mondal</a> • All rights reserved.
      </div>
    </footer>
  );
}