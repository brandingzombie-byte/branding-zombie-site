"use client";

import { Gallery4 } from "@/components/ui/gallery4";
import type { Service } from "@/data/services";

export default function ServiceGallery({ service }: { service: Service }) {
  return (
    <Gallery4
      theme="dark"
      title={service.gallery.title}
      description={service.gallery.description}
      items={service.gallery.items}
    />
  );
}
