import React from 'react';
import { STORE_CONFIG } from '../config/storeConfig';

export type ActivePage = 'home' | 'product';

interface HeaderProps {
  activePage: ActivePage;
  onNavigatePage: (page: ActivePage, sectionId?: string) => void;
  onScrollToForm: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigatePage,
  onScrollToForm,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-zinc-200">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:gap-8">
        {/* Zone 1: Single-line Brand wordmark */}
        <button
          type="button"
          onClick={() => onNavigatePage('home')}
          className="flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4D00] cursor-pointer"
          aria-label={`Retour à l'accueil ${STORE_CONFIG.storeName}`}
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#FF4D00] font-display text-sm font-extrabold tracking-tight text-white">
            JBL
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-zinc-950">
            {STORE_CONFIG.storeName}
          </span>
        </button>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Navigation principale"
          className="flex items-center gap-4 sm:gap-6 text-sm font-medium text-zinc-600"
        >
          <button
            type="button"
            onClick={() => onNavigatePage('home')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              activePage === 'home'
                ? 'border-[#FF4D00] text-zinc-950 font-semibold'
                : 'border-transparent hover:text-zinc-950'
            }`}
          >
            Accueil
          </button>
          <button
            type="button"
            onClick={() => onNavigatePage('product')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 ${
              activePage === 'product'
                ? 'border-[#FF4D00] text-zinc-950 font-semibold'
                : 'border-transparent hover:text-zinc-950'
            }`}
          >
            Produit
          </button>
          <button
            type="button"
            onClick={() => onNavigatePage('home', 'benefices')}
            className="hidden md:inline-block whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:text-zinc-950"
          >
            Avantages
          </button>
          <button
            type="button"
            onClick={() => onNavigatePage('home', 'faq')}
            className="hidden md:inline-block whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:text-zinc-950"
          >
            FAQ
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onScrollToForm}
            className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#FF4D00] px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-[#E04300] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4D00]"
          >
            Commander
          </button>
        </div>
      </div>
    </header>
  );
};
