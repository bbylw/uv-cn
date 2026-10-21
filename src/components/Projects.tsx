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

type WorkflowStep = {
  id: string;
  title: string;
  preview: string;
  copy: string;
  description: string;
  lines: TerminalLine[];
};

const steps: WorkflowStep[] = [
  {
    id: "init",
    title: "初始化项目",
    preview: "uv init example",
    copy: "uv init example\ncd example",
    description: "创建标准项目结构，生成 pyproject.toml 与入口文件。",
    lines: [
      { text: "uv init example", tone: "command" },
      { text: "Initialized project `example`.", tone: "output" },
      { text: "" },
      { text: "cd example", tone: "command" },
    ],
  },
  {
    id: "add",
    title: "添加依赖",
    preview: "uv add ruff",
    copy: "uv add ruff",
    description: "自动创建虚拟环境，写入依赖并同步安装。",
    lines: [
      { text: "uv add ruff", tone: "command" },
      { text: "Creating virtual environment at: .venv", tone: "muted" },
      { text: "Resolved 2 packages in 170ms", tone: "output" },
      { text: "Installed 2 packages in 1ms", tone: "output" },
      { text: " + example==0.1.0", tone: "accent" },
      { text: " + ruff", tone: "accent" },
    ],
  },
  {
    id: "run",
    title: "运行命令",
    preview: "uv run ruff check",
    copy: "uv run ruff check",
    description: "在项目环境中执行命令，无需手动激活 .venv。",
    lines: [
      { text: "uv run ruff check", tone: "command" },
      { text: "All checks passed!", tone: "accent" },
    ],
  },
  {
    id: "sync",
    title: "锁定并同步",
    preview: "uv lock && uv sync",
    copy: "uv lock\nuv sync",
    description: "生成跨平台锁文件，并让环境与锁文件保持一致。",
    lines: [
      { text: "uv lock", tone: "command" },
      { text: "Resolved 2 packages in 0.33ms", tone: "output" },
      { text: "" },
      { text: "uv sync", tone: "command" },
      { text: "Resolved 2 packages in 0.70ms", tone: "output" },
      { text: "Checked 1 package in 0.02ms", tone: "muted" },
    ],
  },
];

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const activeStep = steps[activeIndex];

  function activate(index: number) {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex = index;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = (index + 1) % steps.length;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = (index - 1 + steps.length) % steps.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = steps.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    activate(nextIndex);
  }

  return (
    <section id="projects" className="scroll-mt-20 py-20 sm:py-24 lg:py-32">
      <div className="page-shell grid gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="min-w-0 lg:col-span-5">
          <h2 className="display max-w-[12ch] text-4xl text-ink sm:text-5xl">
            从初始化，
            <span className="block text-accent-strong">到可复现构建。</span>
          </h2>
          <p className="mt-6 max-w-[44ch] text-base leading-8 text-muted">
            uv 管理依赖、虚拟环境和锁文件，workspace 让大型仓库保持一致。全局缓存对依赖去重，锁文件跨平台通用，本地与 CI 得到同一份解析结果。
          </p>
          <ArrowLink
            href="https://docs.astral.sh/uv/guides/projects/"
            className="mt-5"
          >
            阅读项目指南
          </ArrowLink>

          <div
            role="tablist"
            aria-label="项目工作流"
            aria-orientation="vertical"
            className="mt-10 border-t border-line"
          >
            {steps.map((step, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={step.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  id={`workflow-tab-${step.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`workflow-panel-${step.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={cx(
                    "group w-full border-b border-l-2 border-line px-4 py-4 text-left transition-colors duration-200",
                    isActive
                      ? "border-l-accent bg-panel"
                      : "border-l-transparent hover:bg-panel/60",
                  )}
                >
                  <span
                    className={cx(
                      "block text-sm font-bold transition-colors",
                      isActive ? "text-accent-strong" : "text-ink",
                    )}
                  >
                    {step.title}
                  </span>
                  <span className="mt-1 block font-mono text-[11px] text-muted">
                    $ {step.preview}
                  </span>
                  <span className="mt-1.5 block text-xs leading-5 text-muted">
                    {step.description}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="min-w-0 lg:col-span-7 lg:pt-2" delay={0.08}>
          <Terminal
            title="example / zsh"
            action={
              <CopyButton
                value={activeStep.copy}
                label="复制命令"
                className="border-code-line text-code-muted hover:border-code-accent hover:text-code-ink"
              />
            }
            minHeight="240px"
            footer={
              <p className="text-[11px] leading-5 text-code-muted">
                示例输出，实际耗时与包版本因环境而异。
              </p>
            }
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeStep.id}
                id={`workflow-panel-${activeStep.id}`}
                role="tabpanel"
                aria-labelledby={`workflow-tab-${activeStep.id}`}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              >
                <TerminalLines lines={activeStep.lines} />
              </motion.div>
            </AnimatePresence>
          </Terminal>
        </Reveal>
      </div>
    </section>
  );
}
