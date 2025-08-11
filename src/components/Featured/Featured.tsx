"use client";

import { Container, Flex, ScrollArea, Skeleton, Text, Box } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import EventCard from '@/components/Card/EventCard/EventCard';

import classes from './Featured.module.css';
import { getRelated } from '@/queries';
import { ProfileCard } from '@/types';

interface GridProps {
    data?: ProfileCard[];
}

function Card({ data }: GridProps) {
    const rows = Math.ceil((data?.length ?? 0) / 4);
    return (
        <span>
            {Array.from({ length: rows }, (_, index) => (
                <Flex
                    key={index}
                    justify="space-between"
                    w="100%"
                    mt={index > 0 ? 'md' : 0}
                >
                    {data
                        ?.slice(index * 4, index * 4 + 4)
                        .map((card) => (
                            <EventCard key={card.id} data={card} />
                        ))}
                </Flex>
            ))}
        </span>
    );
}

function Mobile({ data }: GridProps) {
    return (
        <ScrollArea w="100%" hiddenFrom="md">
            <Flex direction="column" w="100%">
                <Card data={data} />
            </Flex>
        </ScrollArea>
    );
}

function Desktop({ data }: GridProps) {
    return (
        <span>
            <Box
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '16px',
                }}
            >
                {data?.map((card) => (
                    <Box key={card.id}>
                        <EventCard data={card} />
                    </Box>
                ))}
            </Box>
        </span>
    );
}

interface FeaturedProps {
    title: string;
    shortUrl: string;
}

const Featured: React.FC<FeaturedProps> = ({ title, shortUrl }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['getRelated', { id: shortUrl }],
        queryFn: getRelated,
        retry: false,
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
};

Featured.displayName = 'Featured';
export default Featured;
