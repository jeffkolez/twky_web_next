import { notFound } from "next/navigation";
import { Space } from "@mantine/core";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import NewsArticle from "@/components/News/NewsArticle";
import { fetchArticle, fetchHeadlines } from "@/queries";
import EzoicAd from "@/components/Ads/EzoicAd";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await fetchArticle(id);
    if (!item) return {};
    const hero =
        item.featured_photo_url ??
        item.media?.find((m) => m.full_url)?.full_url ??
        null;

    return {
        title: item.title,
        openGraph: {
            title: item.title,
            images: hero ? [{ url: hero }] : [],
        },
    };
}

export default async function Page(
    props: { params: Promise<{ id: string }> }
) {
    const { id } = await props.params;
    const item = await fetchArticle(id);

    if (!item) notFound();

    const recent = await fetchHeadlines(6, id);

    return (
        <>
            <Header />
            <EzoicAd />
            <NewsArticle item={item} recent={recent} />
            <Space h="xl" />
            <Footer />
        </>
    );
}

