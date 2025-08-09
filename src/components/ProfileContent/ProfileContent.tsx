import { Container, Flex, Group, Skeleton, Space, Stack, Text } from '@mantine/core';

import classes from './ProfileContent.module.css';
import { Profile } from '@/types';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RichTextViewer from '@/components/RichTextViewer/RichTextViewer';
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '@/components/Effects/ScrollToTop';
import ProfileEmailListSignup from '@/components/Card/Email/ProfileEmailListSignup';

const handleEditClick = async (shortUrl: string, navigate: any) => {
    navigate('/edit-bio', { state: { shortUrl } });
};


const ProfileContent = ({ data, isLoading }: { data?: Profile, isLoading: boolean }) => {
    const navigate = useNavigate();
    return (
        <Container size="xl" mt="xl" p={{ base: '20px', md: 0 }}>
            <ScrollToTop />
            <Flex direction="row" justify="space-between">
                {isLoading || !data ? <Skeleton w="940px" /> : (
                    <Stack maw="940px" style={{ flex: 10 }}>
                        <Flex justify="space-between" align="center">
                            <Text className={classes.sectionTitle}>
                                bio
                            </Text>
                            <FontAwesomeIcon 
                                icon={faEdit} 
                                style={{ fontSize: '24px', cursor: 'pointer' }}
                                onClick={() => handleEditClick(data.shortUrl, navigate)}
                            />
                        </Flex>
                        <div className={classes.sectionContent}>
                            <RichTextViewer richText={data.bio} />
                        </div>
                        <ProfileEmailListSignup />
                        <Text className={classes.sectionTitle}>
                            murder story
                        </Text>
                        <div className={classes.sectionContent}>
                            <RichTextViewer richText={data.murderStory} />
                        </div>

                    </Stack>
                )}
            </Flex>
        </Container>
    );
};

export default ProfileContent;