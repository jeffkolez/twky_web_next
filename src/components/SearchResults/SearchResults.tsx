"use client";

import { Container, Grid, Skeleton, Stack, Text, Space, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import VerticalAd from "@/components/Ads/VerticalAd";
import ResultsTable from "@/components/ResultsTable/ResultsTable";
import { search } from "@/queries";
import classes from "./SearchResults.module.css";

export default function SearchResults({ term }: { term?: string }) {
    const searchParams = useSearchParams();

    const searchText = term ?? (searchParams.get("q") || "");

    const { isLoading, data } = useQuery({
        queryKey: [`search-${searchText}`, { w: searchText }],
        queryFn: search,
        enabled: !!searchText,
    });

    if (!searchText) {
        return null;
    }

    return isLoading || !data ? (
        <Skeleton />
    ) : (
        <Container size="xl" mt="xl">
            <Text className={classes.title}>
                {data.length} results for {`"${searchText}"`}
            </Text>
            <Grid gutter={0} mt="md">
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <ResultsTable data={data} />
                </Grid.Col>
                <Grid.Col span={4} visibleFrom="md">
                    <Flex direction="column" justify="flex-start">
                        <Space h="xl" />
                    </Flex>
                </Grid.Col>
            </Grid>
        </Container>
    );
}
