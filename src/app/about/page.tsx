import { LegalPageView, legalMetadata } from "@/components/legal-page";

export const metadata = legalMetadata("about");

export default function Page() {
  return <LegalPageView slug="about" />;
}
