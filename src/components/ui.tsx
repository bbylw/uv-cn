import {
  ArrowUpRight,
  Check,
  Copy,
  TerminalWindow,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function Reveal({
  children,
  className,
  delay = 0,
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function CopyButton({
  value,
  label = "复制",
  copiedLabel = "已复制",
  className,
}: {
  value: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  async function handleCopy() {
    if (timer.current) window.clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    timer.current = window.setTimeout(() => setStatus("idle"), 2200);
  }

  const message =
    status === "copied" ? copiedLabel : status === "error" ? "复制失败" : "";

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cx(
        "inline-flex min-h-9 items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-200 active:scale-[0.98]",
        className,
      )}
      aria-label={label}
    >
      {status === "copied" ? (
        <Check size={14} weight="bold" aria-hidden="true" />
      ) : (
        <Copy size={14} weight="bold" aria-hidden="true" />
      )}
      <span>{status === "idle" ? label : status === "error" ? "重试" : copiedLabel}</span>
      <span className="sr-only" aria-live="polite">
        {message}
      </span>
    </button>
  );
}

export type TerminalLine = {
  text: string;
  tone?: "command" | "output" | "muted" | "accent";
};

const toneClasses: Record<NonNullable<TerminalLine["tone"]>, string> = {
  command: "text-code-ink",
  output: "text-code-ink/80",
  muted: "text-code-muted",
  accent: "text-code-accent",
};

export function TerminalLines({
  lines,
  className,
}: {
  lines: TerminalLine[];
  className?: string;
}) {
  return (
    <div
      className={cx(
        "terminal-scroll overflow-x-auto font-mono text-[12px] leading-6 sm:text-[12.5px]",
        className,
      )}
    >
      {lines.map((line, index) => (
        <div
          key={`${line.text}-${index}`}
          className={cx(
            "min-h-6 whitespace-pre-wrap break-words",
            toneClasses[line.tone ?? "output"],
          )}
        >
          {line.tone === "command" ? (
            <span className="select-none text-code-accent" aria-hidden="true">
              ${" "}
            </span>
          ) : null}
          {line.text}
        </div>
      ))}
    </div>
  );
}

export function Terminal({
  title,
  lines,
  children,
  action,
  footer,
  className,
  bodyClassName,
  minHeight,
}: {
  title: string;
  lines?: TerminalLine[];
  children?: ReactNode;
  action?: ReactNode;
  footer?: ReactNode;
  className?: string;
  bodyClassName?: string;
  minHeight?: string;
}) {
  const style: CSSProperties | undefined = minHeight
    ? { minHeight }
    : undefined;

  return (
    <div
      className={cx(
        "overflow-hidden rounded-[1.25rem] border border-code-line bg-code shadow-[var(--shadow)]",
        className,
      )}
      role="region"
      aria-label={title}
    >
      <div className="flex items-center justify-between gap-4 border-b border-code-line px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2 text-code-ink">
          <TerminalWindow
            size={15}
            weight="bold"
            className="shrink-0 text-code-accent"
            aria-hidden="true"
          />
          <span className="truncate font-mono text-[11px] text-code-muted">
            {title}
          </span>
        </div>
        {action}
      </div>
      <div
        className={cx("px-4 py-4 sm:px-5 sm:py-5", bodyClassName)}
        style={style}
      >
        {children ?? (lines ? <TerminalLines lines={lines} /> : null)}
      </div>
      {footer ? (
        <div className="border-t border-code-line px-4 py-3 sm:px-5">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cx(
        "group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent-strong",
        className,
      )}
    >
      {children}
      <ArrowUpRight
        size={14}
        weight="bold"
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}
