import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronDown,
  MessageCircle,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { STORE_CONFIG, formatFcfa } from '../config/storeConfig';
import { OrderFormCard } from './OrderFormCard';
import { ProductGallery } from './ProductGallery';

interface ProductPageProps {
  nameInputRef: React.RefObject<HTMLInputElement | null>;
  formContainerRef: React.RefObject<HTMLDivElement | null>;
  onBackHome: () => void;
  onScrollToForm: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({
  nameInputRef,
  formContainerRef,
  onBackHome,
  onScrollToForm,
}) => {
  const [selectedPackId, setSelectedPackId] = useState(STORE_CONFIG.packs[0]?.id ?? 'single');
  const [openFaqId, setOpenFaqId] = useState<string>(STORE_CONFIG.faqs[0]?.id ?? '');

  const selectedPack =
    STORE_CONFIG.packs.find((p) => p.id === selectedPackId) ?? STORE_CONFIG.packs[0];

  const { product, essentialBenefits, howItWorks, faqs, packs } = STORE_CONFIG;

  return (
    <div className="bg-white">
      {/* Breadcrumb bar */}
      <div className="border-b border-zinc-200 bg-[#F7F7F8]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 text-xs sm:text-sm">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-1.5 font-medium text-zinc-700 hover:text-zinc-950 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Retour à l’accueil</span>
          </button>
          <span className="text-zinc-500">
            {STORE_CONFIG.storeName} <span aria-hidden="true">/</span> {product.name}
          </span>
        </div>
      </div>

      {/* Main Contiguous Product Module + Immediate Order Form */}
      <section className="border-b border-zinc-200 py-8 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
            {/* Left Column: Multi-angle Carousel & Core Details */}
            <div className="lg:col-span-6 space-y-6">
              <ProductGallery />

              <div className="space-y-4 border-t border-zinc-200 pt-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    {STORE_CONFIG.storeName} · Audio sans fil
                  </p>
                  <h1 className="mt-1 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
                    {product.name}
                  </h1>
                </div>

                <div className="flex flex-wrap items-baseline gap-3">
                  {product.showStrikethroughOldPrice && (
                    <span className="text-lg font-medium text-zinc-400 line-through tabular-nums">
                      {formatFcfa(product.oldPrice)} {STORE_CONFIG.currency}
                    </span>
                  )}
                  <span className="font-display text-3xl font-extrabold text-[#FF4D00] tabular-nums">
                    {formatFcfa(selectedPack.price * selectedPack.quantity)} {STORE_CONFIG.currency}
                  </span>
                </div>

                <p className="text-base leading-relaxed text-zinc-600">{product.description}</p>

                {/* Essential Benefits */}
                <ul className="space-y-2.5 pt-1">
                  {essentialBenefits.map((benefit) => (
                    <li key={benefit.id} className="flex items-start gap-2.5 text-sm text-zinc-800">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4D00]"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                      <span>
                        <strong className="font-semibold text-zinc-950">{benefit.title} :</strong>{' '}
                        <span className="text-zinc-600">{benefit.shortText}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Packs / Offres groupées (si plusieurs options configurées) */}
                <div className="space-y-2.5 pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Option sélectionnée
                  </p>
                  <div className="grid grid-cols-1 gap-2.5">
                    {packs.map((pack) => {
                      const active = pack.id === selectedPack.id;
                      return (
                        <button
                          key={pack.id}
                          type="button"
                          onClick={() => setSelectedPackId(pack.id)}
                          className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors cursor-pointer ${
                            active
                              ? 'border-[#FF4D00] bg-[#FF4D00]/5'
                              : 'border-zinc-200 bg-white hover:border-zinc-300'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-bold text-zinc-950">{pack.label}</div>
                            {pack.note && (
                              <div className="text-xs text-zinc-500">{pack.note}</div>
                            )}
                          </div>
                          <div className="font-display text-base font-extrabold text-zinc-950 tabular-nums">
                            {formatFcfa(pack.price * pack.quantity)} {STORE_CONFIG.currency}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Confirmed Delivery, Payment & Warranty Info */}
                <div className="space-y-3 rounded-2xl border border-zinc-200 bg-[#F7F7F8] p-5 text-sm">
                  <div className="flex items-start gap-3">
                    <ShieldCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4D00]"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-semibold text-zinc-950">Paiement : </span>
                      <span className="text-zinc-600">{product.paymentTerms}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4D00]"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-semibold text-zinc-950">Livraison : </span>
                      <span className="text-zinc-600">{product.deliveryTerms}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageCircle
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#FF4D00]"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-semibold text-zinc-950">Garantie & support : </span>
                      <span className="text-zinc-600">{product.warrantyTerms}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Form Immediately Accessible */}
            <div className="lg:col-span-6 lg:sticky lg:top-20">
              <OrderFormCard
                formId="formulaire-produit"
                nameInputRef={nameInputRef}
                containerRef={formContainerRef}
                selectedQuantity={selectedPack.quantity}
                selectedPrice={selectedPack.price}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Usage Section */}
      <section className="border-b border-zinc-200 bg-[#F7F7F8] py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-zinc-950">
            Fonctionnement en 3 étapes
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {howItWorks.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-zinc-200 bg-white p-6 space-y-2"
              >
                <span className="font-display text-xl font-extrabold text-[#FF4D00] tabular-nums">
                  {item.step}
                </span>
                <h3 className="font-display text-base font-bold text-zinc-950">{item.title}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed FAQ */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-zinc-950">
            Questions fréquentes sur le {product.name}
          </h2>
          <div className="mt-6 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div key={faq.id}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-base font-bold text-zinc-950 hover:bg-zinc-50 cursor-pointer"
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
                    <div className="px-5 pb-4 text-sm leading-relaxed text-zinc-600">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={onScrollToForm}
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#FF4D00] px-8 py-3.5 font-display text-base font-extrabold text-white transition-colors hover:bg-[#E04300] cursor-pointer"
            >
              COMMANDER MAINTENANT
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
