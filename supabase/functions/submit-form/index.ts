import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";
import {
  cleanText,
  isValidEmail,
  isValidPhone,
  validateConsent,
} from "../_shared/validation.ts";

const jsonHeaders = {
  ...corsHeaders,
  "Content-Type": "application/json",
};

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (request.method !== "POST") {
    return Response.json(
      { error: "Method not allowed" },
      { status: 405, headers: jsonHeaders },
    );
  }

  try {
    const body = await request.json();
    const formType = cleanText(body.formType, 30);
    const values = body.values ?? {};

    // Honeypot field: bots that fill it receive a harmless success response.
    if (cleanText(values.website, 200)) {
      return Response.json({ success: true }, { headers: jsonHeaders });
    }

    const name = cleanText(values.name, 120);
    const phone = cleanText(values.phone, 30);
    const email = cleanText(values.email, 180);
    const consent = validateConsent(values.consent);

    if (!name || !isValidPhone(phone) || !consent) {
      return Response.json(
        { error: "Please check the required form fields." },
        { status: 400, headers: jsonHeaders },
      );
    }

    if (email && !isValidEmail(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400, headers: jsonHeaders },
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !anonKey) {
      throw new Error("Supabase function environment is not configured.");
    }

    const supabase = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false },
    });

    let table: "enquiries" | "partner_leads";
    let payload: Record<string, unknown>;

    if (formType === "enquiry") {
      const message = cleanText(values.message, 3000);

      if (!message) {
        return Response.json(
          { error: "Please enter your message." },
          { status: 400, headers: jsonHeaders },
        );
      }

      table = "enquiries";
      payload = {
        name,
        phone,
        email: email || null,
        subject: cleanText(values.subject, 200) || null,
        message,
        consent,
      };
    } else if (formType === "partner") {
      const partnerType = cleanText(values.partner_type, 20);

      if (partnerType !== "direct" && partnerType !== "channel") {
        return Response.json(
          { error: "Invalid partner type." },
          { status: 400, headers: jsonHeaders },
        );
      }

      table = "partner_leads";
      payload = {
        partner_type: partnerType,
        name,
        phone,
        email: email || null,
        firm_name: cleanText(values.firm_name, 200) || null,
        state: cleanText(values.state, 120) || null,
        city: cleanText(values.city, 120) || null,
        district: cleanText(values.district, 120) || null,
        address: cleanText(values.address, 1000) || null,
        gst_number: cleanText(values.gst_number, 40) || null,
        experience: cleanText(values.experience, 500) || null,
        sponsor_id: cleanText(values.sponsor_id, 100) || null,
        message: cleanText(values.message, 2000) || null,
        consent,
      };
    } else {
      return Response.json(
        { error: "Invalid form type." },
        { status: 400, headers: jsonHeaders },
      );
    }

    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select("id, created_at")
      .single();

    if (error) throw error;

    // Notification is best-effort. The lead remains saved if email delivery fails.
    const notifySecret = Deno.env.get("NOTIFY_LEAD_SECRET");
    if (notifySecret) {
      try {
        await fetch(`${supabaseUrl}/functions/v1/notify-lead`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-notify-secret": notifySecret,
          },
          body: JSON.stringify({ formType, lead: payload }),
        });
      } catch (notificationError) {
        console.error("Lead saved, but notification failed:", notificationError);
      }
    }

    return Response.json(
      { success: true, leadId: data.id },
      { headers: jsonHeaders },
    );
  } catch (error) {
    console.error("Form submission error:", error);
    return Response.json(
      { error: "The form could not be submitted. Please try again." },
      { status: 500, headers: jsonHeaders },
    );
  }
});