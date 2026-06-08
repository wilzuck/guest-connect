import { fr } from "date-fns/locale";
import { Calendar } from "./Calendar";

const meta = {
  title: "Atoms/Calendar",
  component: Calendar,
};

export default meta;

export function SingleMonth() {
  return (
    <div className="inline-block rounded-2xl border border-black/10 bg-white p-3">
      <Calendar
        mode="single"
        selected={new Date(2026, 5, 8)}
        locale={fr}
        weekStartsOn={1}
        fixedWeeks
      />
    </div>
  );
}
