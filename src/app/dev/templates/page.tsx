import { LanguageSwitcher } from "@/components/templates/language-switcher";
import { SiteHeader } from "@/components/templates/site-header";
import { Container } from "@/components/ui/container";
import { LabSection } from "../lab-section";

export default function DevTemplatesPage() {
  return (
    <main className="flex min-w-0 flex-1 flex-col">
      <Container className="flex flex-col gap-12 py-8 md:gap-16 md:py-12">
        <h1 className="text-2xl font-semibold tracking-tight text-start md:text-3xl">
          Templates
        </h1>

        <LabSection
          title="LanguageSwitcher"
          hint="src/components/templates/language-switcher"
        >
          <LanguageSwitcher currentLocale="en" label="Language" />
        </LabSection>

        <LabSection
          title="SiteHeader"
          hint="src/components/templates/site-header — rest is 80px with no chrome; after 8px of window scroll it sticks at 72px with bg-panel/72 and backdrop blur, and restores at 0. Narrow the viewport for the side menu."
        >
          <div className="overflow-visible rounded-lg border-sm border-border">
            <SiteHeader
              siteName="Prowem"
              nav={{
                language: "Language",
                menu: "Menu",
                close: "Close",
                home: "Home",
                myEventApp: "My Event-App",
                myBroadcast: "My Broadcast",
                mySocialmedia: "My Socialmedia",
                myClub: "My Club",
                eventTeam: "Prowem Event Team",
                login: "Login",
                getStarted: "Get Started",
              }}
              currentLocale="en"
            />
          </div>
        </LabSection>
      </Container>
    </main>
  );
}
