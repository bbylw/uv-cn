import { DiscordLogo, GithubLogo } from "@phosphor-icons/react";

const productLinks = [
  { label: "项目管理", href: "#projects", external: false },
  { label: "脚本", href: "https://docs.astral.sh/uv/guides/scripts/", external: true },
  { label: "工具", href: "https://docs.astral.sh/uv/guides/tools/", external: true },
];

const referenceLinks = [
  {
    label: "Python 安装",
    href: "https://docs.astral.sh/uv/guides/install-python/",
    external: true,
  },
  { label: "pip 接口", href: "#pip", external: false },
  {
    label: "发布指南",
    href: "https://docs.astral.sh/uv/guides/publish/",
    external: true,
  },
];

const resourceLinks = [
  { label: "文档", href: "https://docs.astral.sh/uv/", external: true },
  { label: "GitHub", href: "https://github.com/astral-sh/uv", external: true },
  { label: "Discord", href: "https://discord.gg/astral-sh", external: true },
];

function FooterLink({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noreferrer" }
          : {})}
        className="text-sm text-muted transition-colors hover:text-accent-strong"
      >
        {label}
      </a>
    </li>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-panel/40">
      <div className="page-shell py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <a
              href="#top"
              className="inline-block font-sans text-4xl font-black leading-none tracking-[-0.06em] text-ink transition-colors hover:text-accent-strong"
              aria-label="回到页面顶部"
            >
              uv
            </a>
            <p className="mt-4 max-w-[32ch] text-sm leading-7 text-muted">
              用 Rust 编写的极速 Python 包与项目管理器。
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a
                href="https://github.com/astral-sh/uv"
                target="_blank"
                rel="noreferrer"
                aria-label="在 GitHub 查看 uv"
                className="inline-flex size-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent-strong"
              >
                <GithubLogo size={18} weight="bold" aria-hidden="true" />
              </a>
              <a
                href="https://discord.gg/astral-sh"
                target="_blank"
                rel="noreferrer"
                aria-label="加入 Astral Discord"
                className="inline-flex size-10 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent-strong"
              >
                <DiscordLogo size={18} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            <div>
              <p className="text-xs font-bold text-ink">产品</p>
              <ul className="mt-4 grid gap-3">
                {productLinks.map((link) => (
                  <FooterLink key={link.label} {...link} />
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold text-ink">接口</p>
              <ul className="mt-4 grid gap-3">
                {referenceLinks.map((link) => (
                  <FooterLink key={link.label} {...link} />
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold text-ink">资源</p>
              <ul className="mt-4 grid gap-3">
                {resourceLinks.map((link) => (
                  <FooterLink key={link.label} {...link} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            采用{" "}
            <a
              href="https://github.com/astral-sh/uv/blob/main/LICENSE-APACHE"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-line underline-offset-4 hover:text-accent-strong"
            >
              Apache-2.0
            </a>{" "}
            或{" "}
            <a
              href="https://github.com/astral-sh/uv/blob/main/LICENSE-MIT"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-line underline-offset-4 hover:text-accent-strong"
            >
              MIT
            </a>{" "}
            许可
          </p>
          <p>
            © {year} uv。由{" "}
            <a
              href="https://astral.sh"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-ink hover:text-accent-strong"
            >
              Astral
            </a>{" "}
            打造。
          </p>
        </div>
      </div>
    </footer>
  );
}
