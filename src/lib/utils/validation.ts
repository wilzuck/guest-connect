/**
 * Utilitaires de validation pour formulaires
 * Centralisé pour faciliter la maintenance et la cohérence
 */

import type { PropertyFormData, FormValidationResult } from "@/types/forms";

type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
};

export const ValidationRules: Partial<Record<keyof PropertyFormData, ValidationRule>> = {
  propertyName: {
    required: true,
    minLength: 3,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\s\-.,éèêëàâäùûüôöçœæ'()]*$/,
  },
  propertyType: {
    required: true,
  },
  description: {
    required: true,
    minLength: 20,
    maxLength: 1000,
  },
  address: {
    required: true,
    minLength: 5,
    maxLength: 200,
  },
  city: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  country: {
    required: true,
  },
  zipCode: {
    required: false,
    maxLength: 20,
  },
  bedrooms: {
    required: true,
    min: 1,
    max: 50,
  },
  bathrooms: {
    required: true,
    min: 1,
    max: 50,
  },
  maxGuests: {
    required: true,
    min: 1,
    max: 100,
  },
  squareFeet: {
    required: false,
    min: 0,
    max: 100000,
  },
  amenities: {
    required: false,
  },
  imageUrls: {
    required: true,
  },
  pricePerNight: {
    required: true,
    min: 1,
    max: 999999,
  },
  currency: {
    required: true,
  },
  minNights: {
    required: true,
    min: 1,
    max: 365,
  },
  maxMonthlyDiscount: {
    required: false,
    min: 0,
    max: 100,
  },
} satisfies Partial<Record<keyof PropertyFormData, ValidationRule>>;

/**
 * Valide un champ unique
 */
export function validateField(
  field: keyof PropertyFormData,
  value: PropertyFormData[keyof PropertyFormData] | undefined,
): string | null {
  const rules = ValidationRules[field];
  if (!rules) return null;

  // Champs requis
  if (rules.required && !value) {
    return "Ce champ est requis";
  }

  if (!value) return null; // Les champs non requis peuvent être vides

  // Chaînes de caractères
  if (typeof value === "string") {
    if (rules.minLength && value.length < rules.minLength) {
      return `Minimum ${rules.minLength} caractères`;
    }
    if (rules.maxLength && value.length > rules.maxLength) {
      return `Maximum ${rules.maxLength} caractères`;
    }
    if (rules.pattern && !rules.pattern.test(value)) {
      return "Format invalide";
    }
  }

  // Nombres
  if (typeof value === "number") {
    if (rules.min !== undefined && value < rules.min) {
      return `Minimum: ${rules.min}`;
    }
    if (rules.max !== undefined && value > rules.max) {
      return `Maximum: ${rules.max}`;
    }
  }

  // Tableaux (pour amenities)
  if (Array.isArray(value)) {
    if (field === "amenities" && value.length === 0) {
      return "Sélectionnez au moins un équipement";
    }
    if (field === "imageUrls" && value.length === 0) {
      return "Au moins une image requise";
    }
  }

  return null;
}

/**
 * Valide l'étape courante du formulaire
 */
export function validateStep(
  stepIndex: number,
  formData: Partial<PropertyFormData>,
): FormValidationResult {
  const errors: Record<string, string> = {};
  let fieldsToValidate: (keyof PropertyFormData)[] = [];

  switch (stepIndex) {
    case 0: // Détails de base
      fieldsToValidate = ["propertyName", "propertyType", "description"];
      break;
    case 1: // Localisation
      fieldsToValidate = ["address", "city", "country"];
      if (formData.zipCode) fieldsToValidate.push("zipCode");
      break;
    case 2: // Spécifications
      fieldsToValidate = ["bedrooms", "bathrooms", "maxGuests"];
      if (formData.squareFeet) fieldsToValidate.push("squareFeet");
      break;
    case 3: // Équipements & Photos
      fieldsToValidate = ["amenities", "imageUrls"];
      break;
    case 4: // Tarification
      fieldsToValidate = ["pricePerNight", "minNights", "currency"];
      if (formData.maxMonthlyDiscount)
        fieldsToValidate.push("maxMonthlyDiscount");
      break;
  }

  for (const field of fieldsToValidate) {
    const error = validateField(field, formData[field]);
    if (error) {
      errors[field] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Valide le formulaire complet
 */
export function validateForm(formData: PropertyFormData): FormValidationResult {
  const errors: Record<string, string> = {};

  for (const field of Object.keys(ValidationRules) as Array<
    keyof PropertyFormData
  >) {
    const error = validateField(field, formData[field]);
    if (error) {
      errors[field] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formatte les données avant envoi au serveur
 */
export function formatPropertyData(formData: PropertyFormData) {
  return {
    ...formData,
    // Arrondir les nombres
    pricePerNight: Math.round(formData.pricePerNight * 100) / 100,
    squareFeet: Math.round(formData.squareFeet),
    // Normaliser les chaînes
    propertyName: formData.propertyName.trim(),
    description: formData.description.trim(),
    address: formData.address.trim(),
    city: formData.city.trim(),
    // Timestamp
    createdAt: new Date().toISOString(),
  };
}

/**
 * Calcule la progression du formulaire en pourcentage
 */
export function calculateFormProgress(
  currentStep: number,
  totalSteps: number,
): number {
  return Math.round(((currentStep + 1) / totalSteps) * 100);
}
