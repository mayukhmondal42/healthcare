"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, FileText, Activity, Upload, ArrowRight } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface User {
  id?: string;
  firstname?: string;
  lastname?: string;
  name?: string;
  email?: string;
}

interface Report {
  _id: string;
  filename: string;
  fileUrl: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const res = await fetch(`${API_URL}/profile/getuser`, {
          method: "GET",
          credentials: "include",
          headers,
        });
        if (!res.ok) {
          router.push("/");
          return;
        }
        const data = await res.json();
        setUser(data.user);
        const reportRes = await fetch(`${API_URL}/report/myreports`, {
          method: "GET",
          credentials: "include",
          headers,
        });
        if (reportRes.ok) {
          const reportData = await reportRes.json();
          setReports(reportData.reports || []);
        }
      } catch (error) {
        console.error(error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return Swal.fire("Error", "No file selected", "error");
    const allowed = ["application/pdf", "image/png", "image/jpeg"];
    if (!allowed.includes(file.type)) {
      return Swal.fire("Error", "Only PDF, PNG, JPG allowed!", "error");
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/report/upload`, {
        method: "POST",
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      Swal.fire("Success", "Report uploaded successfully!", "success");
      if (data.report) setReports((prev) => [data.report, ...prev]);
    } catch (err: any) {
      Swal.fire("Error", err.message || "Error uploading file", "error");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground animate-pulse">Loading...</div>;
  }

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-8">
          <h2 className="text-3xl font-black tracking-tight mb-2">
            Welcome, {user?.firstname ? `${user.firstname} ${user.lastname}` : user?.name || "User"}! 👋
          </h2>
          <p className="text-muted-foreground">Manage your health reports and vitals in one place</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card className="cursor-pointer group">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center shadow-[0_6px_14px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-2">Upload Report</CardTitle>
                  <CardDescription>Upload medical reports for AI analysis</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={handleUploadClick}>
                <Plus className="w-4 h-4 mr-1" /> Upload PDF or Image
              </Button>
              <input ref={fileInputRef} type="file" accept=".pdf,.png,.jpg,.jpeg" className="hidden" onChange={handleFileChange} />
            </CardContent>
          </Card>

          <Card className="cursor-pointer group">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center shadow-[0_6px_14px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle>Add Vitals</CardTitle>
                  <CardDescription>Manually track BP, Sugar, Weight, etc.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/vitals">Record Vitals <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>Your Reports</CardTitle>
                <CardDescription>All your uploaded medical reports • {reports.length} total</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {reports.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-primary/30 mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No reports uploaded yet</p>
                <Button onClick={handleUploadClick}>Upload Your First Report</Button>
              </div>
            ) : (
              <ul className="space-y-3">
                {reports.map((r) => (
                  <li key={r._id} className="flex justify-between items-center bg-white/60 backdrop-blur-sm border border-white/60 p-3 px-4 rounded-2xl hover:bg-white/90 hover:shadow-md transition-all group">
                    <span className="flex items-center gap-2.5 text-sm font-medium truncate"><FileText className="w-4 h-4 text-primary shrink-0" /> {r.filename}</span>
                    <Link href={`/dashboard/report-page/${r._id}`} className="text-primary text-sm font-semibold flex items-center gap-1 shrink-0 ml-3 hover:underline">
                      View <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}