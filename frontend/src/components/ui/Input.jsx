export default function Input({ label, error, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <input
        className={`border rounded-lg px-3 py-2.5 text-sm outline-none transition-all
          placeholder:text-gray-400
          focus:ring-2 focus:ring-orange-400 focus:border-transparent
          ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"}
          ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}
