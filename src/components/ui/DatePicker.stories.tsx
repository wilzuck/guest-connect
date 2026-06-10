import { useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { DatePicker } from "./DatePicker";

const messages = {
  datePicker: { clear: "Effacer", done: "Terminer", close: "Fermer" },
};

const meta = {
  title: "Atoms/DatePicker",
  component: DatePicker,
};

export default meta;

export function Default() {
  return (
    <NextIntlClientProvider locale="fr" messages={messages} timeZone="Europe/Paris">
      <DatePickerDemo />
    </NextIntlClientProvider>
  );
}

function DatePickerDemo() {
  const [value, setValue] = useState<string | undefined>();
  return (
    <div className="max-w-xs">
      <DatePicker value={value} onChange={setValue} label="Date d'arrivée" placeholder="Choisir une date" />
    </div>
  );
}
