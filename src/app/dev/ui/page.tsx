import { Button, buttonColors } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Dropdown } from "@/components/ui/dropdown";
import { SideMenu } from "@/components/ui/side-menu";
import { LabSection } from "../lab-section";
import { TokenGallery } from "./tokens";

const buttonVariants = ["filled", "secondary", "outline", "soft", "ghost", "subtle", "link", "muted"] as const;
const buttonSizes = ["sm", "md", "lg"] as const;
const buttonRadii = ["sm", "md", "lg", "xl", "full"] as const;
const cardRadii = ["none", "sm", "md", "lg", "full"] as const;
const cardSurfaces = ["panel", "glass", "light", "glass-light", "light-dual", "glass-light-dual"] as const;
const cardSlotVariants = ["none", "filled", "border", "divider"] as const;
const cardPaddings = ["none", "sm", "md", "lg"] as const;
const cardLabPreview = "min-w-[200px] min-h-[300px]";
const containerWidths = ["xs", "sm", "md", "lg", "xl", "full"] as const;
const containerPaddings = ["none", "sm", "md", "lg"] as const;

function DemoMenu() {
  return (
    <ul className="flex min-w-0 flex-col p-1 text-sm">
      <li className="px-3 py-1.5">Item one</li>
      <li className="px-3 py-1.5">Item two</li>
    </ul>
  );
}

function LabPropHeading({
  label,
  defaults,
}: {
  label: string;
  defaults: string;
}) {
  return (
    <h3 className="text-sm font-medium text-foreground/70">
      {label} - Default: {defaults}
    </h3>
  );
}

export default function DevUiPage() {
  return (
    <main className="flex min-w-0 flex-1 flex-col">
      <Container
        width="full"
        className="flex flex-col gap-12 py-8 md:gap-16 md:py-12"
      >
        <h1 className="text-2xl font-semibold tracking-tight text-start md:text-3xl">
          UI
        </h1>

        <LabSection title="Tokens" hint="src/settings/default.json">
          <TokenGallery />
        </LabSection>

        <LabSection title="Button" hint="src/components/ui/button">
          <div className="flex min-w-0 flex-col gap-8">
            <div className="flex min-w-0 flex-col gap-4">
              <LabPropHeading label="variant × color" defaults="filled, primary" />
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
              <LabPropHeading label="size" defaults="md" />
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                {buttonSizes.map((size) => (
                  <Button key={size} size={size}>
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <LabPropHeading label="radius" defaults="full" />
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                {buttonRadii.map((radius) => (
                  <Button key={radius} radius={radius}>
                    {radius}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <LabPropHeading label="icon" defaults="iconPosition start" />
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <Button icon="close" />
                <Button icon="menu">start</Button>
                <Button icon="menu" iconPosition="end">
                  end
                </Button>
                <Button icon="close" disabled />
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </LabSection>

        <LabSection
          title="Card"
          hint="src/components/ui/card — empty Card chrome; Header / Content / Footer carry padding"
        >
          <div className="flex min-w-0 flex-col gap-8">
            <div className="flex min-w-0 flex-col gap-2">
              <LabPropHeading
                label="compound"
                defaults="surface panel, color primary, padding none, radius md"
              />
              <Card className={`max-w-sm ${cardLabPreview}`}>
                <CardHeader variant="divider">
                  <CardTitle>Title</CardTitle>
                  <CardDescription>Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Content</p>
                </CardContent>
                <CardFooter variant="divider">
                  <Button variant="subtle">Cancel</Button>
                  <Button>Confirm</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <LabPropHeading label="surface" defaults="panel" />
              <div className="flex min-w-0 flex-wrap items-stretch gap-2">
                {cardSurfaces.map((surface) => (
                  <Card key={surface} surface={surface} className={cardLabPreview}>
                    <CardContent>
                      <p className="text-sm">{surface}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {(["light", "glass-light", "light-dual", "glass-light-dual"] as const).map((surface) => (
              <div key={surface} className="flex min-w-0 flex-col gap-2">
                <LabPropHeading label={`${surface} × color`} defaults="primary" />
                <div className="flex min-w-0 flex-wrap items-stretch gap-2">
                  {buttonColors.map((color) => (
                    <Card
                      key={color}
                      surface={surface}
                      color={color}
                      className={cardLabPreview}
                    >
                      <CardContent>
                        <p className="text-sm">{color}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex min-w-0 flex-col gap-2">
              <LabPropHeading label="header / footer" defaults="none" />
              <div className="flex min-w-0 flex-wrap items-stretch gap-2">
                {cardSlotVariants.map((variant) => (
                  <Card key={variant} className={cardLabPreview}>
                    <CardHeader variant={variant}>
                      <CardTitle>{variant}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Main</p>
                    </CardContent>
                    <CardFooter variant={variant}>
                      <Button variant="subtle" size="sm">
                        Action
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <LabPropHeading label="padding (root)" defaults="none" />
              <div className="flex min-w-0 flex-wrap items-stretch gap-2">
                {cardPaddings.map((padding) => (
                  <Card key={padding} padding={padding} className={cardLabPreview}>
                    <p className="text-sm">{padding}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <LabPropHeading label="padding (slots)" defaults="md" />
              <div className="flex min-w-0 flex-wrap items-stretch gap-2">
                {cardPaddings.map((padding) => (
                  <Card key={padding} className={cardLabPreview}>
                    <CardHeader padding={padding} variant="border">
                      <CardTitle>Header {padding}</CardTitle>
                    </CardHeader>
                    <CardContent padding={padding}>
                      <p className="text-sm">Main {padding}</p>
                    </CardContent>
                    <CardFooter padding={padding} variant="border">
                      <p className="text-sm">Footer {padding}</p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <LabPropHeading label="radius" defaults="md" />
              <div className="flex min-w-0 flex-wrap items-stretch gap-2">
                {cardRadii.map((radius) => (
                  <Card key={radius} radius={radius} padding="md" className={cardLabPreview}>
                    <p className="text-sm">{radius}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </LabSection>

        <LabSection
          title="Dropdown"
          hint="src/components/ui/dropdown — Button trigger (default soft) + empty Card panel, fades over 300ms"
        >
          <div className="flex min-w-0 flex-col gap-6">
            <div className="flex min-w-0 flex-col gap-2">
              <LabPropHeading label="variant" defaults="soft" />
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                {buttonVariants.map((variant) => (
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
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              <LabPropHeading label="color" defaults="primary" />
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
            </div>
            <div className="flex min-w-0 flex-col gap-2">
              <LabPropHeading label="icon / align" defaults="align end" />
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
          </div>
        </LabSection>

        <LabSection
          title="SideMenu"
          hint="src/components/ui/side-menu — slides in from start or end over 300ms"
        >
          <div className="flex min-w-0 flex-col gap-2">
            <LabPropHeading label="variant / side" defaults="outline, end" />
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
          </div>
        </LabSection>

        <LabSection title="Container" hint="src/components/ui/container">
          <div className="flex min-w-0 flex-col gap-4">
            <LabPropHeading label="width × padding" defaults="xl, md" />
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
