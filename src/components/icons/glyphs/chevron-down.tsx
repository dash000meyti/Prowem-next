import { Glyph, type GlyphProps } from "@/components/icons/glyphs/glyph";

export function ChevronDownGlyph(props: GlyphProps) {
  return (
    <Glyph {...props}>
      <path d="M6 9l6 6 6-6" />
    </Glyph>
  );
}
