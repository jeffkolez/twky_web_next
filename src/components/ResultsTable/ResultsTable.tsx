import { Button, Center, Flex, Group, Image, Pagination, Space, Stack, Text } from '@mantine/core';

import Link from 'next/link';
import { useState } from 'react';
import { ProfileSearchResult } from '@/types';

import classes from './ResultsTable.module.css';

const ResultCard = ({ data }: { data: ProfileSearchResult }) => {
  const { id, name, nickname, type, shortUrl } = data;

  return (
    <Link href={`/profile/${shortUrl ?? id}`} style={{ textDecoration: 'none' }}>
      <Group style={{ border: '1px solid black' }}>
        <img src={data.media[0]} alt={data.name} style={{ objectFit: 'cover', width: '108px', height: '84px' }} />
        <Stack style={{ fontFamily: 'Inter' }}>
          <Text style={{ fontWeight: '600', fontSize: '16px' }}>
            {name}{nickname ? ` "${nickname}"` : ''}
          </Text>
          <Text>
            {type}
          </Text>
        </Stack>

      </Group>
    </Link>
  );
};

export default ({ data }: { data: ProfileSearchResult[] }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / 10);

  return (
    <Stack>
      {data
        .slice((page - 1) * 10, page * 10 - 1)
        .map((item: any) => <ResultCard data={item} />)
      }
      <Space h="xs" />
      <Flex direction="row" justify="space-between">
        <div className={classes.paginationText}>
          {page > 1 ? <button style={{ textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setPage(page - 1)}>BACK</button> : null}
        </div>
        <div className={classes.paginationText} style={{ textAlign: 'center', flex: 3 }}>PAGE {page} of {totalPages}</div>
        <div className={classes.paginationText} style={{ textAlign: 'right' }}>
          {page < totalPages ? <button style={{ textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setPage(page + 1)}>NEXT</button> : null}
        </div>
      </Flex>
    </Stack>
  );
};
