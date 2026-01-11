import type { ReactNode } from "react";
import { Header } from "./header";
import { HeaderSection } from "./headersection";
import { Navigation } from "./navigation";

interface PageWrapperProps {
  headerTitle: string;
  sessionTitle: string;
  children: ReactNode;
  componentsChildren: ReactNode;
}

export function PageWrapper({
  headerTitle,
  sessionTitle,
  componentsChildren,
  children,
}: PageWrapperProps) {
  return (
    <div className="min-h-screen">
      <Header title={headerTitle} />
      <Navigation />
      <div className="px-6 py-8 space-y-8">
        <HeaderSection title={sessionTitle}>{children}</HeaderSection>
      </div>
      {componentsChildren}
    </div>
  );
}
