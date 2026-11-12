import { HubPage, hubMetadata } from "@/components/hub-page";

export const metadata = hubMetadata("image-tools");

export default function Page() {
  return <HubPage slug="image-tools" category="image" name="Image tools" />;
}
