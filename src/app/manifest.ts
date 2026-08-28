import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Shivanshu Aryan — Robotics, Game Theory, Systems, Quant",
    short_name: "Shivanshu Aryan",
    description:
      "Portfolio of Shivanshu 'Zero' Aryan, CS undergraduate at IIT Delhi working across robotics & RL, game theory, systems programming, and quantitative finance.",
    start_url: "/",
    display: "standalone",
    background_color: "#14120F",
    theme_color: "#14120F",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
