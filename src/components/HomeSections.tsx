import React, { useState } from 'react';
import {
  BatteryCharging,
  Bluetooth,
  ChevronDown,
  Headphones,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Volume2,
} from 'lucide-react';
import { STORE_CONFIG, formatFcfa } from '../config/storeConfig';
import { buildWhatsAppDirectUrl } from '../lib/validation';

interface HomeSectionsProps {
  onScrollToForm: () => void;
  onOpenProductPage: () => void;
}

const BENEFIT_ICONS = [Volume2, Headphones, BatteryCharging, PhoneCall];

export const HomeSections: React.FC<HomeSectionsProps> = ({
  onScrollToForm,
  onOpenProductPage,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string>(STORE_CONFIG.faqs[0]?.id ?? '');
  const mainImage = STORE_CONFIG.productImages[0];
  const { product, promoBanner, testimonials, essentialBenefits, howItWorks, story, faqs } =
    STORE_CONFIG;

  return (
    <div>
      {/* SECTION 2 — BANDEAU PROMOTIONNEL */}
      <section aria-label="Offre commerciale" className="bg-zinc-950 text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 sm:px-6 py-4 sm:flex-row sm:items-center">
          <div className="space-y-0.5">
            <p className="font-display text-sm sm:text-base font-bold tracking-tight text-white">
              {promoBanner.headline}
            </p>
            <p className="text-xs sm:text-sm text-zinc-300">{promoBanner.subtext}</p>
          </div>
          <button
            type="button"
            onClick={onScrollToForm}
            className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#FF4D00] px-4 py-2 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-[#E04300] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Commander maintenant
          </button>
        </div>
      </section>

      {/* SECTION 3 — PRÉSENTATION DU PRODUIT */}
      <section className="border-b border-zinc-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-[#F7F7F8]">
                <img
                  src={mainImage.src}
                  alt={mainImage.alt}
                  referrerPolicy="no-referrer"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#FF4D00]">
                  Présentation du produit
                </p>
                <h2
                  className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950"
                  style={{ textWrap: 'balance' }}
                >
                  {product.name} — Conçu pour l’écoute quotidienne sans distraction
                </h2>
              </div>

              <p className="text-base leading-relaxed text-zinc-600">{product.description}</p>

              <div className="flex flex-wrap items-baseline gap-4 border-y border-zinc-200 py-4">
                {product.showStrikethroughOldPrice && (
                  <span className="text-lg font-medium text-zinc-400 line-through tabular-nums">
                    {formatFcfa(product.oldPrice)} {STORE_CONFIG.currency}
                  </span>
                )}
                <span className="font-display text-3xl font-extrabold text-zinc-950 tabular-nums">
                  {formatFcfa(product.currentPrice)} {STORE_CONFIG.currency}
                </span>
                <span className="text-xs font-medium text-zinc-500">
                  · {product.paymentTerms}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={onScrollToForm}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#FF4D00] px-6 py-3 font-display text-sm sm:text-base font-bold text-white transition-colors hover:bg-[#E04300] cursor-pointer"
                >
                  Commander maintenant
                </button>
                <button
                  type="button"
                  onClick={onOpenProductPage}
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 cursor-pointer"
                >
                  Détails & galerie produit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — PREUVE SOCIALE (Uniquement avis réels fournis par la boutique) */}
      <section className="border-b border-zinc-200 bg-[#F7F7F8] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Avis & retours clients
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
              Retours authentiques de nos clients au Sénégal
            </h2>
          </div>

          {testimonials.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              {testimonials.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-3"
                >
                  {item.mediaUrl && item.mediaType === 'image' && (
                    <img
                      src={item.mediaUrl}
                      alt={`Avis de ${item.customerName}`}
                      referrerPolicy="no-referrer"
                      className="h-48 w-full rounded-xl object-cover"
                    />
                  )}
                  <p className="text-sm leading-relaxed text-zinc-700">« {item.quote} »</p>
                  <div className="text-xs font-semibold text-zinc-950">
                    {item.customerName} <span className="text-zinc-400">·</span>{' '}
                    <span className="font-normal text-zinc-500">{item.city}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl space-y-2">
                <h3 className="font-display text-lg font-bold text-zinc-950">
                  Espace réservé aux avis, photos et vidéos vérifiés
                </h3>
                <p className="text-sm leading-relaxed text-zinc-600">
                  Par souci de transparence, nous publions uniquement les témoignages, photos et vidéos réellement envoyés par les clients de la boutique {STORE_CONFIG.storeName}. Vous avez déjà reçu votre {product.name} ? Partagez votre retour sur WhatsApp.
                </p>
              </div>
              <a
                href={buildWhatsAppDirectUrl(
                  `Bonjour ${STORE_CONFIG.storeName}, voici mon avis sur le ${product.name} : `
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 whitespace-nowrap shrink-0"
              >
                <MessageCircle className="h-4 w-4 text-[#16A34A]" aria-hidden="true" />
                <span>Envoyer mon avis</span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5 — BÉNÉFICES DÉTAILLÉS */}
      <section id="benefices" className="scroll-mt-20 border-b border-zinc-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#FF4D00]">
              Caractéristiques clés
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
              Les points forts du {product.name}
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {essentialBenefits.map((benefit, index) => {
              const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length];
              return (
                <div
                  key={benefit.id}
                  className="rounded-2xl border border-zinc-200 bg-[#F7F7F8]/60 p-6 space-y-3"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-zinc-200 text-[#FF4D00]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-base font-bold text-zinc-950">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-600">{benefit.shortText}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 6 — COMMENT ÇA MARCHE */}
      <section className="border-b border-zinc-200 bg-[#F7F7F8] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Utilisation simple
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
              Comment ça marche en 3 étapes
            </h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {howItWorks.map((item, idx) => (
              <div
                key={item.step}
                className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-extrabold text-[#FF4D00] tabular-nums">
                    {item.step}
                  </span>
                  {idx === 0 && <Bluetooth className="h-5 w-5 text-zinc-400" aria-hidden="true" />}
                  {idx === 1 && <Headphones className="h-5 w-5 text-zinc-400" aria-hidden="true" />}
                  {idx === 2 && (
                    <BatteryCharging className="h-5 w-5 text-zinc-400" aria-hidden="true" />
                  )}
                </div>
                <h3 className="font-display text-lg font-bold text-zinc-950">{item.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — HISTOIRE DE LA BOUTIQUE */}
      <section className="border-b border-zinc-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#FF4D00]">
                Notre engagement
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
                {story.heading}
              </h2>
              {story.paragraphs.map((para, i) => (
                <p key={i} className="text-base leading-relaxed text-zinc-600">
                  {para}
                </p>
              ))}
            </div>

            <div className="lg:col-span-6 rounded-2xl border border-zinc-200 bg-[#F7F7F8] p-6 sm:p-8 space-y-4">
              <h3 className="font-display text-lg font-bold text-zinc-950">
                Nos principes de commande
              </h3>
              <ul className="space-y-3">
                {story.commitments.map((commitment, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-700">
                    <ShieldCheck
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#FF4D00]"
                      aria-hidden="true"
                    />
                    <span>{commitment}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FAQ ET RÉASSURANCE */}
      <section id="faq" className="scroll-mt-20 bg-[#F7F7F8] py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Questions fréquentes
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950">
              FAQ et informations pratiques
            </h2>
          </div>

          <div className="mt-8 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left font-display text-base font-bold text-zinc-950 hover:bg-zinc-50/70 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 text-sm leading-relaxed text-zinc-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Dernier appel à l'action vers le formulaire */}
          <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 text-center space-y-4">
            <h3 className="font-display text-xl sm:text-2xl font-extrabold text-zinc-950">
              Prêt à commander votre {product.name} ?
            </h3>
            <p className="mx-auto max-w-md text-sm text-zinc-600">
              Remplissez les trois champs du formulaire en moins d’une minute et confirmez sur WhatsApp.
            </p>
            <div>
              <button
                type="button"
                onClick={onScrollToForm}
                className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#FF4D00] px-8 py-3.5 font-display text-base font-extrabold tracking-wide text-white shadow-sm transition-colors hover:bg-[#E04300] cursor-pointer"
              >
                JE COMMANDE MAINTENANT
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
