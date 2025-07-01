import { Image } from "antd";
import PageLayout from "../components/layouts/PageLayout";

export default function NotFoundPage() {
  return (
    <PageLayout title={"Oops... Page Not Found"}>
      <>
        <Image src="/media/Christmas_Tony.jpg" preview={false} />;
      </>
    </PageLayout>
  );
}
