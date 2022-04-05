type UserProfile = {
  id: string
  name: string | null
}

type MyProfile = UserProfile & {
  phone: string | null
  email: string | null
}
