import { LanguageSelector, useI18n } from "../i18n/I18nContext"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Home() {
    const { t } = useI18n()

    return <div className="flex flex-col gap-3 items-center min-h-screen bg-[#ead9bb] bg-[url('/assets/paper-texture.webp')] bg-repeat bg-blend-multiply">
        <Header title={t.home.title} />

        <img src="https://picsum.photos/600/400" alt="img" />

        <div className="flex flex-col gap-3 items-center max-w-350 px-2">
            <div className="flex flex-col gap-1.5 items-center">
                <h1 className="caption-font text-6xl">{t.home.description.main.title}</h1>
                <div>{t.home.description.main.texts[0]}</div>
                <div>{t.home.description.main.texts[1]}</div>
                <div>{t.home.description.main.texts[2]}</div>
            </div>
            <div className="flex flex-col gap-1.5 items-center">
                <h1 className="caption-font text-6xl">{t.home.description.look_and_structure.title}</h1>
            </div>
            <div className="flex flex-col gap-1.5 items-center">
                <h1 className="caption-font text-6xl">{t.home.description.lifestyle.title}</h1>
            </div>
            <div className="flex flex-col gap-1.5 items-center">
                <h1 className="caption-font text-6xl">{t.home.description.origins_and_evolution.title}</h1>
            </div>
            <div className="flex flex-col gap-1.5 items-center">
                <h1 className="caption-font text-6xl">{t.home.description.classification.title}</h1>
            </div>
            <div className="flex flex-col gap-1.5 items-center">
                <h1 className="caption-font text-6xl">{t.home.description.human_interaction.title}</h1>
            </div>
            <div className="flex flex-col gap-1.5 items-center">
                <h1 className="caption-font text-6xl">{t.home.description.fetcars_in_culture.title}</h1>
            </div>
        </div>

        <Footer />
        <LanguageSelector />
    </div>
}