import { Link } from "react-router-dom";
import { LanguageSelector, useI18n } from "../i18n/I18nContext";
import { Search } from "lucide-react";
import { useConfig } from "../config/context";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

export default function FetDex() {
    const { t, locale } = useI18n()
    const { config, isLoading } = useConfig()
    const [search, setSearch] = useState<string>("")
    const [selectedFamilies, setSelectedFamilies] = useState<string[]>([])

    function toggleFamily(family: string) {
        setSelectedFamilies(prev =>
            prev.includes(family)
                ? prev.filter(item => item !== family)
                : [...prev, family]
        )
    }

    const query = search.trim().toLowerCase()

    const fetcaresToDisplay = (config?.fetcares ?? []).filter(item => {
        const matchesSearch =
            query.length === 0 || item.name[locale].toLowerCase().includes(query)
        const matchesFamily =
            selectedFamilies.length === 0 || selectedFamilies.includes(item.family)

        return matchesSearch && matchesFamily
    })

    return (
        <div className="flex flex-col gap-3 items-center min-h-screen bg-[#ead9bb] bg-[url('/assets/paper-texture.webp')] bg-repeat bg-blend-multiply">
            <Header title={t.fet_dex.title} />

            <div className="flex flex-col gap-2 items-center justify-center">
                <label className="flex flex-row gap-2 items-center justify-center border border-black rounded-full pr-3 cursor-text">
                    <Search />
                    <input
                        className="focus-visible:outline-none bg-transparent"
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </label>

                <div className="flex flex-row gap-3 items-center justify-center flex-wrap max-w-2xl px-4">
                    {config?.familys.map(family => {
                        const isActive = selectedFamilies.includes(family)

                        return (
                            <button
                                key={family}
                                type="button"
                                onClick={() => toggleFamily(family)}
                                className={`cursor-pointer w-fit py-1 px-3 rounded-md select-none transition-all duration-200 border ${isActive
                                    ? 'bg-[#8f5238] border-amber-950 text-amber-50 shadow-inner scale-95'
                                    : 'bg-[#c4947e] border-amber-900/30 text-amber-950 hover:bg-[#b8856e]'
                                    }`}
                            >
                                {t.fet_dex.family[family] ?? family}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="flex flex-row gap-3 flex-wrap items-center justify-center">
                {isLoading ? (
                    <div>{t.info.loading}</div>
                ) : (
                    fetcaresToDisplay.map(v => (
                        <Link
                            to={`/fet-dex/${v.name[locale]}`}
                            key={v.name[locale]}
                            className="flex flex-col gap-3 items-center pb-3"
                        >
                            <div
                                className="w-70 h-70 bg-contain bg-center bg-no-repeat hover:scale-110 duration-150 transition-transform"
                                style={{ backgroundImage: `url(${v.card_image})` }}
                            />
                            <div className="font-bold text-2xl">{v.name[locale]}</div>
                        </Link>
                    ))
                )}
            </div>

            <Footer />
            <LanguageSelector />
        </div>
    )
}