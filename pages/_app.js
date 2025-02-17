import { useEffect, useState } from "react";
import Router from "next/router";
import { store } from "@/redux/store";
import "../styles/globals.css";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    const handleRouteChangeError = () => {
      setLoading(false);
    };

    const handleBeforeUnload = () => {
      setLoading(true);
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    Router.events.on("routeChangeError", handleRouteChangeError);

    // Listen for page reload or navigation away
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup event listeners when the component unmounts
    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
      Router.events.off("routeChangeError", handleRouteChangeError);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <Provider store={store}>
      <div>
        {loading && (
          <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-gray-500 z-50">
            <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
