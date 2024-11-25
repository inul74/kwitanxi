import { requireUser } from "../utils/hooks";

export default async function DashboardRoute() {
  const session = await requireUser();
  console.log(session);

  return (
    <>
      <h1>hello from the Dashboard Route</h1>
    </>
  );
}
