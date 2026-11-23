import { MessageCircle } from "lucide-react";
import { siteConfig } from "../../lib/siteConfig";

export default function WhatsAppFloatingButton() {
  const phone = siteConfig.whatsappNumber;

  if (!phone) return null;

  const message = encodeURIComponent(
    "Hello Save Eco Organic, I would like to know more about your products.",
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact Save Eco on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#17652b] text-white shadow-lg transition hover:scale-105 hover:bg-[#125322]"
    >
      <MessageCircle size={25} />
    </a>
  );
}