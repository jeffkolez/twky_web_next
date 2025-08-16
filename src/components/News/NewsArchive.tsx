"use client";

import Link from "next/link";
import { Box, Group, Pagination } from "@mantine/core";
import NewsCard from "@/components/Card/NewsCard/NewsCard";
import type { NewsHeadline } from "@/types";

type Meta = {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
};

export default function NewsArchive({ items, meta }: { items: NewsHeadline[]; meta: Meta }) {
    return (
        <>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 16,
                }}
            >
                {items.map((item) => (
                    <Box key={item.id}>
                        <NewsCard item={item} />
                    </Box>
                ))}
            </div>

            {meta.last_page > 1 && (
                <Group justify="center" mt="lg">
                    {/* Mantine Pagination is client-side UI; links still SSR-friendly */}
                    <Pagination
                        total={meta.last_page}
                        value={meta.current_page}
                        onChange={() => {}}
                        getItemProps={(page) => ({
                            component: Link,
                            href: page === 1 ? "/news" : `/news?page=${page}`,
                            scroll: true,
                        })}
                    />
                </Group>
            )}
        </>
    );
}
