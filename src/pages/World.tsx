import { LanguageSelector, useI18n } from "../i18n/I18nContext"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function World() {
    const { t } = useI18n()

    return <div className="flex flex-col gap-3 items-center min-h-screen bg-[#ead9bb] bg-[url('/assets/paper-texture.webp')] bg-repeat bg-blend-multiply">
        <Header title={t.world.worldName} />
        <div className="flex flex-row gap-3 items-center justify-center flex-wrap">
            <img src="https://picsum.photos/600/400" alt="img" />
            <img src="https://picsum.photos/600/400" alt="img" />
            <img src="https://picsum.photos/600/400" alt="img" />
        </div>
        <div className="flex flex-col gap-3 items-center max-w-350 px-2">
            <div>{t.world.description}</div>
        </div>
        <Footer />
        <LanguageSelector />
    </div>
}
