import { Container, Flex, ScrollArea, Skeleton, Text, Box } from '@mantine/core';
import { useQuery } from 'react-query';
import EventCard from '@/components/Card/EventCard/EventCard';

import classes from './SignificantDates.module.css';
import { getSignificantEvents } from '@/queries';
import { ProfileCard } from '@/types';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const splitData = (data: ProfileCard[] | undefined, firstRowCount: number) => {
    if (!data) return [[], []];
    return [data.slice(0, firstRowCount), data.slice(firstRowCount)];
};

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


export default ({ title }: { title: string }) => {
    const { date } = useParams<{ date?: string }>();
    const navigate = useNavigate();
    const { data, isLoading } = useQuery(['getSignificantEvents', date], () => getSignificantEvents(date), {
        onError: () => {
            navigate('/');
        }
    });
    const match = date?.match(/^([A-Za-z]+)(\d+)$/);
    const month = match ? match[1] : '';
    const day = match ? match[2] : '';
    return (
        <Container size="xl" mt="xl">
            {isLoading || !data ? <Skeleton w="100%" h="220px" /> : (
                <>
                    <Text className={classes.title}>{month} {day} {title}</Text>
                    <Mobile data={data} />
                    <Desktop data={data} />
                </>
            )}
        </Container>
    );
};
