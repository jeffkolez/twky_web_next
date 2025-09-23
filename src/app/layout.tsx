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
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>

                <script src="https://cmp.gatekeeperconsent.com/min.js" data-cfasync="false"></script>
                <script src="https://the.gatekeeperconsent.com/cmp.min.js" data-cfasync="false"></script>

                <script async src="//www.ezojs.com/ezoic/sa.min.js"></script>
                <script>
                    window.ezstandalone = window.ezstandalone || {};
                    ezstandalone.cmd = ezstandalone.cmd || [];
                </script>

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
