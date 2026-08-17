import { Glyph, type GlyphProps } from "@/components/icons/glyphs/glyph";

export function MenuGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Glyph>
  );
}
