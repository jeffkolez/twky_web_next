import { Container, Grid, Skeleton, Stack, Text, Space, Flex } from '@mantine/core';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import VerticalAd from '@/components/Ads/VerticalAd';
import ResultsTable from '@/components/ResultsTable/ResultsTable';
import { search } from '@/queries';

import classes from './SearchResults.module.css';

export default () => {
  const { search: searchText } = useParams();
  const { isLoading, data } = useQuery([`search-${searchText}`, { w: searchText }], search);

  return isLoading || !data ? <Skeleton /> : (
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
            <VerticalAd />
            <Space h="xl" />
            <VerticalAd />
          </Flex>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
