import React, { useEffect, useRef } from 'react'; // Import React
import type { AppProps /*, NextWebVitalsMetric */ } from 'next/app';
import type { NextRouter } from 'next/router';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

import '@/styles/tailwind.css';
import 'focus-visible';

// Generic usePrevious hook
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

// Define a type for pageProps that might include previousPathname
// This is a general assumption; individual pages will define their own props.
// If a page component doesn't list previousPathname in its props,
// it will be passed but ignored (standard React behavior for extra props).
interface ExtendedPageProps {
  previousPathname?: string;
  [key: string]: any; // For other page-specific props
}

// AppProps from next/app is generic: AppProps<P = {}>
// We use our ExtendedPageProps for P.
export default function App({ Component, pageProps, router }: AppProps<ExtendedPageProps>) {
  // router.pathname is a string. usePrevious will return string | undefined.
  const previousPathname: string | undefined = usePrevious(router.pathname);

  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative">
        <Header />
        <main>
          {/* Pass previousPathname to the Component.
              The Component (page) needs to be able to accept this prop if it uses it.
              If not, it will be an unused prop, which is fine. */}
          <Component previousPathname={previousPathname} {...pageProps} />
        </main>
        <Footer />
      </div>
    </>
  );
}
