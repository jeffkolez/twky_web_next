"use client";

import Script from "next/script";

export default function EzoicSetup() {
    return (
        <>
            <Script id="cmp-min"  src="https://cmp.gatekeeperconsent.com/min.js" strategy="beforeInteractive" />
            <Script id="cmp-core" src="https://the.gatekeeperconsent.com/cmp.min.js" strategy="beforeInteractive" />

            <Script id="ezoic-sa" src="//www.ezojs.com/ezoic/sa.min.js" strategy="lazyOnload" async />
            <Script id="ezoic-init" strategy="beforeInteractive">
            {`
                window.ezstandalone = window.ezstandalone || {};
                ezstandalone.cmd = ezstandalone.cmd || [];
            `}
            </Script>
        </>
    );
}
