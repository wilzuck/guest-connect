# 🚀 Démarrage Rapide - Formulaire & Composants

## 5 minutes pour démarrer

### 1. Accéder à la démo
```
http://localhost:3000/fr/add-property
http://localhost:3000/fr/components-showcase
```

### 2. Voir les composants en action
Tous les composants sont documentés et prêts à utiliser:
- ✅ Input, Textarea, Select
- ✅ ImageUpload (drag & drop)
- ✅ FormField (wrapper)
- ✅ Stepper (étapes)
- ✅ Button, Card

---

## Utilisation dans votre code

### Importer le formulaire complet
```tsx
// Votre page
import { PropertyFormMultiStep } from "@/components/listings/PropertyFormMultiStep";

export default function Page() {
  return (
    <div>
      <h1>Ajouter une propriété</h1>
      <PropertyFormMultiStep />
    </div>
  );
}
```

### Utiliser un composant seul
```tsx
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export function MyForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  return (
    <FormField
      label="Email"
      required
      error={error}
      hint="Utilisez votre email professionnel"
    >
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="vous@exemple.com"
      />
    </FormField>
  );
}
```

### Upload d'images
```tsx
import { ImageUpload } from "@/components/ui/ImageUpload";
import { useState } from "react";

export function PhotoGallery() {
  const [previews, setPreviews] = useState<string[]>([]);

  return (
    <ImageUpload
      accept="image/*"
      onFilesSelected={(files) => {
        console.log("Fichiers sélectionnés:", files);
        // Uploader à votre backend
      }}

      onPreviewsChange={setPreviews}
      maxFiles={6}
      maxSizeInMB={10}
    />
  );
}
```

### Validation
```tsx
import { validateField, validateForm } from "@/lib/utils/validation";

// Valider un seul champ
const error = validateField("pricePerNight", 50);
if (error) {
  console.log("Erreur:", error);
}

// Valider le formulaire complet
const result = validateForm(formData);
if (!result.isValid) {
  console.log("Erreurs:", result.errors);
}
```

---

## ✨ Fichiers créés

### Composants UI (`src/components/ui/`)
- `FormField.tsx` - Wrapper avec label et erreur
- `Select.tsx` - Dropdown réutilisable
- `ImageUpload.tsx` - Drag & drop images
- `Stepper.tsx` - Indicateur d'étapes

### Composants métier (`src/components/`)
- `listings/PropertyFormMultiStep.tsx` - Formulaire 5 étapes

### Utilitaires (`src/lib/utils/`)
- `validation.ts` - Validation réutilisable

### Types (`src/types/`)
- `forms.ts` - Interfaces TypeScript

### Pages (`src/app/[locale]/`)
- `add-property/page.tsx` - Page du formulaire
- `components-showcase/page.tsx` - Galerie de composants

### Documentation
- `COMPOSANTS.md` - Guide détaillé des composants
- `INTEGRATION.md` - Guide d'intégration backend
- `RELEASE_NOTES.md` - Notes de version

---

## 🎨 Design System

Tous les composants utilisent la même palette:
```css
/* Couleurs */
Noir: black
Blanc: white
Gris: zinc-50 à zinc-900

/* Spacing */
4px = Tailwind default

/* Border radius */
11px = rounded-xl (inputs)
22px = rounded-2xl (cards)

/* Shadows */
shadow-sm shadow-black/5 (subtil)
```

---

## ✅ Checklist d'intégration

- [ ] Importer le composant
- [ ] Ajouter la route API (POST `/api/properties`)
- [ ] Implémenter upload images (POST `/api/upload`)
- [ ] Tester validation client
- [ ] Tester validation serveur
- [ ] Tester sur mobile
- [ ] Vérifier accessibilité
- [ ] Ajouter tests unitaires

---

## 🐛 Problèmes courants

### "Composant ne s'affiche pas"
```tsx
// ✅ Correct
"use client"; // Ajouter pour l'état React
import { PropertyFormMultiStep } from "@/components/listings/PropertyFormMultiStep";

// ❌ Incorrect
import PropertyFormMultiStep from "@/components/listings/PropertyFormMultiStep";
```

### "Les images ne s'affichent pas"
```tsx
// Vérifier que les URLs sont valides
const imageUrl = "https://...";
// Pas de URLs relatives dans Next.js sans Image component

// ✅ Utiliser Image de Next.js
import Image from "next/image";
<Image src={imageUrl} alt="..." fill />
```

### "Erreur de TypeScript"
```tsx
// ✅ Utiliser le bon type
const errors: Record<string, string> = {};

// ❌ Pas de Partial<PropertyFormData>
const errors: Partial<PropertyFormData> = {};
```

---

## 📚 Documentation complète

- **Composants**: Voir `COMPOSANTS.md`
- **Intégration**: Voir `INTEGRATION.md`
- **Release notes**: Voir `RELEASE_NOTES.md`

---

## 🤝 Support

Questions? Consultez:
1. Les fichiers `.md` dans la racine
2. Les commentaires du code
3. Les pages de démo
4. La page showcase des composants

---

**Bon développement! 🎉**
