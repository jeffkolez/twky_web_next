"use client";

import { Container, Flex, ScrollArea, Skeleton, Text, Box } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import EventCard from "@/components/Card/EventCard/EventCard";
import classes from "./SignificantDates.module.css";
import { getSignificantEvents } from "@/queries";
import { ProfileCard } from "@/types";

const splitData = (data: ProfileCard[] | undefined, firstRowCount: number) => {
    if (!data) return [[], []] as const;
    return [data.slice(0, firstRowCount), data.slice(firstRowCount)] as const;
};

function Mobile({ data }: { data?: ProfileCard[] }) {
    return (
        <ScrollArea w="100%" hiddenFrom="md">
        <Flex direction="column" w="100%">
            <Cards data={data} />
        </Flex>
        </ScrollArea>
    );
}

function Desktop({ data }: { data?: ProfileCard[] }) {
    return (
        <Flex direction="column" w="100%" visibleFrom="md">
        <Cards data={data} />
        </Flex>
    );
}

function Cards({ data }: { data?: ProfileCard[] }) {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "long" });
    const formattedDate = `${month.toLowerCase()}${day < 10 ? "0" + day : day}`;

    const showMore = !!data && data.length >= 7;

    return (
        <div
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
        }}
        >
        {data?.map((card) => (
            <Box key={card.id}>
            <EventCard data={card} />
            </Box>
        ))}

        {showMore && (
            <Box>
            <Link href={`/date/${formattedDate}`} style={{ textDecoration: "none" }}>
                <Box className={classes.moreBox}>
                <Text className={classes.moreText}>More</Text>
                </Box>
            </Link>
            </Box>
        )}
        </div>
    );
}

export default function SignificantDatesModule({ title }: { title: string }) {
    const { data, isLoading } = useQuery({
        queryKey: ["getSignificantEvents", ""],
        queryFn: () => getSignificantEvents(""),
    });

    return (
        <Container size="xl" mt="xl">
        {isLoading || !data ? (
            <Skeleton w="100%" h="220px" />
        ) : (
            <>
            <Text className={classes.title}>{title}</Text>
            <Mobile data={data} />
            <Desktop data={data} />
            </>
        )}
        </Container>
    );
}
