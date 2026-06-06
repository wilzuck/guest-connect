/**
 * Types réutilisables pour le formulaire de propriété
 * et l'administration du site GuestConnect
 */

export interface PropertyFormData {
  // Étape 1: Détails de base
  propertyName: string;
  propertyType: "apartment" | "house" | "villa" | "studio" | "loft" | "townhouse";
  description: string;

  // Étape 2: Localisation
  address: string;
  city: string;
  country: string;
  zipCode: string;

  // Étape 3: Spécifications
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  squareFeet: number;

  // Étape 4: Équipements & Photos
  amenities: string[];
  imageUrls: string[];

  // Étape 5: Tarification & Politique
  pricePerNight: number;
  currency: "USD" | "EUR" | "XOF" | "GBP";
  minNights: number;
  maxMonthlyDiscount: number;
}

export interface FormFieldError {
  field: keyof PropertyFormData;
  message: string;
}

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
}

export interface StepperStep {
  title: string;
  description?: string;
  icon?: string;
}

export interface PropertyAmenity {
  id: string;
  name: string;
  category: "room" | "entertainment" | "comfort" | "safety" | "outdoor";
  icon?: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}
