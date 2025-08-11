"use client";

import { Button, Container, Flex, Input, Text } from '@mantine/core';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import classes from './Search.module.css';

const Search: React.FC = () => {
    const [search, setSearch] = useState('');
    const router = useRouter();

    return (
        <section className={classes.fullWidth}>
        <Container size="xl" className={classes.searchContainer}>
            <Text className={`${classes.searchTitle} ${classes.withOffset}`}>
            Who are you looking for?
            </Text>
            <Flex className={classes.withOffset}>
            <Input
                radius={0}
                placeholder="Type Something"
                w="calc(100% - 142px)"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    router.push(`/search?q=${encodeURIComponent(search)}`);
                }
                }}
            />
            <Button component={Link} href={`/search?q=${encodeURIComponent(search)}`} w="142px" color="#F00">
                Search
            </Button>
            </Flex>
        </Container>
        </section>
    );
};

Search.displayName = 'Search';
export default Search;
