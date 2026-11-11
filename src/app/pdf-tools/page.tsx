import { HubPage, hubMetadata } from "@/components/hub-page";

export const metadata = hubMetadata("pdf-tools");

export default function Page() {
  return <HubPage slug="pdf-tools" category="pdf" name="PDF tools" />;
}
