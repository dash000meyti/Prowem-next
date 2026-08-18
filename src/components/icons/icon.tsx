import type { IconName } from "@/components/icons/registry";
import { iconRegistry, isFlagIcon } from "@/components/icons/registry";
import { cn } from "@/lib/cn";

export type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  const Svg = iconRegistry[name];
  const flag = isFlagIcon(name);

  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        flag
          ? "size-5 overflow-hidden rounded-full border border-md border-border"
          : "size-5",
        className,
      )}
    >
      <Svg className={flag ? "size-full origin-center scale-125" : "size-full"} />
    </span>
  );
}
