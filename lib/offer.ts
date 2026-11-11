import offerData from "@/data/offer.json";

export const offer = offerData;

export function formatUsd(amount: number): string {
  return `${amount.toLocaleString("en-US")} USD`;
}

export function formatOfferPrice(): string {
  return `${offer.pricePrefix} ${formatUsd(offer.priceUsd)}`;
}

export function spanishOfferLine(): string {
  const amount = new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(offer.priceUsd);
  return `Si prefieres escribir en español, el piso es el mismo: desde ${amount} USD, un flujo, por escrito, antes de empezar. WhatsApp o correo, con el fallo descrito.`;
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s/g, "")}`;
}

export function whatsappHref(phone: string, text: string): string {
  const digits = phone.replace(/\D/g, "");
  const url = new URL(`https://wa.me/${digits}`);
  url.searchParams.set("text", text);
  return url.toString();
}

export function offerMailto(email: string): string {
  const subject = encodeURIComponent(offer.emailSubject);
  const body = encodeURIComponent(offer.emailBody);
  return `mailto:${email}?subject=${subject}&body=${body}`;
}

export function offerDescription(): string {
  return `${offer.title}. ${formatOfferPrice()} for one flow, half to start, about one week. Email the failure. Scope in writing before the work starts.`;
}

export function outreachMessage(input: { name: string; location: string; portfolioUrl: string }): string {
  const city = input.location.split(",")[0]?.trim() || input.location;
  return [
    `I'm ${input.name}, a backend engineer in ${city}.`,
    `I take one fixed piece of work: ${offer.title.charAt(0).toLowerCase()}${offer.title.slice(1)}. That is the job row in the same commit as the business change, a retry with a budget, an idempotency key, tests for that failure, and a written limit.`,
    `${formatOfferPrice()} for one flow, half to start, about a week. If the failure is larger, the scope email names the number before any work starts.`,
    "If a step in your product dies when the user closes the tab, arrives twice, or overwrites another save, reply with that failure.",
    input.portfolioUrl,
  ].join("\n\n");
}

type JsonLdIdentity = {
  name: string;
  email: string;
  phone: string;
  portfolioUrl: string;
};

export function offerJsonLd(identity: JsonLdIdentity) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: identity.name,
    url: identity.portfolioUrl,
    email: identity.email,
    telephone: identity.phone.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medellín",
      addressCountry: "CO",
    },
    areaServed: "Worldwide",
    makesOffer: {
      "@type": "Offer",
      name: offer.title,
      price: String(offer.priceUsd),
      priceCurrency: "USD",
      description: `${formatOfferPrice()}. ${offer.priceScope}`,
    },
  };
}
