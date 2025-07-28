import DataPortal from "./dataportal/page";
import LandingPage from "./landing";

export default async function Main() {
  return (
    <LandingPage>
      <DataPortal />
    </LandingPage>
  );
}
