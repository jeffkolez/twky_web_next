import { Button, Container, Image, SimpleGrid, Stack, Text, Box } from "@mantine/core";
import { FaQuoteLeft } from "react-icons/fa";
import Link from "next/link";
import classes from "./Quote.module.css";

type QuoteData = {
    shortUrl: string;
    name: string;
    birth?: string | null;
    death?: string | null;
    quote: string;
    media?: string[];
};

function year(date?: string | null): string {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return String(d.getFullYear());
}

async function fetchQuote(): Promise<QuoteData | null> {
    // Prefer server env, then public, finally sane default with /api
    const raw =
        process.env.API_URL ??
        process.env.NEXT_PUBLIC_API_URL ??
        "http://127.0.0.1:8000/api";
    const API_BASE = raw.replace(/\/$/, "");

    const res = await fetch(`${API_BASE}/profiles/quote`, {
        next: { revalidate: 600 },
        headers: { Accept: "application/json" },
    });

    if (!res.ok) return null;
    return res.json();
}

export default async function Quote() {
    const data = await fetchQuote();

    if (!data) {
        // Minimal, crawlable fallback
        return (
            <Container size="xl" pt="48px">
                <Box style={{ height: 292 }} />
            </Container>
        );
    }

    const img = data.media?.[0] ?? "";
    const years =
        year(data.birth) +
        (data.death ? ` - ${year(data.death)}` : "");

    return (
        <Container size="xl" h={{ md: "340px" }} pt="48px">
            <SimpleGrid cols={3} spacing="md" visibleFrom="md">
                <Link href={`/profile/${data.shortUrl}`}>
                    <Image
                        src={img}
                        alt={data.name}
                        h="292px"
                        style={{
                            maxHeight: "292px",
                            objectFit: "contain",
                            objectPosition: "top",
                            borderRadius: "12px",
                        }}
                    />
                </Link>

                <Stack justify="space-between">
                    <FaQuoteLeft color="red" size="40" />

                    <Text className={classes.quoteText}>
                        {data.quote}
                    </Text>

                    <Text className={classes.nameText} component="p">
                        <Text component="span">{data.name} </Text>
                        <Text component="span" className={classes.years}>
                            {years}
                        </Text>
                    </Text>

                    <Link href={`/profile/${data.shortUrl}`}>
                        <Button variant="default" w="125px">View Profile</Button>
                    </Link>
                </Stack>

                <Link href="https://shop.theywillkillyou.com/collections/accessories/products/they-will-kill-you-ebook">
                    <Box>
                        <Image
                            src="https://twky.nyc3.digitaloceanspaces.com/twky/fff8c085-f4ae-4bea-b39a-d0b5961b5d3d/Screenshot2024-02-16at7.10.21PM_1024x1024@2x.png"
                            alt="Ad"
                            h="292px"
                            style={{
                                maxHeight: "292px",
                                objectFit: "contain",
                                objectPosition: "top",
                                borderRadius: "12px",
                            }}
                        />
                        <Text mt="md" ta="center" component="p">
                            <strong>They Will Kill You E-Book: A Collection of Stories</strong>
                        </Text>
                    </Box>
                </Link>
            </SimpleGrid>

            <Stack hiddenFrom="md">
                <FaQuoteLeft color="red" size="40" />

                <Text className={classes.quoteText}>
                    {data.quote}
                </Text>

                <Text className={classes.nameText} component="p">
                    <Text component="span">{data.name} </Text>
                    <Text component="span" className={classes.years}>
                        {years}
                    </Text>
                </Text>

                <Link href={`/profile/${data.shortUrl}`}>
                    <Image
                        src={img}
                        alt={data.name}
                        h="292px"
                        fit="cover"
                        style={{ objectPosition: "top", borderRadius: "12px" }}
                    />
                </Link>

                <Link href={`/profile/${data.shortUrl}`} className={classes.profileButton}>
                    <Button variant="default" w="100%">View Profile</Button>
                </Link>

                <Link href="https://shop.theywillkillyou.com/collections/accessories/products/they-will-kill-you-ebook">
                    <Box>
                        <Image
                            src="https://twky.nyc3.digitaloceanspaces.com/twky/fff8c085-f4ae-4bea-b39a-d0b5961b5d3d/Screenshot2024-02-16at7.10.21PM_1024x1024@2x.png"
                            alt="Ad"
                            h="292px"
                            style={{
                                maxHeight: "292px",
                                objectFit: "contain",
                                objectPosition: "top",
                                borderRadius: "12px",
                            }}
                        />
                        <Text mt="md" ta="center" component="p">
                            <strong>They Will Kill You E-Book: A Collection of Stories</strong>
                        </Text>
                    </Box>
                </Link>
            </Stack>
        </Container>
    );
}
