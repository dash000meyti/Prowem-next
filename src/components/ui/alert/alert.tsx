import type { HTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { Card, type CardProps } from "@/components/ui/card";
import { cn } from "@/lib/cn";

export type AlertProps = Omit<HTMLAttributes<HTMLDivElement>, "color"> & {
  color?: CardProps["borderColor"];
  icon?: IconName;
  children: ReactNode;
};

export function Alert({
  className,
  color = "border",
  icon,
  children,
  ...props
}: AlertProps) {
  return (
    <Card
      padding="md"
      borderColor={color}
      className={cn("flex-row items-start gap-3", className)}
      {...props}
    >
      {icon ? <Icon name={icon} className="size-5 shrink-0" /> : null}
      <div className="min-w-0 flex-1">{children}</div>
    </Card>
  );
}
