/** Shared button styles — usable from both server and client components. */
export type Variant = "primary" | "navy" | "whatsapp" | "light" | "ghost" | "glass";
export type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-cobalt text-white hover:bg-cobalt-dark",
  navy: "bg-navy text-white hover:bg-midnight",
  whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-dark",
  light: "bg-white text-navy hover:bg-ice",
  ghost: "bg-mist text-navy hover:bg-ice",
  glass: "bg-white/12 text-white ring-1 ring-white/25 backdrop-blur-md hover:bg-white/20",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-[0.85rem]",
  md: "h-12 px-6 text-[0.9rem]",
  lg: "h-[3.75rem] px-8 text-[0.95rem] min-w-[16rem]",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `group inline-flex items-center justify-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-300 ease-out-expo active:scale-[0.97] ${variants[variant]} ${sizes[size]} ${extra}`;
}
