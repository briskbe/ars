import type { SiteSettings, SanityService } from "../../sanity/lib/types";

type Variant = "withServices" | "withContact";

type Props = {
  site?: SiteSettings | null;
  services?: SanityService[];
  variant?: Variant;
};

export default function Footer({ site, services = [], variant = "withServices" }: Props) {
  const logoUrl = site?.logoUrl ?? "/logo.png";
  const tagline =
    site?.footerTagline ??
    "Uw betrouwbare partner voor industriële diensten. Van laswerken tot montage, van onderhoud tot verhuizingen — wij staan voor u klaar.";
  const navLinks = site?.footerLinks ?? [];

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="/">
              <img src={logoUrl} alt="ARS Industrial Services" className="h-9 w-auto" />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-400">
              {tagline}
            </p>
          </div>

          {variant === "withServices" ? (
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Diensten
              </h4>
              <ul className="mt-5 space-y-3">
                {services.slice(0, 5).map((service) => (
                  <li key={service._id}>
                    <a
                      href="/#diensten"
                      className="text-sm text-gray-400 transition-colors hover:text-black"
                    >
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                Contact
              </h4>
              <ul className="mt-5 space-y-3">
                {site?.phone && (
                  <li>
                    <a
                      href={`tel:${site.phone.replace(/\s+/g, "")}`}
                      className="text-sm text-gray-400 transition-colors hover:text-black"
                    >
                      {site.phone}
                    </a>
                  </li>
                )}
                {site?.email && (
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-sm text-gray-400 transition-colors hover:text-black"
                    >
                      {site.email}
                    </a>
                  </li>
                )}
                {site?.address && (
                  <li>
                    <span className="text-sm text-gray-400">{site.address}</span>
                  </li>
                )}
                {site?.addressLine2 && (
                  <li>
                    <span className="text-sm text-gray-400">{site.addressLine2}</span>
                  </li>
                )}
              </ul>
            </div>
          )}

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              {variant === "withServices" ? "Bedrijf" : "Navigatie"}
            </h4>
            <ul className="mt-5 space-y-3">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-gray-400 transition-colors hover:text-black"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-gray-100 pt-8 sm:flex-row">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ARS Metals. Alle rechten voorbehouden.
          </p>
          {site?.vcaCertified !== false && (
            <div className="flex items-center gap-2.5 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 shadow-sm">
              <img src="/vca.png" alt="VCA Certified" className="h-7 w-auto" />
              <div className="border-l border-gray-200 pl-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-900">Gecertificeerd</p>
                <p className="text-[10px] text-gray-500">Veiligheid</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-400 transition-colors hover:text-black">
              Privacybeleid
            </a>
            <a href="#" className="text-sm text-gray-400 transition-colors hover:text-black">
              Voorwaarden
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
