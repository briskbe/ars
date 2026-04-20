import { NextResponse } from "next/server";
import { getWriteClient } from "../../../sanity/lib/writeClient";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_CV_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_CV_EXT = [".pdf", ".doc", ".docx"];

function str(value: FormDataEntryValue | null, max = 2000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 400 });
  }

  const kindRaw = str(form.get("kind"), 20);
  const kind: "vacancy" | "open" = kindRaw === "open" ? "open" : "vacancy";

  const data = {
    firstName: str(form.get("firstName"), 200),
    lastName: str(form.get("lastName"), 200),
    email: str(form.get("email"), 200),
    phone: str(form.get("phone"), 50),
    motivation: str(form.get("motivation"), 5000),
    vacatureId: str(form.get("vacatureId"), 100),
    vacatureTitle: str(form.get("vacatureTitle"), 300),
    desiredFunction: str(form.get("desiredFunction"), 300),
  };

  if (!data.firstName || !data.lastName || !data.phone) {
    return NextResponse.json({ error: "Verplichte velden ontbreken." }, { status: 400 });
  }
  if (!EMAIL_RE.test(data.email)) {
    return NextResponse.json({ error: "Ongeldig e-mailadres." }, { status: 400 });
  }
  if (kind === "vacancy" && !data.vacatureTitle) {
    return NextResponse.json({ error: "Vacature ontbreekt." }, { status: 400 });
  }

  const cvEntry = form.get("cv");
  const cvFile: File | null = cvEntry instanceof File && cvEntry.size > 0 ? cvEntry : null;

  if (kind === "vacancy" && !cvFile) {
    return NextResponse.json({ error: "CV is verplicht." }, { status: 400 });
  }

  if (cvFile) {
    if (cvFile.size > MAX_CV_BYTES) {
      return NextResponse.json({ error: "CV is te groot (max. 10MB)." }, { status: 400 });
    }
    const lower = cvFile.name.toLowerCase();
    if (!ALLOWED_CV_EXT.some((ext) => lower.endsWith(ext))) {
      return NextResponse.json(
        { error: "Enkel PDF, DOC of DOCX toegestaan." },
        { status: 400 },
      );
    }
  }

  try {
    const client = getWriteClient();

    let cvAssetRef: { _type: "file"; asset: { _type: "reference"; _ref: string } } | undefined;
    if (cvFile) {
      const buffer = Buffer.from(await cvFile.arrayBuffer());
      const asset = await client.assets.upload("file", buffer, {
        filename: cvFile.name,
        contentType: cvFile.type || undefined,
      });
      cvAssetRef = {
        _type: "file",
        asset: { _type: "reference", _ref: asset._id },
      };
    }

    await client.create({
      _type: "jobApplication",
      kind,
      ...(kind === "vacancy" && data.vacatureId
        ? { vacature: { _type: "reference", _ref: data.vacatureId } }
        : {}),
      ...(kind === "vacancy" ? { vacatureTitle: data.vacatureTitle } : {}),
      ...(kind === "open" && data.desiredFunction
        ? { desiredFunction: data.desiredFunction }
        : {}),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      motivation: data.motivation || undefined,
      ...(cvAssetRef ? { cv: cvAssetRef } : {}),
      submittedAt: new Date().toISOString(),
      status: "new",
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[sollicitatie] failed to persist application:", err);
    return NextResponse.json(
      { error: "Kon de sollicitatie niet opslaan. Probeer het later opnieuw." },
      { status: 500 },
    );
  }
}
