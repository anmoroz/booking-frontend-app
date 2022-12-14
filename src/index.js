import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {AuthProvider} from './context/AuthProvider';
import App from './components/App/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
  <AuthProvider>
      <QueryClientProvider client={queryClient}>
            <App />
      </QueryClientProvider>
  </AuthProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
