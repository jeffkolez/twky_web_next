import { Button, Container, Flex, Group, Image, Input, SimpleGrid, Skeleton, Stack, Text } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from 'react-query';
import classes from './Highlight.module.css';

import { getHighlights } from '@/queries';
import { ProfileCard } from '@/types';
import SearchAuto from '@/components/SearchAuto/SearchAuto';
import dateFormat from 'dateformat';

export default () => {
  const { data, isLoading } = useQuery('getHighlights', getHighlights);
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const slides = data?.slice(0, 4).map((profile: ProfileCard) => (
    <Carousel.Slide key={profile.id}>
      {profile.media[0] ? (
        <Link to={`/profile/${profile.shortUrl}`}>
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
              <SearchAuto onOptionSubmit={(value: string) => navigate(`/profile/${value}`)} onChange={setSearch} onKeyDown={() => navigate(`/search/${search}`)} />
            </Group>
            <Group visibleFrom="md">
              <SearchAuto onOptionSubmit={(value: string) => navigate(`/profile/${value}`)} onChange={setSearch} onKeyDown={() => navigate(`/search/${search}`)} />
              <Link to={`/search/${search}`}>
                <Button color="#F00">Search</Button>
              </Link>
            </Group>
          </Stack>
          <Group visibleFrom="md">
            {isLoading || !data ? <Skeleton w="100%" h="439px" /> :
              (
                <Carousel
                  loop
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
