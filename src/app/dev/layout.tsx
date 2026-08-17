import type { Metadata, Viewport } from "next";
import { toCssVars } from "@/settings/css-vars";
import { getSettings } from "@/settings/get-settings";
import "../globals.css";
import { LabHeader } from "./lab-header";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Component lab",
  robots: { index: false, follow: false },
};

export default async function DevLayout({
  children,
}: LayoutProps<"/dev">) {
  const settings = await getSettings();

  return (
    <html
      lang="en"
      dir="ltr"
      className="h-full min-w-0 overflow-x-clip antialiased"
      style={toCssVars(settings.theme)}
    >
      <body className="flex min-h-full min-w-0 flex-col bg-background text-foreground">
        <LabHeader />
        {children}
      </body>
    </html>
  );
}
