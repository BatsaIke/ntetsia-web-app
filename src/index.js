import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "container/App";
import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import { CookiesProvider } from "react-cookie";
import { theme } from "theme/theme";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const queryClient = new QueryClient();
const engine = new Styletron();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <ChakraProvider theme={theme}>
        <CookiesProvider>
          <ColorModeScript initialColorMode={theme.config.useSystemColorMode} />
          <App />
          </CookiesProvider>
        </ChakraProvider>
      </BaseProvider>
    </StyletronProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
