import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import '../firebase';

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
