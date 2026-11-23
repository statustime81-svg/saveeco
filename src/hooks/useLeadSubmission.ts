import { useMutation } from "@tanstack/react-query";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import type {
  ContactFormValues,
  DirectPartnerValues,
  ChannelPartnerValues,
} from "../lib/validation";

type DirectLead = DirectPartnerValues & { partner_type: "direct" };
type ChannelLead = ChannelPartnerValues & { partner_type: "channel" };
type PartnerLeadValues = DirectLead | ChannelLead;

async function submitContact(values: ContactFormValues) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Form submission is not configured yet.");
  }

  const { error } = await supabase.from("enquiries").insert({
    name: values.name,
    phone: values.phone,
    email: values.email,
    subject: values.subject,
    message: values.message,
    consent: values.consent,
  });

  if (error) throw error;
}

async function submitPartner(values: PartnerLeadValues) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Partner registration is not configured yet.");
  }

  if (values.partner_type === "direct") {
    const { error } = await supabase.from("partner_leads").insert(values);
    if (error) throw error;
    return;
  }

  const { error } = await supabase.from("partner_leads").insert(values);
  if (error) throw error;
}

export function useLeadSubmission() {
  return {
    submitContact: useMutation({ mutationFn: submitContact }),
    submitPartner: useMutation({ mutationFn: submitPartner }),
  };
}