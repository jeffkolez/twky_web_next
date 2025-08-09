import type { Metadata } from "next";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@/css/general.css";
import "@/css/embla.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Web Next",
  description: "Next.js + Mantine baseline",
};

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
