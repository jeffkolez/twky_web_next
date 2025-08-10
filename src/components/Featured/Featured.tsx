"use client";

import { Container, Flex, ScrollArea, Skeleton, Text, Box } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import EventCard from '@/components/Card/EventCard/EventCard';

import classes from './Featured.module.css';
import { getRelated } from '@/queries';
import { ProfileCard } from '@/types';

const Mobile = ({ data }: { data?: ProfileCard[] }) => {
    return (
        <ScrollArea w="100%" hiddenFrom="md">
            <Flex direction="column" w="100%">
                <Card data={data} />
            </Flex>
        </ScrollArea>
    );
};

const Desktop = ({ data }: { data?: ProfileCard[] }) => {
    return (
        <span>
            <Box
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '16px',
                }}
            >
                {data && data.map((card) => (
                    <Box key={card.id}>
                        <EventCard data={card} />
                    </Box>
                ))}
            </Box>
        </span>
    );
};

const Card = ({ data }: { data?: ProfileCard[] }) => {
    const rows = Math.ceil((data?.length ?? 0) / 4);
    return (
        <span>
            {Array.from({ length: rows }, (_, index) => (
                <Flex key={index} justify="space-between" w="100%" mt={index > 0 ? 'md' : 0}>
                    {data?.slice(index * 4, index * 4 + 4).map((card) => (
                        <EventCard key={card.id} data={card} />
                    ))}
                </Flex>
            ))}
        </span>
    );
};

export default ({ title, shortUrl }: { title: string, shortUrl: string }) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['getRelated', { id: shortUrl }],
        queryFn: getRelated,
        retry: false
    });
    console.log(data);

    return (
        <Container size="xl" mt="xl">
            {isLoading || !data ? <Skeleton w="100%" h="220px" /> : (
                <>
                    <Text className={classes.title}>
                        {title}
                    </Text>
                    <Mobile data={data} />
                    <Desktop data={data} />
                </>
            )}
        </Container>
    );
};
