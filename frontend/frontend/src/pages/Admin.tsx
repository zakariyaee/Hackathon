import { useState, useMemo, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Users, Download, Loader2, PieChart, LogOut, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { fetchTeams, getStats, exportTeams, logout, updateTeamStatus } from "@/lib/api";

interface Registration {
  id: number;
  team_name: string;
  member_count: number;
  project_idea: string;
  leader_name: string;
  email: string;
  phone: string;
  status: "pending" | "confirmed" | "rejected";
  created_at: string;
}

interface Stats {
  total_teams: number;
  total_members: number;
}

const StatusBadge = ({ status }: { status: Registration["status"] }) => {
  const config = {
    pending:   { label: "En attente", icon: Clock,       className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
    confirmed: { label: "Confirmé",   icon: CheckCircle, className: "bg-green-500/10 text-green-600 border-green-500/20" },
    rejected:  { label: "Annulé",    icon: XCircle,     className: "bg-red-500/10 text-red-500 border-red-500/20"       },
  };
  const { label, icon: Icon, className } = config[status] ?? config.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider border ${className}`}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
};

const Admin = () => {
  const [teams, setTeams] = useState<Registration[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const { toast } = useToast();

  const loadData = useCallback(async () => {
    try {
      const [teamsData, statsData] = await Promise.all([fetchTeams(), getStats()]);
      setTeams(teamsData);
      setStats(statsData);
    } catch (error) {
      toast({ title: "Erreur", description: "Impossible de charger les données.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => { loadData(); }, [loadData]);

  const filteredTeams = useMemo(() =>
    teams.filter((t) =>
      t.team_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.leader_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase())
    ), [teams, searchQuery]);

  const handleStatusUpdate = async (teamId: number, status: "confirmed" | "rejected") => {
    setUpdatingId(teamId);
    try {
      await updateTeamStatus(teamId, status);
      setTeams((prev) => prev.map((t) => t.id === teamId ? { ...t, status } : t));
      toast({
        title: status === "confirmed" ? "✅ Inscription confirmée" : "❌ Inscription annulée",
        description: `Un e-mail de notification a été envoyé au chef d'équipe.`,
      });
    } catch {
      toast({ title: "Erreur", description: "La mise à jour du statut a échoué.", variant: "destructive" });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleExport = () => window.open(exportTeams, "_blank");
  const handleLogout  = () => { logout(); window.location.href = "/login"; };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-heading font-bold text-primary">Code Wars</span>
            <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium">Admin</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Titre + actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Gérez les inscriptions au hackathon</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher une équipe..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={handleExport} disabled={teams.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6 border-border/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/15 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Total Équipes</div>
                <div className="text-2xl font-bold font-heading">{isLoading ? "..." : teams.length}</div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border-border/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                <PieChart className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Total Participants</div>
                <div className="text-2xl font-bold font-heading">{isLoading ? "..." : stats?.total_members ?? 0}</div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 border-green-500/20 bg-green-500/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-green-700 font-medium uppercase tracking-wider">Confirmées</div>
                <div className="text-2xl font-bold font-heading">{isLoading ? "..." : teams.filter(t => t.status === "confirmed").length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="glass-card rounded-2xl border-border/50 overflow-hidden">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="h-10 w-10 animate-spin mb-4 text-secondary/50" />
              <p>Chargement des inscriptions...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="font-bold py-4">Équipe</TableHead>
                    <TableHead className="font-bold py-4">Membres</TableHead>
                    <TableHead className="font-bold py-4">Chef / Contact</TableHead>
                    <TableHead className="font-bold py-4">Sujet</TableHead>
                    <TableHead className="font-bold py-4">Date</TableHead>
                    <TableHead className="font-bold py-4 text-center">Statut</TableHead>
                    <TableHead className="font-bold py-4 text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeams.length > 0 ? (
                    filteredTeams.map((team) => (
                      <TableRow key={team.id} className="hover:bg-muted/40 transition-colors">
                        <TableCell className="font-semibold py-4">{team.team_name}</TableCell>
                        <TableCell className="py-4">
                          <span className="bg-secondary/10 text-secondary px-2.5 py-1 rounded-full text-xs font-bold">
                            {team.member_count} membres
                          </span>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">{team.leader_name}</span>
                            <span className="text-xs text-muted-foreground">{team.email}</span>
                            <span className="text-xs text-muted-foreground">{team.phone}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 max-w-[180px]">
                          <p className="text-sm text-muted-foreground truncate" title={team.project_idea}>
                            {team.project_idea}
                          </p>
                        </TableCell>
                        <TableCell className="py-4 text-sm text-muted-foreground whitespace-nowrap">
                          {new Date(team.created_at).toLocaleDateString("fr-FR")}
                        </TableCell>
                        <TableCell className="py-4 text-center">
                          <StatusBadge status={team.status} />
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-500/30 hover:bg-green-500/10 hover:border-green-500 disabled:opacity-40"
                              disabled={team.status === "confirmed" || updatingId === team.id}
                              onClick={() => handleStatusUpdate(team.id, "confirmed")}
                            >
                              {updatingId === team.id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <><CheckCircle className="h-3.5 w-3.5 mr-1" />Confirmer</>
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-500 border-red-500/30 hover:bg-red-500/10 hover:border-red-500 disabled:opacity-40"
                              disabled={team.status === "rejected" || updatingId === team.id}
                              onClick={() => handleStatusUpdate(team.id, "rejected")}
                            >
                              {updatingId === team.id ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <><XCircle className="h-3.5 w-3.5 mr-1" />Annuler</>
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-20 text-muted-foreground">
                        Aucune inscription trouvée.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
