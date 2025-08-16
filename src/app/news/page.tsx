import { Container, Text } from "@mantine/core";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import NewsArchive from "@/components/News/NewsArchive";
import { fetchNewsPage } from "@/queries";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Page(
    props: { searchParams?: Promise<SearchParams> }
) {
    const sp = (await props.searchParams) ?? {};
    const perPage = 21;

    const pageParam = Array.isArray(sp.page) ? sp.page[0] : sp.page;
    const page = Math.max(1, parseInt(pageParam || "1", 10) || 1);

    const { data, meta } = await fetchNewsPage(page, perPage);

    return (
        <>
            <Header />
            <Container size="xl" mt="xl" mb="xl">
                <Text fw={800} fz={28} mb="md">
                    News
                </Text>
                <NewsArchive items={data} meta={meta} />
            </Container>
            <Footer />
        </>
    );
}
