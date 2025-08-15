// src/app/page.tsx
import type { Metadata } from "next";
import { Space } from "@mantine/core";
import Header from "@/components/Header/Header";
import SignificantDatesModule from "@/components/SignificantDates/SignificantDatesModule";
import NewsModule from "@/components/News/NewsModule";
import Quote from "@/components/Quote/Quote";
import Footer from "@/components/Footer/Footer";
import IndexList from "@/components/Profiles/IndexList";
import EmailListSignup from "@/components/Card/Email/EmailListSignup";
import EzoicAd from "@/components/Ads/EzoicAd";

export const metadata: Metadata = {
    title: "They Will Kill You | The Internet's Largest Database of Murderers",
    description: "Browse profiles, significant dates, and stories. The internet’s largest database of murderers.",
    alternates: { canonical: "https://theywillkillyou.com/" },
    openGraph: {
        title: "They Will Kill You | The Internet's Largest Database of Murderers",
        description: "Browse profiles, significant dates, and stories.",
        url: "https://theywillkillyou.com/",
        type: "website",
        images: [{ url: "https://theywillkillyou.com/og-default.jpg" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "They Will Kill You",
        description: "Browse profiles, significant dates, and stories.",
        images: ["https://theywillkillyou.com/og-default.jpg"],
    },
    robots: process.env.NEXT_PUBLIC_SITE_ENV === "production"
        ? { index: true, follow: true }
        : { index: false, follow: false, noimageindex: true },
};

export default function HomePage() {
    return (
        <>
            <Header />
            <EzoicAd />
            <NewsModule title="Latest News" />
            <SignificantDatesModule title="This Day In History" />
            <IndexList />
            <EmailListSignup />
            <Quote />
            <Space h="xl" />
            <Space h="xl" />
            <Footer />
        </>
    );
}
