import { AlertGallery } from "@/dev/gallery/alert";
import { BadgeGallery } from "@/dev/gallery/badge";
import { ButtonGallery } from "@/dev/gallery/button";
import { CardGallery } from "@/dev/gallery/card";
import { CheckboxGallery } from "@/dev/gallery/checkbox";
import { CodeGallery } from "@/dev/gallery/code";
import { ContainerGallery } from "@/dev/gallery/container";
import { DropdownGallery } from "@/dev/gallery/dropdown";
import { HeadingGallery } from "@/dev/gallery/heading";
import { InputGallery } from "@/dev/gallery/input";
import { LabelGallery } from "@/dev/gallery/label";
import { ListGallery } from "@/dev/gallery/list";
import { PopupGallery } from "@/dev/gallery/popup";
import { SelectGallery } from "@/dev/gallery/select";
import { SeparatorGallery } from "@/dev/gallery/separator";
import { SideMenuGallery } from "@/dev/gallery/side-menu";
import { SiteHeaderGallery } from "@/dev/gallery/site-header";
import { SwitchGallery } from "@/dev/gallery/switch";
import { TableGallery } from "@/dev/gallery/table";
import { TabsGallery } from "@/dev/gallery/tabs";
import { TextGallery } from "@/dev/gallery/text";
import { TextareaGallery } from "@/dev/gallery/textarea";
import { TooltipGallery } from "@/dev/gallery/tooltip";

export async function GalleryBySlug({ slug }: { slug: string }) {
  switch (slug) {
    case "button":
      return <ButtonGallery />;
    case "badge":
      return <BadgeGallery />;
    case "input":
      return <InputGallery />;
    case "textarea":
      return <TextareaGallery />;
    case "select":
      return <SelectGallery />;
    case "checkbox":
      return <CheckboxGallery />;
    case "switch":
      return <SwitchGallery />;
    case "label":
      return <LabelGallery />;
    case "heading":
      return <HeadingGallery />;
    case "text":
      return <TextGallery />;
    case "list":
      return <ListGallery />;
    case "code":
      return <CodeGallery />;
    case "table":
      return <TableGallery />;
    case "separator":
      return <SeparatorGallery />;
    case "card":
      return <CardGallery />;
    case "alert":
      return <AlertGallery />;
    case "dropdown":
      return <DropdownGallery />;
    case "tooltip":
      return <TooltipGallery />;
    case "popup":
      return <PopupGallery />;
    case "side-menu":
      return <SideMenuGallery />;
    case "tabs":
      return <TabsGallery />;
    case "container":
      return <ContainerGallery />;
    case "site-header":
      return <SiteHeaderGallery />;
    default:
      return null;
  }
}
