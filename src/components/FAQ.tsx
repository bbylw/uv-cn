import { Plus } from "@phosphor-icons/react";
import { useState } from "react";
import { ArrowLink, cx } from "./ui";

const faqs = [
  {
    question: "uv 怎么发音？",
    answer: (
      <>
        读作 “you-vee”，音标为 /juː viː/。
      </>
    ),
  },
  {
    question: "uv 应该怎么写？",
    answer: (
      <>
        直接写作 uv，保持小写，不加空格。官方样式指南中不建议写成 UV 或 Uv。
      </>
    ),
  },
  {
    question: "支持哪些平台？",
    answer: (
      <>
        支持 macOS、Linux 与 Windows。完整的平台支持列表可以查看
        <a
          href="https://docs.astral.sh/uv/reference/platforms/"
          target="_blank"
          rel="noreferrer"
          className="ml-1 font-semibold text-accent-strong underline decoration-accent/40 underline-offset-4 hover:text-ink"
        >
          官方文档
        </a>
        。
      </>
    ),
  },
  {
    question: "可以用于生产环境吗？",
    answer: (
      <>
        uv 已稳定并在生产环境中被广泛使用，同时遵循明确的
        <a
          href="https://docs.astral.sh/uv/reference/versioning/"
          target="_blank"
          rel="noreferrer"
          className="mx-1 font-semibold text-accent-strong underline decoration-accent/40 underline-offset-4 hover:text-ink"
        >
          版本策略
        </a>
        。可以放心用于团队与 CI 工作流。
      </>
    ),
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="section-divider scroll-mt-20 py-20 sm:py-24 lg:py-32"
    >
      <div className="page-shell grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <h2 className="display text-4xl text-ink sm:text-5xl">常见问题</h2>
          <p className="mt-5 max-w-[30ch] text-sm leading-7 text-muted">
            关于发音、写法、平台与生产可用性的几个直接回答。
          </p>
          <ArrowLink href="https://docs.astral.sh/uv/" className="mt-6">
            阅读完整文档
          </ArrowLink>
        </div>

        <div className="border-t border-line lg:col-span-8">
          {faqs.map((faq, index) => {
            const isOpen = index === openIndex;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div key={faq.question} className="border-b border-line">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="flex w-full items-center justify-between gap-6 px-1 py-5 text-left transition-colors hover:text-accent-strong sm:px-2 sm:py-6"
                  >
                    <span className="text-base font-semibold sm:text-lg">
                      {faq.question}
                    </span>
                    <Plus
                      size={18}
                      weight="bold"
                      aria-hidden="true"
                      className={cx(
                        "shrink-0 text-muted transition-transform duration-200",
                        isOpen && "rotate-45 text-accent-strong",
                      )}
                    />
                  </button>
                </h3>
                {isOpen ? (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="max-w-[62ch] px-1 pb-6 text-sm leading-7 text-muted sm:px-2"
                  >
                    {faq.answer}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
