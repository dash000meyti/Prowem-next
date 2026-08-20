export type MetaKind = "ui" | "template";

export type MetaPropType = "enum" | "string" | "number" | "boolean" | "node";

export type ComponentMetaProp = {
  name: string;
  type: MetaPropType;
  values?: string[];
  default?: string | number | boolean;
  description: string;
  playground?: boolean;
  /** Playground footer section label (English). */
  group?: string;
  /** Shown only when the named prop is active (not none / false / empty). */
  dependsOn?: string;
};

export type ComponentMeta = {
  name: string;
  slug: string;
  kind: MetaKind;
  file: string;
  importStatement: string;
  description: string;
  rules: string[];
  props: ComponentMetaProp[];
};
