import { copy } from "@/dev/copy";
import type { ComponentMeta } from "@/dev/meta/types";

export function PropsTable({ meta }: { meta: ComponentMeta }) {
  return (
    <div className="overflow-x-auto rounded-md border-md border-border">
      <table className="w-full text-start text-sm">
        <thead className="bg-panel text-foreground/70">
          <tr>
            <th className="px-3 py-2 font-medium">{copy.prop}</th>
            <th className="px-3 py-2 font-medium">{copy.type}</th>
            <th className="px-3 py-2 font-medium">{copy.default}</th>
            <th className="px-3 py-2 font-medium">{copy.description}</th>
          </tr>
        </thead>
        <tbody>
          {meta.props.map((prop) => (
            <tr key={prop.name} className="border-t border-md border-border">
              <td className="px-3 py-2 font-mono text-xs">{prop.name}</td>
              <td className="px-3 py-2 font-mono text-xs text-foreground/70">
                {prop.type === "enum" ? prop.values?.join(" | ") : prop.type}
              </td>
              <td className="px-3 py-2 font-mono text-xs">
                {prop.default === undefined ? "—" : String(prop.default)}
              </td>
              <td className="px-3 py-2">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
