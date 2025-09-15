export interface OpenRole {
  slug: string
  title: string
}

// Source of truth for open roles used in nav and MDX
export const openRoles: OpenRole[] = [
  { slug: 'product-designer', title: 'Product Designer' },
  { slug: 'brand-designer', title: 'Brand Designer' },
]

export const openRolesCount = openRoles.length
