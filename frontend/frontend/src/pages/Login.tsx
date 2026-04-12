import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { login } from "@/lib/api";
import { Loader2, Lock } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await login({ email, password });
            toast({
                title: "Connexion réussie",
                description: "Bienvenue dans le panel d'administration.",
            });
            navigate("/admin");
        } catch (error: any) {
            toast({
                title: "Erreur de connexion",
                description: error.message || "Email ou mot de passe incorrect.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md shadow-lg border-accent/20">
                <CardHeader className="space-y-1 text-center">
                    <div className="mx-auto w-12 h-12 bg-secondary/15 rounded-full flex items-center justify-center mb-4">
                        <Lock className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-2xl font-bold font-heading">Administration</CardTitle>
                    <CardDescription>
                        Connectez-vous pour accéder au panel de gestion
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@codewars.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connexion...</>
                            ) : (
                                "Se connecter"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
