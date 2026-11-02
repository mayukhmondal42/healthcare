"use client";

import React from 'react'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Trash2, Download, Eye, Calendar, FileDown } from "lucide-react";
import Link from "next/link";
import Swal from 'sweetalert2';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Report {
    _id: string;
    filename: string;
    fileUrl: string;
    title: string;
    dateSeen: string;
    summary: string;
}

const Reports = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);

    const getToken = () => localStorage.getItem("token");

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await fetch(`${API_URL}/report/myreports`, { 
                    credentials: "include",
                    headers: { Authorization: `Bearer ${getToken()}` }
                });
                if (!res.ok) throw new Error("Failed to fetch reports");
                const data = await res.json();
                setReports(data.reports || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!",
        });
        if (!result.isConfirmed) return;

        try {
            const res = await fetch(`${API_URL}/report/${id}`, {
                method: "DELETE",
                credentials: "include",
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            if (!res.ok) throw new Error("Failed to delete report");
            setReports((prev) => prev.filter((r) => r._id !== id));
            Swal.fire("Deleted!", "Report deleted successfully.", "success");
        } catch (err: any) {
            console.error(err);
            Swal.fire("Error", err.message || "Error deleting report", "error");
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground animate-pulse">Loading...</div>;
    }

    return (
        <main className="max-w-5xl mx-auto px-4 py-8 space-y-5 animate-fade-in">
            <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center shadow-[0_6px_14px_rgba(37,99,235,0.4)]">
                    <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 className="text-3xl font-black tracking-tight">Your Reports</h1>
                    <p className="text-sm text-muted-foreground">{reports.length} report{reports.length !== 1 ? 's' : ''} uploaded</p>
                </div>
            </div>

            {reports.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center space-y-3">
                        <FileText className="w-10 h-10 text-primary/40 mx-auto" />
                        <p className="text-muted-foreground">No reports uploaded yet.</p>
                        <Link href="/dashboard"><Button>Upload from Dashboard</Button></Link>
                    </CardContent>
                </Card>
            ) : (
                reports.map((r) => (
                    <Card key={r._id} className="group">
                        <CardHeader className="flex flex-row justify-between items-start gap-4">
                            <div className="flex gap-3 min-w-0">
                                <div className="w-11 h-11 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-all duration-300">
                                    <FileText className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <div className="min-w-0">
                                    <CardTitle className="truncate text-lg">{r.title || r.filename}</CardTitle>
                                    <CardDescription className="mt-1.5 space-y-1">
                                        <span className="flex items-center gap-1.5 text-xs"><Calendar className="w-3.5 h-3.5" /> {r.dateSeen || "Unknown"}</span>
                                        <span className="block text-sm line-clamp-2">{r.summary || "No summary available"}</span>
                                    </CardDescription>
                                </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <Link href={`/dashboard/report-page/${r._id}`}>
                                    <Button size="sm" className="rounded-xl"><Eye className="w-4 h-4 mr-1" /> View</Button>
                                </Link>
                                <Button variant="destructive" size="sm" onClick={() => handleDelete(r._id)} className="rounded-xl">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between border-t border-white/40 pt-3">
                            <span className="text-xs text-muted-foreground flex items-center gap-1.5 truncate"><FileDown className="w-3.5 h-3.5 shrink-0" /> {r.filename}</span>
                            <a href={r.fileUrl} target="_blank" rel="noreferrer" className="text-primary text-xs font-semibold flex items-center gap-1 hover:underline shrink-0 ml-3">
                                <Download className="w-3.5 h-3.5" /> Download
                            </a>
                        </CardContent>
                    </Card>
                ))
            )}
        </main>
    )
}

export default Reports