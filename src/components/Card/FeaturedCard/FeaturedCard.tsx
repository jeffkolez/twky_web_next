import { Box, Text } from '@mantine/core';
import Link from 'next/link';
import classes from './FeaturedCard.module.css';
import { ProfileCard } from '@/types';

interface FeaturedCardProps {
    data: ProfileCard;
}

function FeaturedCard({ data }: FeaturedCardProps) {
    return (
        <Link href={`/profile/${data.shortUrl}`} style={{ textDecoration: 'none' }}>
            <Box className={classes.container}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={data.media[0]}
                    alt={data.name}
                    className={classes.image}
                />
                <Text className={classes.name}>{data.name}</Text>
            </Box>
        </Link>
    );
}

FeaturedCard.displayName = 'FeaturedCard';
export default FeaturedCard;
