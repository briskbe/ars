import { NextResponse } from "next/server";
import { getWriteClient } from "../../../sanity/lib/writeClient";

export const runtime = "nodejs";

function str(value: FormDataEntryValue | null, max = 2000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let data: {
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    phone: string;
    service: string;
    message: string;
  };

  const contentType = request.headers.get("content-type") ?? "";
  try {
    if (contentType.includes("application/json")) {
      const body = await request.json();
      data = {
        firstName: String(body.firstName ?? "").trim().slice(0, 200),
        lastName: String(body.lastName ?? "").trim().slice(0, 200),
        company: String(body.company ?? "").trim().slice(0, 200),
        email: String(body.email ?? "").trim().slice(0, 200),
        phone: String(body.phone ?? "").trim().slice(0, 50),
        service: String(body.service ?? "").trim().slice(0, 200),
        message: String(body.message ?? "").trim().slice(0, 5000),
      };
    } else {
      const form = await request.formData();
      data = {
        firstName: str(form.get("firstName"), 200),
        lastName: str(form.get("lastName"), 200),
        company: str(form.get("company"), 200),
        email: str(form.get("email"), 200),
        phone: str(form.get("phone"), 50),
        service: str(form.get("service"), 200),
        message: str(form.get("message"), 5000),
      };
    }
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 400 });
  }

  if (!data.firstName || !data.lastName || !data.phone || !data.message) {
    return NextResponse.json({ error: "Verplichte velden ontbreken." }, { status: 400 });
  }
  if (!EMAIL_RE.test(data.email)) {
    return NextResponse.json({ error: "Ongeldig e-mailadres." }, { status: 400 });
  }

  try {
    const client = getWriteClient();
    await client.create({
      _type: "contactSubmission",
      firstName: data.firstName,
      lastName: data.lastName,
      company: data.company || undefined,
      email: data.email,
      phone: data.phone,
      service: data.service || undefined,
      message: data.message,
      submittedAt: new Date().toISOString(),
      status: "new",
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] failed to persist submission:", err);
    return NextResponse.json(
      { error: "Kon het bericht niet opslaan. Probeer het later opnieuw." },
      { status: 500 },
    );
  }
}
