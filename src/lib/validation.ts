import { STORE_CONFIG, formatFcfa } from '../config/storeConfig';

export interface OrderFormData {
  fullName: string;
  address: string;
  phone: string;
  quantity?: number;
  unitPrice?: number;
}

export interface ValidationErrors {
  fullName?: string;
  address?: string;
  phone?: string;
}

/**
 * Normalizes a Senegalese phone input by removing spaces, hyphens, dots,
 * and optional +221 / 00221 prefix so users can type or paste naturally.
 */
export function normalizeSenegalPhone(raw: string): string {
  let cleaned = raw.replace(/[\s\-().]/g, '');
  if (cleaned.startsWith('+221')) {
    cleaned = cleaned.slice(4);
  } else if (cleaned.startsWith('00221')) {
    cleaned = cleaned.slice(5);
  } else if (cleaned.startsWith('221') && cleaned.length === 12) {
    cleaned = cleaned.slice(3);
  }
  return cleaned;
}

/**
 * Checks whether a normalized Senegalese phone number is valid:
 * 9 digits starting with mobile prefixes (70, 75, 76, 77, 78) or landline (33).
 */
export function isValidSenegalPhone(raw: string): boolean {
  const digits = normalizeSenegalPhone(raw);
  return /^(70|75|76|77|78|33)\d{7}$/.test(digits);
}

/**
 * Formats a 9-digit Senegalese number as "77 XXX XX XX".
 */
export function formatSenegalPhoneDisplay(raw: string): string {
  const digits = normalizeSenegalPhone(raw);
  if (digits.length !== 9) return raw.trim();
  return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`;
}

export function validateOrderForm(data: OrderFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.fullName.trim() || data.fullName.trim().length < 2) {
    errors.fullName = 'Veuillez entrer votre nom et prénom.';
  }

  if (!data.address.trim() || data.address.trim().length < 4) {
    errors.address = 'Veuillez indiquer votre quartier, ville et adresse précise.';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Veuillez entrer votre numéro de téléphone.';
  } else if (!isValidSenegalPhone(data.phone)) {
    errors.phone = 'Numéro sénégalais invalide (9 chiffres, ex : 77 123 45 67).';
  }

  return errors;
}

export function buildWhatsAppOrderMessage(data: OrderFormData): string {
  const quantity = data.quantity ?? 1;
  const price = (data.unitPrice ?? STORE_CONFIG.product.currentPrice) * quantity;
  const productLabel =
    quantity > 1
      ? `${STORE_CONFIG.product.name} (x${quantity})`
      : STORE_CONFIG.product.name;
  const formattedPhone = `+${STORE_CONFIG.countryDialCode} ${formatSenegalPhoneDisplay(data.phone)}`;

  return `Bonjour, je souhaite commander le produit suivant :

Produit : ${productLabel}
Prix : ${formatFcfa(price)} ${STORE_CONFIG.currency}

Nom et prénom : ${data.fullName.trim()}
Adresse de livraison : ${data.address.trim()}
Téléphone : ${formattedPhone}

Merci de confirmer ma commande.`;
}

export function buildWhatsAppOrderUrl(data: OrderFormData): string {
  const message = buildWhatsAppOrderMessage(data);
  const targetNumber = `${STORE_CONFIG.countryDialCode}${STORE_CONFIG.whatsappNumberLocal}`;
  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppDirectUrl(customMessage?: string): string {
  const targetNumber = `${STORE_CONFIG.countryDialCode}${STORE_CONFIG.whatsappNumberLocal}`;
  if (!customMessage) {
    return `https://wa.me/${targetNumber}`;
  }
  return `https://wa.me/${targetNumber}?text=${encodeURIComponent(customMessage)}`;
}
