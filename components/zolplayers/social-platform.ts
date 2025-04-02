import type { IconType } from 'react-icons'
import { CgWebsite } from 'react-icons/cg'
import { TbBrandDribbble, TbBrandGithub, TbBrandInstagram, TbBrandLinkedin, TbBrandYoutube } from 'react-icons/tb'
import { BrandXIcon } from '../icons/BrandXIcon'
import { ZpBrandReadCV } from '../icons/ZpBrandReadCV'

export type SocialPlatform =
  | 'twitter'
  | 'linkedin'
  | 'github'
  | 'dribbble'
  | 'instagram'
  | 'youtube'
  | 'readcv'
  | 'xiaohongshu'
  | 'website'

export const SOCIAL_ICON_MAP: Record<SocialPlatform, IconType | React.FC<{ className?: string }>> = {
  twitter: BrandXIcon,
  youtube: TbBrandYoutube,
  github: TbBrandGithub,
  linkedin: TbBrandLinkedin,
  dribbble: TbBrandDribbble,
  instagram: TbBrandInstagram,
  readcv: ZpBrandReadCV,
  xiaohongshu: CgWebsite,
  website: CgWebsite,
}
