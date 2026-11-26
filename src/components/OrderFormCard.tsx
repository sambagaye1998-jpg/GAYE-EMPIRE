import React, { useState } from 'react';
import { Check, Copy, Lock, MessageCircle, Pencil, ShieldCheck } from 'lucide-react';
import { STORE_CONFIG, formatFcfa } from '../config/storeConfig';
import {
  buildWhatsAppOrderMessage,
  buildWhatsAppOrderUrl,
  formatSenegalPhoneDisplay,
  validateOrderForm,
  type OrderFormData,
  type ValidationErrors,
} from '../lib/validation';
import {
  logOrderToSupabaseIfConfigured,
  trackOrderRecap,
  trackWhatsAppDispatch,
} from '../lib/analytics';

interface OrderFormCardProps {
  formId?: string;
  nameInputRef?: React.RefObject<HTMLInputElement | null>;
  selectedQuantity?: number;
  selectedPrice?: number;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export const OrderFormCard: React.FC<OrderFormCardProps> = ({
  formId = 'formulaire-commande',
  nameInputRef,
  selectedQuantity = 1,
  selectedPrice = STORE_CONFIG.product.currentPrice,
  containerRef,
}) => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [step, setStep] = useState<'form' | 'recap'>('form');
  const [copied, setCopied] = useState(false);

  const totalAmount = selectedPrice * selectedQuantity;

  const orderData: OrderFormData = {
    fullName,
    address,
    phone,
    quantity: selectedQuantity,
    unitPrice: selectedPrice,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateOrderForm(orderData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    trackOrderRecap(orderData);
    await logOrderToSupabaseIfConfigured(orderData);
    setStep('recap');
  };

  const whatsappUrl = buildWhatsAppOrderUrl(orderData);
  const whatsappMessage = buildWhatsAppOrderMessage(orderData);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      id={formId}
      ref={containerRef}
      className="scroll-mt-20 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7 shadow-[0_14px_34px_-14px_rgba(17,18,20,0.14)]"
    >
      {step === 'form' ? (
        <>
          <div className="mb-5 border-b border-zinc-100 pb-4">
            <h2 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-950">
              COMMANDEZ MAINTENANT
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Remplissez les informations ci-dessous pour commander.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Field 1: Full Name */}
            <div>
              <label
                htmlFor={`${formId}-fullname`}
                className="mb-1.5 block text-xs font-bold tracking-wide text-zinc-800"
              >
                NOM ET PRÉNOM <span className="text-[#FF4D00]">*</span>
              </label>
              <input
                ref={nameInputRef}
                id={`${formId}-fullname`}
                name="fullName"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) {
                    setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }
                }}
                placeholder="Entrez votre nom et prénom"
                aria-invalid={Boolean(errors.fullName)}
                className={`w-full min-h-[48px] rounded-xl border bg-zinc-50/70 px-4 py-3 text-base text-zinc-950 placeholder:text-zinc-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.fullName
                    ? 'border-red-600 focus:ring-red-600/20'
                    : 'border-zinc-300 focus:border-[#FF4D00] focus:ring-[#FF4D00]/20'
                }`}
              />
              {errors.fullName && (
                <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Field 2: Delivery Address */}
            <div>
              <label
                htmlFor={`${formId}-address`}
                className="mb-1.5 block text-xs font-bold tracking-wide text-zinc-800"
              >
                ADRESSE DE LIVRAISON <span className="text-[#FF4D00]">*</span>
              </label>
              <input
                id={`${formId}-address`}
                name="address"
                type="text"
                autoComplete="street-address"
                required
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (errors.address) {
                    setErrors((prev) => ({ ...prev, address: undefined }));
                  }
                }}
                placeholder="Quartier, ville et adresse précise"
                aria-invalid={Boolean(errors.address)}
                className={`w-full min-h-[48px] rounded-xl border bg-zinc-50/70 px-4 py-3 text-base text-zinc-950 placeholder:text-zinc-400 transition-colors focus:bg-white focus:outline-none focus:ring-2 ${
                  errors.address
                    ? 'border-red-600 focus:ring-red-600/20'
                    : 'border-zinc-300 focus:border-[#FF4D00] focus:ring-[#FF4D00]/20'
                }`}
              />
              {errors.address && (
                <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.address}
                </p>
              )}
            </div>

            {/* Field 3: Senegalese Phone Number */}
            <div>
              <label
                htmlFor={`${formId}-phone`}
                className="mb-1.5 block text-xs font-bold tracking-wide text-zinc-800"
              >
                NUMÉRO DE TÉLÉPHONE <span className="text-[#FF4D00]">*</span>
              </label>
              <div
                className={`flex min-h-[48px] items-stretch overflow-hidden rounded-xl border bg-zinc-50/70 transition-colors focus-within:bg-white focus-within:ring-2 ${
                  errors.phone
                    ? 'border-red-600 focus-within:ring-red-600/20'
                    : 'border-zinc-300 focus-within:border-[#FF4D00] focus-within:ring-[#FF4D00]/20'
                }`}
              >
                <span className="inline-flex items-center border-r border-zinc-200 bg-zinc-100 px-3.5 text-sm font-semibold text-zinc-800 tabular-nums shrink-0">
                  +221
                </span>
                <input
                  id={`${formId}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) {
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                    }
                  }}
                  placeholder="77 XXX XX XX"
                  aria-invalid={Boolean(errors.phone)}
                  className="w-full bg-transparent px-3.5 py-3 text-base text-zinc-950 placeholder:text-zinc-400 tabular-nums focus:outline-none"
                />
              </div>
              {errors.phone && (
                <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Order Summary Bar inside form */}
            <div className="flex items-center justify-between rounded-xl bg-zinc-50 px-4 py-3 text-sm border border-zinc-200/70">
              <span className="font-medium text-zinc-700">
                {selectedQuantity > 1
                  ? `${STORE_CONFIG.product.name} (x${selectedQuantity})`
                  : STORE_CONFIG.product.name}
              </span>
              <span className="font-display text-base font-extrabold text-zinc-950 tabular-nums">
                {formatFcfa(totalAmount)} {STORE_CONFIG.currency}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full min-h-[54px] rounded-xl bg-[#FF4D00] px-6 py-3.5 font-display text-base font-extrabold tracking-wide text-white shadow-sm transition-colors hover:bg-[#E04300] active:translate-y-[1px] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF4D00]"
            >
              CONFIRMER MA COMMANDE
            </button>

            <p className="flex items-center justify-center gap-1.5 text-center text-xs text-zinc-500">
              <Lock className="h-3.5 w-3.5 shrink-0 text-zinc-400" aria-hidden="true" />
              <span>Vos informations servent uniquement au traitement de votre commande.</span>
            </p>
          </form>
        </>
      ) : (
        /* Step 2: Order Recap & Direct WhatsApp Confirmation */
        <div className="space-y-5">
          <div className="border-b border-zinc-100 pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#15803D]">
              <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Vérification avant envoi</span>
            </div>
            <h2 className="mt-1 font-display text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-950">
              Récapitulatif de votre commande
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              Vérifiez vos informations puis cliquez ci-dessous pour envoyer votre commande sur WhatsApp.
            </p>
          </div>

          <dl className="divide-y divide-zinc-100 rounded-xl border border-zinc-200 bg-zinc-50/70 px-4 text-sm">
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="text-zinc-500">Produit</dt>
              <dd className="font-semibold text-zinc-950 text-right">
                {selectedQuantity > 1
                  ? `${STORE_CONFIG.product.name} (x${selectedQuantity})`
                  : STORE_CONFIG.product.name}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="text-zinc-500">Prix actuel</dt>
              <dd className="font-display text-base font-extrabold text-[#FF4D00] tabular-nums text-right">
                {formatFcfa(totalAmount)} {STORE_CONFIG.currency}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="text-zinc-500">Nom et prénom</dt>
              <dd className="font-medium text-zinc-950 text-right">{fullName.trim()}</dd>
            </div>
            <div className="flex items-start justify-between gap-4 py-3">
              <dt className="text-zinc-500 shrink-0">Adresse</dt>
              <dd className="font-medium text-zinc-950 text-right">{address.trim()}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="text-zinc-500">Téléphone</dt>
              <dd className="font-medium text-zinc-950 tabular-nums text-right">
                +221 {formatSenegalPhoneDisplay(phone)}
              </dd>
            </div>
          </dl>

          <div className="space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppDispatch(orderData)}
              className="flex w-full min-h-[54px] items-center justify-center gap-2.5 rounded-xl bg-[#16A34A] px-6 py-3.5 font-display text-base font-extrabold text-white shadow-sm transition-colors hover:bg-[#15803D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#16A34A]"
            >
              <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>Confirmer sur WhatsApp</span>
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setStep('form')}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50 cursor-pointer"
              >
                <Pencil className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Modifier mes informations</span>
              </button>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 shrink-0 text-[#16A34A]" aria-hidden="true" />
                    <span className="text-[#15803D]">Message copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Copier le message</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-zinc-500">
            Votre commande est transmise dès que vous envoyez le message préparé sur WhatsApp ({STORE_CONFIG.whatsappDisplay}).
          </p>
        </div>
      )}
    </div>
  );
};
