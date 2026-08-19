import { Button } from "@/components/ui/button";
import {
  SideMenu,
  SideMenuContent,
  SideMenuFooter,
  SideMenuHeader,
} from "@/components/ui/side-menu";
import { copy } from "@/dev/copy";
import { DemoMenu, GalleryHeading } from "@/dev/gallery/shared";

export function SideMenuGallery() {
  return (
    <div className="flex min-w-0 flex-col gap-8">
      <div className="flex min-w-0 flex-col gap-2">
        <GalleryHeading label="variant / side" defaults="outline, end" />
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <SideMenu
            icon="menu"
            label={copy.demo.nav.menu}
            closeLabel={copy.demo.nav.close}
            variant="secondary"
          >
            <SideMenuHeader>{copy.demo.nav.menu}</SideMenuHeader>
            <SideMenuContent>
              <DemoMenu />
            </SideMenuContent>
          </SideMenu>
          <SideMenu
            icon="menu"
            trigger="Start"
            label="Start"
            closeLabel={copy.demo.nav.close}
            side="start"
          >
            <SideMenuHeader>Start</SideMenuHeader>
            <SideMenuContent>
              <DemoMenu />
            </SideMenuContent>
          </SideMenu>
          <SideMenu
            icon="menu"
            trigger="End"
            label="End"
            closeLabel={copy.demo.nav.close}
            side="end"
            variant="soft"
          >
            <SideMenuHeader>End</SideMenuHeader>
            <SideMenuContent>
              <DemoMenu />
            </SideMenuContent>
            <SideMenuFooter>
              <Button className="w-full">{copy.demo.getStarted}</Button>
            </SideMenuFooter>
          </SideMenu>
        </div>
      </div>
    </div>
  );
}
