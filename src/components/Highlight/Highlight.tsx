import { Button, Container, Flex, Group, Image, SimpleGrid, Skeleton, Stack, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import Link from 'next/link';
import dateFormat from 'dateformat';

import classes from './Highlight.module.css';
import { getHighlights } from '@/queries';
import { ProfileCard } from '@/types';
import SearchAuto from '@/components/SearchAuto/SearchAuto';

interface HighlightProps {
    search?: string;
}

export default async function Highlight({ search = '' }: HighlightProps) {
    const data: ProfileCard[] = await getHighlights();
    const slides = data.slice(0, 4).map((profile) => (
        <Carousel.Slide key={profile.id}>
            {profile.media[0] ? (
                <Link href={`/profile/${profile.shortUrl}`}>
                    <Image
                        src={profile.media[0]}
                        alt={profile.name}
                        height="439px"
                        className={classes.roundedBorder}
                    />
                    <Flex
                        direction="row"
                        justify="space-between"
                        className={classes.pictureData}
                    >
                        <Stack gap={1}>
                            <Text className={classes.years}>
                                {dateFormat(profile.birth, 'yyyy')}
                                {profile.death
                                    ? ` - ${dateFormat(profile.death, 'yyyy')}`
                                    : ''}
                            </Text>
                            <Text className={classes.name}>{profile.name}</Text>
                        </Stack>
                    </Flex>
                </Link>
            ) : (
                <Skeleton h="100%" w="100%" />
            )}
        </Carousel.Slide>
    ));

    return (
        <section className={classes.highlight}>
            <Container size="xl">
                <SimpleGrid
                    cols={{ base: 1, md: 2 }}
                    spacing="md"
                    className={classes.withOffset}
                >
                    <Stack justify="flex-end" h={{ md: 439 }}>
                        <Text className={classes.title}>
                            The largest archive of murderers on the internet
                        </Text>
                        <Group hiddenFrom="md">
                            <SearchAuto
                                onOptionSubmit={(value: string) =>
                                    `/profile/${value}`
                                }
                                onChange={() => {}}
                                onKeyDown={() => {}}
                            />
                        </Group>
                        <Group visibleFrom="md">
                            <SearchAuto
                                onOptionSubmit={(value: string) =>
                                    `/profile/${value}`
                                }
                                onChange={() => {}}
                                onKeyDown={() => {}}
                            />
                            <Link href={`/search/${search}`}>
                                <Button color="#F00">Search</Button>
                            </Link>
                        </Group>
                    </Stack>
                    <Group visibleFrom="md">
                        {!data.length ? (
                            <Skeleton w="100%" h="439px" />
                        ) : (
                            <Carousel
                                classNames={{
                                    root: classes.carousel,
                                    indicators: classes.indicators,
                                    indicator: classes.indicator,
                                }}
                                height="439px"
                                withIndicators
                            >
                                {slides}
                            </Carousel>
                        )}
                    </Group>
                </SimpleGrid>
            </Container>
        </section>
    );
}
