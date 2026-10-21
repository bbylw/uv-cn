import { ArrowDown, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

const benchmark = [
  { name: "uv", seconds: 0.06, display: "0.06s", highlight: true },
  { name: "poetry", seconds: 0.99, display: "0.99s", highlight: false },
  { name: "pdm", seconds: 1.9, display: "1.90s", highlight: false },
  { name: "pip-sync", seconds: 4.63, display: "4.63s", highlight: false },
];

const benchmarkMax = 5;

function BenchmarkCard() {
  const reduceMotion = useReducedMotion();

  return (
    <figure className="relative overflow-hidden rounded-[1.5rem] border border-line bg-panel p-5 shadow-[var(--shadow)] sm:p-7">
      <div
        className="pointer-events-none absolute -right-5 -top-12 select-none font-display text-[11rem] font-extrabold leading-none tracking-[-0.1em] text-accent/10"
        aria-hidden="true"
      >
        uv
      </div>

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] leading-4 text-muted">
            安装 Trio 依赖
          </p>
          <p className="mt-1 font-mono text-[10px] leading-4 text-muted">
            热缓存 / 越低越好
          </p>
        </div>
        <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-muted">
          官方基准
        </span>
      </div>

      <div className="relative mt-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] text-muted">uv 用时</p>
          <p className="display mt-1 text-[3.4rem] text-accent-strong sm:text-[4.15rem]">
            0.06
            <span className="ml-0.5 font-mono text-base font-medium tracking-normal text-muted">
              s
            </span>
          </p>
        </div>
        <div className="pb-1 text-right">
          <p className="font-mono text-[10px] text-muted">pip-sync 用时</p>
          <p className="mt-1 font-display text-xl font-semibold tracking-tight text-ink">
            4.63s
          </p>
        </div>
      </div>

      <div className="relative mt-8 grid gap-3" aria-hidden="true">
        {benchmark.map((item, index) => (
          <div
            key={item.name}
            className="grid grid-cols-[4.5rem_1fr_3rem] items-center gap-3 sm:grid-cols-[5rem_1fr_3.25rem]"
          >
            <span
              className={
                item.highlight
                  ? "font-mono text-[11px] font-bold text-ink"
                  : "font-mono text-[11px] text-muted"
              }
            >
              {item.name}
            </span>
            <span className="relative block h-2.5">
              <motion.span
                className={
                  item.highlight
                    ? "absolute inset-y-0 left-0 rounded-[2px] bg-accent"
                    : "absolute inset-y-0 left-0 rounded-[2px] bg-muted/30"
                }
                style={{
                  width: `${Math.max((item.seconds / benchmarkMax) * 100, 2)}%`,
                  transformOrigin: "left",
                }}
                initial={reduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.45 + index * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </span>
            <span
              className={
                item.highlight
                  ? "text-right font-mono text-[10px] font-bold text-accent-strong"
                  : "text-right font-mono text-[10px] text-muted"
              }
            >
              {item.display}
            </span>
          </div>
        ))}
      </div>

      <div className="relative mt-5 grid grid-cols-[4.5rem_1fr_3rem] items-start gap-3 sm:grid-cols-[5rem_1fr_3.25rem]">
        <span aria-hidden="true" />
        <div className="flex justify-between border-t border-line pt-2 font-mono text-[10px] text-muted">
          <span>0s</span>
          <span>2s</span>
          <span>4s</span>
        </div>
        <span aria-hidden="true" />
      </div>

      <figcaption className="relative mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 text-[11px] leading-5 text-muted">
        <span>安装 Trio 的依赖，热缓存。数据来自 uv 官方基准测试。</span>
        <a
          href="https://github.com/astral-sh/uv/blob/main/BENCHMARKS.md"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-ink transition-colors hover:text-accent-strong"
        >
          查看基准
          <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
        </a>
      </figcaption>

      <p className="sr-only">
        uv 安装 Trio 依赖用时 0.06 秒，poetry 用时 0.99 秒，pdm 用时 1.90
        秒，pip-sync 用时 4.63 秒。
      </p>
    </figure>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : { opacity: 0, y: 18 };

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="page-shell relative grid min-h-[calc(100dvh-4rem)] items-center gap-12 py-14 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-7">
          <motion.p
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow flex items-center gap-2"
          >
            <span className="text-accent-strong" aria-hidden="true">
              /
            </span>
            用 Rust 编写的 Python 包与项目管理器
          </motion.p>

          <motion.h1
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="display mt-5 text-[clamp(2.45rem,6.1vw,6.1rem)] text-ink"
          >
            <span className="block">Python 包管理</span>
            <span className="block text-accent-strong">快 10 到 100 倍</span>
          </motion.h1>

          <motion.p
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-[39ch] text-base leading-8 text-muted sm:text-lg"
          >
            一个工具替代 pip、poetry、pyenv 与 virtualenv，统一依赖、项目、脚本和
            Python 版本。
          </motion.p>

          <motion.div
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#install"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-contrast transition-colors hover:bg-ink hover:text-bg active:scale-[0.98]"
            >
              安装 uv
              <ArrowDown size={16} weight="bold" aria-hidden="true" />
            </a>
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-panel/60 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent-strong active:scale-[0.98]"
            >
              查看项目工作流
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 lg:pt-8"
        >
          <BenchmarkCard />
        </motion.div>
      </div>
    </section>
  );
}
