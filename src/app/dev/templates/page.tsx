import { redirect } from "next/navigation";
import { templateMetas } from "@/dev/meta";

export default function DevTemplatesIndexPage() {
  redirect(`/dev/templates/${templateMetas[0].slug}`);
}
