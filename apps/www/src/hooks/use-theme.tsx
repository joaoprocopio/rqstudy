import { atom, getDefaultStore, useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

type Theme = "dark" | "light" | "system"

const baseThemeAtom = atomWithStorage<Theme>("theme", "system", undefined, { getOnInit: true })

const themeAtom = atom(
  (get) => {
    return get(baseThemeAtom)
  },
  (_, set, nextTheme: Theme) => {
    const rootEl = window.document.documentElement

    rootEl.classList.remove("light", "dark")
    rootEl.classList.add(nextTheme)

    set(baseThemeAtom, nextTheme)
  },
)

themeAtom.onMount = (set) => {
  const store = getDefaultStore()
  const currTheme = store.get(themeAtom)

  if (currTheme === "system") {
    const prefersDarkTheme: boolean = window.matchMedia("(prefers-color-scheme: dark)").matches
    const preferenceTheme: Theme = prefersDarkTheme ? "dark" : "light"

    set(preferenceTheme)
    return
  }

  set(currTheme)
}

export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom)

  return [theme, setTheme] as const
}
