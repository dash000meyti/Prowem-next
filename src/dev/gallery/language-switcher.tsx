import { LanguageSwitcher } from "@/components/templates/language-switcher";
import { copy } from "@/dev/copy";

export function LanguageSwitcherGallery() {
  return (
    <LanguageSwitcher currentLocale="en" label={copy.demo.nav.language} />
  );
}
