import { Container, Flex, Text } from '@mantine/core';
import {
    FaFacebook,
    FaYoutube,
    FaTiktok,
    FaInstagram,
    FaStore,
} from 'react-icons/fa';
import Link from 'next/link';
import classes from './Footer.module.css';
import Image from 'next/image';

export default () => (
<footer>
    <Container size="xl" className={classes.footer} h={{ md: '325px' }}>
        <Flex direction={{ base: 'column', md: 'row' }} className={classes.inner} gap="20px">
            <Link href="/">
                <Image src="/logo.svg" alt="They Will Kill You Logo" width={306} height={47} />
            </Link>
            <Flex direction="column" align="center" mt="md">
                <Link href="/privacy-policy" className={classes.link}>
                    Privacy Policy
                </Link>
                <Link href="/terms-of-service" className={classes.link}>
                    Terms of Service
                </Link>
            </Flex>
            <Flex direction="column" gap={5}>
                <Text className={classes.followText} visibleFrom="md">Follow Us</Text>
                <Flex gap="md">
                    <Link href="https://shop.theywillkillyou.com" target="_blank">
                        <FaStore color="white" size="32px" />
                    </Link>
                    <Link href="https://www.facebook.com/theywillkillyoufb" target="_blank">
                        <FaFacebook color="white" size="32px" />
                    </Link>
                    <Link href="https://www.youtube.com/@theywillkillyou" target="_blank">
                        <FaYoutube color="white" size="32px" />
                    </Link>
                    <Link href="https://www.tiktok.com/@theywillkillyou_tt" target="_blank">
                        <FaTiktok color="white" size="32px" />
                    </Link>
                    <Link href="https://www.instagram.com/theywillkillyou" target="_blank">
                        <FaInstagram color="white" size="32px" />
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    </Container>
</footer>
);
