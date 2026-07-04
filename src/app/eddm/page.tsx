import type { Metadata } from "next";
import MailerPage from "@/components/mailers/MailerPage";
import { getMailerProduct } from "@/data/mailer-products";
import { mailerMetadata } from "@/lib/mailerMeta";

const product = getMailerProduct("eddm")!;

export const metadata: Metadata = mailerMetadata(product);

export default function EddmPage() {
  return <MailerPage product={product} />;
}
