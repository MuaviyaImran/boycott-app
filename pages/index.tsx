import Layout from "templates/templates";
import Homepage from "./home";
export default function Index() {
  if (!process.env.NEXT_PUBLIC_BASE_URL) return null;
  return (
    <Layout>
      <Homepage />
    </Layout>
  );
}
