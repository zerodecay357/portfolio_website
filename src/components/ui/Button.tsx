import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost";

const BASE =
  "chamfer-sm inline-flex items-center justify-center gap-2 whitespace-nowrap px-5 py-3 font-heading text-[14px] font-600 transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-[1px]";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-servo text-void hover:bg-phosphor",
  // Ghost buttons get a hull fill (not transparent) so the label always has contrast.
  ghost: "bg-hull-2 text-phosphor hover:bg-conduit-2 hover:text-servo",
};

/**
 * Chamfered CTA. Renders next/link for internal hrefs ("/" or "#"),
 * a plain <a> for external URLs and files.
 */
export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
  external = false,
  ...rest
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  external?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;
  const internal = !external && (href.startsWith("/") || href.startsWith("#")) && !href.endsWith(".pdf");
  if (internal) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} target="_blank" rel="noopener" {...rest}>
      {children}
    </a>
  );
}
