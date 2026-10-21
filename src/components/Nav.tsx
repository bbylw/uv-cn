import {
  ArrowRight,
  List,
  Moon,
  Sun,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const links = [
  { label: "项目", href: "#projects" },
  { label: "脚本与工具", href: "#scripts-tools" },
  { label: "Python", href: "#python" },
  { label: "pip 接口", href: "#pip" },
];

type Theme = "light" | "dark";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem("uv-theme")) return;
      const next: Theme = event.matches ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      document.documentElement.style.colorScheme = next;
      setTheme(next);
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    localStorage.setItem("uv-theme", next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "切换到浅色模式" : "切换到深色模式"}
      className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent-strong active:scale-[0.98]"
    >
      {theme === "dark" ? (
        <Sun size={18} weight="bold" aria-hidden="true" />
      ) : (
        <Moon size={18} weight="bold" aria-hidden="true" />
      )}
    </button>
  );
}

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-xl">
      <div className="page-shell flex h-16 items-center justify-between gap-6">
        <a
          href="#top"
          aria-label="uv 首页"
          className="shrink-0 font-sans text-[2rem] font-black leading-none tracking-[-0.06em] text-ink transition-colors hover:text-accent-strong"
        >
          uv
        </a>

        <nav aria-label="主导航" className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-medium text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <a
            href="#install"
            className="hidden min-h-10 items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-bg transition-colors hover:bg-accent hover:text-accent-contrast active:scale-[0.98] sm:inline-flex"
          >
            安装 uv
            <ArrowRight size={15} weight="bold" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "关闭导航菜单" : "打开导航菜单"}
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent-strong active:scale-[0.98] md:hidden"
          >
            {menuOpen ? (
              <X size={18} weight="bold" aria-hidden="true" />
            ) : (
              <List size={18} weight="bold" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full border-b border-line bg-panel shadow-[var(--shadow)] md:hidden"
          >
            <nav aria-label="移动端导航" className="page-shell py-4">
              <ul className="grid gap-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-full px-4 py-3 text-base font-medium text-ink transition-colors hover:bg-raised"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#install"
                onClick={() => setMenuOpen(false)}
                className="mt-3 flex min-h-11 items-center justify-between rounded-full bg-accent px-5 py-3 text-sm font-bold text-accent-contrast active:scale-[0.98]"
                aria-label="前往安装 uv"
              >
                安装 uv
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
