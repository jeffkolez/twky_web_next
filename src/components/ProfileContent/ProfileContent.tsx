import { Container, Flex, Stack, Text } from "@mantine/core";
import classes from "./ProfileContent.module.css";
import type { Profile } from "@/types";
import EditButton from "./EditButton";
import ProfileEmailListSignup from "@/components/Card/Email/ProfileEmailListSignup";
import RichTextViewer from "@/components/RichTextViewer/RichTextViewer";

export default function ProfileContent({ data }: { data: Profile }) {
    return (
        <Container size="xl" mt="xl" p={{ base: "20px", md: 0 }}>
            <Flex direction="row" justify="space-between">
                <Stack maw="940px" style={{ flex: 10 }}>
                    <Flex justify="space-between" align="center">
                        <Text className={classes.sectionTitle}>bio</Text>
                        <EditButton shortUrl={data.shortUrl} />
                    </Flex>

                    <div className={classes.sectionContent}>
                        <RichTextViewer richText={data.bio} />
                    </div>

                    <ProfileEmailListSignup />

                    <Text className={classes.sectionTitle}>murder story</Text>

                    <div className={classes.sectionContent}>
                        <RichTextViewer richText={data.murderStory} />
                    </div>
                </Stack>
            </Flex>
        </Container>
    );
}
