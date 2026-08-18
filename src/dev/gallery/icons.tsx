import { Icon, iconRegistry, type IconName } from "@/components/icons";
import { copy } from "@/dev/copy";
import { LabSection } from "@/dev/chrome/section";

const names = Object.keys(iconRegistry) as IconName[];

export function IconsGallery() {
  return (
    <LabSection title={copy.iconsPage.title} hint={copy.iconsPage.hint}>
      <ul className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {names.map((name) => (
          <li
            key={name}
            className="flex min-w-0 flex-col items-center gap-2 rounded-lg border-md border-border bg-panel px-3 py-4"
          >
            <Icon name={name} />
            <span className="min-w-0 truncate text-xs text-foreground/70">
              {name}
            </span>
          </li>
        ))}
      </ul>
    </LabSection>
  );
}
