import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '../styles/globals.css';
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
  return(
  <>
   <Head> 
        <meta content="" name="keywords"/>
        <meta content="Get used items at cheap and affordable price.Your go-to-market place" name="description" />
        <meta name="theme-color" content="#102343" />
        <meta name="description"
        content="Get used items at cheap and affordable price.Your go-to-market place" />
        <meta content="width=device-width, initial-scale=1.0, shrink-to-fit=no" name="viewport" />
        <title>CompaniesCenterLLC | Find and hire reliable home service professionals for plumbing, electrical repairs, cleaning, and more. Book now!</title>
   </Head>
      <Component {...pageProps} />
  </>);
}
export default MyApp;
