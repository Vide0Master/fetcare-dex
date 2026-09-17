import { Book, Globe2, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header({ title }: { title: string }) {
    return <div className="flex flex-col gap-3 items-center pt-3 w-full">
        {/* <img src="/assets/ornament1.png" alt="" /> */}
        <div className="h-20 w-full bg-[url(/assets/ornament1.png)] bg-contain"></div>

        <div className="caption-font text-8xl">{title}</div>
        <div className="flex flex-row gap-3 items-center justify-center">
            <Link to="/world"><Globe2 /></Link>
            <Link to="/"><Home /></Link>
            <Link to="/fet-dex"><Book /></Link>
        </div>
    </div>
}