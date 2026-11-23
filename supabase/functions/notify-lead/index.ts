import { corsHeaders } from "../_shared/cors.ts";

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

  const expectedSecret = Deno.env.get("NOTIFY_LEAD_SECRET");
  const suppliedSecret = request.headers.get("x-notify-secret");

  if (!expectedSecret || suppliedSecret !== expectedSecret) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401, headers: jsonHeaders },
    );
  }

  try {
    const { formType, lead } = await request.json();
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const recipient = Deno.env.get("LEAD_NOTIFICATION_EMAIL");
    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL");

    if (!resendKey || !recipient || !fromEmail) {
      return Response.json(
        { error: "Email notification is not configured." },
        { status: 503, headers: jsonHeaders },
      );
    }

    const subject =
      formType === "partner"
        ? `New Save Eco partner lead: ${lead?.name ?? "Unknown"}`
        : `New Save Eco enquiry: ${lead?.name ?? "Unknown"}`;

    const details = Object.entries(lead ?? {})
      .map(([key, value]) => `${key}: ${String(value ?? "")}`)
      .join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipient],
        subject,
        text: details,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Resend delivery failed:", errorText);
      return Response.json(
        { error: "Email notification delivery failed." },
        { status: 502, headers: jsonHeaders },
      );
    }

    return Response.json({ success: true }, { headers: jsonHeaders });
  } catch (error) {
    console.error("Notification error:", error);
    return Response.json(
      { error: "Notification could not be sent." },
      { status: 500, headers: jsonHeaders },
    );
  }
});