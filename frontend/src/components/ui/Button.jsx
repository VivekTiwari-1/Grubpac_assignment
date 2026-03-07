export default function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  className = "",
  ...props
}) {
  const base = `px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
    disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2`;

  const variants = {
    primary:
      "bg-orange-500 text-white hover:bg-orange-600 shadow-sm hover:shadow-md",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-orange-400 text-orange-600 hover:bg-orange-50",
  };

  return (
    <button
      type={type}
      disabled={loading || props.disabled}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span
            className="w-4 h-4 border-2 border-white border-t-transparent
            rounded-full animate-spin"
          />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
