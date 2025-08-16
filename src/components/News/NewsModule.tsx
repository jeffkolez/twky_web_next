import { Container, Flex, ScrollArea, Text, Box } from "@mantine/core";
import Link from "next/link";
import NewsCard from "@/components/Card/NewsCard/NewsCard";
import { fetchHeadlines } from '@/queries';
import { NewsHeadline } from '@/types';
import classes from "./NewsModule.module.css";

type NewsCardData = NewsHeadline & { image?: string | null };

function resolveImage(n: NewsHeadline): string | null {
    // Prefer the model accessor first, then a safe media URL
    if (n.featured_photo_url) return n.featured_photo_url;
    if (n.media && n.media.length) {
        // pick the first media that has a full_url
        const m = n.media.find(x => typeof x.full_url === "string" && x.full_url.length > 0);
        if (m?.full_url) return m.full_url;
    }
    return null;
}

function Cards({ data }: { data: NewsCardData[] }) {
    const showMore = data.length >= 5;

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
            }}
        >
            {data.map((item) => (
                <Box key={item.id}>
                    <NewsCard item={item} />
                </Box>
            ))}

            {showMore && (
                <Box>
                    <Link href="/news" style={{ textDecoration: "none" }}>
                        <Box className={classes.moreBox}>
                            <Text className={classes.moreText}>More</Text>
                        </Box>
                    </Link>
                </Box>
            )}
        </div>
    );
}

function Mobile({ data }: { data: NewsCardData[] }) {
    return (
        <ScrollArea w="100%" hiddenFrom="md">
            <Flex direction="column" w="100%">
                <Cards data={data} />
            </Flex>
        </ScrollArea>
    );
}

function Desktop({ data }: { data: NewsCardData[] }) {
    return (
        <Flex direction="column" w="100%" visibleFrom="md">
            <Cards data={data} />
        </Flex>
    );
}

export default async function NewsModule({
    title = "Latest News",
    limit = 5,
}: {
    title?: string;
    limit?: number;
}) {
    const raw = await fetchHeadlines(limit);
    // Resolve image URL server-side and pass it down
    const data: NewsCardData[] = raw.map(n => ({ ...n, image: resolveImage(n) }));

    return (
        <Container size="xl" mt="xl">
            <Text className={classes.title}>{title}</Text>
            <Mobile data={data} />
            <Desktop data={data} />
        </Container>
    );
}
