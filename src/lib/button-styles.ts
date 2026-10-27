/** Shared button styles — usable from both server and client components. */
export type Variant = "primary" | "navy" | "whatsapp" | "light" | "ghost" | "glass";
export type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-cobalt text-white hover:bg-cobalt-dark shadow-[0_10px_24px_-12px_rgba(37,86,232,0.8)]",
  navy: "bg-navy text-white hover:bg-midnight",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-dark shadow-[0_10px_24px_-12px_rgba(31,168,85,0.8)]",
  light: "bg-white text-navy hover:bg-ice",
  ghost: "bg-mist text-navy hover:bg-ice",
  glass: "bg-white/12 text-white ring-1 ring-white/25 backdrop-blur-md hover:bg-white/20",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.88rem]",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-300 ease-out-expo active:scale-[0.97] ${variants[variant]} ${sizes[size]} ${extra}`;
}
