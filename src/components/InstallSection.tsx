import { ArrowUpRight } from "@phosphor-icons/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { CopyButton, Reveal, Terminal, cx } from "./ui";

const installTabs = [
  {
    id: "unix",
    label: "macOS / Linux",
    command: "curl -LsSf https://astral.sh/uv/install.sh | sh",
  },
  {
    id: "windows",
    label: "Windows",
    command:
      'powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"',
  },
  {
    id: "pypi",
    label: "PyPI",
    command: "pip install uv",
  },
];

export function InstallSection() {
  const [activeInstall, setActiveInstall] = useState(0);
  const installRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeTab = installTabs[activeInstall];

  function activateInstall(index: number) {
    setActiveInstall(index);
    installRefs.current[index]?.focus();
  }

  function handleInstallKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % installTabs.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + installTabs.length) % installTabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = installTabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    activateInstall(nextIndex);
  }

  return (
    <section
      id="install"
      className="scroll-mt-20 py-8 sm:py-12 lg:py-16"
    >
      <div className="page-shell">
        <Reveal>
          <div className="on-accent relative overflow-hidden rounded-[1.5rem] bg-accent p-6 text-accent-contrast shadow-[var(--shadow)] sm:p-9 lg:p-12">
            <div
              className="pointer-events-none absolute -right-10 -top-16 select-none font-display text-[15rem] font-extrabold leading-none tracking-[-0.12em] text-accent-contrast/10 sm:text-[19rem]"
              aria-hidden="true"
            >
              uv
            </div>

            <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-5">
                <p className="inline-flex rounded-full border border-accent-contrast/25 px-3 py-1 font-mono text-[10px] font-semibold">
                  最新发行版 0.13.4
                </p>
                <h2 className="display mt-5 max-w-[10ch] text-4xl sm:text-5xl lg:text-6xl">
                  安装 uv，
                  <span className="block">开始提速。</span>
                </h2>
                <p className="mt-5 max-w-[36ch] text-sm leading-7 text-accent-contrast/85 sm:text-base">
                  无需 Rust 或 Python，支持 macOS、Linux 与 Windows。独立安装器可在之后通过
                  uv self update 更新。
                </p>
                <a
                  href="https://docs.astral.sh/uv/getting-started/installation/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent-contrast px-5 py-2.5 text-sm font-bold text-[#fff7f1] transition-colors hover:bg-[#2b1c12] active:scale-[0.98]"
                >
                  阅读安装文档
                  <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
                </a>
              </div>

              <div className="lg:col-span-7">
                <div
                  role="tablist"
                  aria-label="安装方式"
                  className="flex flex-wrap gap-2"
                >
                  {installTabs.map((tab, index) => {
                    const isActive = index === activeInstall;

                    return (
                      <button
                        key={tab.id}
                        ref={(element) => {
                          installRefs.current[index] = element;
                        }}
                        id={`install-tab-${tab.id}`}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`install-panel-${tab.id}`}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => setActiveInstall(index)}
                        onKeyDown={(event) =>
                          handleInstallKeyDown(event, index)
                        }
                        className={cx(
                          "min-h-10 rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-200 active:scale-[0.98]",
                          isActive
                            ? "border-accent-contrast bg-accent-contrast text-[#fff7f1]"
                            : "border-accent-contrast/25 text-accent-contrast hover:border-accent-contrast/60 hover:bg-accent-contrast/10",
                        )}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <div
                  id={`install-panel-${activeTab.id}`}
                  role="tabpanel"
                  aria-labelledby={`install-tab-${activeTab.id}`}
                  className="mt-4"
                >
                  <Terminal
                    title="install / shell"
                    lines={[{ text: activeTab.command, tone: "command" }]}
                    minHeight="110px"
                    action={
                      <CopyButton
                        value={activeTab.command}
                        label="复制命令"
                        className="border-code-line text-code-muted hover:border-code-accent hover:text-code-ink"
                      />
                    }
                    footer={
                      <p className="font-mono text-[11px] leading-5 text-code-muted">
                        安装后运行 uv --version 验证。
                      </p>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
