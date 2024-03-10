import React from 'react'
import ReactDOM from 'react-dom/client'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {NextUIProvider} from "@nextui-org/react";
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <NextUIProvider>
      <App />
  </NextUIProvider>
)
