import type { Metadata } from "next";
import { Space } from "@mantine/core";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ListProfiles from "@/components/Profiles/ListProfiles";
import { getAll } from "@/queries";
import IndexList from "@/components/Profiles/IndexList";
import EzoicAd from "@/components/Ads/EzoicAd";

// For output:'export' you must declare the finite set of params.
export function generateStaticParams(): Array<{ letter: string }> {
    const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)); // a..z
    return letters.map((letter) => ({ letter }));
}

export async function generateMetadata(
    props: { params: Promise<{ letter: string }> }
): Promise<Metadata> {
    const { letter } = await props.params;
    const upper = (letter ?? "").slice(0, 1).toUpperCase();
    return {
        title: `Serial Killers that start with ${upper} | They Will Kill You`,
        alternates: {
            canonical: `https://theywillkillyou.com/letter/${encodeURIComponent(letter ?? "")}`,
        },
    };
}

export default async function Page(
    props: { params: Promise<{ letter: string }> }
) {
    const { letter } = await props.params;
    const key = (letter ?? "").toLowerCase();
    const data = await getAll(key);

    return (
        <>
            <Header />
            <EzoicAd />
            <IndexList />
            <ListProfiles isLoading={false} data={data} />
            <IndexList />
            <Space h="xl" />
            <Footer />
        </>
    );
}
