import { ButtonGallery } from "@/dev/gallery/button";
import { CardGallery } from "@/dev/gallery/card";
import { ContainerGallery } from "@/dev/gallery/container";
import { DropdownGallery } from "@/dev/gallery/dropdown";
import { SideMenuGallery } from "@/dev/gallery/side-menu";
import { SiteHeaderGallery } from "@/dev/gallery/site-header";

export async function GalleryBySlug({ slug }: { slug: string }) {
  switch (slug) {
    case "button":
      return <ButtonGallery />;
    case "card":
      return <CardGallery />;
    case "dropdown":
      return <DropdownGallery />;
    case "side-menu":
      return <SideMenuGallery />;
    case "container":
      return <ContainerGallery />;
    case "site-header":
      return <SiteHeaderGallery />;
    default:
      return null;
  }
}
