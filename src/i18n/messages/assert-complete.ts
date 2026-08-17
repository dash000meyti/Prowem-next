import type { Dictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";
import ar from "@/i18n/messages/ar.json";
import de from "@/i18n/messages/de.json";
import es from "@/i18n/messages/es.json";
import pt from "@/i18n/messages/pt.json";

const messages: Record<Exclude<Locale, "en">, Dictionary> = {
  de,
  pt,
  es,
  ar,
};

void messages;
