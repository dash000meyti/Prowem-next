# Local fonts

Self-hosted faces loaded with `next/font/local`. No Google CDN at runtime.

## Add a face

1. Put the file under `files/<family>/` (`.woff2` or `.ttf`).
2. Register it in `load.ts` with a unique `--font-family-*` CSS variable (or extend an existing family if it is a new weight of the same file).
3. Map the family in `globals.css` `@theme` (`--font-<name>: var(--font-family-…), …`) if it is a new family.
4. Add a catalog entry in `registry.ts` (`name` + weight → camelCase key + human `label`).
5. Refresh `/dev` meta if needed (font enum comes from `fontFaceValues`).

Licenses: Bebas Neue and Heebo are OFL; Ubuntu is under the Ubuntu Font Licence (`ufl/ubuntu` upstream).
