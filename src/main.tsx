import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FiltersProvider } from "./contexts/Filters";
import { I18nProvider } from "./contexts/I18n";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<I18nProvider>
			<FiltersProvider>
				<App />
			</FiltersProvider>
		</I18nProvider>
	</StrictMode>,
);
