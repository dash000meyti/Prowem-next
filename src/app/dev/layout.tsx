import type { Metadata, Viewport } from "next";
import { DevShell } from "@/dev/chrome/shell";
import { copy } from "@/dev/copy";
import { fontVariablesClassName } from "@/fonts";
import { cn } from "@/lib/cn";
import { toCssVars } from "@/settings/css-vars";
import { getSettings } from "@/settings/get-settings";
import "../globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: copy.siteName,
    template: `%s · ${copy.siteName}`,
  },
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
      className={cn(
        fontVariablesClassName,
        "h-full min-w-0 overflow-x-clip antialiased",
      )}
      style={toCssVars(settings.theme)}
    >
      <body className="flex min-h-full min-w-0 flex-col bg-background text-foreground">
        <DevShell>{children}</DevShell>
      </body>
    </html>
  );
}
