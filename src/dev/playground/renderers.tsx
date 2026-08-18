"use client";

import type { IconName } from "@/components/icons";
import { LanguageSwitcher } from "@/components/templates/language-switcher";
import { SiteHeader } from "@/components/templates/site-header";
import { Button, type ButtonColor, type ButtonProps } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  type CardProps,
} from "@/components/ui/card";
import { Container, type ContainerProps } from "@/components/ui/container";
import { Dropdown, type DropdownProps } from "@/components/ui/dropdown";
import { SideMenu, type SideMenuProps } from "@/components/ui/side-menu";
import { copy } from "@/dev/copy";
import { DemoMenu } from "@/dev/gallery/shared";
import type { ComponentMeta } from "@/dev/meta/types";
import { Playground, type PlaygroundValues } from "@/dev/playground/playground";
import type { Locale } from "@/i18n/config";
import type { BreakpointName } from "@/settings/types";

function emptyToUndefined(value: unknown) {
  return value === "" ? undefined : value;
}

const cardPreview = "min-w-[200px] min-h-[200px] max-w-sm";

function iconName(value: unknown): IconName | undefined {
  return emptyToUndefined(value) as IconName | undefined;
}

export function PlaygroundBySlug({
  slug,
  meta,
}: {
  slug: string;
  meta: ComponentMeta;
}) {
  switch (slug) {
    case "button":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <Button
              variant={values.variant as ButtonProps["variant"]}
              color={values.color as ButtonColor}
              size={values.size as ButtonProps["size"]}
              radius={values.radius as ButtonProps["radius"]}
              icon={iconName(values.icon)}
              iconPosition={values.iconPosition as ButtonProps["iconPosition"]}
              disabled={Boolean(values.disabled)}
            >
              {String(values.children)}
            </Button>
          )}
        />
      );
    case "card":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <Card
              surface={values.surface as CardProps["surface"]}
              lightBottom={values.lightBottom as CardProps["lightBottom"]}
              padding={values.padding as CardProps["padding"]}
              radius={values.radius as CardProps["radius"]}
              border={values.border as CardProps["border"]}
              borderColor={values.borderColor as CardProps["borderColor"]}
              className={cardPreview}
            >
              <CardHeader variant="divider">
                <CardTitle>{String(values.title)}</CardTitle>
                <CardDescription>{String(values.description)}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{String(values.content)}</p>
              </CardContent>
              <CardFooter variant="divider">
                <Button variant="subtle">{copy.demo.cancel}</Button>
                <Button>{copy.demo.confirm}</Button>
              </CardFooter>
            </Card>
          )}
        />
      );
    case "dropdown":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <Dropdown
              trigger={String(values.trigger)}
              icon={iconName(values.icon)}
              variant={values.variant as DropdownProps["variant"]}
              color={values.color as ButtonColor}
              align={values.align as DropdownProps["align"]}
              label={String(values.label)}
            >
              <DemoMenu />
            </Dropdown>
          )}
        />
      );
    case "side-menu":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <SideMenu
              trigger={String(values.trigger)}
              icon={iconName(values.icon)}
              variant={values.variant as SideMenuProps["variant"]}
              color={values.color as ButtonColor}
              side={values.side as SideMenuProps["side"]}
              label={String(values.label)}
              closeLabel={String(values.closeLabel)}
              footer={<Button className="w-full">{copy.demo.getStarted}</Button>}
            >
              <DemoMenu />
            </SideMenu>
          )}
        />
      );
    case "container":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <Container
              width={values.width as ContainerProps["width"]}
              padding={values.padding as ContainerProps["padding"]}
              className="border-md border-border bg-panel"
            >
              <p className="border-md border-dashed border-border py-3 text-sm">
                width={String(values.width)} padding={String(values.padding)}
              </p>
            </Container>
          )}
        />
      );
    case "language-switcher":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <LanguageSwitcher
              currentLocale={values.currentLocale as Locale}
              label={String(values.label)}
            />
          )}
        />
      );
    case "site-header":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <div className="overflow-visible rounded-md border-md border-border">
              <SiteHeader
                siteName={String(values.siteName)}
                nav={copy.demo.nav}
                currentLocale={values.currentLocale as Locale}
                navFrom={values.navFrom as BreakpointName}
              />
            </div>
          )}
        />
      );
    default:
      return null;
  }
}
