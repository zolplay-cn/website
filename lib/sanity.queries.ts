import { groq } from 'next-sanity'

export const settingsQuery = groq`*[_type == "settings"][0]`
