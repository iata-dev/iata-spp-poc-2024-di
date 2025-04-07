import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import { createRoot } from 'react-dom/client';

import { Toaster } from '@/components/ui/toaster.jsx';

import { App } from './App.jsx';

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return;
  }

  const { worker } = await import('@/mocks/browser.js');
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <>
      <App />
      <Toaster />
    </>
    // </StrictMode>
  );
});
