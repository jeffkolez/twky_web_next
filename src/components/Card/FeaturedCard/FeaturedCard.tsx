import { Box, Text } from '@mantine/core';
import Link from 'next/link';
import classes from './FeaturedCard.module.css';
import { ProfileCard } from '@/types';

export default ({ data }: { data: ProfileCard }) => (
    <Link href={`/profile/${data.shortUrl}`} style={{ textDecoration: 'none' }}>
        <Box className={classes.container}>
            <img 
                src={data.media[0]}
                alt={data.name}
                className={classes.image}
            />
            <Text className={classes.name}>{data.name}</Text>
        </Box>
    </Link>
);
