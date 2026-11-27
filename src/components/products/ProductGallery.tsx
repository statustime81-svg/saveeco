import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

type ProductGalleryProps = {
  images?: string[] | null;
  name: string;
};

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const galleryImages = (images ?? []).filter((image) => typeof image === "string" && image.trim().length > 0);
  const imagesKey = galleryImages.join("|");
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
    setImageFailed(false);
  }, [imagesKey]);

  const showImage = galleryImages.length > 0 && !imageFailed;
  const selectImage = (index: number) => {
    setActiveIndex(index);
    setImageFailed(false);
  };
  const showPrevious = () => selectImage((activeIndex - 1 + galleryImages.length) % galleryImages.length);
  const showNext = () => selectImage((activeIndex + 1) % galleryImages.length);

  return (
    <div className="mx-auto w-full max-w-[560px]">
      <div className="group relative aspect-square w-full overflow-hidden rounded-[1.1rem] bg-[#edf4e7] sm:aspect-[1.18/1] sm:rounded-[1.4rem]">
        {showImage ? (
          <img
            key={galleryImages[activeIndex]}
            src={galleryImages[activeIndex]}
            alt={`${name} product image ${activeIndex + 1}`}
            className="absolute inset-0 h-full w-full object-contain p-3 sm:p-5"
            onError={() => setImageFailed(true)}
            fetchPriority="high"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_35%,#fffefa,#e8f2df)]">
            <div className="flex flex-col items-center gap-2 text-[#66a24a]">
              <ImageIcon size={34} strokeWidth={1.4} aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-[.16em]">Product image coming soon</span>
            </div>
          </div>
        )}

        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Show previous product image"
              className="absolute left-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/90 text-[#24592e] opacity-0 shadow-md transition hover:bg-white group-hover:opacity-100 focus:opacity-100"
            >
              <ChevronLeft size={19} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Show next product image"
              className="absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/90 text-[#24592e] opacity-0 shadow-md transition hover:bg-white group-hover:opacity-100 focus:opacity-100"
            >
              <ChevronRight size={19} aria-hidden="true" />
            </button>
            <span className="absolute right-3 top-3 rounded-full border border-white/60 bg-white/85 px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#31563a] shadow-sm backdrop-blur">
              {activeIndex + 1} / {galleryImages.length}
            </span>
          </>
        )}
      </div>

      {galleryImages.length > 1 && (
        <div className="mt-2.5 flex gap-2 overflow-x-auto pb-1" aria-label="Product image thumbnails">
          {galleryImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => selectImage(index)}
              aria-label={`Show product image ${index + 1}`}
              aria-pressed={activeIndex === index}
              className={`relative size-[58px] shrink-0 overflow-hidden rounded-lg border-2 bg-white transition sm:size-[66px] ${activeIndex === index ? "border-[#4abd00] shadow-[0_0_0_2px_rgba(74,189,0,.12)]" : "border-white/80 opacity-75 hover:opacity-100"}`}
            >
              <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
