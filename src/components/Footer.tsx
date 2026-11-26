import React from 'react';
import { MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '../config/storeConfig';
import { buildWhatsAppDirectUrl } from '../lib/validation';
import type { ActivePage } from './Header';

interface FooterProps {
  onNavigatePage: (page: ActivePage, sectionId?: string) => void;
  onScrollToForm: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage, onScrollToForm }) => {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 pb-24 md:pb-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#FF4D00] font-display text-xs font-extrabold text-white">
                JBL
              </span>
              <span className="font-display text-lg font-bold text-white">
                {STORE_CONFIG.storeName} — {STORE_CONFIG.country}
              </span>
            </div>
            <p className="max-w-md text-sm text-zinc-400">
              {STORE_CONFIG.product.name} · Paiement à la livraison selon les modalités confirmées sur WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <button
              type="button"
              onClick={() => onNavigatePage('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Accueil
            </button>
            <button
              type="button"
              onClick={() => onNavigatePage('product')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Fiche produit
            </button>
            <button
              type="button"
              onClick={onScrollToForm}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Commander
            </button>
            <a
              href={buildWhatsAppDirectUrl(
                `Bonjour ${STORE_CONFIG.storeName}, j'ai une question concernant le ${STORE_CONFIG.product.name}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-white hover:text-[#FF4D00] transition-colors"
            >
              <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
              <span>{STORE_CONFIG.whatsappDisplay}</span>
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-800 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-zinc-500">
          <span>© {new Date().getFullYear()} {STORE_CONFIG.storeName} · {STORE_CONFIG.country}</span>
          <span>Devise : {STORE_CONFIG.currency} (XOF)</span>
        </div>
      </div>
    </footer>
  );
};
