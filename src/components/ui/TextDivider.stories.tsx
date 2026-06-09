import { TextDivider } from "./TextDivider";

const meta = {
  title: "Atoms/TextDivider",
  component: TextDivider,
};

export default meta;

export function Default() {
  return (
    <div className="w-full max-w-md">
      <TextDivider>Ou continuer avec</TextDivider>
    </div>
  );
}
