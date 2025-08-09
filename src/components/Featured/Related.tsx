"use client";

import { Container, Flex, Skeleton, Text, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import EventCard from '@/components/Card/FeaturedCard/FeaturedCard';

import classes from './Featured.module.css';
import { getRelated } from '@/queries';

const Featured = ({ title, shortUrl }: { title: string; shortUrl: string }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['getRelated', { id: shortUrl }],
        queryFn: getRelated,
        retry: false,
    });

    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <Container size="xl" mt="xl">
            {isLoading || !data ? (
                <Skeleton w="100%" h="220px" />
            ) : (
                <>
                    <Text className={classes.title}>{title}</Text>
                    {isMobile ? (
                        <Flex direction="column" gap="16px" className={classes.mobileWrapper}>
                            {data.map((card) => (
                                <Box key={card.id} className={classes.cardWrapper}>
                                    <EventCard data={card} />
                                </Box>
                            ))}
                        </Flex>
                    ) : (
                        <Box
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                gap: '16px',
                            }}
                        >
                            {data.map((card) => (
                                <Box key={card.id}>
                                    <EventCard data={card} />
                                </Box>
                            ))}
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
};

export default Featured;
