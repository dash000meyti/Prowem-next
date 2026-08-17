import { Glyph, type GlyphProps } from "@/components/icons/glyphs/glyph";

export function ChevronUpGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="M6 15l6-6 6 6" />
    </Glyph>
  );
}
