export interface Capability {
  id: string
  title: string
  items: string[]
}

export const capabilitiesByLocale: Record<string, Capability[]> = {
  en: [
    {
      id: '001',
      title: 'Brand',
      items: [
        'Logo & Marks',
        'IPs & Mascots',
        'Brand Strategy',
        'Brand Guidelines',
        'Voice & Messaging',
        'Visual Identities',
        'Deck Templates',
      ],
    },
    {
      id: '002',
      title: 'Product',
      items: [
        'Marketing Sites',
        'Framer/Webflow',
        'Next.js Sites',
        'SaaS & Platforms',
        'Mobile/Desktop Apps',
        'UI/UX Design',
        'Design Systems',
      ],
    },
    {
      id: '003',
      title: 'Growth',
      items: ['Social Assets', 'Content & Copywriting', 'SEO', 'Motion & Video', 'Illustration', 'Merch & Swag'],
    },
  ],
  'zh-CN': [
    {
      id: '001',
      title: '品牌',
      items: ['Logo 与符号', 'IP 与吉祥物', '品牌策略', '品牌规范', '品牌语言与文案', '视觉识别', '演示文稿模板'],
    },
    {
      id: '002',
      title: '产品',
      items: [
        '营销落地页',
        'Framer / Webflow',
        'Next.js 网站',
        'SaaS 与平台',
        '移动/桌面应用',
        'UI/UX 设计',
        '设计系统',
      ],
    },
    {
      id: '003',
      title: '增长',
      items: ['社媒素材', '内容与文案', '搜索引擎优化（SEO）', '动效与视频', '插画', '周边与礼品'],
    },
  ],
}
