import React, { useState } from 'react';
import { Check, Headphones, ShieldCheck } from 'lucide-react';
import { STORE_CONFIG, formatFcfa } from '../config/storeConfig';
import { OrderFormCard } from './OrderFormCard';

interface HomeHeroProps {
  nameInputRef: React.RefObject<HTMLInputElement | null>;
  formContainerRef: React.RefObject<HTMLDivElement | null>;
  onOpenProductPage: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  nameInputRef,
  formContainerRef,
  onOpenProductPage,
}) => {
  const [heroImgError, setHeroImgError] = useState(false);
  const mainImage = STORE_CONFIG.productImages[0];
  const { product } = STORE_CONFIG;

  return (
    <section className="border-b border-zinc-200 bg-gradient-to-b from-[#F7F7F8] to-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-10">
          {/* COLONNE GAUCHE (Produit, prix, bénéfices — optimisé mobile 1→5) */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            {/* 1. Logo et nom de la boutique */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#FF4D00] font-display text-sm font-extrabold text-white">
                  JBL
                </span>
                <span className="font-display text-base font-bold text-zinc-950">
                  Boutique {STORE_CONFIG.storeName}
                </span>
                <span className="text-zinc-300" aria-hidden="true">
                  ·
                </span>
                <span className="text-xs font-medium text-zinc-600">
                  {STORE_CONFIG.country}
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenProductPage}
                className="text-xs font-semibold text-zinc-700 underline underline-offset-4 hover:text-[#FF4D00] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Voir la fiche produit
              </button>
            </div>

            {/* Titre commercial accrocheur (desktop & tablette au-dessus ou intégré) */}
            <h1
              className="hidden sm:block font-display text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-950 leading-[1.12]"
              style={{ textWrap: 'balance' }}
            >
              {product.heroHeadline}
            </h1>

            {/* 2. Photo professionnelle du produit */}
            <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-[#F7F7F8]">
              {!heroImgError ? (
                <img
                  src={mainImage.src}
                  alt={mainImage.alt}
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgError(true)}
                  className="mx-auto h-[230px] sm:h-[310px] lg:h-[340px] w-full object-cover object-center"
                />
              ) : (
                <div className="flex h-[240px] w-full flex-col items-center justify-center gap-2 bg-zinc-100 text-zinc-500">
                  <Headphones className="h-12 w-12" aria-hidden="true" />
                  <span className="font-display font-bold text-zinc-800">{product.name}</span>
                </div>
              )}
            </div>

            {/* 3. Nom du produit + 4. Ancien prix barré & Prix actuel très visible */}
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-zinc-200/80 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Casque sans fil
                </p>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
                  {product.name}
                </h2>
              </div>

              <div className="flex items-baseline gap-3">
                {product.showStrikethroughOldPrice && (
                  <span className="text-base sm:text-lg font-medium text-zinc-400 line-through tabular-nums">
                    {formatFcfa(product.oldPrice)} {STORE_CONFIG.currency}
                  </span>
                )}
                <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#FF4D00] tabular-nums">
                  {formatFcfa(product.currentPrice)} {STORE_CONFIG.currency}
                </span>
              </div>
            </div>

            {/* 5. Deux à trois bénéfices essentiels */}
            <ul className="space-y-2 text-sm text-zinc-800">
              {STORE_CONFIG.essentialBenefits.slice(0, 3).map((benefit, idx) => (
                <li
                  key={benefit.id}
                  className={`flex items-start gap-2.5 ${idx === 2 ? 'hidden sm:flex' : 'flex'}`}
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4D00]"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-zinc-950">{benefit.title}</strong>
                    <span className="hidden sm:inline text-zinc-600"> — {benefit.shortText}</span>
                  </span>
                </li>
              ))}
            </ul>

            {/* Mention paiement à la réception confirmée */}
            <div className="hidden sm:flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs font-medium text-zinc-700">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#FF4D00]" aria-hidden="true" />
              <span>{product.paymentTerms}</span>
            </div>
          </div>

          {/* COLONNE DROITE (Formulaire immédiatement visible dès l'ouverture) */}
          <div className="lg:col-span-6 lg:sticky lg:top-20">
            <OrderFormCard
              formId="formulaire-commande"
              nameInputRef={nameInputRef}
              containerRef={formContainerRef}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
