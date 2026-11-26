import { STORE_CONFIG } from '../config/storeConfig';
import type { OrderFormData } from './validation';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Initializes future analytics trackers when configured in storeConfig / env vars.
 */
export function initTracking(): void {
  const { metaPixelId, googleAnalyticsId } = STORE_CONFIG.integrations;
  if (metaPixelId && typeof window.fbq === 'function') {
    window.fbq('init', metaPixelId);
    window.fbq('track', 'PageView');
  }
  if (googleAnalyticsId && typeof window.gtag === 'function') {
    window.gtag('config', googleAnalyticsId);
  }
}

export function trackViewProduct(): void {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'ViewContent', {
      content_name: STORE_CONFIG.product.name,
      value: STORE_CONFIG.product.currentPrice,
      currency: 'XOF',
    });
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'view_item', {
      currency: 'XOF',
      value: STORE_CONFIG.product.currentPrice,
      items: [{ item_name: STORE_CONFIG.product.name, price: STORE_CONFIG.product.currentPrice }],
    });
  }
}

export function trackOrderRecap(data: OrderFormData): void {
  const value = (data.unitPrice ?? STORE_CONFIG.product.currentPrice) * (data.quantity ?? 1);
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      content_name: STORE_CONFIG.product.name,
      value,
      currency: 'XOF',
    });
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'begin_checkout', {
      currency: 'XOF',
      value,
      items: [{ item_name: STORE_CONFIG.product.name, price: value }],
    });
  }
}

export function trackWhatsAppDispatch(data: OrderFormData): void {
  const value = (data.unitPrice ?? STORE_CONFIG.product.currentPrice) * (data.quantity ?? 1);
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', {
      content_name: STORE_CONFIG.product.name,
      value,
      currency: 'XOF',
    });
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      currency: 'XOF',
      value,
    });
  }
}

/**
 * Adapter ready for future Supabase order persistence.
 * Returns { persisted: false } until Supabase credentials are wired.
 */
export async function logOrderToSupabaseIfConfigured(
  _data: OrderFormData
): Promise<{ persisted: boolean }> {
  const { supabaseUrl, supabaseAnonKey } = STORE_CONFIG.integrations;
  if (!supabaseUrl || !supabaseAnonKey) {
    return { persisted: false };
  }
  // Future integration point: POST to `${supabaseUrl}/rest/v1/orders`
  return { persisted: false };
}
