import { SiteHeader } from "@/components/templates/site-header";
import { copy } from "@/dev/copy";
import { getSettings } from "@/settings/get-settings";

export async function SiteHeaderGallery() {
  const settings = await getSettings();

  return (
    <div className="overflow-visible rounded-md border-md border-border">
      <SiteHeader
        siteName="Prowem"
        nav={copy.demo.nav}
        currentLocale="en"
        navFrom={settings.header.navFrom}
      />
    </div>
  );
}
