"use client";

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  Building2,
  CalendarDays,
  Camera,
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Home,
  Leaf,
  MapPin,
  Save,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Trees,
  Upload,
  Utensils,
  Warehouse,
  Waves,
  Wifi,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FormField } from "@/components/ui/FormField";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { Input } from "@/components/ui/Input";
import { MarkdownTextarea } from "@/components/ui/MarkdownTextarea";
import { Select } from "@/components/ui/Select";
import type { CurrencyCode } from "@/lib/currency/currency";
import { cn } from "@/lib/utils/cn";

type PropertyFormData = {
  propertyName: string;
  propertyType: string;
  description: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  squareFeet: number;
  amenities: string[];
  pricePerNight: number;
  currency: CurrencyCode;
  minNights: number;
  minMonthlyDiscount: number;
  maxMonthlyDiscount: number;
  availableWeekdays: string[];
  unavailableDates: string[];
  validationStatus: "pending" | "approved" | "rejected";
};

const STEPS = [
  { label: "Détails", sub: "Infos basiques" },
  { label: "Localisation", sub: "Où se trouve-t-il ?" },
  { label: "Spécifications", sub: "Chambres, etc." },
  { label: "Équipements", sub: "Amenities & images" },
  { label: "Tarification", sub: "Prix & conditions" },
];

const PROPERTY_TYPES = [
  { value: "apartment", label: "Appartement", icon: Building2 },
  { value: "villa", label: "Villa", icon: Home },
  { value: "house", label: "Maison", icon: Warehouse },
  { value: "studio", label: "Studio", icon: Sparkles },
  { value: "loft", label: "Loft", icon: Building2 },
  { value: "bungalow", label: "Bungalow", icon: Trees },
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
  { value: "WiFi", label: "WiFi", icon: Wifi },
  { value: "Climatisation", label: "Climatisation", icon: Snowflake },
  { value: "Cuisine équipée", label: "Cuisine équipée", icon: Utensils },
  { value: "Parking", label: "Parking", icon: Car },
  { value: "Piscine", label: "Piscine", icon: Waves },
  { value: "Jardin", label: "Jardin", icon: Leaf },
  { value: "Terrasse", label: "Terrasse", icon: Trees },
  { value: "Coffre-fort", label: "Coffre-fort", icon: ShieldCheck },
  { value: "Petit-déjeuner inclus", label: "Petit-déjeuner", icon: Coffee },
];

const WEEKDAYS = [
  { value: "mon", label: "Lun", longLabel: "Lundi" },
  { value: "tue", label: "Mar", longLabel: "Mardi" },
  { value: "wed", label: "Mer", longLabel: "Mercredi" },
  { value: "thu", label: "Jeu", longLabel: "Jeudi" },
  { value: "fri", label: "Ven", longLabel: "Vendredi" },
  { value: "sat", label: "Sam", longLabel: "Samedi" },
  { value: "sun", label: "Dim", longLabel: "Dimanche" },
];

const DEFAULT_DISCOUNT_LIMITS = { min: 0, max: 35 };

type CurrencyDiscountRule = {
  code: CurrencyCode;
  minDiscount: number;
  maxDiscount: number;
};

const WEEKDAY_INDEX: Record<string, number> = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
};

export function PropertyFormMultiStep({ context = "public" }: { context?: "public" | "admin" }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [blockedDate, setBlockedDate] = useState("");
  const [currencyRules, setCurrencyRules] = useState<CurrencyDiscountRule[]>([]);
  const [formData, setFormData] = useState<PropertyFormData>({
    propertyName: "",
    propertyType: "apartment",
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
    pricePerNight: 0,
    currency: "XOF",
    minNights: 1,
    minMonthlyDiscount: 0,
    maxMonthlyDiscount: 0,
    availableWeekdays: WEEKDAYS.map((day) => day.value),
    unavailableDates: [],
    validationStatus: "pending",
  });

  useEffect(() => {
    let ignore = false;
    fetch("/api/db/currencies")
      .then((response) => (response.ok ? response.json() : []))
      .then((rows: Array<Record<string, unknown>>) => {
        if (ignore) return;
        setCurrencyRules(
          rows
            .map((row) => ({
              code: String(row.code ?? "").toUpperCase() as CurrencyCode,
              minDiscount: normalizeDiscount(row.minDiscount, DEFAULT_DISCOUNT_LIMITS.min),
              maxDiscount: normalizeDiscount(row.maxDiscount, DEFAULT_DISCOUNT_LIMITS.max),
            }))
            .filter((rule) => ["XOF", "EUR", "USD"].includes(rule.code)),
        );
      })
      .catch(() => undefined);

    return () => {
      ignore = true;
    };
  }, []);

  const discountLimits = useMemo(() => {
    const rule = currencyRules.find((item) => item.code === formData.currency);
    if (!rule) return DEFAULT_DISCOUNT_LIMITS;
    return {
      min: Math.min(rule.minDiscount, rule.maxDiscount),
      max: Math.max(rule.minDiscount, rule.maxDiscount),
    };
  }, [currencyRules, formData.currency]);

  const completion = useMemo(() => {
    const checks = [
      !!formData.propertyName.trim(),
      !!formData.propertyType,
      formData.description.trim().length > 20,
      !!formData.city.trim(),
      !!formData.country,
      imagePreviews.length > 0,
      formData.pricePerNight > 0,
      formData.availableWeekdays.length > 0,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [formData, imagePreviews.length]);

  const previewLocation = formData.city
    ? `${formData.city}${formData.country ? `, ${COUNTRIES.find((c) => c.value === formData.country)?.label ?? formData.country}` : ""}`
    : "Ville non définie";

  const selectedType = PROPERTY_TYPES.find((type) => type.value === formData.propertyType);

  function updateField<K extends keyof PropertyFormData>(field: K, value: PropertyFormData[K]) {
    setFormData((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  }

  function validateStep(step: number) {
    const nextErrors: Record<string, string> = {};
    if (step === 0) {
      if (!formData.propertyName.trim()) nextErrors.propertyName = "Requis";
      if (!formData.propertyType) nextErrors.propertyType = "Sélectionner un type";
      if (!formData.description.trim()) nextErrors.description = "Requis";
    }
    if (step === 1) {
      if (!formData.address.trim()) nextErrors.address = "Requis";
      if (!formData.city.trim()) nextErrors.city = "Requis";
      if (!formData.country) nextErrors.country = "Sélectionner un pays";
    }
    if (step === 2) {
      if (formData.bedrooms < 1) nextErrors.bedrooms = "Au minimum 1";
      if (formData.bathrooms < 1) nextErrors.bathrooms = "Au minimum 1";
      if (formData.maxGuests < 1) nextErrors.maxGuests = "Au minimum 1";
    }
    if (step === 3 && imagePreviews.length === 0) {
      nextErrors.imageUrls = "Au moins 1 image requise";
    }
    if (step === 4) {
      if (formData.pricePerNight <= 0) nextErrors.pricePerNight = "Doit être supérieur à 0";
      if (formData.minMonthlyDiscount < discountLimits.min) {
        nextErrors.minMonthlyDiscount = `Minimum ${discountLimits.min}%`;
      }
      if (formData.maxMonthlyDiscount > discountLimits.max) {
        nextErrors.maxMonthlyDiscount = `Maximum ${discountLimits.max}%`;
      }
      if (formData.maxMonthlyDiscount < formData.minMonthlyDiscount) {
        nextErrors.maxMonthlyDiscount = "La remise max doit être supérieure ou égale à la remise min";
      }
      if (formData.availableWeekdays.length === 0) {
        nextErrors.availableWeekdays = "Choisir au moins un jour disponible";
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goToStep(step: number) {
    if (step <= currentStep || validateStep(currentStep)) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function goNext() {
    if (!validateStep(currentStep)) return;
    setCurrentStep((step) => Math.min(STEPS.length - 1, step + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goPrev() {
    setCurrentStep((step) => Math.max(0, step - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateStep(currentStep)) return;
    alert("Propriété créée avec succès ! Elle sera visible après validation admin.");
  }

  function toggleAmenity(amenity: string) {
    updateField(
      "amenities",
      formData.amenities.includes(amenity)
        ? formData.amenities.filter((item) => item !== amenity)
        : [...formData.amenities, amenity],
    );
  }

  function toggleWeekday(day: string) {
    updateField(
      "availableWeekdays",
      formData.availableWeekdays.includes(day)
        ? formData.availableWeekdays.filter((item) => item !== day)
        : [...formData.availableWeekdays, day],
    );
  }

  function addUnavailableDate() {
    if (!blockedDate || formData.unavailableDates.includes(blockedDate)) return;
    updateField("unavailableDates", [...formData.unavailableDates, blockedDate].sort());
    setBlockedDate("");
  }

  function removeUnavailableDate(date: string) {
    updateField(
      "unavailableDates",
      formData.unavailableDates.filter((item) => item !== date),
    );
  }

  return (
    <Container className="py-8 sm:py-12">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-white/80">
          {context === "admin" ? "Administration" : "Devenir hôte"}
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
          Ajouter un logement
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
          Créez une annonce complète. Elle restera en attente jusqu&apos;à validation par un administrateur.
        </p>
      </div>

      <form onSubmit={submitForm} className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-4">
          <StepperTabs currentStep={currentStep} onStepClick={goToStep} />

          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <div className="border-b border-zinc-100 px-5 py-5 dark:border-zinc-800 sm:px-7">
              <h2 className="text-xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                {STEPS[currentStep].label === "Détails" ? "Détails du logement" : STEPS[currentStep].label}
              </h2>
              <p className="mt-1 text-sm text-zinc-500">{STEPS[currentStep].sub}</p>
            </div>

            <div className="grid gap-6 px-5 py-6 sm:px-7">
              {currentStep === 0 && (
                <>
                  <FormField label="Nom de la propriété" required error={errors.propertyName}>
                    <Input
                      value={formData.propertyName}
                      onChange={(event) => updateField("propertyName", event.target.value)}
                      placeholder="Ex : Villa Paradis Cotonou"
                      className="rounded-xl"
                    />
                    <HelpText>
                      Utilisez un titre court et concret. Les voyageurs doivent comprendre le lieu et l&apos;ambiance en un coup d&apos;oeil.
                    </HelpText>
                  </FormField>

                  <FormField label="Type de propriété" required error={errors.propertyType}>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {PROPERTY_TYPES.map((type) => {
                        const Icon = type.icon;
                        const active = formData.propertyType === type.value;
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => updateField("propertyType", type.value)}
                            className={[
                              "flex min-h-16 items-center gap-3 rounded-xl border px-3 py-3 text-left transition",
                              active
  ? "border-zinc-950 bg-zinc-50 shadow-sm dark:border-zinc-200 dark:bg-zinc-900"
  : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900",
                            ].join(" ")}
                          >
                            <span className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
                              <Icon className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <span className="text-sm font-semibold text-zinc-800">{type.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <HelpText>
                      Ce choix sert aux filtres de recherche. S&apos;il y a plusieurs possibilités, choisissez le type principal du logement.
                    </HelpText>
                  </FormField>

                  <FormField
                    label="Description"
                    required
                    hint="Écrivez en Markdown. Le champ grandit automatiquement."
                    error={errors.description}
                  >
                    <MarkdownTextarea
                      value={formData.description}
                      onChange={(value) => updateField("description", value)}
                      placeholder="Ex : **Maison d'hôtes lumineuse** avec piscine, jardin tropical et accueil personnalisé."
                    />
                    <HelpText>
                      Ajoutez les points forts, le quartier, les règles importantes et ce qui rend le séjour simple pour le voyageur.
                    </HelpText>
                  </FormField>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <FormField label="Adresse" required error={errors.address}>
                    <Input
                      value={formData.address}
                      onChange={(event) => updateField("address", event.target.value)}
                      placeholder="Ex : 123 Rue des Palmiers"
                      className="rounded-xl"
                    />
                    <HelpText>
                      L&apos;adresse précise aide l&apos;équipe à valider l&apos;annonce. Elle peut rester privée côté voyageurs avant réservation.
                    </HelpText>
                  </FormField>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Ville" required error={errors.city}>
                      <Input
                        value={formData.city}
                        onChange={(event) => updateField("city", event.target.value)}
                        placeholder="Ex : Cotonou"
                        className="rounded-xl"
                      />
                    </FormField>
                    <FormField label="Code postal" error={errors.zipCode}>
                      <Input
                        value={formData.zipCode}
                        onChange={(event) => updateField("zipCode", event.target.value)}
                        placeholder="Ex : 00229"
                        className="rounded-xl"
                      />
                      <HelpText>Optionnel si votre ville n&apos;utilise pas de code postal.</HelpText>
                    </FormField>
                  </div>
                  <FormField label="Pays" required error={errors.country}>
                    <Select
                      options={COUNTRIES}
                      value={formData.country}
                      onChange={(event) => updateField("country", event.target.value)}
                    />
                    <HelpText>
                      Le pays permet d&apos;appliquer les bonnes devises, zones et règles de validation.
                    </HelpText>
                  </FormField>
                </>
              )}

              {currentStep === 2 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Chambres" error={errors.bedrooms}>
                    <Input
                      type="number"
                      min="1"
                      value={formData.bedrooms}
                      onChange={(event) => updateField("bedrooms", Number.parseInt(event.target.value, 10) || 1)}
                      className="rounded-xl"
                    />
                  </FormField>
                  <FormField label="Salles de bain" error={errors.bathrooms}>
                    <Input
                      type="number"
                      min="1"
                      value={formData.bathrooms}
                      onChange={(event) => updateField("bathrooms", Number.parseInt(event.target.value, 10) || 1)}
                      className="rounded-xl"
                    />
                  </FormField>
                  <FormField label="Voyageurs max" error={errors.maxGuests}>
                    <Input
                      type="number"
                      min="1"
                      value={formData.maxGuests}
                      onChange={(event) => updateField("maxGuests", Number.parseInt(event.target.value, 10) || 1)}
                      className="rounded-xl"
                    />
                  </FormField>
                  <FormField label="Superficie (m²)">
                    <Input
                      type="number"
                      min="0"
                      value={formData.squareFeet}
                      onChange={(event) => updateField("squareFeet", Number.parseInt(event.target.value, 10) || 0)}
                      className="rounded-xl"
                    />
                  </FormField>
                  <div className="sm:col-span-2">
                    <HelpText>
                      Ces valeurs alimentent les filtres voyageurs. Gardez des chiffres réalistes pour éviter les réservations mal qualifiées.
                    </HelpText>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">Équipements</p>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {AMENITIES.map((amenity) => {
                        const Icon = amenity.icon;
                        const active = formData.amenities.includes(amenity.value);
                        return (
                          <button
                            key={amenity.value}
                            type="button"
                            onClick={() => toggleAmenity(amenity.value)}
                            className={[
                              "flex min-h-16 items-center gap-3 rounded-xl border px-3 py-3 text-left transition",
                              active ? "border-zinc-950 bg-zinc-50 shadow-sm" : "border-black/10 bg-white hover:bg-zinc-50",
                            ].join(" ")}
                          >
                            <span className="grid h-9 w-9 place-items-center rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
                              <Icon className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <span className="text-sm font-semibold text-zinc-800">{amenity.label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <HelpText>
                      Les équipements sélectionnés apparaissent comme des badges et améliorent la visibilité dans les recherches filtrées.
                    </HelpText>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      Photos <span className="text-red-500">*</span>
                    </p>
                    <div className="mt-3">
                      <ImageUpload
                        onPreviewsChange={setImagePreviews}
                        onFilesSelected={() => undefined}
                        maxFiles={5}
                        maxSizeInMB={10}
                      />
                    </div>
                    <HelpText>
                      Ajoutez des photos lumineuses de chaque pièce importante. La première photo devient l&apos;image principale de l&apos;annonce.
                    </HelpText>
                    {errors.imageUrls && <p className="mt-2 text-xs text-red-500">{errors.imageUrls}</p>}
                  </div>
                </>
              )}

              {currentStep === 4 && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Devise" required>
                      <Select
                        options={[
                          { value: "XOF", label: "XOF (FCFA)" },
                          { value: "EUR", label: "EUR (€)" },
                          { value: "USD", label: "USD ($)" },
                        ]}
                        value={formData.currency}
                        onChange={(event) => updateField("currency", event.target.value as CurrencyCode)}
                      />
                      <HelpText>Choisissez la devise qui sera affichée aux voyageurs.</HelpText>
                    </FormField>
                    <FormField label="Prix par nuit" required error={errors.pricePerNight}>
                      <Input
                        type="number"
                        min="1"
                        value={formData.pricePerNight || ""}
                        onChange={(event) => updateField("pricePerNight", Number.parseFloat(event.target.value) || 0)}
                        className="rounded-xl"
                      />
                      <HelpText>Indiquez le prix public hors éventuelles promotions ou remises mensuelles.</HelpText>
                    </FormField>
                    <FormField label="Nuits minimum">
                      <Input
                        type="number"
                        min="1"
                        value={formData.minNights}
                        onChange={(event) => updateField("minNights", Number.parseInt(event.target.value, 10) || 1)}
                        className="rounded-xl"
                      />
                      <HelpText>Fixe la durée minimale acceptée pour une réservation.</HelpText>
                    </FormField>
                    <FormField label="Remise min (%)" error={errors.minMonthlyDiscount}>
                      <Input
                        type="number"
                        min={discountLimits.min}
                        max={discountLimits.max}
                        value={formData.minMonthlyDiscount}
                        onChange={(event) =>
                          updateField("minMonthlyDiscount", Number.parseInt(event.target.value, 10) || 0)
                        }
                        className="rounded-xl"
                      />
                      <HelpText>La borne basse de la remise longue durée. Elle est ajustable dans Admin &gt; Devises.</HelpText>
                    </FormField>
                    <FormField label="Remise max (%)" error={errors.maxMonthlyDiscount}>
                      <Input
                        type="number"
                        min={discountLimits.min}
                        max={discountLimits.max}
                        value={formData.maxMonthlyDiscount}
                        onChange={(event) =>
                          updateField("maxMonthlyDiscount", Number.parseInt(event.target.value, 10) || 0)
                        }
                        className="rounded-xl"
                      />
                      <HelpText>Maximum autorisé : {discountLimits.max}%. La remise max doit rester supérieure ou égale à la remise min.</HelpText>
                    </FormField>
                  </div>

                  <div className="rounded-2xl border border-black/5 bg-white p-4 dark:border-zinc-800 dark:bg-black/10">
                    <div className="flex items-start gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100">
                        <CalendarDays className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-zinc-950">
                          Disponibilités <span className="text-red-500">*</span>
                        </p>
                        <p className="mt-1 text-sm leading-6 text-zinc-500">
                          Sélectionnez les jours habituellement ouverts, puis bloquez les dates déjà réservées ou indisponibles.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
                      {WEEKDAYS.map((day) => {
                        const active = formData.availableWeekdays.includes(day.value);
                        return (
                          <button
                            key={day.value}
                            type="button"
                            onClick={() => toggleWeekday(day.value)}
                            title={day.longLabel}
                            className={[
                              "h-11 rounded-xl border text-sm font-semibold transition",
                              active
                                ? "border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-black"
                                : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900"
                                ].join(" ")}
                          >
                            {day.label}
                          </button>
                        );
                      })}
                    </div>
                    {errors.availableWeekdays && (
                      <p className="mt-2 text-xs text-red-500">{errors.availableWeekdays}</p>
                    )}

                    <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                      <Input
                        type="date"
                        value={blockedDate}
                        onChange={(event) => setBlockedDate(event.target.value)}
                        className="rounded-xl"
                        aria-label="Date indisponible"
                      />
                      <Button type="button" variant="secondary" size="sm" onClick={addUnavailableDate}>
                        Bloquer la date
                      </Button>
                    </div>

                    {formData.unavailableDates.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {formData.unavailableDates.map((date) => (
                          <button
                            key={date}
                            type="button"
                            onClick={() => removeUnavailableDate(date)}
                            className="inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-200"
                          >
                            {date}
                            <X className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        ))}
                      </div>
                    )}
                    <AvailabilityCalendar
                      availableWeekdays={formData.availableWeekdays}
                      unavailableDates={formData.unavailableDates}
                    />
                    <input type="hidden" name="availableWeekdays" value={formData.availableWeekdays.join(",")} />
                    <input type="hidden" name="unavailableDates" value={formData.unavailableDates.join(",")} />
                  </div>

                  <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
                    <p className="text-sm font-semibold text-amber-950">Validation</p>
                    <p className="mt-1 text-sm text-amber-800">
                      Statut initial : <span className="font-semibold">En attente de validation admin</span>.
                    </p>
                    <input type="hidden" name="validationStatus" value={formData.validationStatus} />
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-zinc-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <Button type="button" variant="ghost" size="sm" className="justify-start text-zinc-500">
                <Save className="h-4 w-4" aria-hidden="true" />
                Sauvegarder le brouillon
              </Button>

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                <Button type="button" variant="secondary" size="sm" onClick={goPrev} disabled={currentStep === 0}>
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  Retour
                </Button>
                {currentStep === STEPS.length - 1 ? (
                  <Button type="submit" size="sm">Publier</Button>
                ) : (
                  <Button type="button" size="sm" onClick={goNext}>
                    Continuer
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <PreviewPanel
          completion={completion}
          formData={formData}
          imagePreviews={imagePreviews}
          previewLocation={previewLocation}
          selectedType={selectedType?.label ?? "Appartement"}
        />
      </form>
    </Container>
  );
}

function StepperTabs({
  currentStep,
  onStepClick,
}: {
  currentStep: number;
  onStepClick: (step: number) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {STEPS.map((step, index) => {
          const active = currentStep === index;
          const done = currentStep > index;
          return (
            <button
              key={step.label}
              type="button"
              onClick={() => onStepClick(index)}
              className={[
                "flex h-[88px] min-w-0 items-center gap-3 border-r border-zinc-100 px-3 text-left transition last:border-r-0",
                active ? "bg-zinc-950" : done ? "bg-zinc-50 hover:bg-zinc-100" : "hover:bg-zinc-50",
              ].join(" ")}
            >
              <span
                className={[
                  "grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-semibold",
                  active ? "bg-white text-zinc-950" : done ? "bg-emerald-500 text-white" : "bg-zinc-100 text-zinc-500",
                ].join(" ")}
              >
                {done ? <Check className="h-4 w-4" aria-hidden="true" /> : index + 1}
              </span>
              <span className="hidden min-w-0 flex-col md:flex">
                <span className={active ? "truncate text-sm font-semibold text-white" : "truncate text-sm font-semibold text-zinc-800"}>
                  {step.label}
                </span>
                <span className={active ? "truncate text-sm text-zinc-400" : "truncate text-sm text-zinc-500"}>
                  {step.sub}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PreviewPanel({
  completion,
  formData,
  imagePreviews,
  previewLocation,
  selectedType,
}: {
  completion: number;
  formData: PropertyFormData;
  imagePreviews: string[];
  previewLocation: string;
  selectedType: string;
}) {
  const checklist = [
    { label: "Nom de la propriété", done: !!formData.propertyName },
    { label: "Type de propriété", done: !!formData.propertyType },
    { label: "Description", done: formData.description.length > 20 },
    { label: "Localisation", done: !!formData.city && !!formData.country },
    { label: "Photos", done: imagePreviews.length > 0 },
    { label: "Prix", done: formData.pricePerNight > 0 },
    { label: "Disponibilités", done: formData.availableWeekdays.length > 0 },
  ];

  return (
    <aside className="order-first lg:order-none lg:sticky lg:top-24 lg:self-start">
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
          <span className="text-sm text-zinc-500">Complétion</span>
          <span className="text-sm font-semibold text-zinc-950">{completion}%</span>
        </div>

        <div
          className="relative flex h-44 flex-col items-center justify-center gap-2 bg-zinc-100 bg-cover bg-center"
          style={imagePreviews[0] ? { backgroundImage: `url(${imagePreviews[0]})` } : undefined}
        >
          {!imagePreviews[0] && (
            <>
              <Camera className="h-8 w-8 text-zinc-300" aria-hidden="true" />
              <p className="text-xs text-zinc-400">Photos à l&apos;étape 4</p>
            </>
          )}
          <div className="absolute left-3 top-3 rounded-full bg-black/70 px-2 py-1 text-[10px] font-semibold text-white">
            {imagePreviews.length} / 5
          </div>
          <div className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white text-zinc-700 shadow-sm">
            <Upload className="h-4 w-4" aria-hidden="true" />
          </div>
        </div>

        <div className="p-4">
          <p className="text-sm font-semibold leading-snug text-zinc-950">
            {formData.propertyName || "Titre du logement"}
          </p>
          <p className="mt-1 flex items-center gap-1 text-xs text-zinc-400">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {previewLocation}
          </p>

          <div className="my-3 h-px bg-zinc-100" />

          <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold text-zinc-950">
              {formData.pricePerNight || 0} {formData.currency}
              <span className="text-xs font-normal text-zinc-400"> / nuit</span>
            </span>
            <span className="text-xs text-zinc-400">4.8 (12)</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <PreviewBadge>En attente</PreviewBadge>
            <PreviewBadge>{selectedType}</PreviewBadge>
            {formData.amenities.slice(0, 2).map((amenity) => (
              <PreviewBadge key={amenity}>{amenity}</PreviewBadge>
            ))}
            {formData.availableWeekdays.length > 0 && (
              <PreviewBadge>{`${formData.availableWeekdays.length} jours ouverts`}</PreviewBadge>
            )}
          </div>
        </div>

        <div className="border-t border-zinc-100 px-4 py-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
            À compléter
          </p>
          <div className="grid gap-1.5">
            {checklist.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span
                  className={[
                    "grid h-4 w-4 place-items-center rounded-full text-[10px]",
                    item.done ? "bg-emerald-100 text-emerald-600" : "bg-zinc-100 text-zinc-300",
                  ].join(" ")}
                >
                  {item.done ? <Check className="h-3 w-3" aria-hidden="true" /> : "○"}
                </span>
                <span className={item.done ? "text-xs text-zinc-400 line-through" : "text-xs text-zinc-600"}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function AvailabilityCalendar({
  availableWeekdays,
  unavailableDates,
}: {
  availableWeekdays: string[];
  unavailableDates: string[];
}) {
  const days = useMemo(() => buildCalendarDays(), []);
  const blocked = new Set(unavailableDates);
  const available = new Set(availableWeekdays.map((day) => WEEKDAY_INDEX[day]));
  const monthLabel = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(new Date());

  return (
    <div className="mt-5 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-zinc-950">Calendrier des disponibilités</p>
        <p className="text-xs font-medium text-zinc-500 capitalize">{monthLabel}</p>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1.5">
        {["D", "L", "M", "M", "J", "V", "S"].map((day, index) => (
          <span key={`${day}-${index}`} className="text-center text-[10px] font-semibold text-zinc-400">
            {day}
          </span>
        ))}
        {days.map((day) => {
          const value = toDateInputValue(day);
          const isBlocked = blocked.has(value);
          const isAvailable = available.has(day.getDay());
          const isCurrentMonth = day.getMonth() === new Date().getMonth();

          return (
            <span
              key={value}
              title={`${value} - ${isBlocked ? "bloqué" : isAvailable ? "libre" : "fermé"}`}
              className={[
                "aspect-square rounded-[5px] border text-[10px] font-semibold",
                isBlocked
                  ? "border-red-300 bg-red-500 text-white"
                  : isAvailable
                    ? "border-emerald-200 bg-emerald-400 text-emerald-950"
                    : "border-black/10 bg-white text-zinc-300",
                isCurrentMonth ? "" : "opacity-35",
              ].join(" ")}
            >
              <span className="sr-only">{value}</span>
            </span>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs font-medium text-zinc-500">
        <LegendDot className="bg-emerald-400" label="Libre" />
        <LegendDot className="bg-red-500" label="Bloqué" />
        <LegendDot  label="Fermé" bordered />
      </div>
    </div>
  );
}

function LegendDot({ className, label, bordered = false }: { className?: string; label: string; bordered?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className={cn("h-3 w-3 rounded-[4px]", bordered ? "border border-black/10" : "", className)} aria-hidden="true" />
      {label}
    </span>
  );
}

function buildCalendarDays() {
  const today = new Date();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
  const start = new Date(firstDay);
  start.setDate(firstDay.getDate() - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function normalizeDiscount(value: unknown, fallback: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(DEFAULT_DISCOUNT_LIMITS.max, Math.max(DEFAULT_DISCOUNT_LIMITS.min, parsed));
}

function PreviewBadge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-300">
      {children}
    </span>
  );
}

function HelpText({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 rounded-xl bg-zinc-50 px-3 py-2 text-xs leading-5 text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
      {children}
    </p>
  );
}
