"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-orange-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-0 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <span className="font-bold text-gray-900 text-lg tracking-tight">
            Booking.com
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {[
            { href: "/dashboard", label: "Browse Rooms" },
            { href: "/my-bookings", label: "My Bookings" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${
                  pathname === href
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* User area */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="text-orange-600 text-sm font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-sm text-gray-600 hidden sm:block">
              {user?.name}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1.5 rounded-lg border border-gray-200
              text-gray-600 hover:border-orange-300 hover:text-orange-600
              hover:bg-orange-50 transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
