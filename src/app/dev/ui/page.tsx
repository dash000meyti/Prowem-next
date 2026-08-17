import { Button, buttonColors } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SideMenu } from "@/components/ui/side-menu";
import { LabSection } from "../lab-section";
import { TokenGallery } from "./tokens";

const buttonVariants = ["filled", "secondary", "outline", "soft", "ghost", "subtle", "link"] as const;
const buttonSizes = ["sm", "md", "lg"] as const;
const buttonRadii = ["sm", "md", "lg", "xl", "full"] as const;
const dropdownVariants = ["filled", "secondary", "outline", "soft", "link"] as const;
const containerWidths = ["sm", "md", "lg", "full"] as const;
const containerPaddings = ["none", "sm", "md", "lg"] as const;

function DemoMenu() {
  return (
    <ul className="flex min-w-0 flex-col p-1 text-sm">
      <li className="px-3 py-1.5">Item one</li>
      <li className="px-3 py-1.5">Item two</li>
    </ul>
  );
}

export default function DevUiPage() {
  return (
    <main className="flex min-w-0 flex-1 flex-col">
      <Container className="flex flex-col gap-12 py-8 md:gap-16 md:py-12">
        <h1 className="text-2xl font-semibold tracking-tight text-start md:text-3xl">
          UI
        </h1>

        <LabSection title="Tokens" hint="src/settings/default.json">
          <TokenGallery />
        </LabSection>

        <LabSection title="Button" hint="src/components/ui/button">
          <div className="flex min-w-0 flex-col gap-8">
            <div className="flex min-w-0 flex-col gap-4">
              <h3 className="text-sm font-medium text-foreground/70">
                variant × color
              </h3>
              {buttonVariants.map((variant) => (
                <div key={variant} className="flex min-w-0 flex-col gap-2">
                  <p className="text-xs text-foreground/70">{variant}</p>
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    {buttonColors.map((color) => (
                      <Button key={color} variant={variant} color={color}>
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <h3 className="text-sm font-medium text-foreground/70">size</h3>
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                {buttonSizes.map((size) => (
                  <Button key={size} size={size}>
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <h3 className="text-sm font-medium text-foreground/70">radius</h3>
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                {buttonRadii.map((radius) => (
                  <Button key={radius} radius={radius}>
                    {radius}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <h3 className="text-sm font-medium text-foreground/70">icon</h3>
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <Button icon="close" />
                <Button icon="menu">Menu</Button>
                <Button icon="chevron-down" iconPosition="end">
                  Open
                </Button>
                <Button icon="close" disabled />
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </LabSection>

        <LabSection
          title="Dropdown"
          hint="src/components/ui/dropdown — panel fades in and out over 300ms"
        >
          <div className="flex min-w-0 flex-col gap-6">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              {dropdownVariants.map((variant) => (
                <Dropdown
                  key={variant}
                  variant={variant}
                  trigger={variant}
                  label={variant}
                >
                  <DemoMenu />
                </Dropdown>
              ))}
            </div>
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              {buttonColors.map((color) => (
                <Dropdown
                  key={color}
                  color={color}
                  trigger={color}
                  label={color}
                >
                  <DemoMenu />
                </Dropdown>
              ))}
            </div>
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <Dropdown icon="menu" label="Icon only">
                <DemoMenu />
              </Dropdown>
              <Dropdown icon="menu" trigger="Menu" label="Icon and text">
                <DemoMenu />
              </Dropdown>
              <Dropdown trigger="Align start" label="Align start" align="start">
                <DemoMenu />
              </Dropdown>
              <Dropdown trigger="Align end" label="Align end" align="end">
                <DemoMenu />
              </Dropdown>
            </div>
          </div>
        </LabSection>

        <LabSection
          title="SideMenu"
          hint="src/components/ui/side-menu — slides in from start or end over 300ms"
        >
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <SideMenu
              icon="menu"
              label="Menu"
              closeLabel="Close"
              variant="secondary"
            >
              <DemoMenu />
            </SideMenu>
            <SideMenu
              icon="menu"
              trigger="Start"
              label="Start"
              closeLabel="Close"
              side="start"
            >
              <DemoMenu />
            </SideMenu>
            <SideMenu
              icon="menu"
              trigger="End"
              label="End"
              closeLabel="Close"
              side="end"
              variant="soft"
              footer={<Button className="w-full">Get Started</Button>}
            >
              <DemoMenu />
            </SideMenu>
          </div>
        </LabSection>

        <LabSection title="Container" hint="src/components/ui/container">
          <div className="flex min-w-0 flex-col gap-4">
            {containerWidths.map((width) =>
              containerPaddings.map((padding) => (
                <Container
                  key={`${width}-${padding}`}
                  width={width}
                  padding={padding}
                  className="border-sm border-border bg-panel"
                >
                  <p className="border-sm border-dashed border-border py-3 text-sm">
                    width={width} padding={padding}
                  </p>
                </Container>
              )),
            )}
          </div>
        </LabSection>
      </Container>
    </main>
  );
}
