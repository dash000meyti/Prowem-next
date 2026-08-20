import type { Metadata } from "next";
import { copy } from "@/dev/copy";
import { TestSandbox } from "@/dev/test/test-sandbox";

export const metadata: Metadata = {
  title: copy.testPage.title,
};

export default function DevTestPage() {
  return <TestSandbox />;
}
