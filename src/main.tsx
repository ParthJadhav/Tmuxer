import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { SessionProvider } from "./contexts/session.context";
import { UpdateProvider } from "./contexts/update.context";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: '',
      },
    }),
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <SessionProvider>
          <UpdateProvider>
            <App />
          </UpdateProvider>
        </SessionProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);
