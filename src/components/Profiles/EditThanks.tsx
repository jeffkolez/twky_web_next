import { Container, Flex, Stack, Textarea, Text, Button, Image, Skeleton } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Profile } from '@/types';
import classes from './Edit.module.css';

import { Link } from 'react-router-dom';

export default ({ data }: { data: Profile }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { shortUrl } = location.state || {};
    const [comment, setComment] = useState('');

    return (
        <Container size="xl" mt="xl" p={{ base: '20px', md: 0 }}>
            <h1>Thanks!</h1>
            <Stack align="center">
                <div><h3>Your update is greatly appreciated!</h3></div>
                <div><h4><Link to={`/profile/${data.shortUrl}`} className={classes.profileButton}>Return to {data.name}</Link></h4></div>
            </Stack>
        </Container>
    );
};
