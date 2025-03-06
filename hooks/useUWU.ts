import { useLocalStorage } from 'foxact/use-local-storage'

export function useUWU() {
  return useLocalStorage('uwu', false)[0]
}
