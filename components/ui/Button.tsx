type Props = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  variant = "primary",
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3 font-semibold transition-all duration-300";

  const styles = {
    primary:
      "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20",

    secondary:
      "border border-white/10 bg-white/5 text-white hover:bg-white/10",
  };

  return (
    <button className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
}