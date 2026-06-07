# Documentation des Composants UI

## Vue d'ensemble

Tous les composants sont conçus pour être réutilisables, accessibles et cohérents avec le design de GuestConnect.

### Principes de design
- **Consistance**: Border, padding, radius standardisés
- **Minimalisme**: Design épuré, sans dépendances externes
- **Performance**: Composants légers, TypeScript-safe
- **Accessibilité**: Semantique HTML correcte

---

## Composants disponibles

### 1. **FormField** (`FormField.tsx`)
Wrapper pour champs de formulaire avec label, erreur et hint.

```tsx
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";

<FormField
  label="Email"
  required
  error="Email invalide"
  hint="Utilisez votre email principal"
>
  <Input type="email" placeholder="exemple@mail.com" />
</FormField>
```

**Props:**
- `label?: ReactNode` - Libellé du champ
- `required?: boolean` - Ajoute une astérisque rouge
- `error?: string` - Message d'erreur (vide = pas d'erreur)
- `hint?: string` - Texte d'aide sous le champ

---

### 2. **Input** (`Input.tsx`)
Champ texte standardisé.

```tsx
import { Input } from "@/components/ui/Input";

<Input 
  type="email"
  placeholder="Votre email..."
  disabled={false}
/>
```

**Styles:**
- Border: `border-black/10` → `border-black/20` au focus
- Shadow: `shadow-sm shadow-black/5`
- Focus ring: `ring-4 ring-black/5`

---

### 3. **Textarea** (`Textarea.tsx`)
Zone de texte multi-ligne.

```tsx
import { Textarea } from "@/components/ui/Textarea";

<Textarea 
  placeholder="Description..."
  rows={4}
/>
```

---

### 4. **Select** (`Select.tsx`)
Dropdown avec options typées.

```tsx
import { Select } from "@/components/ui/Select";

<Select
  options={[
    { value: "apt", label: "Appartement" },
    { value: "house", label: "Maison" },
  ]}
  placeholder="Sélectionner un type..."
/>
```

**Props:**
- `options: Array<{ value: string; label: string }>` - Liste des options
- `placeholder?: string` - Texte par défaut
- Accepte tous les props HTML `<select>`

---

### 5. **ImageUpload** (`ImageUpload.tsx`)
Zone de drag & drop avec prévisualisation.

```tsx
import { ImageUpload } from "@/components/ui/ImageUpload";
import { useState } from "react";

export function MyComponent() {
  const [previews, setPreviews] = useState<string[]>([]);
  
  return (
    <ImageUpload
      onFilesSelected={(files) => console.log(files)}
      onPreviewsChange={setPreviews}
      maxFiles={5}
      maxSizeInMB={10}
    />
  );
}
```

**Props:**
- `onFilesSelected?: (files: File[]) => void` - Callback quand fichiers sélectionnés
- `onPreviewsChange?: (previews: string[]) => void` - Callback pour URLs locales
- `maxFiles?: number` - Nombre max de fichiers (default: 5)
- `maxSizeInMB?: number` - Taille max par fichier (default: 10)

**Fonctionnalités:**
- ✅ Drag & drop
- ✅ Click pour sélectionner
- ✅ Validation format & taille
- ✅ Numérotation des images
- ✅ Suppression des images
- ✅ Prévisualisation temps réel

---

### 6. **Stepper** (`Stepper.tsx`)
Indicateur d'étapes pour formulaires multi-étapes.

```tsx
import { Stepper } from "@/components/ui/Stepper";
import { useState } from "react";

export function MyForm() {
  const [currentStep, setCurrentStep] = useState(0);
  
  return (
    <Stepper
      steps={[
        { title: "Infos", description: "Basiques" },
        { title: "Localisation", description: "Adresse" },
        { title: "Photos", description: "Images" },
      ]}
      currentStep={currentStep}
      onStepClick={setCurrentStep}
    />
  );
}
```

**Props:**
- `steps: Array<{ title: string; description?: string }>`
- `currentStep: number` - Étape actuelle (0-indexed)
- `onStepClick?: (step: number) => void` - Click sur une étape

---

### 7. **Card** (`Card.tsx`)
Conteneur avec border et shadow standard.

```tsx
import { Card } from "@/components/ui/Card";

<Card className="p-6">
  <p>Contenu de la card</p>
</Card>
```

**Styles par défaut:**
```css
rounded-2xl border-black/10 bg-white shadow-sm shadow-black/5
```

---

### 8. **Button** (`Button.tsx`)
Bouton réutilisable avec variantes.

```tsx
import { Button } from "@/components/ui/Button";

<Button variant="primary" size="lg">
  Cliquer moi
</Button>
```

**Variantes:**
- `primary` (default)
- `secondary`

**Tailles:**
- `sm`
- `md` (default)
- `lg`

---

## Exemple complet: Formulaire avec validation

```tsx
"use client";

import { useState } from "react";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function PropertyForm() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Effacer erreur si elle existe
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name) newErrors.name = "Nom requis";
    if (!formData.type) newErrors.type = "Type requis";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Soumission:", formData);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField
          label="Nom de la propriété"
          required
          error={errors.name}
        >
          <Input
            placeholder="Ex: Villa Dakar..."
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </FormField>

        <FormField
          label="Type"
          required
          error={errors.type}
        >
          <Select
            options={[
              { value: "apt", label: "Appartement" },
              { value: "house", label: "Maison" },
            ]}
            value={formData.type}
            onChange={(e) => handleChange("type", e.target.value)}
          />
        </FormField>

        <div>
          <label className="mb-3 block text-sm font-semibold text-black">
            Photos
          </label>
          <ImageUpload maxFiles={5} />
        </div>

        <Button type="submit" size="lg" className="w-full">
          Valider
        </Button>
      </form>
    </Card>
  );
}
```

---

## Architecture & Points clés

### Imports standardisés
Tous les composants utilisent:
- `cn()` pour fusionner les classes (utilitaire `@/lib/utils/cn`)
- TypeScript pour la sécurité des types
- Tailwind CSS pour le styling

### Patterns
1. **Props avec spread**: `{...props}` pour flexibilité
2. **Composition**: FormField wraps Input/Textarea/Select
3. **Callback pattern**: `onChange`, `onPreviewsChange`, etc.
4. **Class merging**: `cn()` pour override des styles

### Accessibility
- Labels associés aux champs
- Erreurs en texte lisible (pas seulement couleur)
- Sémantique HTML correcte
- Focus styles visibles

---

## Pages de démonstration

### 1. **Showcase de composants**
- URL: `http://localhost:3000/[locale]/components-showcase`
- Affiche tous les composants avec exemples

### 2. **Formulaire d'ajout de propriété**
- URL: `http://localhost:3000/[locale]/add-property`
- Démo du formulaire 5 étapes avec tous les composants

---

## Points à retenir

✅ **Toujours utiliser FormField** pour wrapper les inputs  
✅ **Passer les options au Select** correctement  
✅ **Gérer l'état avec React** pour ImageUpload  
✅ **Valider avant submit** et afficher les erreurs  
✅ **Utiliser les callbacks** pour intégrer les données  
✅ **Rester cohérent** avec le design system  

---

## Prochaines étapes

- [ ] Intégrer validation zod/yup pour formulaires
- [ ] Ajouter composants: Toggle, Checkbox, Radio
- [ ] Créer histoire Storybook pour docs
- [ ] Tester accessibilité WCAG
