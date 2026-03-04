import type { ReactNode } from "react";
import { Header } from "./header";
import { HeaderSection } from "./headersection";
import { Navigation } from "./navigation";
import { Footer } from "./footer";

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
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <Header title={headerTitle} />
        <Navigation />
        <div className="max-w-[1440px] w-full px-6 py-8 space-y-8 mx-auto">
          <HeaderSection title={sessionTitle}>{children}</HeaderSection>
        </div>
        <div className="max-w-[1440px] w-full mx-auto">
          {componentsChildren}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
