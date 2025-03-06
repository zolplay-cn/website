import type { SocialPlatform } from './social-platform'

export const ZOLPLAYERS = [
  {
    name: '',
    slug: '',
    role: '',
    portrait: {
      url: '',
      palette: {
        darkVibrant: {
          background: '',
          foreground: '',
        },
        lightMuted: {
          background: '',
          foreground: '',
        },
        lightVibrant: {
          background: '',
          foreground: '',
        },
        darkMuted: {
          background: '',
          foreground: '',
        },
      },
    },
    social: [],
    joinedDate: '',
  },
] satisfies Zolplayer[]

interface PaletteSwatch {
  background: string
  foreground: string
}
export interface Zolplayer {
  name: string
  slug: string
  role: string
  portrait: {
    url: string
    palette: {
      darkMuted: PaletteSwatch
      darkVibrant: PaletteSwatch
      lightMuted: PaletteSwatch
      lightVibrant: PaletteSwatch
    }
  }

  social: {
    platform: SocialPlatform
    url: string
  }[]
  joinedDate: string
}
