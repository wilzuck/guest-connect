import { Container } from "@/components/ui/Container";
import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-dvh bg-zinc-50">
      <Container className="py-14">
        <div className="mx-auto max-w-md">
          <AuthCard
            title="Connexion"
            subtitle="Accède à ton compte GuestConnect pour réserver, sauvegarder et gérer tes voyages."
            footer={{ text: "Pas encore de compte ?", linkLabel: "Créer un compte", href: "/signup" }}
          >
            <LoginForm />
          </AuthCard>
        </div>
      </Container>
    </div>
  );
}
