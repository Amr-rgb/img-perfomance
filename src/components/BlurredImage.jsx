import { useEffect, useState } from "react";

const loadImageWithPromise = (src) =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.src = src;
  });

export const BlurredImage = ({ src, base64 }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    awaitImage();
  });

  const awaitImage = async () => {
    await loadImageWithPromise(src);
    setLoaded(true);
  };

  return (
    <>
      <img
        className={`absolute duration-500 ${loaded ? "" : "opacity-0"}`}
        src={src}
        alt=""
      />
      <img
        className={`duration-500 ${loaded ? "opacity-0" : ""}`}
        src={base64}
        alt=""
      />
    </>
  );
};
