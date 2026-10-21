const tools = [
  "pip",
  "pip-tools",
  "pipx",
  "poetry",
  "pyenv",
  "twine",
  "virtualenv",
];

function StripGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className="marquee-group"
      aria-hidden={hidden ? "true" : undefined}
    >
      {tools.map((tool) => (
        <div key={tool} className="flex items-center gap-5 px-5 sm:gap-7 sm:px-7">
          <span className="whitespace-nowrap font-display text-xl font-semibold tracking-tight text-muted line-through decoration-line decoration-2 sm:text-2xl">
            {tool}
          </span>
          <span className="font-mono text-sm text-faint" aria-hidden="true">
            /
          </span>
        </div>
      ))}
      <div className="flex items-baseline gap-3 px-5 sm:px-7">
        <span className="font-display text-2xl font-extrabold tracking-[-0.05em] text-accent-strong sm:text-3xl">
          uv
        </span>
        <span className="whitespace-nowrap text-xs font-semibold text-ink">
          一个就够了
        </span>
      </div>
    </div>
  );
}

export function ToolchainStrip() {
  return (
    <section
      className="marquee marquee-mask section-divider border-b border-line bg-panel/50 py-5"
      aria-label="uv 可替代的 Python 工具"
    >
      <div className="marquee-track">
        <StripGroup />
        <StripGroup hidden />
      </div>
    </section>
  );
}
