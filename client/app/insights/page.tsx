"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, FileText, Languages, Brain } from "lucide-react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Insight {
  _id: string;
  reportTitle: string;
  summary: string;
  explanation_en: string;
  explanation_ro: string;
}

export default function Insights() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/report/insights`, { 
          credentials: "include",
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch insights");
        const data = await res.json();
        setInsights(data.insights || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  if (loading) return <p className="text-center py-16 text-muted-foreground animate-pulse">Loading insights...</p>;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-5 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center shadow-[0_6px_14px_rgba(37,99,235,0.4)]">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight">AI Insights</h2>
          <p className="text-sm text-muted-foreground">AI-powered explanation of your reports</p>
        </div>
      </div>

      {insights.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center space-y-3">
            <Brain className="w-10 h-10 text-primary/40 mx-auto" />
            <p className="text-muted-foreground">No insights available yet. Upload reports first.</p>
            <Link href="/dashboard"><Button>Go to Dashboard</Button></Link>
          </CardContent>
        </Card>
      ) : (
        insights.map((ins) => (
          <Card key={ins._id}>
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <CardTitle className="text-lg leading-tight">{ins.reportTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1.5 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Summary</p>
                <p className="text-sm leading-relaxed">{ins.summary}</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Explanation (English)</p>
                <p className="text-sm leading-relaxed">{ins.explanation_en}</p>
              </div>
              <div className="space-y-1.5 border-t border-white/40 pt-3">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"><Languages className="w-3.5 h-3.5" /> Roman Urdu</p>
                <p className="text-sm leading-relaxed">{ins.explanation_ro}</p>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </main>
  );
}