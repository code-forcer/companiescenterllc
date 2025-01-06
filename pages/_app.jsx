import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Preloader from '@/components/Preloader';
import { useState, useEffect } from "react";

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => {
  NProgress.start();
});

Router.events.on('routeChangeComplete', () => {
  NProgress.done();
});

Router.events.on('routeChangeError', () => {
  NProgress.done();
});

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement('script');
      script.src = `https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit`;
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,es,fr,de,it', // Add more languages separated by commas if needed
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
      };
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
        <meta content="" name="keywords" />
        <meta
          content="Find and hire reliable home service professionals for plumbing,
          electrical repairs, cleaning, and more. Book now!"
          name="description"
        />
        <meta name="theme-color" content="#102343" />
        <meta
          name="description"
          content="Find and hire reliable home service professionals for plumbing,
          electrical repairs, cleaning, and more. Book now!"
        />
        <meta
          content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
          name="viewport"
        />
        <title>
          CompaniesCenterLLC | Find and hire reliable home service professionals for plumbing,
          electrical repairs, cleaning, and more. Book now!
        </title>
      </Head>

      {/* Google Translate Widget */}
      <div id="google_translate_element" style={{ position: 'fixed', top: 50, right: 20, zIndex: 9999 }}></div>

      {loading ? (
        <Preloader setLoading={setLoading} />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp;
