import { BlurredImage } from "./BlurredImage";

export const BlogCard = ({ src, base64, idx }) => {
  return (
    <div className="m-8 space-y-6">
      <div className="w-full aspect-[1/1.3] relative cursor-pointer group">
        <div className="absolute w-full h-full border-2 border-blue-500 group-hover:scale-105 origin-center duration-200"></div>
        <BlurredImage src={src} base64={base64} />
      </div>

      <p className="font-semibold text-xl">blog number {idx}</p>
    </div>
  );
};
