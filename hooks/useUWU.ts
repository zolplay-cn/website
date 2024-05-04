import { useLocalStorage } from 'foxact/use-local-storage'

export const useUWU = () => {
  return useLocalStorage('uwu', false)[0]
}
