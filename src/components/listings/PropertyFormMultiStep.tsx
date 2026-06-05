"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { FormField } from "@/components/ui/FormField";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Stepper } from "@/components/ui/Stepper";
import { ListingCard } from "@/components/listings/ListingCard";
import type { CurrencyCode } from "@/lib/currency/currency";

// Types de données
type PropertyFormData = {
  // Étape 1: Détails de base
  propertyName: string;
  propertyType: string;
  description: string;

  // Étape 2: Localisation
  address: string;
  city: string;
  country: string;
  zipCode: string;

  // Étape 3: Détails du logement
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  squareFeet: number;

  // Étape 4: Équipements
  amenities: string[];
  imageUrls: string[];

  // Étape 5: Tarification & Publication
  pricePerNight: number;
  currency: string;
  minNights: number;
  maxMonthlyDiscount: number;
};

const PROPERTY_TYPES = [
  { value: "apartment", label: "Appartement" },
  { value: "house", label: "Maison" },
  { value: "villa", label: "Villa" },
  { value: "studio", label: "Studio" },
  { value: "loft", label: "Loft" },
  { value: "townhouse", label: "Maison de ville" },
];

const COUNTRIES = [
  { value: "SN", label: "Sénégal" },
  { value: "BJ", label: "Bénin" },
  { value: "CI", label: "Côte d'Ivoire" },
  { value: "MG", label: "Madagascar" },
  { value: "KE", label: "Kenya" },
  { value: "ZA", label: "Afrique du Sud" },
];

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
];

const STEPS = [
  { title: "Détails du logement", description: "Infos basiques" },
  { title: "Localisation", description: "Où se trouve-t-il?" },
  { title: "Spécifications", description: "Chambres, salles d'eau..." },
  { title: "Équipements & photos", description: "Amenités et images" },
  { title: "Tarification", description: "Prix et conditions" },
];

export function PropertyFormMultiStep() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<PropertyFormData>({
    propertyName: "",
    propertyType: "",
    description: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    squareFeet: 0,
    amenities: [],
    imageUrls: [],
    pricePerNight: 0,
    currency: "USD",
    minNights: 1,
    maxMonthlyDiscount: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const previewLocation = formData.city
    ? `${formData.city}${formData.country ? `, ${COUNTRIES.find((c) => c.value === formData.country)?.label ?? formData.country}` : ""}`
    : "Ville non définie";

  const previewListing = {
    id: "preview",
    title: formData.propertyName || "Titre du logement",
    location: previewLocation,
    pricePerNight: formData.pricePerNight || 0,
    currency: formData.currency as CurrencyCode,
    rating: 4.8,
    reviewCount: 12,
    imageUrl:
      imagePreviews[0] ??
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    propertyType: PROPERTY_TYPES.find((t) => t.value === formData.propertyType)?.label,
    shortDescription: formData.description || undefined,
  };

  // Validation par étape
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0: // Détails de base
        if (!formData.propertyName.trim()) newErrors.propertyName = "Requis";
        if (!formData.propertyType) newErrors.propertyType = "Sélectionner un type";
        if (!formData.description.trim()) newErrors.description = "Requis";
        break;
      case 1: // Localisation
        if (!formData.address.trim()) newErrors.address = "Requis";
        if (!formData.city.trim()) newErrors.city = "Requis";
        if (!formData.country) newErrors.country = "Sélectionner un pays";
        break;
      case 2: // Spécifications
        if (formData.bedrooms < 1) newErrors.bedrooms = "Au minimum 1";
        if (formData.bathrooms < 1) newErrors.bathrooms = "Au minimum 1";
        if (formData.maxGuests < 1) newErrors.maxGuests = "Au minimum 1";
        break;
      case 3: // Équipements & photos
        if (imagePreviews.length === 0) {
          newErrors.imageUrls = "Au moins 1 image requise";
        }
        break;
      case 4: // Tarification
        if (formData.pricePerNight <= 0) newErrors.pricePerNight = "Doit être > 0";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log("Formulaire soumis:", formData);
      alert("Propriété créée avec succès!");
    }
  };

  const handleInputChange = (
    field: keyof PropertyFormData,
    value: any,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleImagesSelected = (files: File[]) => {
    // Ici, vous pouvez uploader les fichiers vers votre serveur
    console.log("Fichiers sélectionnés:", files);
  };

  return (
    <Container className="py-10 sm:py-14">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Colonne gauche: Formulaire */}
          <div className="lg:col-span-6 lg:order-1">
            <Stepper
              steps={STEPS}
              currentStep={currentStep}
              onStepClick={(step) => {
                if (validateStep(currentStep)) {
                  setCurrentStep(step);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            />

            <Card className="mt-10 p-6 sm:p-8">
              {/* Étape 0: Détails de base */}
              {currentStep === 0 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-2xl font-semibold text-black">
                      Détails du logement
                    </h2>
                    <p className="mt-2 text-sm text-zinc-600">
                      Commençons par les informations basiques sur votre
                      propriété.
                    </p>
                  </div>

                  <FormField
                    label="Nom de la propriété"
                    required
                    error={errors.propertyName as string}
                  >
                    <Input
                      placeholder="Ex: Villa paradis Dakar"
                      value={formData.propertyName}
                      onChange={(e) =>
                        handleInputChange("propertyName", e.target.value)
                      }
                    />
                  </FormField>

                  <FormField
                    label="Type de propriété"
                    required
                    error={errors.propertyType as string}
                  >
                    <Select
                      options={PROPERTY_TYPES}
                      value={formData.propertyType}
                      onChange={(e) =>
                        handleInputChange("propertyType", e.target.value)
                      }
                    />
                  </FormField>

                  <FormField
                    label="Description"
                    required
                    hint="Décrivez votre propriété en 2-3 phrases"
                    error={errors.description as string}
                  >
                    <Textarea
                      placeholder="Ex: Une belle villa avec vue sur l'océan, piscine privée, jardin..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                    />
                  </FormField>
                </div>
              )}

              {/* Étape 1: Localisation */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-2xl font-semibold text-black">
                      Localisation
                    </h2>
                    <p className="mt-2 text-sm text-zinc-600">
                      Où se trouve votre propriété?
                    </p>
                  </div>

                  <FormField
                    label="Adresse"
                    required
                    error={errors.address as string}
                  >
                    <Input
                      placeholder="Ex: 123 Avenue Bourguiba"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                    />
                  </FormField>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="Ville"
                      required
                      error={errors.city as string}
                    >
                      <Input
                        placeholder="Ex: Dakar"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                      />
                    </FormField>

                    <FormField
                      label="Code postal"
                      error={errors.zipCode as string}
                    >
                      <Input
                        placeholder="Ex: 10500"
                        value={formData.zipCode}
                        onChange={(e) =>
                          handleInputChange("zipCode", e.target.value)
                        }
                      />
                    </FormField>
                  </div>

                  <FormField
                    label="Pays"
                    required
                    error={errors.country as string}
                  >
                    <Select
                      options={COUNTRIES}
                      value={formData.country}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                    />
                  </FormField>
                </div>
              )}

              {/* Étape 2: Spécifications */}
              {currentStep === 2 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-2xl font-semibold text-black">
                      Spécifications
                    </h2>
                    <p className="mt-2 text-sm text-zinc-600">
                      Détails sur votre logement.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="Chambres"
                      required
                      error={errors.bedrooms}
                    >
                      <Input
                        type="number"
                        min="1"
                        value={formData.bedrooms}
                        onChange={(e) =>
                          handleInputChange("bedrooms", parseInt(e.target.value))
                        }
                      />
                    </FormField>

                    <FormField
                      label="Salles de bain"
                      required
                      error={errors.bathrooms}
                    >
                      <Input
                        type="number"
                        min="1"
                        value={formData.bathrooms}
                        onChange={(e) =>
                          handleInputChange("bathrooms", parseInt(e.target.value))
                        }
                      />
                    </FormField>

                    <FormField
                      label="Nombre max de clients"
                      required
                      error={errors.maxGuests}
                    >
                      <Input
                        type="number"
                        min="1"
                        value={formData.maxGuests}
                        onChange={(e) =>
                          handleInputChange("maxGuests", parseInt(e.target.value))
                        }
                      />
                    </FormField>

                    <FormField
                      label="Superficie (m²)"
                      error={errors.squareFeet}
                    >
                      <Input
                        type="number"
                        min="0"
                        value={formData.squareFeet || ""}
                        onChange={(e) =>
                          handleInputChange("squareFeet", parseInt(e.target.value))
                        }
                      />
                    </FormField>
                  </div>
                </div>
              )}

              {/* Étape 3: Équipements & Photos */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-black">
                      Équipements & Photos
                    </h2>
                    <p className="mt-2 text-sm text-zinc-600">
                      Sélectionnez les équipements et téléchargez des photos.
                    </p>
                  </div>

                  {/* Équipements */}
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-black">
                      Équipements
                    </label>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {AMENITIES.map((amenity) => (
                        <label
                          key={amenity}
                          className="flex cursor-pointer items-center gap-2 rounded-lg border border-black/10 bg-white p-3 transition hover:bg-zinc-50"
                        >
                          <input
                            type="checkbox"
                            checked={formData.amenities.includes(amenity)}
                            onChange={() => toggleAmenity(amenity)}
                            className="h-4 w-4 cursor-pointer rounded border-black/20"
                          />
                          <span className="text-sm font-medium text-black">
                            {amenity}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Upload images */}
                  <div>
                    <label className="mb-3 block text-sm font-semibold text-black">
                      Photos
                      <span className="ml-1 text-red-500">*</span>
                    </label>
                    <ImageUpload
                      onPreviewsChange={setImagePreviews}
                      onFilesSelected={handleImagesSelected}
                      maxFiles={10}
                      maxSizeInMB={10}
                    />
                    {errors.imageUrls && (
                      <p className="mt-2 text-xs text-red-500">
                        {errors.imageUrls}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Étape 4: Tarification */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <div>
                    <h2 className="text-2xl font-semibold text-black">
                      Tarification
                    </h2>
                    <p className="mt-2 text-sm text-zinc-600">
                      Définissez votre stratégie de prix.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="Devises"
                      required
                      error={errors.currency as string}
                    >
                      <Select
                        options={[
                          { value: "USD", label: "USD ($)" },
                          { value: "EUR", label: "EUR (€)" },
                          { value: "XOF", label: "XOF (FCFA)" },
                        ]}
                        value={formData.currency}
                        onChange={(e) =>
                          handleInputChange("currency", e.target.value)
                        }
                      />
                    </FormField>

                    <FormField
                      label="Prix par nuit"
                      required
                      error={errors.pricePerNight}
                    >
                      <Input
                        type="number"
                        min="1"
                        step="0.01"
                        value={formData.pricePerNight || ""}
                        onChange={(e) =>
                          handleInputChange("pricePerNight", parseFloat(e.target.value))
                        }
                      />
                    </FormField>

                    <FormField
                      label="Nuit minimum"
                      hint="Nombre minimum de nuits à réserver"
                      error={errors.minNights}
                    >
                      <Input
                        type="number"
                        min="1"
                        value={formData.minNights}
                        onChange={(e) =>
                          handleInputChange("minNights", parseInt(e.target.value))
                        }
                      />
                    </FormField>

                    <FormField
                      label="Remise mensuelle (%)"
                      hint="Remise pour les réservations mensuelles"
                      error={errors.maxMonthlyDiscount}
                    >
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.maxMonthlyDiscount}
                        onChange={(e) =>
                          handleInputChange(
                            "maxMonthlyDiscount",
                            parseInt(e.target.value),
                          )
                        }
                      />
                    </FormField>
                  </div>

                  <Card className="mt-6 space-y-3 bg-green-50 p-4">
                    <p className="text-sm font-semibold text-green-900">
                      ✓ Prêt à publier
                    </p>
                    <p className="text-xs text-green-800">
                      Votre propriété sera visible aux voyageurs immédiatement
                      après la soumission.
                    </p>
                  </Card>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-8 flex gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="flex-1"
                >
                  ← Précédent
                </Button>

                {currentStep === STEPS.length - 1 ? (
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1"
                  >
                    Publier la propriété
                  </Button>
                ) : (
                  <Button
                    type="button"
                    size="lg"
                    onClick={handleNext}
                    className="flex-1"
                  >
                    Suivant →
                  </Button>
                )}
              </div>
            </Card>
          </div>

          {/* Colonne droite: Prévisualisation */}
          <div className="lg:col-span-6 lg:order-2">
            <div className="sticky top-24">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
                  Aperçu de votre annonce
                </p>
              </div>
              <ListingCard
                locale="fr"
                listing={previewListing}
                variant="outlined"
                linkable={false}
                badge={`${Math.min(imagePreviews.length, 12)}/${12}`}
                 className="mb-0!"
              />
            </div>
          </div>
        </div>
      </form>
    </Container>
  );
}
