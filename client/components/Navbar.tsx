"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  LogOut,
  Heart,
  FileText,
  Activity,
  TrendingUp,
  UserPlus,
  LogIn,
} from "lucide-react";
import { Button } from "./ui/button";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
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
    checkLogin();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      Swal.fire("Success", "Logged out successfully", "success");
      setUser(null);
      setOpen(false);
      router.replace("/");
    } catch (err) {
      console.error("Logout failed:", err);
      Swal.fire("Error", "Logout failed", "error");
    }
  };

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: <Activity className="w-4 h-4" /> },
    { name: "Vitals", href: "/vitals", icon: <TrendingUp className="w-4 h-4" /> },
    { name: "AI Insights", href: "/insights", icon: <Heart className="w-4 h-4" /> },
    { name: "Reports", href: "/reports", icon: <FileText className="w-4 h-4" /> },
  ];

  const renderLinks = () =>
    links.map((link) => {
      const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
      return (
        <Link
          key={link.href}
          href={link.href}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl transition-all duration-300 ${isActive
              ? "bg-primary text-white font-semibold shadow-lg shadow-primary/30 scale-[1.02]"
              : "text-gray-700 hover:bg-white/60 hover:backdrop-blur-md hover:shadow-sm"
            }`}
          onClick={() => setOpen(false)}
        >
          {link.icon} {link.name}
        </Link>
      );
    });

  return (
    <nav className="liquid-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-2.5 flex justify-between items-center">
        
        
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
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
        

        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <>
              {renderLinks()}
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 ml-2 rounded-2xl bg-white/60 backdrop-blur-md border-white/50 hover:bg-white/80"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="outline" size="sm" className="rounded-2xl bg-white/60 backdrop-blur-md border-white/50">
                <Link href="/#login" className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" /> Login
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/#register" className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" /> Register
                </Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/50 hover:bg-white/80 transition"
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="flex flex-col p-4 space-y-2 bg-white/40 backdrop-blur-xl mx-3 mb-3 rounded-3xl border border-white/50">
          {user ? (
            <>
              {renderLinks()}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-2xl bg-white/60"
              >
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="outline" size="sm" className="w-full rounded-2xl bg-white/60">
                <Link href="/#login" onClick={() => setOpen(false)} className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" /> Login
                </Link>
              </Button>
              <Button asChild size="sm" className="w-full">
                <Link href="/#register" onClick={() => setOpen(false)} className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" /> Register
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}