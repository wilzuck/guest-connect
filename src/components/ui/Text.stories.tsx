import { Text, Heading, Eyebrow } from "./Text";

const meta = {
  title: "Atoms/Text",
  component: Text,
};

export default meta;

export function Tones() {
  return (
    <div className="space-y-2">
      <Text tone="default" weight="semibold">Tone default — texte principal</Text>
      <Text tone="muted">Tone muted — texte secondaire</Text>
      <Text tone="subtle" size="sm">Tone subtle — légendes, hints</Text>
      <Text tone="brand" weight="semibold">Tone brand</Text>
      <Text tone="danger">Tone danger</Text>
      <Text tone="success">Tone success</Text>
    </div>
  );
}

export function Sizes() {
  return (
    <div className="space-y-2">
      <Text size="xs">Extra small (xs)</Text>
      <Text size="sm">Small (sm)</Text>
      <Text size="base">Base</Text>
      <Text size="lg">Large (lg)</Text>
      <Text size="xl">Extra large (xl)</Text>
    </div>
  );
}

export function Weights() {
  return (
    <div className="space-y-2">
      <Text weight="normal">Normal</Text>
      <Text weight="medium">Medium</Text>
      <Text weight="semibold">Semibold</Text>
      <Text weight="bold">Bold</Text>
    </div>
  );
}

export function Headings() {
  return (
    <div className="space-y-3">
      <Eyebrow>Eyebrow</Eyebrow>
      <Heading level={1}>Heading level 1</Heading>
      <Heading level={2}>Heading level 2</Heading>
      <Heading level={3}>Heading level 3</Heading>
      <Heading level={4}>Heading level 4</Heading>
      <Heading level={5}>Heading level 5</Heading>
      <Heading level={6}>Heading level 6</Heading>
    </div>
  );
}
