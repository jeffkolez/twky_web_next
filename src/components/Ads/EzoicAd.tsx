"use client";

import { useEffect, useRef } from "react";
import { Container } from "@mantine/core";
import { usePathname } from "next/navigation";

declare global {
    interface Window {
        ezstandalone?: {
            cmd?: Array<() => void>;
            showAds?: (id: number) => void;
        };
    }
}

type Props = {
    placeholderId?: number;
    topMargin?: string | number;
};

export default function EzoicAd({ placeholderId = 109, topMargin = "62px" }: Props) {
    const pathname = usePathname();
    const firedOnce = useRef(false);

    useEffect(() => {
        if (firedOnce.current) return;
        firedOnce.current = true;

        if (typeof window !== "undefined") {
            window.ezstandalone = window.ezstandalone || {};
            window.ezstandalone.cmd = window.ezstandalone.cmd || [];
            window.ezstandalone.cmd.push(() => {

            if (typeof window.ezstandalone?.showAds === "function") {
                window.ezstandalone.showAds(placeholderId);
            }
            });
        }
    }, [placeholderId]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const q = window.ezstandalone?.cmd;
        if (!q) return;

        q.push(() => {
            if (typeof window.ezstandalone?.showAds === "function") {
                window.ezstandalone.showAds(placeholderId);
            }
        });
    }, [pathname, placeholderId]);

    return (
        <Container size="xl" mt={topMargin}>
            <div id={`ezoic-pub-ad-placeholder-${placeholderId}`} />
        </Container>
    );
}
