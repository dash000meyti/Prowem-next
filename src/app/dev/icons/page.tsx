import { Icon, iconRegistry, type IconName } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { LabSection } from "../lab-section";

const names = Object.keys(iconRegistry) as IconName[];

export default function DevIconsPage() {
  return (
    <main className="flex min-w-0 flex-1 flex-col">
      <Container className="flex flex-col gap-12 py-8 md:gap-16 md:py-12">
        <h1 className="text-2xl font-semibold tracking-tight text-start md:text-3xl">
          Icons
        </h1>

        <LabSection title="Icon" hint="src/components/icons">
          <ul className="grid min-w-0 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {names.map((name) => (
              <li
                key={name}
                className="flex min-w-0 flex-col items-center gap-2 rounded-lg border-sm border-border bg-panel px-3 py-4"
              >
                <Icon name={name} />
                <span className="min-w-0 truncate text-xs text-foreground/70">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </LabSection>
      </Container>
    </main>
  );
}
