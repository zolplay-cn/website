import { useLocale } from 'next-intl'
import { BackgroundVideo, Capabilities, CTAButton, WithFrame } from '~/components/mdx'

export default function ServicesPage() {
  const locale = useLocale()

  const isZH = locale === 'zh-CN'

  return (
    <>
      <h1>{isZH ? '我们的服务' : 'Services'}</h1>

      <p>
        {isZH
          ? '我们与具有远见的创始团队深度合作，从 0 到 1，到 10。我们专注在能真正推动业务增长的关键环节——品牌、产品与增长——以高标准交付经得起时间考验的作品。'
          : 'We partner with visionary founders from zero to one—and beyond. We focus on the moments that move business forward—brand, product, and growth—shipping high‑standard work that lasts.'}
      </p>

      <h1>{isZH ? '我们能做什么' : 'What We Do'}</h1>
      <p>
        {isZH
          ? '我们是一个一体化的创意与产品工作室：在正确的时间做正确的事，从第一次接触到最终上线，始终对结果负责。以下是我们的核心能力矩阵。'
          : 'We’re an integrated creative and product studio: doing the right things at the right time, owning outcomes from first impression to shipped product. Here’s our capabilities matrix.'}
      </p>

      <Capabilities />

      <h1>{isZH ? '我们的宣言' : 'Our Manifesto'}</h1>
      <p>
        {isZH
          ? '设计与速度不是对立面。我们将高品味的判断与高效执行合为一体：明确目标、减少噪音、快速迭代、持续交付。每一个像素、每一行文案、每一次交互，都要为结果负责——赢得用户，推动指标，塑造品牌。'
          : 'Design and speed are not opposites. We combine taste with execution: clarify goals, reduce noise, iterate quickly, and ship consistently. Every pixel, every word, every interaction is accountable—to users, to metrics, to brand.'}
      </p>
      <p>
        {isZH
          ? 'AI 让「做出来」变得容易，而我们让「做得对」成为你的优势。我们相信细节能改变行为：清晰、情感与流畅体验。别人交付功能，我们打造偏爱。真正的差异化来自敢于取舍与持续打磨。'
          : 'AI made “built” easy. We make “built right” your advantage. We believe details change behavior: clarity, emotion, and flow. Others ship features—we craft preference. Real differentiation comes from decisive focus and relentless refinement.'}
      </p>

      <WithFrame>
        <BackgroundVideo src='/vids/partner-logos.mp4' aspectRatio='16/9' className='my-6' />
      </WithFrame>

      <h1>{isZH ? '下一步' : 'Next Steps'}</h1>
      <p>
        {isZH
          ? '如果你准备将产品与品牌提升到新的层级，我们很乐意成为你的长期创意伙伴。从一次落地页、一次品牌焕新，到从 0 到 1 的完整产品一起打造。'
          : 'If you’re ready to level up your product and brand, we’d love to be your long‑term creative partner—from a single landing page or brand refresh to a full zero‑to‑one product.'}
      </p>

      <CTAButton href='/contact'>{isZH ? '开始合作' : 'Start a project'}</CTAButton>
    </>
  )
}
