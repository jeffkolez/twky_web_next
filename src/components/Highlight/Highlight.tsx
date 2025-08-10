import { Button, Container, Flex, Group, Image, Input, SimpleGrid, Skeleton, Stack, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import classes from './Highlight.module.css';

import { getHighlights } from '@/queries';
import { ProfileCard } from '@/types';
import SearchAuto from '@/components/SearchAuto/SearchAuto';
import dateFormat from 'dateformat';

export default () => {
  const { data, isLoading } = useQuery({
    queryKey: ['getHighlights'],
    queryFn: getHighlights
  });
  const router = useRouter();

  const [search, setSearch] = useState('');
  const slides = data?.slice(0, 4).map((profile: ProfileCard) => (
    <Carousel.Slide key={profile.id}>
      {profile.media[0] ? (
        <Link href={`/profile/${profile.shortUrl}`}>
          <Image src={profile.media[0]} alt={profile.name} height="439px" className={classes.roundedBorder} />
          <Flex direction="row" justify="space-between" className={classes.pictureData}>
            <Stack gap={1}>
              <Text className={classes.years}>{dateFormat(profile.birth, 'yyyy')}{profile.death ? - dateFormat(profile.birth, 'yyyy') : ''}</Text>
              <Text className={classes.name}>{profile.name}</Text>
            </Stack>
          </Flex>
        </Link>
      ) : <Skeleton h="100%" w="100%" />}
    </Carousel.Slide>
  ));

  return (
    <section className={classes.highlight}>
      <Container size="xl">
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md" className={classes.withOffset}>
          <Stack justify="flex-end" h={{ md: 439 }}>
            <Text className={classes.title}>
              The largest archive of murderers on the internet
            </Text>
            <Group hiddenFrom="md">
              <SearchAuto onOptionSubmit={(value: string) => router.push(`/profile/${value}`)} onChange={setSearch} onKeyDown={() => router.push(`/search/${search}`)} />
            </Group>
            <Group visibleFrom="md">
              <SearchAuto onOptionSubmit={(value: string) => router.push(`/profile/${value}`)} onChange={setSearch} onKeyDown={() => router.push(`/search/${search}`)} />
              <Link href={`/search/${search}`}>
                <Button color="#F00">Search</Button>
              </Link>
            </Group>
          </Stack>
          <Group visibleFrom="md">
            {isLoading || !data ? <Skeleton w="100%" h="439px" /> :
              (
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
              )
            }
          </Group>
        </SimpleGrid>
      </Container>
    </section>
  );
};
