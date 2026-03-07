export default function Badge({ children, variant = "default" }) {
  const variants = {
    default: "bg-gray-100 text-gray-600",
    success: "bg-green-100 text-green-700",
    warning: "bg-orange-100 text-orange-700",
    danger: "bg-red-100 text-red-600",
    info: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
