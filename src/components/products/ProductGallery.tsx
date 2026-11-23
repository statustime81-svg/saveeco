import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type ProductGalleryProps = { images?: string[]; name: string };

export default function ProductGallery({ images = [], name }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const current = images[active];
  const move = (direction: number) => setActive((index) => (index + direction + images.length) % images.length);
  return <>
    <div className="overflow-hidden rounded-2xl bg-primary-light">
      <button type="button" className="block aspect-square w-full" onClick={() => current && setLightbox(true)} aria-label={`View ${name} image larger`}>
        {current ? <img src={current} alt={name} className="h-full w-full object-cover" /> : <div className="grid h-full place-items-center text-sm text-muted">Product image coming soon</div>}
      </button>
    </div>
    {images.length > 1 && <div className="mt-3 flex gap-3 overflow-x-auto">{images.map((image, index) => <button key={`${image}-${index}`} type="button" onClick={() => setActive(index)} aria-label={`Show image ${index + 1}`} aria-pressed={active === index} className={`size-20 shrink-0 overflow-hidden rounded-lg border-2 ${active === index ? "border-primary" : "border-transparent"}`}><img src={image} alt="" className="h-full w-full object-cover" /></button>)}</div>}
    {lightbox && current && <div role="dialog" aria-modal="true" aria-label={`${name} image`} className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4" onClick={() => setLightbox(false)}><button type="button" aria-label="Close image" className="absolute right-5 top-5 text-white"><X /></button><button type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); move(-1); }} className="absolute left-4 rounded-full bg-white/15 p-3 text-white"><ChevronLeft /></button><img src={current} alt={name} className="max-h-[88vh] max-w-[88vw] object-contain" onClick={(event) => event.stopPropagation()} /><button type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); move(1); }} className="absolute right-4 rounded-full bg-white/15 p-3 text-white"><ChevronRight /></button></div>}
  </>;
}
