"use client";

import { 
    Container, 
    Grid, 
    GridCol, 
    SimpleGrid, 
    Skeleton, 
    Stack, 
    Text, 
    Image 
} from "@mantine/core";
import dateFormat from "dateformat";
import classes from "./ProfileSummary.module.css";
import { Profile } from "@/types";

export default function ProfileSummary({ data, isLoading }: { data?: Profile; isLoading: boolean }) {
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    const formattedBirthDate = data.birth ? dateFormat(new Date(data.birth), "mmmm dd, yyyy") : "";
    const formattedDeathDate = data.death ? dateFormat(new Date(data.death), "mmmm dd, yyyy") : null;

    const hasBirth = !!data.birth && data.birth.trim() !== "";
    const hasDeath = !!data.death && data.death.trim() !== "";

    const formattedBirth = hasBirth ? dateFormat(data.birth, "yyyy") : "";
    const formattedDeath = hasDeath ? dateFormat(data.death, "yyyy") : "";

    let dateDisplay = "";
    if (hasBirth && hasDeath) {
        dateDisplay = `${formattedBirth} - ${formattedDeath}`;
    } else if (hasBirth) {
        dateDisplay = "b: " + formattedBirth;
    } else if (hasDeath) {
        dateDisplay = "d: " + formattedDeath;
    }

    return (
        <Container size="xl" mt={{ base: 0, md: "xl" }} p={0}>
            {isLoading || !data ? (
                <Skeleton w="100%" h="331px" />
            ) : (
                <>
                    {/* Mobile layout */}
                    <Stack hiddenFrom="md">
                        <Image src={data.media?.[0] ?? ""} alt={data.name} />
                        <Stack
                            style={{
                                backgroundColor: "black",
                                color: "white",
                                position: "relative",
                                top: "-40px",
                                width: "calc(100% - 40px)",
                            }}
                            p="20px"
                            m="0 20px"
                        >
                            <Text>{dateDisplay}</Text>
                            <Text className={classes.name}>{data.name}</Text>
                        </Stack>
                        <Stack style={{ backgroundColor: "#EEE" }}>
                            <Text className={classes.title}>Summary</Text>
                            <div className={classes.dataColumn}>
                                <div className={classes.dataContainer}>
                                    <Text>Name: </Text>
                                    <b>{data.name}</b>
                                </div>
                                {data.nickname && (
                                    <div className={classes.dataContainer}>
                                        <Text>Nickname: </Text>
                                        <b>{data.nickname}</b>
                                    </div>
                                )}
                                {data.date && (
                                    <div className={classes.dataContainer}>
                                        <Text>Years Active: </Text>
                                        <b>{data.date}</b>
                                    </div>
                                )}
                                {formattedBirthDate && (
                                    <div className={classes.dataContainer}>
                                        <Text>Birth: </Text>
                                        <b>{formattedBirthDate}</b>
                                    </div>
                                )}
                                <div className={classes.dataContainer}>
                                    <Text>Status: </Text>
                                    <b>{data.status}</b>
                                </div>
                                <div className={classes.dataContainer}>
                                    <Text>Class: </Text>
                                    <b>{data.type}</b>
                                </div>
                                <div className={classes.dataContainer}>
                                    <Text>Victims: </Text>
                                    <b>{data.victims}</b>
                                </div>
                                <div className={classes.dataContainer}>
                                    <Text>Method: </Text>
                                    <b>{data.method}</b>
                                </div>
                                {formattedDeathDate && (
                                    <div className={classes.dataContainer}>
                                        <Text>Death: </Text>
                                        <b>{formattedDeathDate}</b>
                                    </div>
                                )}
                                <div className={classes.dataContainer}>
                                    <Text>Nationality: </Text>
                                    <b>{data.nationality}</b>
                                </div>
                            </div>
                        </Stack>
                    </Stack>

                    {/* Desktop layout */}
                    <Grid visibleFrom="md" maw="inherit">
                        <GridCol span={4} style={{ padding: 0 }}>
                            <Image src={data.media?.[0] ?? ""} alt={data.name} />
                        </GridCol>
                        <GridCol span={8}>
                            <Stack>
                                <Grid>
                                    <GridCol span={6} style={{ backgroundColor: "black", color: "white" }}>
                                        <Text>{dateDisplay}</Text>
                                        <Text className={classes.name}>{data.name}</Text>
                                    </GridCol>
                                </Grid>
                                <Grid>
                                    <GridCol span={12} style={{ backgroundColor: "#EEE" }}>
                                        <Text className={classes.title}>Summary: {data.type}</Text>
                                        <SimpleGrid cols={2}>
                                            <div className={classes.dataColumn}>
                                                <div className={classes.dataContainer}>
                                                    <Text>Name: </Text>
                                                    <b>{data.name}</b>
                                                </div>
                                                {data.nickname && (
                                                    <div className={classes.dataContainer}>
                                                        <Text>Nickname: </Text>
                                                        <b>{data.nickname}</b>
                                                    </div>
                                                )}
                                                <div className={classes.dataContainer}>
                                                    <Text>Status: </Text>
                                                    <b>{data.status}</b>
                                                </div>
                                                <div className={classes.dataContainer}>
                                                    <Text>Victims: </Text>
                                                    <b>{data.victims}</b>
                                                </div>
                                                <div className={classes.dataContainer}>
                                                    <Text>Method: </Text>
                                                    <b>{data.method}</b>
                                                </div>
                                                <div className={classes.dataContainer}>
                                                    <Text>Nationality: </Text>
                                                    <b>{data.nationality}</b>
                                                </div>
                                            </div>
                                            <div className={classes.dataColumn}>
                                                {formattedBirthDate && (
                                                    <div className={classes.dataContainer}>
                                                        <Text>Birth: </Text>
                                                        <b>{formattedBirthDate}</b>
                                                    </div>
                                                )}
                                                {formattedDeathDate && (
                                                    <div className={classes.dataContainer}>
                                                        <Text>Death: </Text>
                                                        <b>{formattedDeathDate}</b>
                                                    </div>
                                                )}
                                                {data.date && (
                                                    <div className={classes.dataContainer}>
                                                        <Text>Years Active: </Text>
                                                        <b>{data.date}</b>
                                                    </div>
                                                )}
                                                {data.convicted_date && (
                                                    <div className={classes.dataContainer}>
                                                        <Text>Date Convicted: </Text>
                                                        <b>{data.convicted_date}</b>
                                                    </div>
                                                )}
                                            </div>
                                        </SimpleGrid>
                                    </GridCol>
                                </Grid>
                            </Stack>
                        </GridCol>
                    </Grid>
                </>
            )}
        </Container>
    );
}
