"use client";
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, Languages, HelpCircle, Download, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Report {
  _id: string;
  title?: string;
  filename?: string;
  fileUrl?: string;
  date?: string;
  dateSeen?: string;
  summary?: string;
  explanation_en?: string;
  explanation_ro?: string;
  suggested_questions?: string[];
}

const ReportPage = () => {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const [report, setReport] = useState<Report | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!id) return;
      const token = localStorage.getItem("token");
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/report/${id}`, {
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch report");
        return res.json();
      })
      .then(data => setReport(data.report || data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="p-10 text-center text-muted-foreground animate-pulse">Loading report...</div>;
    if (!report) return <div className="p-10 text-center">Report not found</div>;

    const isPdf = report.fileUrl?.toLowerCase().includes(".pdf") || report.filename?.toLowerCase().endsWith(".pdf");

    return (
      <div className="p-4 md:p-6 max-w-3xl mx-auto space-y-5 animate-fade-in">
        <Link href="/dashboard"><Button variant="ghost" size="sm" className="rounded-xl"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button></Link>

        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center shadow-[0_6px_14px_rgba(37,99,235,0.4)] shrink-0">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-xl md:text-2xl leading-tight">{report.title || report.filename}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {report.dateSeen || report.date} • {report.filename}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {report.fileUrl && (
              isPdf ? (
                <a href={report.fileUrl} target="_blank" rel="noreferrer">
                  <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 text-center hover:bg-primary/10 transition-colors">
                    <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
                    <span className="text-primary font-semibold text-sm flex items-center justify-center gap-1.5"><Download className="w-4 h-4" /> View / Download PDF</span>
                  </div>
                </a>
              ) : (
                <img src={report.fileUrl} alt="report" className="w-full my-2 rounded-2xl border border-white/60 shadow-sm" />
              )
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Sparkles className="w-5 h-5 text-primary" /> Summary</CardTitle></CardHeader>
          <CardContent><p className="text-sm leading-relaxed">{report.summary || "No summary available"}</p></CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Explanation</CardTitle></CardHeader>
          <CardContent><p className="text-sm leading-relaxed">{report.explanation_en || "No explanation available"}</p></CardContent>
        </Card>

        {report.explanation_ro && (
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><Languages className="w-5 h-5 text-primary" /> Explanation (Roman Urdu)</CardTitle></CardHeader>
            <CardContent><p className="text-sm leading-relaxed">{report.explanation_ro}</p></CardContent>
          </Card>
        )}

        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-lg"><HelpCircle className="w-5 h-5 text-primary" /> Questions for Doctor</CardTitle></CardHeader>
          <CardContent>
            {report.suggested_questions?.length ? (
              <ul className="space-y-2.5">
                {report.suggested_questions.map((q: string, i: number) => (
                  <li key={i} className="flex gap-2.5 text-sm bg-white/60 p-3 rounded-2xl border border-white/60">
                    <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0">{i+1}</span>
                    <span className="leading-relaxed">{q}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">No questions available</p>
            )}
          </CardContent>
        </Card>
      </div>
    )
}

export default ReportPage