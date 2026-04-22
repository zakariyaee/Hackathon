import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight, Users, User, Loader2 } from "lucide-react";
import { registerTeam } from "@/lib/api";

interface Registration {
  teamName: string;
  memberCount: string;
  projectIdea: string;
  leaderName: string;
  email: string;
  phone: string;
}

const Register = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedTeam, setSubmittedTeam] = useState<any>(null);
  const [form, setForm] = useState<Registration>({
    teamName: "",
    memberCount: "",
    projectIdea: "",
    leaderName: "",
    email: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.teamName || !form.memberCount || !form.projectIdea || !form.leaderName || !form.email || !form.phone) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const response = await registerTeam({
        ...form,
        memberCount: parseInt(form.memberCount),
      });
      setSubmittedTeam(response.team);
      setSubmitted(true);
      toast({
        title: "Inscription envoyée !",
        description: "Votre demande a été reçue. Un e-mail de confirmation vous a été envoyé.",
      });
    } catch (error: any) {
      toast({ 
        title: "Registration Failed", 
        description: error.response?.data?.message || error.message || "Something went wrong. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="min-h-screen flex items-center justify-center pt-16 px-4">
          <div className="text-center animate-fade-in max-w-lg">
            {/* Icône animée */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
              <div className="relative w-24 h-24 bg-green-500/15 rounded-full flex items-center justify-center border border-green-500/30">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
            </div>

            {/* Badge statut */}
            <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-600 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
              En attente de traitement
            </span>

            <h2 className="font-heading text-3xl font-bold mb-4">Inscription reçue avec succès !</h2>
            
            {submittedTeam && (
              <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-3 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Votre numéro de suivi</p>
                <p className="font-mono text-xl font-bold text-secondary">{submittedTeam.tracking_number}</p>
              </div>
            )}

            <p className="text-muted-foreground mb-2 leading-relaxed">
              Votre inscription a bien été enregistrée. Veuillez patienter que le club organisateur traite votre demande.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Vous recevrez un e-mail de confirmation ou d'annulation à l'adresse fournie lors de l'inscription (**{submittedTeam?.email}**).
            </p>

            {/* Info box */}
            <div className="glass-card rounded-xl p-4 text-left mb-8 border-border/50">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Prochaines étapes</p>
              <div className="space-y-2">
                {[
                  "Le club examinera votre demande dans les plus brefs délais.",
                  "Un e-mail vous sera envoyé pour vous informer de la décision.",
                  "En cas de confirmation, vous recevrez les détails pratiques de l'événement.",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-secondary/15 text-secondary rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-sm text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" onClick={() => { setSubmitted(false); setForm({ teamName: "", memberCount: "", projectIdea: "", leaderName: "", email: "", phone: "" }); }}>
              Inscrire une autre équipe
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="gradient-soft min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-xl">
          <div className="text-center mb-10 animate-fade-in">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-secondary mb-2 block">Join Us</span>
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Team Registration</h1>
            <p className="text-muted-foreground">Register your team for Code Wars 2026 Hackathon</p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 md:p-8 space-y-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-secondary/15 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 text-secondary" />
                </div>
                <h3 className="font-heading font-semibold text-lg">Team Information</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="teamName">Team Name</Label>
                  <Input id="teamName" placeholder="e.g., Team Alpha" value={form.teamName} onChange={e => setForm({ ...form, teamName: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="memberCount">Number of Members</Label>
                  <Select value={form.memberCount} onValueChange={v => setForm({ ...form, memberCount: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 member</SelectItem>
                      <SelectItem value="2">2 members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="projectIdea">Project Topic / Idea</Label>
                  <Textarea id="projectIdea" placeholder="Briefly describe your project idea..." value={form.projectIdea} onChange={e => setForm({ ...form, projectIdea: e.target.value })} rows={3} />
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                  <User className="h-4 w-4 text-secondary" />
                </div>
                <h3 className="font-heading font-semibold text-lg">Contact Information</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="leaderName">Team Leader Name</Label>
                  <Input id="leaderName" placeholder="Full name" value={form.leaderName} onChange={e => setForm({ ...form, leaderName: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+212 6 XX XX XX XX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full group" disabled={isLoading}>
              {isLoading ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
              ) : (
                <>
                  Submit Registration
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
