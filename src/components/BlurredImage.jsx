import { useEffect, useRef, useState } from "react";

const loadImageWithPromise = (src) =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = resolve;
    image.src = src;
  });

export const BlurredImage = ({ src, base64, imgClassName, baseClassName }) => {
  const [loaded, setLoaded] = useState(false);
  const img = useRef();
  const [imgOffset, setImgOffset] = useState();

  useEffect(() => {
    setImgOffset(img.current.parentNode.offsetTop);
    lazyload();
  });

  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);

  function lazyload() {
    const scrollTop = window.pageYOffset;

    if (imgOffset < window.innerHeight + scrollTop) {
      awaitImage();
      document.removeEventListener("scroll", lazyload);
      window.removeEventListener("resize", lazyload);
      window.removeEventListener("orientationChange", lazyload);
    }
  }

  const awaitImage = async () => {
    await loadImageWithPromise(src);
    setTimeout(() => setLoaded(true), 500);
  };

  return (
    <>
      <img
        ref={img}
        className={`${imgClassName ? imgClassName : ""} absolute duration-500 ${
          loaded ? "" : "opacity-0"
        }`}
        loading="lazy"
        src={loaded ? src : null}
        alt=""
      />

      <div className="w-full h-full overflow-hidden">
        <img
          className={`${baseClassName ? baseClassName : ""} duration-500 ${
            loaded ? "opacity-0" : ""
          }`}
          src={base64}
          alt=""
        />
      </div>
    </>
  );
};
