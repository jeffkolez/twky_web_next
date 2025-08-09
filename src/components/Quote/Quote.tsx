import { Button, Container, Image, SimpleGrid, Skeleton, Stack, Text, Box } from '@mantine/core';

import { FaQuoteLeft } from 'react-icons/fa';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query'
import classes from './Quote.module.css';
import dateFormat from 'dateformat';

import { getQuote } from '@/queries';

export default () => {
    const { data, isLoading } = useQuery({
        queryKey: ['getQuote'],
        queryFn: getQuote
    });

    return (
        <Container size="xl" h={{ md: '340px' }} pt="48px">
            {isLoading || !data ? <Skeleton w="100%" h="292px" /> : (
            <>
                <SimpleGrid cols={3} spacing="md" visibleFrom="md">
                    <Link href={`/profile/${data.shortUrl}`}>
                        <Image src={data.media?.[0]} alt={data.name} h="292px" style={{ maxHeight: '292px', objectFit: 'contain', objectPosition: 'top', borderRadius: '12px' }} />
                    </Link>
                    <Stack justify="space-between">
                        <FaQuoteLeft color="red" size="40" />
                            <Text className={classes.quoteText}>
                                {data.quote}
                            </Text>
                            <Text className={classes.nameText}>
                                {`${data.name}
                                    ${dateFormat(data.birth, 'yyyy')}${data.death ? - dateFormat(data.death, 'yyyy') : ''}
                                `}
                            </Text>
                        <Link href={`/profile/${data.shortUrl}`}>
                            <Button variant="default" w="125px">View Profile</Button>
                        </Link>
                    </Stack>
                    <Link href={`https://shop.theywillkillyou.com/collections/accessories/products/they-will-kill-you-ebook`}>
                        <Box>
                            <Image 
                                src="https://twky.nyc3.digitaloceanspaces.com/twky/fff8c085-f4ae-4bea-b39a-d0b5961b5d3d/Screenshot2024-02-16at7.10.21PM_1024x1024@2x.png" 
                                alt="Ad" 
                                h="292px" 
                                style={{ 
                                    maxHeight: '292px', 
                                    objectFit: 'contain', 
                                    objectPosition: 'top', 
                                    borderRadius: '12px' 
                                }} 
                            />
                            <center>
                                <Text mt="md"><strong>They Will Kill You E-Book: A Collection of Stories</strong></Text>
                            </center>
                        </Box>
                    </Link>
                </SimpleGrid>
                <Stack hiddenFrom="md">
                    <FaQuoteLeft color="red" size="40" />
                    <Text className={classes.quoteText}>
                        {data.quote}
                    </Text>
                    <Text className={classes.nameText} component="p">
                        <Text component="span">{data.name} </Text>
                        <Text component="span" className={classes.years}>
                        {dateFormat(data.birth, "yyyy")}
                        {data.death ? ` - ${dateFormat(data.death, "yyyy")}` : ""}
                        </Text>
                    </Text>
                    <Link href={`/profile/${data.shortUrl}`}>
                        <Image src={data.media?.[0]} alt={data.name} h="292px" fit="cover" style={{ objectPosition: 'top', borderRadius: '12px' }} />
                    </Link>
                    <Link href={`/profile/${data.shortUrl}`} className={classes.profileButton}>
                        <Button variant="default" w="100%">View Profile</Button>
                    </Link>
                    <Link href={`https://shop.theywillkillyou.com/collections/accessories/products/they-will-kill-you-ebook`}>
                        <Box>
                            <Image 
                                src="https://twky.nyc3.digitaloceanspaces.com/twky/fff8c085-f4ae-4bea-b39a-d0b5961b5d3d/Screenshot2024-02-16at7.10.21PM_1024x1024@2x.png" 
                                alt="Ad" 
                                h="292px" 
                                style={{ 
                                    maxHeight: '292px', 
                                    objectFit: 'contain', 
                                    objectPosition: 'top', 
                                    borderRadius: '12px' 
                                }} 
                            />
                            <center>
                                <Text mt="md"><strong>They Will Kill You E-Book: A Collection of Stories</strong></Text>
                            </center>
                        </Box>
                    </Link>
                </Stack>
            </>
            )}
        </Container>
    );
};
