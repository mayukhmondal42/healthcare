"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Activity, HeartPulse, Droplets, Scale, StickyNote, Plus } from "lucide-react";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

interface Vital {
  _id: string;
  bp?: string;
  sugar?: string;
  weight?: string;
  note?: string;
  date: string;
}

export default function Vitals() {
  const [vitals, setVitals] = useState<Vital[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ bp: "", sugar: "", weight: "", note: "" });

  const getToken = () => localStorage.getItem("token");

  const fetchVitals = async () => {
    try {
      const res = await fetch(`${API_URL}/vitals/myvitals`, {
        credentials: "include",
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      if (!res.ok) throw new Error("Failed to fetch vitals");
      const data = await res.json();
      setVitals(data.vitals || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVitals();
  }, []);

  const handleAdd = async () => {
    if (!form.bp && !form.sugar && !form.weight) {
      return Swal.fire("Error", "At least one vital is required", "error");
    }
    try {
      const res = await fetch(`${API_URL}/vitals/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add vital");
      const newVital = data.vital || data.vitals;
      if (newVital) setVitals([newVital, ...vitals]);
      setForm({ bp: "", sugar: "", weight: "", note: "" });
      Swal.fire("Success", "Vital added", "success");
    } catch (err: any) {
      Swal.fire("Error", err.message || "Error adding vital", "error");
    }
  };

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
      const res = await fetch(`${API_URL}/vitals/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete");
      setVitals(vitals.filter((v) => v._id !== id));
      Swal.fire("Deleted!", "Vital deleted successfully", "success");
    } catch (err: any) {
      Swal.fire("Error", err.message || "Error deleting", "error");
    }
  };

  if (loading) return <p className="text-center py-16 text-muted-foreground animate-pulse">Loading vitals...</p>;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-5 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center shadow-[0_6px_14px_rgba(37,99,235,0.4)]">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tight">Your Vitals</h2>
          <p className="text-sm text-muted-foreground">Track BP, Sugar & Weight daily</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Plus className="w-5 h-5 text-primary" /> Add New Vital</CardTitle>
          <CardDescription>Track your BP, Sugar, Weight, or Notes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><HeartPulse className="w-4 h-4 text-primary" /> BP</Label>
              <Input placeholder="120/80" value={form.bp} onChange={(e) => setForm({ ...form, bp: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><Droplets className="w-4 h-4 text-primary" /> Sugar</Label>
              <Input placeholder="mg/dL" value={form.sugar} onChange={(e) => setForm({ ...form, sugar: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><Scale className="w-4 h-4 text-primary" /> Weight</Label>
              <Input placeholder="kg" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-1.5"><StickyNote className="w-4 h-4 text-primary" /> Note</Label>
            <Input placeholder="Note (optional)" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
          </div>
          <Button className="w-full" onClick={handleAdd}>Add Vitals</Button>
        </CardContent>
      </Card>

      {vitals.length === 0 ? (
        <Card><CardContent className="py-10 text-center text-muted-foreground">No vitals recorded yet. Add your first one above 👆</CardContent></Card>
      ) : (
        vitals.map((v) => (
          <Card key={v._id} className="group">
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle className="text-base">{new Date(v.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</CardTitle>
                <CardDescription className="mt-1.5 flex flex-wrap gap-2">
                  {v.bp && <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-semibold">BP: {v.bp}</span>}
                  {v.sugar && <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-semibold">Sugar: {v.sugar}</span>}
                  {v.weight && <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-semibold">Weight: {v.weight} kg</span>}
                </CardDescription>
              </div>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(v._id)} className="rounded-xl opacity-80 group-hover:opacity-100">
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardHeader>
            {v.note && <CardContent className="text-sm text-muted-foreground border-t border-white/40 pt-3">{v.note}</CardContent>}
          </Card>
        ))
      )}
    </main>
  );
}