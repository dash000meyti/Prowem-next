"use client";

import type { IconName } from "@/components/icons";
import { SiteHeader } from "@/components/templates/site-header";
import { Alert, type AlertProps } from "@/components/ui/alert";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button, type ButtonColor, type ButtonProps } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  type CardContentProps,
  type CardFooterProps,
  type CardHeaderProps,
  type CardProps,
} from "@/components/ui/card";
import { Checkbox, type CheckboxProps } from "@/components/ui/checkbox";
import { Code, type CodeProps } from "@/components/ui/code";
import { Container, type ContainerProps } from "@/components/ui/container";
import { Dropdown, type DropdownProps } from "@/components/ui/dropdown";
import { Heading, type HeadingLevel, type HeadingProps } from "@/components/ui/heading";
import { Input, type InputProps } from "@/components/ui/input";
import { Label, type LabelProps } from "@/components/ui/label";
import { List, type ListProps } from "@/components/ui/list";
import {
  Popup,
  PopupContent,
  PopupFooter,
  PopupHeader,
  type PopupProps,
} from "@/components/ui/popup";
import { Combobox, type ComboboxProps } from "@/components/ui/combobox";
import { Select, type SelectProps } from "@/components/ui/select";
import { SelectMenu, type SelectMenuProps } from "@/components/ui/select-menu";
import { Separator, type SeparatorProps } from "@/components/ui/separator";
import {
  SideMenu,
  SideMenuContent,
  SideMenuFooter,
  SideMenuHeader,
  type SideMenuProps,
} from "@/components/ui/side-menu";
import { Switch, type SwitchProps } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text, type TextProps } from "@/components/ui/text";
import { Textarea, type TextareaProps } from "@/components/ui/textarea";
import { Tooltip, type TooltipProps } from "@/components/ui/tooltip";
import { copy } from "@/dev/copy";
import { DemoMenu, demoComboboxItems, demoSelectItems } from "@/dev/gallery/shared";
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
          render={(values: PlaygroundValues) => {
            const cardProps = {
              surface: values.surface as CardProps["surface"],
              lightBottom: values.lightBottom as CardProps["lightBottom"],
              lightTop: values.lightTop as CardProps["lightTop"],
              lightStart: values.lightStart as CardProps["lightStart"],
              lightEnd: values.lightEnd as CardProps["lightEnd"],
              borderLightBottom: values.borderLightBottom as CardProps["borderLightBottom"],
              borderLightTop: values.borderLightTop as CardProps["borderLightTop"],
              borderLightStart: values.borderLightStart as CardProps["borderLightStart"],
              borderLightEnd: values.borderLightEnd as CardProps["borderLightEnd"],
              borderLightTopStart: values.borderLightTopStart as CardProps["borderLightTopStart"],
              borderLightTopCenter: values.borderLightTopCenter as CardProps["borderLightTopCenter"],
              borderLightTopEnd: values.borderLightTopEnd as CardProps["borderLightTopEnd"],
              borderLightBottomStart:
                values.borderLightBottomStart as CardProps["borderLightBottomStart"],
              borderLightBottomCenter:
                values.borderLightBottomCenter as CardProps["borderLightBottomCenter"],
              borderLightBottomEnd:
                values.borderLightBottomEnd as CardProps["borderLightBottomEnd"],
              borderLightStartStart:
                values.borderLightStartStart as CardProps["borderLightStartStart"],
              borderLightStartCenter:
                values.borderLightStartCenter as CardProps["borderLightStartCenter"],
              borderLightStartEnd:
                values.borderLightStartEnd as CardProps["borderLightStartEnd"],
              borderLightEndStart:
                values.borderLightEndStart as CardProps["borderLightEndStart"],
              borderLightEndCenter:
                values.borderLightEndCenter as CardProps["borderLightEndCenter"],
              borderLightEndEnd:
                values.borderLightEndEnd as CardProps["borderLightEndEnd"],
              padding: values.padding as CardProps["padding"],
              radius: values.radius as CardProps["radius"],
              border: values.border as CardProps["border"],
              borderColor: values.borderColor as CardProps["borderColor"],
            };

            return (
              <div className="flex min-w-0 flex-wrap items-stretch gap-4">
                <Card {...cardProps} className={cardPreview}>
                  <CardHeader
                    variant={values.headerVariant as CardHeaderProps["variant"]}
                    padding={values.headerPadding as CardHeaderProps["padding"]}
                    underline={
                      values.headerUnderline as CardHeaderProps["underline"]
                    }
                    underlineSize={
                      values.headerUnderlineSize as CardHeaderProps["underlineSize"]
                    }
                    underlineWidth={
                      values.headerUnderlineWidth as CardHeaderProps["underlineWidth"]
                    }
                  >
                    {String(values.title)}
                  </CardHeader>
                  <CardContent
                    padding={values.contentPadding as CardContentProps["padding"]}
                  >
                    <p className="text-sm">{String(values.content)}</p>
                  </CardContent>
                  <CardFooter
                    variant={values.footerVariant as CardFooterProps["variant"]}
                    padding={values.footerPadding as CardFooterProps["padding"]}
                  >
                    <Button variant="subtle">{copy.demo.cancel}</Button>
                    <Button>{copy.demo.confirm}</Button>
                  </CardFooter>
                </Card>
                <Card
                  {...cardProps}
                  className={`${cardPreview} items-center justify-center`}
                >
                  <p className="text-sm">{String(values.content)}</p>
                </Card>
              </div>
            );
          }}
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
            >
              <SideMenuHeader>{String(values.label)}</SideMenuHeader>
              <SideMenuContent>
                <DemoMenu />
              </SideMenuContent>
              <SideMenuFooter>
                <Button className="w-full">{copy.demo.getStarted}</Button>
              </SideMenuFooter>
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
    case "heading":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <Heading
              level={Number(values.level) as HeadingLevel}
              tone={values.tone as HeadingProps["tone"]}
            >
              {String(values.children)}
            </Heading>
          )}
        />
      );
    case "text":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <Text
              variant={values.variant as TextProps["variant"]}
              as={values.as as TextProps["as"]}
            >
              {String(values.children)}
            </Text>
          )}
        />
      );
    case "list":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <List
              as={values.as as ListProps["as"]}
              marker={values.marker as ListProps["marker"]}
              gap={values.gap as ListProps["gap"]}
            >
              <li>{copy.demo.menuItemOne}</li>
              <li>{copy.demo.menuItemTwo}</li>
            </List>
          )}
        />
      );
    case "table":
      return (
        <Playground
          meta={meta}
          render={() => (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{copy.prop}</TableHead>
                  <TableHead>{copy.type}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-mono text-xs">variant</TableCell>
                  <TableCell className="font-mono text-xs text-foreground/70">
                    filled
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-mono text-xs">size</TableCell>
                  <TableCell className="font-mono text-xs text-foreground/70">
                    md
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        />
      );
    case "code":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <Code display={values.display as CodeProps["display"]}>
              {String(values.children)}
            </Code>
          )}
        />
      );
    case "label":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <Label size={values.size as LabelProps["size"]}>
              {String(values.children)}
            </Label>
          )}
        />
      );
    case "input":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <Input
              className="max-w-xs"
              size={values.size as InputProps["size"]}
              radius={values.radius as InputProps["radius"]}
              value={String(values.value)}
              placeholder={String(values.placeholder)}
              disabled={Boolean(values.disabled)}
              onChange={() => undefined}
            />
          )}
        />
      );
    case "select":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <Select
              className="max-w-xs"
              size={values.size as SelectProps["size"]}
              radius={values.radius as SelectProps["radius"]}
              value={String(values.value)}
              disabled={Boolean(values.disabled)}
              onChange={() => undefined}
            >
              <option value="one">{copy.demo.optionOne}</option>
              <option value="two">{copy.demo.optionTwo}</option>
            </Select>
          )}
        />
      );
    case "select-menu":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <SelectMenu
              key={String(values.value)}
              className="max-w-xs"
              items={demoSelectItems}
              defaultValue={String(values.value)}
              placeholder={String(values.placeholder)}
              label={String(values.label)}
              size={values.size as SelectMenuProps["size"]}
              radius={values.radius as SelectMenuProps["radius"]}
              align={values.align as SelectMenuProps["align"]}
              disabled={Boolean(values.disabled)}
            />
          )}
        />
      );
    case "combobox":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <Combobox
              key={String(values.value)}
              className="max-w-xs"
              items={demoComboboxItems}
              defaultValue={String(values.value)}
              placeholder={String(values.placeholder)}
              label={String(values.label)}
              searchLabel={String(values.searchLabel)}
              emptyLabel={String(values.emptyLabel)}
              size={values.size as ComboboxProps["size"]}
              radius={values.radius as ComboboxProps["radius"]}
              align={values.align as ComboboxProps["align"]}
              disabled={Boolean(values.disabled)}
            />
          )}
        />
      );
    case "checkbox":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <Label className="flex items-center gap-2">
              <Checkbox
                size={values.size as CheckboxProps["size"]}
                checked={Boolean(values.checked)}
                disabled={Boolean(values.disabled)}
                onChange={() => undefined}
              />
              {copy.demo.label}
            </Label>
          )}
        />
      );
    case "separator":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <div
              className={
                values.orientation === "vertical"
                  ? "flex h-16 items-center"
                  : "w-full max-w-sm"
              }
            >
              <Separator
                orientation={values.orientation as SeparatorProps["orientation"]}
              />
            </div>
          )}
        />
      );
    case "badge":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <Badge
              variant={values.variant as BadgeProps["variant"]}
              color={values.color as ButtonColor}
              size={values.size as BadgeProps["size"]}
              radius={values.radius as BadgeProps["radius"]}
            >
              {String(values.children)}
            </Badge>
          )}
        />
      );
    case "textarea":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <Textarea
              className="max-w-xs"
              size={values.size as TextareaProps["size"]}
              radius={values.radius as TextareaProps["radius"]}
              value={String(values.value)}
              placeholder={String(values.placeholder)}
              disabled={Boolean(values.disabled)}
              onChange={() => undefined}
            />
          )}
        />
      );
    case "switch":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <Switch
              checked={Boolean(values.checked)}
              color={values.color as ButtonColor}
              size={values.size as SwitchProps["size"]}
              disabled={Boolean(values.disabled)}
              aria-label={copy.demo.label}
              onCheckedChange={() => undefined}
            />
          )}
        />
      );
    case "tabs":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <Tabs key={String(values.defaultValue)} defaultValue={String(values.defaultValue)}>
              <TabsList>
                <TabsTrigger value="one">{copy.demo.tabOne}</TabsTrigger>
                <TabsTrigger value="two">{copy.demo.tabTwo}</TabsTrigger>
              </TabsList>
              <TabsContent value="one">{copy.demo.tabOneBody}</TabsContent>
              <TabsContent value="two">{copy.demo.tabTwoBody}</TabsContent>
            </Tabs>
          )}
        />
      );
    case "alert":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <Alert
              color={values.color as AlertProps["color"]}
              icon={iconName(values.icon)}
            >
              {String(values.children)}
            </Alert>
          )}
        />
      );
    case "tooltip":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <Tooltip
              content={String(values.content)}
              side={values.side as TooltipProps["side"]}
            >
              <Button size="sm" variant="soft">
                {copy.demo.tooltip}
              </Button>
            </Tooltip>
          )}
        />
      );
    case "popup":
      return (
        <Playground
          meta={meta}
          render={(values: PlaygroundValues) => (
            <Popup
              trigger={String(values.trigger)}
              icon={iconName(values.icon)}
              variant={values.variant as PopupProps["variant"]}
              color={values.color as ButtonColor}
              label={String(values.label)}
              closeLabel={String(values.closeLabel)}
            >
              <PopupHeader>{copy.demo.popupTitle}</PopupHeader>
              <PopupContent>{copy.demo.popupBody}</PopupContent>
              <PopupFooter>
                <Button variant="subtle">{copy.demo.cancel}</Button>
                <Button>{copy.demo.confirm}</Button>
              </PopupFooter>
            </Popup>
          )}
        />
      );
    default:
      return null;
  }
}
