import Link from "next/link";
import { Container, Grid, GridCol, Box, Text, Badge, Stack } from "@mantine/core";
import classes from "./NewsArticle.module.css";
import { NewsHeadline } from "@/types";

export type NewsItem = NewsHeadline & {
    article: string;
};

export type Headline = NewsHeadline;

function pickHero(n: NewsItem | Headline): string | null {
    if (n.featured_photo_url) return n.featured_photo_url;
    const first = n.media?.find((m) => m.full_url)?.full_url ?? null;
    return first ?? null;
}

function formatDate(iso: string): string {
    try {
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(new Date(iso));
    } catch {
        return iso;
    }
}

export default function NewsArticle({ item, recent }: { item: NewsItem; recent: Headline[] }) {
    const hero = pickHero(item);

    return (
        <Container size="xl" mt="xl" mb="xl">
            <Grid gutter="xl">
                <GridCol span={{ base: 12, md: 8 }}>
                    <article>
                        <Box className={classes.hero}>
                            {hero && (
                                <Box component="img" src={hero} alt={item.title} className={classes.image} />
                            )}
                            <div className={classes.overlay}>
                                {item.category?.name && (
                                    <span className={classes.badge}>{item.category.name}</span>
                                )}
                                <h1 className={classes.title}>{item.title}</h1>
                                <p className={classes.meta}>{formatDate(item.published_at)}</p>
                            </div>
                        </Box>

                        <Box className={classes.body}>
                            <div
                                className={classes.content}
                                dangerouslySetInnerHTML={{ __html: item.article }}
                            />
                        </Box>
                    </article>
                </GridCol>

                <GridCol span={{ base: 12, md: 4 }}>
                    <Stack gap="md">
                        <Text fw={800} fz={20}>
                            Most Recent News
                        </Text>
                        {recent.map((n) => {
                            const thumb = pickHero(n);
                            return (
                                <Link key={n.id} href={`/news/${n.slug}`} style={{ textDecoration: "none" }}>
                                    <Box className={classes.recentItem}>
                                        {thumb && (
                                            <Box component="img" src={thumb} alt={n.title} className={classes.recentThumb} />
                                        )}
                                        <div className={classes.recentText}>
                                            {n.category?.name && (
                                                <Badge color="red" radius="sm" size="xs" variant="filled">
                                                    {n.category.name}
                                                </Badge>
                                            )}
                                            <Text fw={700} fz="sm" lineClamp={3} mt={4}>
                                                {n.title}
                                            </Text>
                                            <Text c="dimmed" fz={12}>
                                                {formatDate(n.published_at)}
                                            </Text>
                                        </div>
                                    </Box>
                                </Link>
                            );
                        })}
                        <Box mt="sm">
                            <Link href="/news" style={{ textDecoration: "none" }}>
                                <Text fw={700}>See all news →</Text>
                            </Link>
                        </Box>
                    </Stack>
                </GridCol>
            </Grid>
        </Container>
    );
}
