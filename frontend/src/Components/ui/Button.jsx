import { forwardRef } from "react";

const variants = {
  primary:
    "bg-accent text-slate-950 hover:bg-accent-soft focus-visible:ring-accent/50 shadow-[0_0_24px_-4px_rgb(var(--color-accent)/0.45)] hover:shadow-[0_0_32px_-2px_rgb(var(--color-accent)/0.55)]",
  secondary:
    "border border-[rgb(var(--color-line)/var(--line-opacity))] bg-[var(--surface)]/40 backdrop-blur-sm text-[var(--fg)] hover:border-accent/50 hover:text-accent",
  ghost:
    "bg-transparent text-[var(--fg-muted)] hover:text-accent underline-offset-4 hover:underline",
};

const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    className = "",
    href,
    download,
    type = "button",
    ...props
  },
  ref
) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-medium tracking-wide transition-all duration-300 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:opacity-50 ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        download={download}
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button ref={ref} type={type} className={classes} {...props}>
      {children}
    </button>
  );
});

export default Button;
