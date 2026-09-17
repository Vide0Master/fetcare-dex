import { Link, useParams } from "react-router-dom";
import { LanguageSelector, useI18n } from "../i18n/I18nContext";
import { useConfig } from "../config/context";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function FetCare() {

    const { t, locale } = useI18n()

    const { fetcare } = useParams<{ fetcare: string }>()

    const { config, isLoading } = useConfig()

    if (isLoading) {
        return <div>
            {t.info.loading}
        </div>
    }

    const currentFetcare = config?.fetcares.find(item => item.name[locale] === fetcare)

    return <div className="flex flex-col gap-3 items-center min-h-screen bg-[#ead9bb] bg-[url('/assets/paper-texture.webp')] bg-repeat bg-blend-multiply">
        <Header title={currentFetcare?.name[locale] || "Woah"} />
        {currentFetcare ? (<div className="flex flex-row-reverse gap-5 flex-wrap items-center justify-center">
            <div>
                <img src={currentFetcare.view_image} alt={currentFetcare.name[locale]} className="h-[60vh]" />
            </div>
            <div className="text-2xl">
                <div>{t.fet_dex.display.family}: {t.fet_dex.family[currentFetcare.family]}</div>
                <div>{t.fet_dex.display.sub_family}: {t.fet_dex.sub_family[currentFetcare.sub_family]}</div>
                <div>{t.fet_dex.display.owner}: <Link to={currentFetcare.link}>{currentFetcare.owner}</Link></div>
            </div>
        </div>) :
            (<div>wut? no fetcare(</div>)
        }
        <Footer />
        <LanguageSelector />
    </div>
}
