import offerData from "@/data/offer.json";

export const offer = offerData;

export function formatUsd(amount: number): string {
  return `${amount.toLocaleString("en-US")} USD`;
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
  const params = new URLSearchParams({
    subject: offer.emailSubject,
    body: offer.emailBody,
  });
  return `mailto:${email}?${params.toString()}`;
}

export function offerDescription(): string {
  return `${offer.title}. ${formatUsd(offer.priceUsd)}, half to start, about one week. Email the failure. Scope in writing before the work starts.`;
}

export function outreachMessage(input: { name: string; location: string; portfolioUrl: string }): string {
  const city = input.location.split(",")[0]?.trim() || input.location;
  return [
    `I'm ${input.name}, a backend engineer in ${city}.`,
    `I take one fixed piece of work: ${offer.title.charAt(0).toLowerCase()}${offer.title.slice(1)}. That is the job row in the same commit as the business change, a retry with a budget, an idempotency key, tests for that failure, and a written limit.`,
    `${formatUsd(offer.priceUsd)}, half to start, about a week.`,
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
      description: offer.failure,
    },
  };
}
