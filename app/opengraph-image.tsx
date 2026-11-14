import { profile } from "@/content/profile";
import { OG_SIZE, renderOg } from "@/lib/og";

export const alt = "Nabil Takiyuddin, MarTech & Analytics Manager";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOg({
    eyebrow: "Mission control",
    title: profile.name,
    subtitle: `${profile.role} · ${profile.location.locality}, ${profile.location.country}`,
  });
}
