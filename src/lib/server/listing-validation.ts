type ValidationResult =
  | { ok: true; data: Record<string, unknown> }
  | { ok: false; errors: Record<string, string> };

const SHORT_TEXT_MAX = 250;
const VALIDATION_STATUSES = new Set(["pending", "approved", "rejected"]);

export function validateListingPayload(
  payload: Record<string, unknown>,
  mode: "create" | "update",
): ValidationResult {
  const errors: Record<string, string> = {};
  const data: Record<string, unknown> = {};

  assignText(data, errors, payload, "title", { required: mode === "create", maxLength: SHORT_TEXT_MAX });
  assignText(data, errors, payload, "location", { required: mode === "create", maxLength: SHORT_TEXT_MAX });
  assignText(data, errors, payload, "cityId", { maxLength: SHORT_TEXT_MAX });
  assignText(data, errors, payload, "categoryId", { maxLength: SHORT_TEXT_MAX });
  assignText(data, errors, payload, "currency", { maxLength: 12 });
  assignText(data, errors, payload, "imageUrl", { maxLength: 600 });
  assignText(data, errors, payload, "shortDescription", { maxLength: 1200 });

  assignNumber(data, errors, payload, "pricePerNight", { required: mode === "create", min: 1, max: 999999 });
  assignNumber(data, errors, payload, "rating", { min: 0, max: 5 });
  assignNumber(data, errors, payload, "reviewCount", { min: 0, max: 999999 });
  assignNumber(data, errors, payload, "bedrooms", { min: 1, max: 50 });
  assignNumber(data, errors, payload, "bathrooms", { min: 1, max: 50 });
  assignNumber(data, errors, payload, "maxGuests", { min: 1, max: 100 });
  assignNumber(data, errors, payload, "squareFeet", { min: 0, max: 100000 });

  assignStringArray(data, errors, payload, "serviceIds", SHORT_TEXT_MAX);
  assignStringArray(data, errors, payload, "amenities", SHORT_TEXT_MAX);
  assignStringArray(data, errors, payload, "availableWeekdays", 12);
  assignStringArray(data, errors, payload, "unavailableDates", 24);

  const status = typeof payload.validationStatus === "string" ? payload.validationStatus : undefined;
  if (status && VALIDATION_STATUSES.has(status)) {
    data.validationStatus = status;
  } else if (status) {
    errors.validationStatus = "Statut de validation invalide";
  } else if (mode === "create") {
    data.validationStatus = "pending";
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data };
}

function assignText(
  data: Record<string, unknown>,
  errors: Record<string, string>,
  payload: Record<string, unknown>,
  key: string,
  options: { required?: boolean; maxLength: number },
) {
  const value = payload[key];
  if (value === undefined || value === null || value === "") {
    if (options.required) errors[key] = "Champ requis";
    return;
  }
  if (typeof value !== "string") {
    errors[key] = "Texte attendu";
    return;
  }
  const text = value.trim();
  if (options.required && !text) errors[key] = "Champ requis";
  if (text.length > options.maxLength) errors[key] = `Maximum ${options.maxLength} caractères`;
  data[key] = text;
}

function assignNumber(
  data: Record<string, unknown>,
  errors: Record<string, string>,
  payload: Record<string, unknown>,
  key: string,
  options: { required?: boolean; min: number; max: number },
) {
  const value = payload[key];
  if (value === undefined || value === null || value === "") {
    if (options.required) errors[key] = "Champ requis";
    return;
  }
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed)) {
    errors[key] = "Nombre attendu";
    return;
  }
  if (parsed < options.min) errors[key] = `Minimum ${options.min}`;
  if (parsed > options.max) errors[key] = `Maximum ${options.max}`;
  data[key] = parsed;
}

function assignStringArray(
  data: Record<string, unknown>,
  errors: Record<string, string>,
  payload: Record<string, unknown>,
  key: string,
  maxItemLength: number,
) {
  const value = payload[key];
  if (value === undefined || value === null) return;
  if (!Array.isArray(value)) {
    errors[key] = "Liste attendue";
    return;
  }
  const items = value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
  if (items.length !== value.length) errors[key] = "Tous les éléments doivent être du texte";
  if (items.some((item) => item.length > maxItemLength)) errors[key] = `Chaque élément doit faire moins de ${maxItemLength} caractères`;
  data[key] = items;
}
