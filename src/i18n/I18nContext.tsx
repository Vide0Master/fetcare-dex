import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Globe2 } from 'lucide-react'
import { en, type Translations } from './locales/en'
import { ru } from './locales/ru'

export type Locale = 'ru' | 'en'

const dictionaries: Record<Locale, Translations> = {
    en,
    ru,
}

const languageNames: Record<Locale, string> = {
    en: 'English',
    ru: 'Русский',
}

interface I18nContextValue {
    locale: Locale
    t: Translations
    setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocale] = useState<Locale>('en')

    const value = {
        locale,
        t: dictionaries[locale],
        setLocale,
    }

    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    )
}

export function useI18n() {
    const context = useContext(I18nContext)
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider')
    }
    return context
}

export function LanguageSelector() {
    const { locale, setLocale } = useI18n()
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    function handleSelect(code: Locale) {
        setLocale(code)
        setIsOpen(false)
    }

    return (
        <div ref={containerRef} className="fixed top-4 right-4 z-50 select-none">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="group relative flex items-center gap-2 px-3.5 py-1.5 rounded-sm border border-amber-900/40 bg-[#ead9bb] bg-[url('/assets/paper-texture.webp')] bg-repeat bg-blend-multiply text-amber-950 shadow-md transition-all duration-200 hover:shadow-lg active:scale-95"
            >
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-linear-to-b from-amber-950 via-amber-800 to-amber-950 rounded-l-full shadow-inner" />
                <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-linear-to-b from-amber-950 via-amber-800 to-amber-950 rounded-r-full shadow-inner" />

                <Globe2 size={16} className="text-amber-900 transition-transform duration-300 group-hover:rotate-12" />
                <span className="text-sm font-serif font-semibold tracking-wide">
                    {languageNames[locale]}
                </span>
                <ChevronDown
                    size={14}
                    className={`text-amber-900 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <div
                className={`absolute right-0 mt-2 w-40 origin-top transition-all duration-300 ease-out ${isOpen
                    ? 'opacity-100 scale-y-100 pointer-events-auto'
                    : 'opacity-0 scale-y-0 pointer-events-none'
                    }`}
            >
                <div className="relative flex flex-col shadow-2xl">
                    <div className="relative -mb-1 z-10 h-2.5 w-full bg-linear-to-r from-amber-950 via-amber-800 to-amber-950 rounded-t-full shadow-sm" />

                    <div className="relative border-x border-amber-900/40 bg-[#ead9bb] bg-[url('/assets/paper-texture.webp')] bg-repeat bg-blend-multiply px-1.5 py-2 shadow-inner">
                        <div className="flex flex-col gap-0.5">
                            {Object.entries(languageNames).map(([code, title]) => {
                                const isSelected = locale === code

                                return (
                                    <button
                                        key={code}
                                        type="button"
                                        onClick={() => handleSelect(code as Locale)}
                                        className={`flex items-center justify-between w-full px-2.5 py-1.5 text-left text-sm font-serif rounded transition-colors duration-150 ${isSelected
                                            ? 'font-bold text-amber-950 bg-amber-950/10 shadow-inner'
                                            : 'text-amber-900/90 hover:bg-amber-950/5 hover:text-amber-950'
                                            }`}
                                    >
                                        <span>{title}</span>
                                        {isSelected && <Check size={14} className="text-amber-900" />}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="relative -mt-1 z-10 h-2.5 w-full bg-linear-to-r from-amber-950 via-amber-800 to-amber-950 rounded-b-full shadow-sm" />
                </div>
            </div>
        </div>
    )
}