"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Latest", href: "/" },
  { name: "AI Tools", href: "/ai-tools" },
  { name: "How-To", href: "/how-to" },
  { name: "Comparisons", href: "/comparisons" },
  { name: "Prompts", href: "/prompts" },
  { name: "Productivity", href: "/productivity" },
  { name: "Reviews", href: "/reviews" },
  { name: "Deals", href: "/deals" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
      <div className="wrapper flex flex-col items-center py-6">
        {/* ---- LOGO ---- */}
        <Link
          href="/"
          className="text-4xl font-extrabold tracking-tight text-white mb-4"
        >
          ToolsTide
        </Link>

        {/* ---- NAVIGATION ---- */}
        <nav className="flex items-center gap-6 text-sm text-slate-300 font-medium">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative pb-1 transition ${
                  active ? "text-sky-300" : "hover:text-white"
                }`}
              >
                {item.name}
                {active && (
                  <span className="absolute left-0 -bottom-0.5 w-full h-[2px] bg-sky-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
