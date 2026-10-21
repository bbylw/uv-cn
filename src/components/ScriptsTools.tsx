import { Code, Wrench } from "@phosphor-icons/react";
import {
  ArrowLink,
  CopyButton,
  Reveal,
  Terminal,
  TerminalLines,
  type TerminalLine,
} from "./ui";

const script = `# /// script
# requires-python = ">=3.12"
# dependencies = [
#   "requests",
# ]
# ///

import requests

print(requests.get("https://astral.sh"))`;

const scriptCommands: TerminalLine[] = [
  { text: "uv add --script example.py requests", tone: "command" },
  { text: "Updated `example.py`", tone: "muted" },
  { text: "" },
  { text: "uv run example.py", tone: "command" },
  { text: "Reading inline script metadata from: example.py", tone: "muted" },
  { text: "Installed 5 packages in 12ms", tone: "output" },
  { text: "<Response [200]>", tone: "accent" },
];

const toolLines: TerminalLine[] = [
  { text: "uvx pycowsay 'hello world!'", tone: "command" },
  { text: "Resolved 1 package in 167ms", tone: "muted" },
  { text: "Installed 1 package in 9ms", tone: "muted" },
  { text: " + pycowsay==0.0.0.2", tone: "accent" },
  { text: "" },
  { text: "  ------------" },
  { text: "< hello world! >" },
  { text: "  ------------" },
  { text: "   \\   ^__^" },
  { text: "    \\  (oo)\\_______" },
  { text: "       (__)\\       )\\/\\" },
  { text: "           ||----w |" },
  { text: "           ||     ||" },
];

export function ScriptsTools() {
  return (
    <section
      id="scripts-tools"
      className="section-divider scroll-mt-20 py-20 sm:py-24 lg:py-32"
    >
      <div className="page-shell">
        <Reveal>
          <h2 className="display max-w-[18ch] text-4xl text-ink sm:text-5xl">
            脚本与工具，
            <span className="block">各得其所。</span>
          </h2>
          <p className="mt-5 max-w-[58ch] text-base leading-8 text-muted">
            在单文件里声明依赖，在临时环境中运行工具。uv
            会把每个环境隔离好，不打扰系统 Python。
          </p>
        </Reveal>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-12">
          <Reveal className="min-w-0 lg:col-span-7" delay={0.05}>
            <div className="overflow-hidden rounded-[1.25rem] border border-code-line bg-code shadow-[var(--shadow)]">
              <div className="flex items-center justify-between gap-4 border-b border-code-line px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2 text-code-muted">
                  <Code
                    size={15}
                    weight="bold"
                    className="text-code-accent"
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[11px]">example.py</span>
                </div>
                <CopyButton
                  value={script}
                  label="复制脚本"
                  className="border-code-line text-code-muted hover:border-code-accent hover:text-code-ink"
                />
              </div>

              <pre className="terminal-scroll overflow-x-auto px-4 py-5 font-mono text-[12px] leading-6 text-code-ink sm:px-5 sm:text-[12.5px]">
                <code>
                  <span className="tok-comment"># /// script</span>
                  {"\n"}
                  <span className="tok-comment"># requires-python = </span>
                  <span className="tok-string">&quot;&gt;=3.12&quot;</span>
                  {"\n"}
                  <span className="tok-comment"># dependencies = [</span>
                  {"\n"}
                  <span className="tok-comment">#   </span>
                  <span className="tok-string">&quot;requests&quot;</span>
                  <span className="tok-comment">,</span>
                  {"\n"}
                  <span className="tok-comment"># ]</span>
                  {"\n"}
                  <span className="tok-comment"># ///</span>
                  {"\n\n"}
                  <span className="tok-keyword">import</span> requests
                  {"\n\n"}
                  print(requests.get(
                  <span className="tok-string">&quot;https://astral.sh&quot;</span>
                  ))
                </code>
              </pre>

              <div className="border-t border-code-line px-4 py-4 sm:px-5">
                <TerminalLines
                  lines={scriptCommands}
                  className="text-[11.5px] leading-6"
                />
              </div>
            </div>

            <div className="mt-4 pl-1">
              <ArrowLink href="https://docs.astral.sh/uv/guides/scripts/">
                阅读脚本文档
              </ArrowLink>
            </div>
          </Reveal>

          <Reveal className="min-w-0 lg:col-span-5" delay={0.12}>
            <div className="rounded-[1.25rem] border border-line bg-raised p-6 shadow-[var(--shadow)] sm:p-7">
              <div className="flex size-11 items-center justify-center rounded-full bg-accent text-accent-contrast">
                <Wrench size={19} weight="bold" aria-hidden="true" />
              </div>
              <h3 className="display mt-5 text-2xl text-ink sm:text-3xl">
                临时运行，不扰全局。
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                uvx 在临时环境中运行以 Python 包发布的工具，不污染全局解释器。需要长期使用时，再安装为命令。
              </p>

              <Terminal
                title="uvx / zsh"
                lines={toolLines}
                className="mt-6 shadow-none"
                action={
                  <CopyButton
                    value="uvx pycowsay 'hello world!'"
                    label="复制命令"
                    className="border-code-line text-code-muted hover:border-code-accent hover:text-code-ink"
                  />
                }
                minHeight="288px"
              />

              <p className="mt-5 font-mono text-[11px] leading-6 text-muted">
                $ uv tool install ruff
              </p>

              <ArrowLink
                href="https://docs.astral.sh/uv/guides/tools/"
                className="mt-4"
              >
                阅读工具文档
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
