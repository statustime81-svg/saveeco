const rawWhatsAppNumber = import.meta.env.VITE_WHATSAPP_NUMBER ?? "";

export const siteConfig = {
  name: "Save Eco Organic",
  url: import.meta.env.VITE_SITE_URL || "https://www.saveeco.in",

  phonePrimary: "0612-2386057",
  phoneSecondary: "3500490",
  email: "saveecoorganic@gmail.com",
  address: "Road No. 10, Sanjay Gandhi Nagar, Patna, Bihar 800026",

  whatsappNumber: rawWhatsAppNumber.replace(/\D/g, ""),

  externalLinks: {
    directPartnerJoin: "https://app.saveeco.in/join_now/",
    memberLogin: "https://app.saveeco.in/login",
    channelPartnerLogin: "https://app.saveeco.in/adminapp/login/",
  },
  socialLinks: {
    facebook: "https://www.facebook.com/saveecoorganic/",
    x: "https://x.com/saveecoorganic?lang=en",
    youtube: "https://www.youtube.com/@saveecoorganicpvt.ltd.offi1592",
  },
} as const;
