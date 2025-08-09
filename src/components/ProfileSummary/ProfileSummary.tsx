import { Container, Grid, SimpleGrid, Skeleton, Stack, Text, Image } from '@mantine/core';
import { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import moment from 'moment';
import classes from './ProfileSummary.module.css';
import { Profile } from '@/types';

export default function ProfileSummary({ data, isLoading }: { data?: Profile, isLoading: boolean }) {
    const [currentImage, setCurrentImage] = useState(data?.media[0] || '');

    useEffect(() => {
        if (data?.media && data.media.length > 0) {
            setCurrentImage(data.media[0]);
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    let formattedBirthDate = moment.utc(data.birth).format('MMMM Do, YYYY');
    if (formattedBirthDate == 'Invalid date') {
        formattedBirthDate = '';
    }
    //const formattedBirthDate = data.birth ? moment.utc(data.birth).format('MMMM Do, YYYY') : null;
    const formattedDeathDate = data.death ? moment.utc(data.death).format('MMMM Do, YYYY') : null;

    const hasBirth = !!data.birth && data.birth.trim() !== '';
    const hasDeath = !!data.death && data.death.trim() !== '';

    const formattedBirth = hasBirth ? dateFormat(data.birth, 'yyyy') : '';
    const formattedDeath = hasDeath ? dateFormat(data.death, 'yyyy') : '';

    let dateDisplay = '';
    if (hasBirth && hasDeath) {
        dateDisplay = `${formattedBirth} - ${formattedDeath}`;
    } else if (hasBirth) {
        dateDisplay = 'b: ' + formattedBirth;
    } else if (hasDeath) {
        dateDisplay = 'd: ' + formattedDeath;
    }

    return (
        <Container size="xl" mt={{ base: 0, md: 'xl' }} p={0}>
            {isLoading || !data ? <Skeleton w="100%" h="331px" /> : (
            <>
                <Stack hiddenFrom="md">
                    <Image src={currentImage} alt={data.name} /> {/* Display current main image */}
                    <Stack style={{ backgroundColor: 'black', color: 'white', position: 'relative', top: '-40px', width: 'calc(100% - 40px)' }} p="20px" m="0 20px">
                        <Text>{dateDisplay}</Text>
                        <Text className={classes.name}>{data.name}</Text>
                    </Stack>
                    <Stack style={{ backgroundColor: '#EEE' }}>
                        <Text className={classes.title}>Summary</Text>
                        <div className={classes.dataColumn}>
                            <div className={classes.dataContainer}><Text>Name: </Text><b>{data.name}</b></div>
                            <div className={classes.dataContainer}><Text>Nickname: </Text><b>{data.nickname}</b></div>
                            <div className={classes.dataContainer}><Text>Years Active: </Text><b>{data.date}</b></div>
                            {formattedBirthDate != '' ? <div className={classes.dataContainer}><Text>Birth: </Text><b>{formattedBirthDate}</b></div>  : null}
                            <div className={classes.dataContainer}><Text>Status: </Text><b>{data.status}</b></div>
                            <div className={classes.dataContainer}><Text>Class: </Text><b>{data.type}</b></div>
                            <div className={classes.dataContainer}><Text>Victims: </Text><b>{data.victims}</b></div>
                            <div className={classes.dataContainer}><Text>Method: </Text><b>{data.method}</b></div>
                            {data.death ? <div className={classes.dataContainer}><Text>Death: </Text><b>{formattedDeathDate}</b></div> : null}
                            <div className={classes.dataContainer}><Text>Nationality: </Text><b>{data.nationality}</b></div>
                        </div>
                    </Stack>
                </Stack>

                <Grid visibleFrom="md" maw="inherit">
                    <Grid.Col span={4} style={{ padding: 0 }}>
                        <Image src={currentImage} alt={data.name} />
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Stack>
                            <Grid>
                                <Grid.Col span={6} style={{ backgroundColor: 'black', color: 'white' }}>
                                    <Text>{dateDisplay}</Text>
                                    <Text className={classes.name}>{data.name}</Text>
                                </Grid.Col>
                            </Grid>
                            <Grid>
                                <Grid.Col span={12} style={{ backgroundColor: '#EEE' }}>
                                    <Text className={classes.title}>Summary: {data.type}</Text>
                                    <SimpleGrid cols={2}>
                                        <div className={classes.dataColumn}>
                                            <div className={classes.dataContainer}><Text>Name: </Text><b>{data.name}</b></div>
                                            {data.nickname ? <div className={classes.dataContainer}><Text>Nickname: </Text><b>{data.nickname}</b></div> : null}
                                            <div className={classes.dataContainer}><Text>Status: </Text><b>{data.status}</b></div>
                                            <div className={classes.dataContainer}><Text>Victims: </Text><b>{data.victims}</b></div>
                                            <div className={classes.dataContainer}><Text>Method: </Text><b>{data.method}</b></div>
                                            <div className={classes.dataContainer}><Text>Nationality: </Text><b>{data.nationality}</b></div>
                                        </div>
                                        <div className={classes.dataColumn}>
                                            <div className={classes.dataContainer}><Text>Birth: </Text><b>{formattedBirthDate}</b></div>
                                            {data.death ? <div className={classes.dataContainer}><Text>Death: </Text><b>{formattedDeathDate}</b></div> : null}
                                            {data.date ? <div className={classes.dataContainer}><Text>Years Active: </Text><b>{data.date}</b></div> : null}
                                            {data.convicted_date ? <div className={classes.dataContainer}><Text>Date Convicted: </Text><b>{data.convicted_date}</b></div> : null}
                                        </div>
                                    </SimpleGrid>
                                </Grid.Col>
                                <Stack align="center" mt="xl">
                                    <SimpleGrid cols={5} spacing="sm">
                                        {data.media.map((url, index) => (
                                            url !== currentImage && (
                                                <Image
                                                    key={index}
                                                    src={url}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    onClick={() => setCurrentImage(url)}
                                                    style={{
                                                        cursor: 'pointer',
                                                        borderRadius: '4px',
                                                        margin: '10px',
                                                        width: '100px'
                                                    }}
                                                />
                                            )
                                        ))}
                                    </SimpleGrid>
                                </Stack>
                            </Grid>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </>
            )}
        </Container>
    );
};
