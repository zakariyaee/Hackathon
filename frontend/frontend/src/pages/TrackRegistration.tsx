import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, Search, Loader2, ArrowLeft, XCircle, Clock } from "lucide-react";
import { trackTeam } from "@/lib/api";
import { Link } from "react-router-dom";

const TrackRegistration = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [trackingCode, setTrackingCode] = useState(searchParams.get("code") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [team, setTeam] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      handleTrack(code);
    }
  }, []);

  const handleTrack = async (codeToTrack: string) => {
    if (!codeToTrack) {
      toast({ title: "Erreur", description: "Veuillez entrer un numéro de suivi.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    try {
      const data = await trackTeam(codeToTrack);
      setTeam(data);
    } catch (error: any) {
      setTeam(null);
      toast({ 
        title: "Suivi échoué", 
        description: error.response?.data?.message || "Aucune demande trouvée avec ce numéro.", 
        variant: "destructive" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'confirmed':
        return {
          icon: <CheckCircle className="h-12 w-12 text-green-500" />,
          color: "bg-green-500",
          bg: "bg-green-500/15",
          border: "border-green-500/30",
          text: "Confirmé",
          badgeColor: "bg-green-500/10 text-green-600 border-green-500/20",
          title: "Félicitations ! Inscription Confirmée",
          desc: "Votre équipe a été sélectionnée pour participer au Hackathon."
        };
      case 'rejected':
        return {
          icon: <XCircle className="h-12 w-12 text-red-500" />,
          color: "bg-red-500",
          bg: "bg-red-500/15",
          border: "border-red-500/30",
          text: "Refusé",
          badgeColor: "bg-red-500/10 text-red-600 border-red-500/20",
          title: "Demande non retenue",
          desc: "Malheureusement, votre candidature n'a pas été retenue pour cette édition."
        };
      default:
        return {
          icon: <CheckCircle className="h-12 w-12 text-green-500" />, // Keeping the success icon as per image for pending
          color: "bg-green-500",
          bg: "bg-green-500/15",
          border: "border-green-500/30",
          text: "En attente de traitement",
          badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
          title: "Inscription reçue avec succès !",
          desc: "Votre inscription a bien été enregistrée. Veuillez patienter que le club organisateur traite votre demande."
        };
    }
  };

  const statusUI = team ? getStatusDisplay(team.status) : null;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="gradient-soft min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-2xl">
          
          {!team && (
            <div className="text-center mb-10 animate-fade-in">
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Suivre mon inscription</h1>
              <p className="text-muted-foreground">Entrez votre numéro de suivi pour voir l'état de votre demande</p>
            </div>
          )}

          {!team && (
            <div className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="trackingCode">Numéro de suivi (ex: HT-XXXXX)</Label>
                  <div className="flex gap-2 mt-1">
                    <Input 
                      id="trackingCode" 
                      placeholder="HT-A1B2C" 
                      value={trackingCode} 
                      onChange={e => setTrackingCode(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleTrack(trackingCode)}
                    />
                    <Button onClick={() => handleTrack(trackingCode)} disabled={isLoading}>
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {team && statusUI && (
            <div className="text-center animate-fade-in">
              {/* Icône animée */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className={`absolute inset-0 ${statusUI.color}/20 rounded-full animate-ping`} />
                <div className={`relative w-24 h-24 ${statusUI.bg} rounded-full flex items-center justify-center border ${statusUI.border}`}>
                  {statusUI.icon}
                </div>
              </div>

              {/* Badge statut */}
              <span className={`inline-flex items-center gap-1.5 ${statusUI.badgeColor} px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-6`}>
                <span className={`w-1.5 h-1.5 ${team.status === 'pending' ? 'bg-amber-500 animate-pulse' : (team.status === 'confirmed' ? 'bg-green-500' : 'bg-red-500')} rounded-full`} />
                {statusUI.text}
              </span>

              <h2 className="font-heading text-3xl font-bold mb-4">{statusUI.title}</h2>
              <p className="text-muted-foreground mb-2 leading-relaxed">
                {statusUI.desc}
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                {team.status === 'pending' 
                  ? "Vous recevrez un e-mail de confirmation ou d'annulation à l'adresse fournie lors de l'inscription."
                  : "Un e-mail détaillé a été envoyé à l'adresse fournie lors de l'inscription."
                }
              </p>

              {/* Info box pour Pending */}
              {team.status === 'pending' && (
                <div className="glass-card rounded-xl p-6 text-left mb-8 border-border/50 bg-white/50 backdrop-blur-sm">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 border-b pb-2">Prochaines étapes</p>
                  <div className="space-y-4">
                    {[
                      "Le club examinera votre demande dans les plus brefs délais.",
                      "Un e-mail vous sera envoyé pour vous informer de la décision.",
                      "En cas de confirmation, vous recevrez les détails pratiques de l'événement.",
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-secondary/15 text-secondary rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                        <p className="text-sm text-foreground/80 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button variant="outline" onClick={() => { setTeam(null); setHasSearched(false); }}>
                  Suivre une autre demande
                </Button>
                <Link to="/register">
                  <Button variant="ghost">
                    Inscrire une autre équipe
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {!team && hasSearched && !isLoading && (
            <div className="mt-8 text-center animate-fade-in">
              <p className="text-muted-foreground">Aucun résultat trouvé. Vérifiez votre code.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackRegistration;
