// src/app/search/[term]/page.tsx
import type { Metadata } from "next";
import { Space } from "@mantine/core";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Search from "@/components/Search/Search";
import SearchResults from "@/components/SearchResults/SearchResults";
import Featured from "@/components/Featured/Featured";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ term: string }>;
}): Promise<Metadata> {
    const { term } = await params;
    const decoded = decodeURIComponent(term ?? "");
    return {
        title: `Search Results for ${decoded} | They Will Kill You`,
        description: `Search results for ${decoded} on They Will Kill You.`,
        alternates: { canonical: `https://theywillkillyou.com/search/${encodeURIComponent(decoded)}` },
    };
}

export default async function Page({
    params,
}: {
    params: { term: string };
}) {
    const decoded = decodeURIComponent(params.term ?? "");

    return (
        <>
            <Header />
            <Search />
            <SearchResults term={decoded} />
            <Featured title="It may interest you" shortUrl="highlights" />
            <Space h="xl" />
            <Footer />
        </>
    );
}
