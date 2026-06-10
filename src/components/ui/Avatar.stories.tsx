import { Avatar } from "./Avatar";

const meta = {
  title: "Atoms/Avatar",
  component: Avatar,
};

export default meta;

export function Sizes() {
  return (
    <div className="flex items-center gap-4">
      <Avatar name="Amelia Bohold" size="sm" />
      <Avatar name="Marc Hounsou" size="md" />
      <Avatar name="Sofia Martin" size="lg" />
    </div>
  );
}

export function SingleName() {
  return (
    <div className="flex items-center gap-4">
      <Avatar name="GuestConnect" />
      <Avatar name="A" />
    </div>
  );
}

export function Dark() {
  return (
    <div className="dark rounded-2xl bg-zinc-950 p-6">
      <div className="flex items-center gap-4">
        <Avatar name="Amelia Bohold" size="sm" />
        <Avatar name="Marc Hounsou" size="md" />
        <Avatar name="Sofia Martin" size="lg" />
      </div>
    </div>
  );
}
