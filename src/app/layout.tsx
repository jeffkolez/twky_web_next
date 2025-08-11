import type { Metadata } from "next";
import { MantineProvider } from "@mantine/core";
import { Bebas_Neue, Inter } from "next/font/google";
import "@mantine/core/styles.css";
import "@/css/general.css";
import "@/css/embla.css";
import Providers from "./providers";
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Web Next",
  description: "Next.js + Mantine baseline",
};

const bebasNeue = Bebas_Neue({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
    variable: "--font-bebas",
});

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
            <head>
                {/* GA4 */}
                <Script
                    id="ga4-src"
                    src={`https://www.googletagmanager.com/gtag/js?id=G-DR5F99C2WF}`}
                    strategy="afterInteractive"
                />
                <Script id="ga4-init" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-DR5F99C2WF', {
                            page_path: window.location.pathname + window.location.search,
                            page_title: document.title
                        });
                    `}
                </Script>
            </head>
            <body>
                <MantineProvider defaultColorScheme="light">
                    <Providers>
                        {children}
                    </Providers>
                </MantineProvider>
            </body>
        </html>
    );
}
