# Guide d'Intégration - Formulaire Propriété & Composants UI

## 📋 Vue d'ensemble

Vous trouverez ici tout ce dont vous avez besoin pour :
- ✅ Ajouter une propriété avec le formulaire 5 étapes
- ✅ Utiliser les composants UI réutilisables
- ✅ Intégrer avec votre backend
- ✅ Gérer la validation et les erreurs

---

## 🚀 Démarrage rapide

### 1. Page de démonstration
Accédez à ces URLs pour voir les composants en action:

```
http://localhost:3000/fr/add-property
http://localhost:3000/fr/components-showcase
```

### 2. Importer le formulaire
```tsx
import { PropertyFormMultiStep } from "@/components/listings/PropertyFormMultiStep";

export default function MyPage() {
  return <PropertyFormMultiStep />;
}
```

---

## 📦 Composants disponibles

### Input
```tsx
import { Input } from "@/components/ui/Input";

<Input 
  type="email"
  placeholder="Votre email..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Textarea
```tsx
import { Textarea } from "@/components/ui/Textarea";

<Textarea 
  placeholder="Description..."
  rows={4}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Select
```tsx
import { Select } from "@/components/ui/Select";

<Select
  options={[
    { value: "apt", label: "Appartement" },
    { value: "house", label: "Maison" },
  ]}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### FormField (wrapper)
```tsx
import { FormField } from "@/components/ui/FormField";

<FormField
  label="Nom"
  required
  error={error}
  hint="Entrez votre nom complet"
>
  <Input {...props} />
</FormField>
```

### ImageUpload (Drag & Drop)
```tsx
import { ImageUpload } from "@/components/ui/ImageUpload";
import { useState } from "react";

export function MyComponent() {
  const [previews, setPreviews] = useState<string[]>([]);
  
  return (
    <ImageUpload
      onFilesSelected={(files) => {
        // Uploader les fichiers à votre backend
        uploadToServer(files);
      }}
      onPreviewsChange={setPreviews}
      maxFiles={5}
      maxSizeInMB={10}
    />
  );
}
```

### Stepper (Étapes)
```tsx
import { Stepper } from "@/components/ui/Stepper";

<Stepper
  steps={[
    { title: "Infos", description: "Basiques" },
    { title: "Localisation", description: "Adresse" },
    { title: "Photos", description: "Images" },
  ]}
  currentStep={currentStep}
  onStepClick={setCurrentStep}
/>
```

### Button
```tsx
import { Button } from "@/components/ui/Button";

<Button variant="primary" size="lg">
  Cliquer moi
</Button>
```

### Card
```tsx
import { Card } from "@/components/ui/Card";

<Card className="p-6">
  Votre contenu
</Card>
```

---

## 🔗 Intégration avec votre Backend

### 1. Créer une route API
```typescript
// src/app/api/properties/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Valider
    const validation = validateForm(formData);
    if (!validation.isValid) {
      return NextResponse.json(
        { errors: validation.errors },
        { status: 400 }
      );
    }
    
    // Sauvegarder en base
    const property = await db.properties.create(formData);
    
    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
```

### 2. Upload d'images
```typescript
// Dans PropertyFormMultiStep
const handleImagesSelected = async (files: File[]) => {
  const formData = new FormData();
  files.forEach(file => formData.append("files", file));
  
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  
  const { urls } = await response.json();
  setFormData(prev => ({ 
    ...prev, 
    imageUrls: urls 
  }));
};
```

### 3. Soumission du formulaire
```typescript
// Ajouter à PropertyFormMultiStep
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  if (!validateStep(currentStep)) return;
  
  const response = await fetch("/api/properties", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formatPropertyData(formData)),
  });
  
  if (response.ok) {
    const property = await response.json();
    router.push(`/${locale}/listings/${property.id}`);
  } else {
    const { errors } = await response.json();
    setErrors(errors);
  }
};
```

---

## 🧪 Tester les composants

### Via Storybook (si installé)
```bash
npm run storybook
```

### Via page showcase
```
http://localhost:3000/fr/components-showcase
```

### Test unitaire exemple
```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";

test("FormField affiche l'erreur", () => {
  render(
    <FormField error="Email invalide">
      <Input type="email" />
    </FormField>
  );
  
  expect(screen.getByText("Email invalide")).toBeInTheDocument();
});
```

---

## 🎨 Personnalisation

### Ajouter une variante de Button
```tsx
// src/components/ui/Button.tsx
function Button({ variant = "primary", size = "md", ...props }) {
  const variants = {
    primary: "bg-black text-white hover:bg-black/90",
    secondary: "border border-black/10 text-black hover:bg-zinc-50",
    success: "bg-green-500 text-white hover:bg-green-600", // Nouveau
  };
  
  return <button className={cn(variants[variant], ...)} {...props} />;
}
```

### Ajouter un équipement
```typescript
// Dans PropertyFormMultiStep.tsx
const AMENITIES = [
  "WiFi",
  "Climatisation",
  "Chauffage",
  "Cuisine équipée",
  "Lave-linge",
  "Sèche-linge",
  "Parking",
  "Piscine",
  "Jardin",
  "Terrasse",
  "Coffre-fort",
  "Petit-déjeuner inclus",
  "Ascenseur", // Nouveau
  "Gym", // Nouveau
];
```

---

## 📊 Validation et erreurs

### Valider une étape
```typescript
import { validateStep } from "@/lib/utils/validation";

const result = validateStep(0, formData);
if (!result.isValid) {
  console.log("Erreurs:", result.errors);
}
```

### Valider un seul champ
```typescript
import { validateField } from "@/lib/utils/validation";

const error = validateField("pricePerNight", 25.50);
```

### Valider le formulaire complet
```typescript
import { validateForm } from "@/lib/utils/validation";

const result = validateForm(completeFormData);
```

---

## 🔐 Sécurité

### CSRF Protection
```tsx
import { useFormState } from "react-dom";

const [state, formAction] = useFormState(createProperty, null);

<form action={formAction}>
  {/* Champs */}
</form>
```

### Sanitization
```typescript
import DOMPurify from "dompurify";

const cleanDescription = DOMPurify.sanitize(formData.description);
```

### Rate Limiting
```typescript
// Sur votre route API
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requêtes par IP
});

app.post("/api/properties", limiter, async (req, res) => {
  // ...
});
```

---

## 📱 Responsive Design

Tous les composants sont responsive:
- **Mobile**: Full width
- **Tablet**: 2 colonnes avec grid-cols-2
- **Desktop**: 3-4 colonnes avec lg:grid-cols-4

```tsx
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
  {/* Items */}
</div>
```

---

## 🚨 Dépannage

### Le formulaire ne valide pas
```typescript
// Vérifier qu'on passe les bonnes données
console.log("Form data:", formData);
console.log("Errors:", errors);

// Vérifier la validation
const result = validateStep(currentStep, formData);
console.log("Is valid:", result.isValid);
```

### Les images ne s'affichent
```typescript
// Vérifier que les URLs sont correctes
console.log("Image URLs:", imagePreviews);

// Vérifier les CORS
// Configuration CORS dans next.config.ts si nécessaire
```

### Classnames manquent
```typescript
// Assurez-vous d'avoir importé cn()
import { cn } from "@/lib/utils/cn";

// Et que Tailwind est configuré
// Vérifier tailwind.config.ts
```

---

## 📚 Ressources

- [Documentation Tailwind CSS](https://tailwindcss.com)
- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

## 🤝 Contribution

Pour améliorer les composants:
1. Créer une branche feature
2. Modifier le composant dans `src/components/ui/`
3. Tester sur la page showcase
4. Commit avec un message clair

---

## ✅ Checklist de déploiement

- [ ] Validation côté client complète
- [ ] Validation côté serveur
- [ ] Upload d'images fonctionnel
- [ ] Tests unitaires passent
- [ ] Tests e2e passent
- [ ] Responsive sur mobile
- [ ] Accessibilité WCAG AA
- [ ] Performance (Lighthouse > 90)
- [ ] SEO optimisé

---

**Dernière mise à jour**: Juin 2026
**Version**: 1.0.0
**Auteur**: GitHub Copilot
