import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import App from 'container/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { theme } from 'theme/theme';
import './index.css';
import reportWebVitals from './reportWebVitals';

const queryCache = new QueryCache();

ReactDOM.render(
  <ReactQueryCacheProvider queryCache={queryCache}>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode='dark' />
      <App />
    </ChakraProvider>
  </ReactQueryCacheProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
