import { useCallback, useEffect, useRef, useState } from 'react';
import { Footer } from './components/Footer';
import { Header, type ActivePage } from './components/Header';
import { HomeHero } from './components/HomeHero';
import { HomeSections } from './components/HomeSections';
import { ProductPage } from './components/ProductPage';
import { initTracking, trackViewProduct } from './lib/analytics';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [isFormVisible, setIsFormVisible] = useState(true);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const formContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    initTracking();
    trackViewProduct();
  }, []);

  // Hide mobile sticky bar automatically when the order form is visible in the viewport
  // so it never overlaps any input field or obscures form buttons.
  useEffect(() => {
    const el = formContainerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFormVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [activePage]);

  const scrollToForm = useCallback(() => {
    const target = formContainerRef.current;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.setTimeout(() => {
        nameInputRef.current?.focus({ preventScroll: true });
      }, 350);
    }
  }, []);

  const handleNavigatePage = useCallback((page: ActivePage, sectionId?: string) => {
    setActivePage(page);

    if (sectionId) {
      window.setTimeout(() => {
        const sectionEl = document.getElementById(sectionId);
        if (sectionEl) {
          sectionEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900">
      <Header
        activePage={activePage}
        onNavigatePage={handleNavigatePage}
        onScrollToForm={scrollToForm}
      />

      <main className="flex-1">
        {activePage === 'home' ? (
          <>
            <HomeHero
              nameInputRef={nameInputRef}
              formContainerRef={formContainerRef}
              onOpenProductPage={() => handleNavigatePage('product')}
            />
            <HomeSections
              onScrollToForm={scrollToForm}
              onOpenProductPage={() => handleNavigatePage('product')}
            />
          </>
        ) : (
          <ProductPage
            nameInputRef={nameInputRef}
            formContainerRef={formContainerRef}
            onBackHome={() => handleNavigatePage('home')}
            onScrollToForm={scrollToForm}
          />
        )}
      </main>

      <Footer
        onNavigatePage={handleNavigatePage}
        onScrollToForm={scrollToForm}
      />

      {/* Smart mobile sticky CTA: compact (< 15% total sticky viewport), hidden whenever the form itself is visible */}
      {!isFormVisible && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-zinc-200 bg-white/95 backdrop-blur-sm px-4 py-2.5 md:hidden shadow-[0_-8px_20px_-8px_rgba(0,0,0,0.12)]">
          <button
            type="button"
            onClick={scrollToForm}
            className="w-full min-h-[46px] rounded-xl bg-[#FF4D00] px-5 py-2.5 font-display text-sm font-extrabold tracking-wide text-white transition-colors hover:bg-[#E04300] cursor-pointer"
          >
            COMMANDER MAINTENANT
          </button>
        </div>
      )}
    </div>
  );
}
