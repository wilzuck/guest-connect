import { Container } from "@/components/ui/Container";
import { AuthCard } from "@/components/auth/AuthCard";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-dvh bg-zinc-50">
      <Container className="py-14">
        <div className="mx-auto max-w-md">
          <AuthCard
            title="Créer un compte"
            subtitle="Rejoins GuestConnect et réserve des guest houses vérifiées partout dans le monde."
            footer={{ text: "Tu as déjà un compte ?", linkLabel: "Se connecter", href: "/login" }}
          >
            <SignupForm />
          </AuthCard>
        </div>
      </Container>
    </div>
  );
}
