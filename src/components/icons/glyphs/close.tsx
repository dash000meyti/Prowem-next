import { Glyph, type GlyphProps } from "@/components/icons/glyphs/glyph";

export function CloseGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Glyph>
  );
}
