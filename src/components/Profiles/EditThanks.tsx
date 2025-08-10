import { Container, Flex, Stack, Textarea, Text, Button, Image, Skeleton } from '@mantine/core';
import { Profile } from '@/types';
import classes from './Edit.module.css';

import Link from 'next/link';

export default ({ data }: { data: Profile }) => {

    return (
        <Container size="xl" mt="xl" p={{ base: '20px', md: 0 }}>
            <h1>Thanks!</h1>
            <Stack align="center">
                <div><h3>Your update is greatly appreciated!</h3></div>
                <div><h4><Link href={`/profile/${data.shortUrl}`} className={classes.profileButton}>Return to {data.name}</Link></h4></div>
            </Stack>
        </Container>
    );
};
