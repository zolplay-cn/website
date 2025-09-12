'use client'

import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useLocale } from 'next-intl'
import { useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'

interface FAQProps {
  title: string
  className?: string
  children: ReactNode
}

interface FAQItemProps {
  question: string
  defaultOpen?: boolean
  children: ReactNode
}

export function FAQ({ title, className, children }: FAQProps) {
  return (
    <section className={`not-prose my-12 ${className ?? ''}`.trim()}>
      <div className='grid gap-4 md:gap-6 md:grid-cols-3'>
        <div className='md:col-span-1 pl-1 md:pl-4 pt-4'>
          <h2 className='text-2xl md:text-3xl font-medium tracking-tight'>{title}</h2>
        </div>
        <div className='md:col-span-2'>
          <ul className='m-0 p-0 list-none space-y-2'>{children}</ul>
        </div>
      </div>
    </section>
  )
}

export function FAQItem({ question, defaultOpen, children }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(Boolean(defaultOpen))

  return (
    <li>
      <div className='group border border-(--grid-border-color) bg-white dark:bg-[#1a1a1a]'>
        <button
          type='button'
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className='w-full flex cursor-pointer items-center justify-between gap-3 px-4 py-3 md:px-5 md:py-3 text-left text-base font-medium tracking-tight text-neutral-900 dark:text-neutral-100 select-none'
        >
          <span>{question}</span>
          <BiChevronDown
            className={`size-5 shrink-0 text-neutral-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <div className='px-4 pb-4 md:px-5 md:pb-5 text-neutral-700 dark:text-neutral-300 leading-relaxed'>
            {children}
          </div>
        </motion.div>
      </div>
    </li>
  )
}

export function DefaultFAQ() {
  const locale = useLocale()

  if (locale === 'zh-CN') {
    return (
      <FAQ title='常见问题'>
        <FAQItem question='你们最擅长哪类工作?'>
          我们特别适合迭代式的产品设计，以及需要持续推进、并行多条创意产出的场景——尤其是处于增长阶段的团队。
          当优先级变化、范围不适合写死在 SOW 里时，我们能够快速嵌入、保持节奏，并让质量随着时间不断复利。
        </FAQItem>

        <FAQItem question='订阅包含哪些内容?'>
          订阅会为你保障每周的资深设计产能（聚焦且有效的资深设计时间），在你现有的沟通与工具中进行异步协作，并以端到端的方式推进，专注交付高影响力结果。
        </FAQItem>

        <FAQItem question='为什么选择订阅而不是一次性项目?'>
          因为深度与可预期性。你将持续获得资深品控与执行，覆盖产品、品牌系统、动效/视频等多个维度，总成本通常也低于逐个项目的报价方式。
        </FAQItem>

        <FAQItem question='之后可以调整方案吗?'>当然可以。可随时根据你的节奏、预算与路线图升级或降级。</FAQItem>

        <FAQItem question='是否支持按项目合作?'>
          支持。预约一次洽谈沟通，然后我们会根据你的目标给出定制化的项目范围与方案。
        </FAQItem>

        <FAQItem question='为什么不直接在团队内招聘?'>
          招聘很重要，但通常更慢、更贵，也是一种长期承诺。我们按需提供专业能力、几乎零上手成本，并带来外部伙伴的经验与模式识别，帮助你更快更稳地推进。
        </FAQItem>

        <FAQItem question='多快能看到进展?'>
          从第一天就能感到进展。大多数团队在第一周就能看到明确的推进，我们通常会在 5–10
          天内交付第一轮设计（视范围而定）。
        </FAQItem>

        <FAQItem question='如果第一版不合适怎么办?'>
          我们会与你一起迭代。设计是一场对话——基于你的反馈不断打磨，直到对你和你的用户都真正奏效。我们不止步于“差不多”。
        </FAQItem>

        <FAQItem question='你们日常用哪些工具协作?'>
          <p>设计：Figma、Rive、Spline、Unicorn、Jitter，Paper 等工具。</p>
          <p>沟通：Slack、微信、飞书、企业微信、腾讯会议等——我们会嵌入到你现有的工作流中。</p>
        </FAQItem>

        <FAQItem question='可以签合同或保密协议（NDA）吗?'>
          当然可以。保密是基本前提——我们可签署 NDA，并根据需要签订合同，保障你的信息安全与合规。
        </FAQItem>

        <FAQItem question='付款与开票如何安排?'>
          可在我们的网站或通过定制链接支付。支持
          Stripe（信用卡/借记卡）、ACH、支付宝，以及美元收款。我们可以为中国境内主体开具发票（增值税专票/普票视合作而定），并可按需签署合同（含电子签）。
        </FAQItem>

        <FAQItem question='可以暂停或取消吗?'>
          可以随时暂停或取消。剩余可用时间会顺延至后续使用。注意：已取消的周期不可退款。
        </FAQItem>
      </FAQ>
    )
  }

  return (
    <FAQ title='Frequently Asked Questions'>
      <FAQItem question='What kinds of work are you the best fit for?'>
        We’re built for iterative product design and ongoing, multi-track creative needs—especially at growth stage.
        When priorities shift and scope won’t sit neatly in a rigid SOW, we plug in, keep momentum, and compound quality
        over time.
      </FAQItem>

      <FAQItem question='What’s included with a subscription?'>
        A guaranteed weekly design capacity (focused, senior-level hours), async collaboration embedded in your
        comms/tools, and end-to-end execution aimed squarely at high-impact outcomes.
      </FAQItem>
      <FAQItem question='Why choose a subscription instead of one-off projects?'>
        Depth and predictability. You get sustained access to senior craft across product, brand systems, and
        motion/video—at a lower total cost than project-priced engagements.
      </FAQItem>
      <FAQItem question='Can I switch plans later?'>
        Absolutely. Upgrade or downgrade anytime to match your pace, runway, and roadmap.
      </FAQItem>
      <FAQItem question='Do you support project-based work?'>
        We do. Book a quick discovery call and we’ll scope a tailored project plan.
      </FAQItem>
      <FAQItem question='Why not just hire in-house?'>
        Hiring is powerful but slow, expensive, and a long-term commitment. We bring specialized talent on demand, zero
        onboarding drag, and the pattern recognition of an external partner who’s shipped this before.
      </FAQItem>
      <FAQItem question='How fast will we see movement?'>
        Day one, you’ll feel traction. Most teams see tangible progress in the first week, and we typically ship an
        initial design round within 5–10 days (scope-dependent).
      </FAQItem>
      <FAQItem question='What if the first pass isn’t right?'>
        We iterate with you. Design is a conversation—we refine with your feedback until it lands for you and your
        users. We don’t stop at “good enough.”
      </FAQItem>
      <FAQItem question='What tools do you work with?'>
        <p>Design: Figma, Rive, Spline, Unicorn, Jitter, Paper, and other tools.</p>
        <p>
          Comms: Slack, Telegram, Google Meet, WeChat, Lark, email—whatever you already use. We embed into your
          workflow.
        </p>
      </FAQItem>
      <FAQItem question='Can you sign contracts or NDAs?'>
        Yes. Confidentiality is a given—we’ll sign NDAs and handle contracts to keep your information secure.
      </FAQItem>
      <FAQItem question='How do payments work?'>
        Pay on our site or via a custom link. We accept Stripe (credit/debit), ACH, Alipay, and USD payments. Every
        payment includes an official invoice.
      </FAQItem>
      <FAQItem question='Can I pause or cancel?'>
        Yes—pause or cancel anytime. Any remaining time rolls forward for future use. Note: cancellations aren’t
        refundable.
      </FAQItem>
    </FAQ>
  )
}
