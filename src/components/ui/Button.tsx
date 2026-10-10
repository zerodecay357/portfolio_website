import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";

type Variant = "primary" | "ghost" | "text";

const BASE =
  "group inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-body text-[14px] font-500 tracking-[-0.005em] transition-[background-color,color,border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]";

const VARIANTS: Record<Variant, string> = {
  // Chrome pill, dark label: the reference's "Explore products" button.
  primary: "bg-chrome px-5 py-2.5 text-obsidian hover:bg-white",
  // Hairline pill on glass.
  ghost: "glass px-5 py-2.5 text-chrome hover:border-hairline-2",
  // Bare text link with the arrow, for "Learn more" style links.
  text: "px-0 py-1 text-chrome hover:text-white",
};

/**
 * Pill CTA with a trailing up-right arrow icon (an icon, not a text glyph).
 * Internal hrefs ("/" or "#") render next/link; external URLs and files a plain <a>.
 */
export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
  external = false,
  icon = true,
  ...rest
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  external?: boolean;
  icon?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;
  const content = (
    <>
      {children}
      {icon && (
        <ArrowUpRight
          size={15}
          weight="regular"
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember"
        />
      )}
    </>
  );
  const internal =
    !external && (href.startsWith("/") || href.startsWith("#")) && !href.endsWith(".pdf");
  if (internal) {
    return (
      <Link href={href} className={cls} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={cls} target="_blank" rel="noopener" {...rest}>
      {content}
    </a>
  );
}
