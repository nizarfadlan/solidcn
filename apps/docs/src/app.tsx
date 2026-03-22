import { MetaProvider } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense, createSignal } from "solid-js";
import { Header } from "./components/layout/Header.js";
import { MobileSidebar } from "./components/layout/Sidebar.js";
import "./app.css";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = createSignal(false);

  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <div class="min-h-screen bg-background text-foreground">
            <Header
              onMobileMenuToggle={() => setMobileMenuOpen((v) => !v)}
              mobileMenuOpen={mobileMenuOpen()}
            />
            <MobileSidebar open={mobileMenuOpen()} onClose={() => setMobileMenuOpen(false)} />
            <Suspense>{props.children}</Suspense>
          </div>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
