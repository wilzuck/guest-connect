import { RadioGroup } from "./RadioGroup";

const meta = { title: "Atoms/RadioGroup", component: RadioGroup };
export default meta;

export function Default() {
  return (
    <RadioGroup
      name="status"
      defaultValue="published"
      options={[
        { value: "draft", label: "Brouillon", description: "Invisible au public." },
        { value: "published", label: "Publié", description: "Visible sur le site." },
      ]}
    />
  );
}
