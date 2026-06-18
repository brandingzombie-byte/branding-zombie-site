import type { Metadata } from "next";
import MailerPage from "@/components/mailers/MailerPage";
import { getMailerProduct } from "@/data/mailer-products";
import { mailerMetadata } from "@/lib/mailerMeta";

const product = getMailerProduct("direct-mail")!;

export const metadata: Metadata = mailerMetadata(product);

export default function DirectMailPage() {
  return <MailerPage product={product} />;
}
