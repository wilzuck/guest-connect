import { ImageUpload } from "./ImageUpload";

const meta = {
  title: "Atoms/ImageUpload",
  component: ImageUpload,
};

export default meta;

export function Dropzone() {
  return (
    <div className="max-w-2xl">
      <ImageUpload maxFiles={5} maxSizeInMB={10} />
    </div>
  );
}
