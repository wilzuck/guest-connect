import { NextIntlClientProvider } from "next-intl";
import { Pagination } from "./Pagination";

const messages = {
  pagination: {
    previous: "Précédent",
    next: "Suivant",
    goToPage: "Aller à la page {page}",
    page: "Page {page}",
  },
};

function withIntl(children: React.ReactNode) {
  return (
    <NextIntlClientProvider locale="fr" messages={messages} timeZone="Europe/Paris">
      {children}
    </NextIntlClientProvider>
  );
}

const meta = {
  title: "Atoms/Pagination",
  component: Pagination,
};

export default meta;

export function ManyPages() {
  return withIntl(
    <Pagination page={3} totalPages={10} hrefForPage={(page) => `?page=${page}`} />,
  );
}

export function FewPages() {
  return withIntl(
    <Pagination page={1} totalPages={4} hrefForPage={(page) => `?page=${page}`} />,
  );
}

export function FirstPage() {
  return withIntl(
    <Pagination page={1} totalPages={10} hrefForPage={(page) => `?page=${page}`} />,
  );
}

export function LastPage() {
  return withIntl(
    <Pagination page={10} totalPages={10} hrefForPage={(page) => `?page=${page}`} />,
  );
}
