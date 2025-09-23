"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function GA4Listener() {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window === "undefined") return;
        const search = window.location.search || "";
        const url = pathname + search;
        // @ts-expect-error gtag is injected by GA4 script
        window.gtag?.("config", "G-DR5F99C2WF", {
            page_path: url,
            page_title: document.title,
        });
    }, [pathname]);

    return null;
}
