import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { ThemeProvider } from "@material-ui/styles";
import { theme } from "theme";
import reportWebVitals from "./reportWebVitals";

import App from "App";

const queryClient = new QueryClient();

ReactDOM.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
