import { useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { DateRangePicker } from "./DateRangePicker";

const messages = {
  dateRangePicker: {
    title: "Choisir des dates",
    selectedRange: "Plage sélectionnée",
    placeholder: "—",
    clear: "Effacer",
    done: "Terminer",
    close: "Fermer",
  },
};

const meta = {
  title: "Atoms/DateRangePicker",
  component: DateRangePicker,
};

export default meta;

export function Default() {
  return (
    <NextIntlClientProvider locale="fr" messages={messages} timeZone="Europe/Paris">
      <RangeDemo />
    </NextIntlClientProvider>
  );
}

export function Bordered() {
  return (
    <NextIntlClientProvider locale="fr" messages={messages} timeZone="Europe/Paris">
      <RangeDemo fieldVariant="bordered" />
    </NextIntlClientProvider>
  );
}

function RangeDemo({ fieldVariant }: { fieldVariant?: "plain" | "bordered" }) {
  const [range, setRange] = useState<{ from?: string; to?: string }>({});
  return (
    <div className="max-w-md">
      <DateRangePicker
        value={range}
        onChange={setRange}
        startLabel="Arrivée"
        endLabel="Départ"
        fieldVariant={fieldVariant}
      />
    </div>
  );
}
