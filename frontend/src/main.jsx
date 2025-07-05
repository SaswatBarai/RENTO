import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './state/store.js';
import './index.css';
import App from './App.jsx';
import {ToastContainer} from "react-toastify"

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
          <ToastContainer/>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
