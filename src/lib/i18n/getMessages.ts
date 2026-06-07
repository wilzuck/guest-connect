type Locale = "fr" | "en";
type Messages = Record<string, unknown>;

const namespaces = [
  "nav",
  "footer",
  "mobileMenu",
  "servicesPage",
  "dashboardFooter",
] as const;

type Namespace = (typeof namespaces)[number];

async function loadNamespace(locale: Locale, namespace: Namespace): Promise<Messages> {
  switch (`${locale}:${namespace}`) {
    case "fr:nav":
      return (await import("../../../messages/fr/nav.json")).default;
    case "fr:footer":
      return (await import("../../../messages/fr/footer.json")).default;
    case "fr:mobileMenu":
      return (await import("../../../messages/fr/mobileMenu.json")).default;
    case "fr:servicesPage":
      return (await import("../../../messages/fr/servicesPage.json")).default;
    case "fr:dashboardFooter":
      return (await import("../../../messages/fr/dashboardFooter.json")).default;
    case "en:nav":
      return (await import("../../../messages/en/nav.json")).default;
    case "en:footer":
      return (await import("../../../messages/en/footer.json")).default;
    case "en:mobileMenu":
      return (await import("../../../messages/en/mobileMenu.json")).default;
    case "en:servicesPage":
      return (await import("../../../messages/en/servicesPage.json")).default;
    case "en:dashboardFooter":
      return (await import("../../../messages/en/dashboardFooter.json")).default;
    default:
      return {};
  }
}

export async function getMessages(locale: Locale) {
  const base = (await import(`../../../messages/${locale}.json`)).default;
  const entries = await Promise.all(
    namespaces.map(async (namespace) => [
      namespace,
      await loadNamespace(locale, namespace),
    ]),
  );

  return {
    ...base,
    ...Object.fromEntries(entries),
  };
}
