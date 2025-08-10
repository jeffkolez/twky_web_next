import type { Metadata } from "next";
import { MantineProvider } from "@mantine/core";
import { Bebas_Neue, Inter } from "next/font/google";
import "@mantine/core/styles.css";
import "@/css/general.css";
import "@/css/embla.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Web Next",
  description: "Next.js + Mantine baseline",
};

const bebasNeue = Bebas_Neue({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
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
