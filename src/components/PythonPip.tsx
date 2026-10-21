import { ArrowUpRight, TerminalWindow } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import {
  ArrowLink,
  CopyButton,
  Reveal,
  Terminal,
  TerminalLines,
  cx,
  type TerminalLine,
} from "./ui";

const pythonLines: TerminalLine[] = [
  { text: "uv python install 3.12 3.13 3.14", tone: "command" },
  { text: "Installed 3 versions in 972ms", tone: "output" },
  { text: " + cpython-3.12 (python3.12)", tone: "accent" },
  { text: " + cpython-3.13 (python3.13)", tone: "accent" },
  { text: " + cpython-3.14 (python3.14)", tone: "accent" },
  { text: "" },
  { text: "uv python pin 3.13", tone: "command" },
  { text: "Pinned `.python-version` to `3.13`", tone: "muted" },
];

const pythonCopy = `uv python install 3.12 3.13 3.14
uv python pin 3.13`;

const pipTabs = [
  {
    id: "compile",
    label: "编译依赖",
    command: `uv pip compile requirements.in \\
  --universal \\
  --output-file requirements.txt`,
    lines: [
      {
        text: "uv pip compile requirements.in \\\n   --universal \\\n   --output-file requirements.txt",
        tone: "command",
      },
      { text: "Resolved 43 packages in 12ms", tone: "accent" },
    ] satisfies TerminalLine[],
  },
  {
    id: "sync",
    label: "同步环境",
    command: "uv pip sync requirements.txt",
    lines: [
      { text: "uv pip sync requirements.txt", tone: "command" },
      { text: "Resolved 43 packages in 11ms", tone: "output" },
      { text: "Installed 43 packages in 208ms", tone: "output" },
      { text: " + babel==2.15.0", tone: "accent" },
      { text: " + black==24.4.2", tone: "accent" },
      { text: " + certifi==2024.7.4", tone: "accent" },
      { text: " ...", tone: "muted" },
    ] satisfies TerminalLine[],
  },
];

export function PythonPip() {
  const [activePip, setActivePip] = useState(0);
  const pipRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const activeTab = pipTabs[activePip];

  function activatePip(index: number) {
    setActivePip(index);
    pipRefs.current[index]?.focus();
  }

  function handlePipKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % pipTabs.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + pipTabs.length) % pipTabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = pipTabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    activatePip(nextIndex);
  }

  return (
    <section
      id="python"
      className="section-divider scroll-mt-20 py-20 sm:py-24 lg:py-32"
    >
      <div className="page-shell">
        <Reveal>
          <h2 className="display max-w-[16ch] text-4xl text-ink sm:text-5xl">
            Python 版本与 pip，
            <span className="block text-accent-strong">一并接管。</span>
          </h2>
          <p className="mt-5 max-w-[56ch] text-base leading-8 text-muted">
            按需下载并固定 Python 版本，同时保留熟悉的 pip
            命令，获得更快的解析与安装。
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-12">
          <Reveal className="min-w-0 lg:col-span-5" delay={0.05}>
            <div className="rounded-[1.25rem] border border-line bg-panel p-6 shadow-[var(--shadow)] sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[11px] text-muted">可安装版本</p>
                <p className="font-mono text-[11px] text-muted">CPython</p>
              </div>

              <div className="mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-display text-5xl font-extrabold tracking-[-0.06em] text-accent-strong sm:text-6xl">
                  3.14
                </span>
                <span className="font-display text-3xl font-semibold tracking-tight text-ink/70">
                  3.13
                </span>
                <span className="font-display text-2xl font-semibold tracking-tight text-muted">
                  3.12
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">
                按需下载，无需手动编译。也支持 PyPy 等替代实现。
              </p>

              <Terminal
                title="uv python / zsh"
                lines={pythonLines}
                className="mt-6 shadow-none"
                action={
                  <CopyButton
                    value={pythonCopy}
                    label="复制命令"
                    className="border-code-line text-code-muted hover:border-code-accent hover:text-code-ink"
                  />
                }
                minHeight="216px"
              />

              <ArrowLink
                href="https://docs.astral.sh/uv/guides/install-python/"
                className="mt-5"
              >
                阅读 Python 安装文档
              </ArrowLink>
            </div>
          </Reveal>

          <Reveal
            id="pip"
            className="min-w-0 scroll-mt-24 lg:col-span-7 lg:pt-2"
            delay={0.1}
          >
            <div className="overflow-hidden rounded-[1.25rem] border border-code-line bg-code shadow-[var(--shadow)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-code-line px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2 text-code-ink">
                  <TerminalWindow
                    size={15}
                    weight="bold"
                    className="text-code-accent"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[11px] text-code-muted">
                    uv pip / requirements
                  </span>
                </div>
                <CopyButton
                  value={activeTab.command}
                  label="复制命令"
                  className="border-code-line text-code-muted hover:border-code-accent hover:text-code-ink"
                />
              </div>

              <div
                role="tablist"
                aria-label="pip 接口示例"
                className="flex gap-1.5 border-b border-code-line px-4 py-3 sm:px-5"
              >
                {pipTabs.map((tab, index) => {
                  const isActive = index === activePip;

                  return (
                    <button
                      key={tab.id}
                      ref={(element) => {
                        pipRefs.current[index] = element;
                      }}
                      id={`pip-tab-${tab.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`pip-panel-${tab.id}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActivePip(index)}
                      onKeyDown={(event) => handlePipKeyDown(event, index)}
                      className={cx(
                        "rounded-full px-3.5 py-1.5 font-mono text-[11px] transition-colors duration-200",
                        isActive
                          ? "bg-accent text-accent-contrast"
                          : "text-code-muted hover:bg-code-line hover:text-code-ink",
                      )}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className="px-4 py-5 sm:px-5" style={{ minHeight: "248px" }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeTab.id}
                    id={`pip-panel-${activeTab.id}`}
                    role="tabpanel"
                    aria-labelledby={`pip-tab-${activeTab.id}`}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <TerminalLines lines={activeTab.lines} />
                  </motion.div>
                </AnimatePresence>
                <p className="mt-4 border-t border-code-line pt-3 text-[11px] leading-5 text-code-muted">
                  兼容 pip、pip-tools 与 virtualenv 的常用命令。
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-code-line px-4 py-3 sm:px-5">
                <p className="text-[11px] leading-5 text-code-muted">
                  即插即用，无需改变现有工作流。
                </p>
                <a
                  href="https://docs.astral.sh/uv/pip/index/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-code-ink transition-colors hover:text-code-accent"
                >
                  阅读 pip 接口文档
                  <ArrowUpRight size={12} weight="bold" aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
