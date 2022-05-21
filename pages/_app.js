import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import '../firebase';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20000,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" reverseOrder={false} />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
