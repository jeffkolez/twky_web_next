import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PrivacyPolicy from "@/components/Static/PrivacyPolicy";

export const metadata: Metadata = {
    title: "Terms of Service",
};

export default function TermsOfServicePage() {
    return (
        <>
            <Header />
            <PrivacyPolicy />
            <Footer />
        </>
    );
}
