import Link from "next/link";
import { Box, Text } from "@mantine/core";
import classes from "./NewsCard.module.css";
import { NewsHeadline } from "@/types";

export default function NewsCard({ item }: { item: NewsHeadline }) {
    const img =
        item.featured_photo_url ??
        item.media?.[0]?.full_url ??
        null;

    // If you sometimes don’t have an image, bail to a simple text card
    if (!img) {
        return (
            <Link href={`/news/${item.slug}`} style={{ textDecoration: "none" }}>
                <Box className={classes.wrapper} style={{ background: "#222" }}>
                    <Box className={classes.cardInner}>
                        {item.category?.name && (
                            <Text size="xs" c="dimmed">
                                {item.category.name}
                            </Text>
                        )}
                        <Text fw={700} fz={20} c="white">
                            {item.title}
                        </Text>
                    </Box>
                </Box>
            </Link>
        );
    }

    return (
        <Link href={`/news/${item.slug}`} style={{ textDecoration: "none" }}>
            <Box className={classes.wrapper}>
                <Box
                    component="img"
                    src={img}
                    alt={item.title}
                    className={classes.image}
                    style={{
                        width: "420px",
                        height: '320px',
                        objectFit: "cover",
                        borderRadius: 8,
                    }}
                />
                {item.category?.name && (
                    <span className={classes.badge}>{item.category.name}</span>
                )}
                <span className={classes.gradient} />
                <h3 className={classes.title}>{item.title}</h3>
            </Box>
        </Link>
    );
}

