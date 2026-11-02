"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, FileText, TrendingUp } from "lucide-react";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) return setError("Email is required.");
    if (!password.trim() || password.length < 8) return setError("Password must be at least 8 characters.");
    if (!isLogin && (!firstname.trim() || firstname.length < 3)) return setError("First name must be at least 3 characters.");
    if (!isLogin && (!lastname.trim() || lastname.length < 3)) return setError("Last name must be at least 3 characters.");

    setLoading(true);
    try {
      const endpoint = isLogin ? `${API_URL}/auth/login` : `${API_URL}/auth/signup`;
      const body = isLogin 
        ? { email, password } 
        : { firstname, lastname, email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Authentication failed.");

      if (isLogin) {
        if (!data.token) throw new Error("Token not received from server");
        localStorage.setItem("token", data.token.replace(/"/g, "")); 
        localStorage.setItem("user", JSON.stringify(data.user));

        Swal.fire({ icon: "success", title: "Welcome!", text: "Login successful.", timer: 1200, showConfirmButton: false });
        router.push("/dashboard");
      } else {
        Swal.fire({ icon: "success", title: "Signup successful!", text: "Please login now." });
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        
        <div className="hidden md:block space-y-8">
          <div>
            
            <div className="flex items-center gap-3 mb-4 group cursor-pointer w-fit">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-primary/40 blur-lg rounded-full transition-all duration-300 group-hover:bg-primary/70 group-hover:scale-125 group-hover:blur-xl"></div>
                <div className="relative w-12 h-12 bg-primary rounded-[14px] flex items-center justify-center shadow-[0_6px_14px_rgba(37,99,235,0.45)] border border-white/40 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_25px_rgba(37,99,235,0.6)] group-hover:rounded-[18px]">
                  <Heart className="w-6 h-6 text-white fill-white transition-all duration-300 group-hover:scale-125 group-hover:animate-bounce" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow transition-all duration-500 group-hover:scale-125 group-hover:rotate-[360deg]">
                    <span className="text-primary text-[9px] font-black leading-none">+</span>
                  </div>
                </div>
              </div>
              <h1 className="text-4xl font-black tracking-tighter text-gray-900 transition-all duration-300 group-hover:text-primary">
                Health<span className="text-primary group-hover:text-gray-900 transition-colors duration-300">AI</span>
              </h1>
            </div>
            
            <p className="text-lg text-muted-foreground">Your Intelligent Wellness Partner</p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 group">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <FileText className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Upload Reports</h3>
                <p className="text-sm text-muted-foreground">Securely store and manage your lab results in one encrypted dashboard.</p>
              </div>
            </div>
            <div className="flex gap-4 group">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <Heart className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">AI-Powered Analysis</h3>
                <p className="text-sm text-muted-foreground">Receive actionable, AI-driven summaries of complex medical data.</p>
              </div>
            </div>
            <div className="flex gap-4 group">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <TrendingUp className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Track Your Health</h3>
                <p className="text-sm text-muted-foreground">Keep a visual timeline of your health metrics and recovery progress.</p>
              </div>
            </div>
          </div>
        </div>

        
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">{isLogin ? "Welcome Back" : "Create Account"}</CardTitle>
            <CardDescription>
              {isLogin ? "Sign in to your health vault" : "Start managing your health today"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="firstname">First Name</Label>
                    <Input id="firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input id="lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} placeholder="Enter your last name" />
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
              </div>

              {error && <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-2xl">{error}</p>}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Processing..." : isLogin ? "Log In" : "Sign Up"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-border text-center">
              <p className="text-sm text-muted-foreground mb-4">{isLogin ? "Don’t have an account?" : "Already have an account?"}</p>
              <Button variant="outline" onClick={() => { setIsLogin(!isLogin); setError(""); }} className="w-full">
                {isLogin ? "Sign Up" : "Log In"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}