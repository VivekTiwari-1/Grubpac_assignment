"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
// import useAuth from "@/hooks/useAuth";
import Button from "./ui/Button";
import useAuthStore from "@/store/authStore";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navLink = (href, label) => (
    <Link
      href={href}
      className={`text-sm font-medium transition-colors
        ${
          pathname === href
            ? "text-blue-600"
            : "text-gray-600 hover:text-blue-600"
        }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/dashboard" className="font-bold text-lg text-blue-600">
          RoomBooker
        </Link>
        <div className="flex items-center gap-6">
          {navLink("/dashboard", "Rooms")}
          {navLink("/my-bookings", "My Bookings")}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Hi, {user?.name}</span>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="text-sm py-1"
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
