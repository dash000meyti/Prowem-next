import { Glyph, type GlyphProps } from "@/components/icons/glyphs/glyph";

export function InfoGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v4h1" />
    </Glyph>
  );
}
