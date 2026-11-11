import { HubPage, hubMetadata } from "@/components/hub-page";

export const metadata = hubMetadata("calculators");

export default function Page() {
  return <HubPage slug="calculators" category="finance" name="Calculators" />;
}
