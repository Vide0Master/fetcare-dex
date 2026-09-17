import { createContext, useContext } from 'react'
import { en } from "../i18n/locales/en"

type Family = keyof typeof en.fet_dex.family
type SubFamily = keyof typeof en.fet_dex.sub_family

export interface FetCare {
    name: {
        en: string
        ru: string
    }
    family: Family
    sub_family: SubFamily
    card_image: string
    view_image: string
    owner: string
    link: string
}

export interface AppConfig {
    fetcares: FetCare[],
    familys: Family[]
}

export interface ConfigContextValue {
    config: AppConfig | null
    isLoading: boolean
    error: Error | null
}

export const ConfigContext = createContext<ConfigContextValue | null>(null)

export function useConfig() {
    const context = useContext(ConfigContext)
    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider')
    }
    return context
}