import { cva, type VariantProps } from "class-variance-authority";

/**
 * Catalog of local faces: name + weight model.
 * Keys are camelCase prop values; `label` is the human name for lab/docs.
 */
export const fontFaceCatalog = {
  bebasNeueRegular: {
    label: "Bebas Neue Regular",
    family: "bebas-neue",
    weight: 400,
  },
  heeboRegular: {
    label: "Heebo Regular",
    family: "heebo",
    weight: 400,
  },
  heeboBold: {
    label: "Heebo Bold",
    family: "heebo",
    weight: 700,
  },
  ubuntuLight: {
    label: "Ubuntu Light",
    family: "ubuntu",
    weight: 300,
  },
  ubuntuMedium: {
    label: "Ubuntu Medium",
    family: "ubuntu",
    weight: 500,
  },
} as const;

export type FontFace = keyof typeof fontFaceCatalog;

export const fontFaceValues = Object.keys(fontFaceCatalog) as FontFace[];

export const fontFaceLabels: Record<FontFace, string> = {
  bebasNeueRegular: fontFaceCatalog.bebasNeueRegular.label,
  heeboRegular: fontFaceCatalog.heeboRegular.label,
  heeboBold: fontFaceCatalog.heeboBold.label,
  ubuntuLight: fontFaceCatalog.ubuntuLight.label,
  ubuntuMedium: fontFaceCatalog.ubuntuMedium.label,
};

/** Family + weight only. Size / leading / tracking stay on the component type scale. */
export const fontFaceVariants = cva("", {
  variants: {
    font: {
      bebasNeueRegular: "font-bebas-neue font-normal",
      heeboRegular: "font-heebo font-normal",
      heeboBold: "font-heebo font-bold",
      ubuntuLight: "font-ubuntu font-light",
      ubuntuMedium: "font-ubuntu font-medium",
    },
  },
});

export type FontFaceVariantProps = VariantProps<typeof fontFaceVariants>;
