import { atom, getDefaultStore, useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

type Theme = "dark" | "light" | "system"

const baseThemeAtom = atomWithStorage<Theme>("theme", "system", undefined, { getOnInit: true })
const themeAtom = atom(
  (get) => {
    return get(baseThemeAtom)
  },
  (get, set, nextTheme: Theme) => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")
    root.classList.add(nextTheme)

    set(baseThemeAtom, nextTheme)
  },
)
themeAtom.onMount = (set) => {
  const store = getDefaultStore()
  const currTheme = store.get(themeAtom)

  const root = window.document.documentElement

  root.classList.remove("light", "dark")

  if (currTheme === "system") {
    const preferesDark: boolean = window.matchMedia("(prefers-color-scheme: dark)").matches
    const preferenceTheme: Theme = preferesDark ? "dark" : "light"

    root.classList.add(preferenceTheme)
    set(preferenceTheme)
    return
  }

  root.classList.add(currTheme)
  set(currTheme)
}

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom)

  return [theme, setTheme] as const
}
