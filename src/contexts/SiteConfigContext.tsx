"use client";

import { createContext, useContext } from "react";
import { siteConfig, type SiteConfig } from "@/lib/site.config";

const SiteConfigContext = createContext<SiteConfig>(
  siteConfig as unknown as SiteConfig
);

/** Envolve a árvore com o config buscado server-side. */
export function SiteConfigProvider({
  config,
  children,
}: {
  config: SiteConfig;
  children: React.ReactNode;
}) {
  return (
    <SiteConfigContext.Provider value={config}>
      {children}
    </SiteConfigContext.Provider>
  );
}

/** Hook para usar o config do site em qualquer componente client. */
export function useSiteConfig(): SiteConfig {
  return useContext(SiteConfigContext);
}
