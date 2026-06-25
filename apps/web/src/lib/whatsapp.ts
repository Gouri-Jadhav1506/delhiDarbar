const DEFAULT_WHATSAPP_NUMBER = "2250575413751";

export function getWhatsAppNumber(): string {
  const configuredNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? DEFAULT_WHATSAPP_NUMBER;

  return configuredNumber.replace(/\D/g, "") || DEFAULT_WHATSAPP_NUMBER;
}

export function buildWhatsAppUrl(message: string): string {
  const phone = getWhatsAppNumber();
  const text = encodeURIComponent(message);

  return `https://wa.me/${phone}?text=${text}`;
}
