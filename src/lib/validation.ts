import { z } from "zod";

const phoneSchema = z
  .string()
  .trim()
  .min(7, "Phone number is too short")
  .max(20, "Phone number is too long")
  .regex(/^[+()\d\s-]+$/, "Enter a valid phone number");

const consentSchema = z.boolean().refine((value) => value, {
  message: "Consent is required to submit this form",
});

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  phone: phoneSchema,
  email: z.string().trim().email("Enter a valid email address"),
  subject: z.string().trim().min(2, "Enter a subject"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
  consent: consentSchema,
});

export const directPartnerSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  phone: phoneSchema,
  email: z.string().trim().email("Enter a valid email address"),
  state: z.string().trim().min(2, "Enter your state"),
  city: z.string().trim().min(2, "Enter your city"),
  sponsor_id: z.string().trim().optional(),
  consent: consentSchema,
});

export const channelPartnerSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  firm_name: z.string().trim().min(2, "Enter your firm name"),
  phone: phoneSchema,
  email: z.string().trim().email("Enter a valid email address"),
  state: z.string().trim().min(2, "Enter your state"),
  district: z.string().trim().min(2, "Enter your district"),
  address: z.string().trim().min(5, "Enter your address"),
  experience: z.string().trim().min(2, "Enter your experience"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
  gst_number: z.string().trim().optional(),
  consent: consentSchema,
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type DirectPartnerValues = z.infer<typeof directPartnerSchema>;
export type ChannelPartnerValues = z.infer<typeof channelPartnerSchema>;