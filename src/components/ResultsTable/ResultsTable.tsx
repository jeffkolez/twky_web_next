import { Flex, Group, Space, Stack, Text } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ProfileSearchResult } from '@/types';

import classes from './ResultsTable.module.css';

interface ResultCardProps {
    data: ProfileSearchResult;
}

const ResultCard = ({ data }: ResultCardProps) => {
    const { id, name, nickname, type, shortUrl, media } = data;
    const href = `/profile/${shortUrl ?? id}`;
    const thumb = media?.[0];

    return (
        <Link href={href} style={{ textDecoration: 'none' }}>
            <Group style={{ border: '1px solid black', padding: 8 }}>
                {thumb ? (
                    <Image
                        src={thumb}
                        alt={name}
                        width={108}
                        height={84}
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <div
                        aria-hidden
                        style={{ width: 108, height: 84, background: '#eee' }}
                    />
                )}
                <Stack style={{ fontFamily: 'Inter' }}>
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>
                        {name}
                        {nickname ? ` "${nickname}"` : ''}
                    </Text>
                    <Text>{type}</Text>
                </Stack>
            </Group>
        </Link>
    );
};

interface ResultsTableProps {
    data: ProfileSearchResult[];
}

const PAGE_SIZE = 10;

const ResultsTable = ({ data }: ResultsTableProps) => {
    const [page, setPage] = useState(1);
    const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
    const start = (page - 1) * PAGE_SIZE;
    const end = page * PAGE_SIZE; // slice end is non-inclusive

    return (
        <Stack>
            {data.slice(start, end).map((item) => (
                <ResultCard key={item.id ?? item.shortUrl} data={item} />
            ))}

            <Space h="xs" />

            <Flex direction="row" justify="space-between" align="center">
                <div className={classes.paginationText}>
                    {page > 1 ? (
                        <button
                            type="button"
                            style={{
                                textDecoration: 'underline',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                        >
                            BACK
                        </button>
                    ) : null}
                </div>

                <div
                    className={classes.paginationText}
                    style={{ textAlign: 'center', flex: 3 }}
                >
                    PAGE {page} of {totalPages}
                </div>

                <div
                    className={classes.paginationText}
                    style={{ textAlign: 'right' }}
                >
                    {page < totalPages ? (
                        <button
                            type="button"
                            style={{
                                textDecoration: 'underline',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                            onClick={() =>
                                setPage((p) => Math.min(totalPages, p + 1))
                            }
                        >
                            NEXT
                        </button>
                    ) : null}
                </div>
            </Flex>
        </Stack>
    );
};

ResultsTable.displayName = 'ResultsTable';
export default ResultsTable;
