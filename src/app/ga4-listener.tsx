"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function GA4Listener() {
    const pathname = usePathname();
    const search = useSearchParams();

    useEffect(() => {
        if (typeof window === "undefined") return;
        const url = pathname + (search?.toString() ? `?${search.toString()}` : "");
        // @ts-expect-error gtag is injected by GA4 script
        window.gtag?.("config", "G-DR5F99C2WF", { page_path: url, page_title: document.title });
    }, [pathname, search]);

    return null;
}
