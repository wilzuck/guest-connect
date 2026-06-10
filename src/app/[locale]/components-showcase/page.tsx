import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { FormField } from "@/components/ui/FormField";
import { Text, Heading, Eyebrow } from "@/components/ui/Text";
import { Pagination } from "@/components/ui/Pagination";

export default function ComponentsShowcasePage() {
  return (
    <Container className="py-10 sm:py-14">
      <div className="mb-10 space-y-2">
        <h1 className="text-4xl font-semibold ">Composants UI</h1>
        <p className="text-zinc-600">Galerie de tous les composants réutilisables</p>
      </div>

      <div className="space-y-12">
        {/* Inputs */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold ">Inputs</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-4">
              <FormField label="Texte simple">
                <Input placeholder="Placeholder texte..." />
              </FormField>
            </Card>

            <Card className="p-4">
              <FormField label="Avec erreur" error="Champ invalide">
                <Input placeholder="Placeholder texte..." />
              </FormField>
            </Card>

            <Card className="p-4">
              <FormField label="Requis" required>
                <Input placeholder="Placeholder texte..." />
              </FormField>
            </Card>

            <Card className="p-4">
              <FormField label="Avec hint" hint="Ceci est un texte d'aide">
                <Input placeholder="Placeholder texte..." />
              </FormField>
            </Card>

            <Card className="p-4">
              <FormField label="Email">
                <Input type="email" placeholder="exemple@mail.com" />
              </FormField>
            </Card>

            <Card className="p-4">
              <FormField label="Nombre">
                <Input type="number" placeholder="0" />
              </FormField>
            </Card>
          </div>
        </div>

        {/* Textarea */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold ">Textarea</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="p-4">
              <FormField label="Description simple">
                <Textarea placeholder="Entrez votre texte..." rows={4} />
              </FormField>
            </Card>

            <Card className="p-4">
              <FormField label="Avec erreur" error="Le texte est trop court">
                <Textarea placeholder="Entrez votre texte..." rows={4} />
              </FormField>
            </Card>
          </div>
        </div>

        {/* Select */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold ">Select</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-4">
              <FormField label="Type de propriété">
                <Select
                  options={[
                    { value: "apt", label: "Appartement" },
                    { value: "house", label: "Maison" },
                    { value: "villa", label: "Villa" },
                  ]}
                />
              </FormField>
            </Card>

            <Card className="p-4">
              <FormField label="Pays" required error="Sélection requise">
                <Select
                  options={[
                    { value: "SN", label: "Sénégal" },
                    { value: "BJ", label: "Bénin" },
                    { value: "CI", label: "Côte d'Ivoire" },
                  ]}
                />
              </FormField>
            </Card>

            <Card className="p-4">
              <FormField label="Devise">
                <Select
                  options={[
                    { value: "USD", label: "USD ($)" },
                    { value: "EUR", label: "EUR (€)" },
                    { value: "XOF", label: "XOF (FCFA)" },
                  ]}
                />
              </FormField>
            </Card>
          </div>
        </div>

        {/* Buttons */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold ">Buttons</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="secondary" disabled>
                Disabled Secondary
              </Button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold ">Cards</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <p className="text-sm font-semibold ">Card Default</p>
              <p className="mt-2 text-xs text-zinc-600">
                Avec bordure légère et ombre subtile
              </p>
            </Card>

            <Card className="border-green-200 bg-green-50 p-6">
              <p className="text-sm font-semibold text-green-900">Card Success</p>
              <p className="mt-2 text-xs text-green-800">
                Avec fond vert pour les messages positifs
              </p>
            </Card>

            <Card className="border-red-200 bg-red-50 p-6">
              <p className="text-sm font-semibold text-red-900">Card Error</p>
              <p className="mt-2 text-xs text-red-800">
                Avec fond rouge pour les messages d&apos;erreur
              </p>
            </Card>
          </div>
        </div>
        {/* Typography */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold ">Typography (Text / Heading)</h2>
          <Card className="space-y-4 p-6">
            <Eyebrow>Composants réutilisables</Eyebrow>
            <Heading level={2}>Titres et textes sans couleurs manuelles</Heading>
            <Text tone="muted">
              Choisissez un <code>tone</code> sémantique (default, muted, subtle…) —
              la couleur claire/sombre est gérée par le composant, plus besoin
              d&apos;écrire <code>text-zinc-900 dark:text-white</code> partout.
            </Text>
            <div className="space-y-1">
              <Text tone="default" weight="semibold">Tone default</Text>
              <Text tone="muted">Tone muted (texte secondaire)</Text>
              <Text tone="subtle" size="sm">Tone subtle (légendes, hints)</Text>
              <Text tone="brand" weight="semibold">Tone brand</Text>
              <Text tone="danger">Tone danger</Text>
              <Text tone="success">Tone success</Text>
            </div>
          </Card>
        </div>

        {/* Pagination */}
        <div>
          <h2 className="mb-4 text-2xl font-semibold ">Pagination</h2>
          <Card className="space-y-6 p-6">
            <div>
              <Text tone="subtle" size="sm" className="mb-3">
                Avec chevrons Précédent / Suivant et ellipses
              </Text>
              <Pagination
                page={3}
                totalPages={10}
                hrefForPage={(page) => `?page=${page}`}
              />
            </div>
            <div>
              <Text tone="subtle" size="sm" className="mb-3">
                Peu de pages (sans ellipse)
              </Text>
              <Pagination
                page={1}
                totalPages={4}
                hrefForPage={(page) => `?page=${page}`}
              />
            </div>
          </Card>
        </div>
      </div>
    </Container>
  );
}
