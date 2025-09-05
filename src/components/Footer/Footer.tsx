"use client";

import { Container, Flex, Text } from "@mantine/core";
import {
    FaFacebook, FaYoutube, FaTiktok, FaInstagram, FaStore,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import classes from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={classes.footer}>
        <Container size="xl" className={classes.inner}>
            <Link href="/">
                <Image src="/twky-logo-long-white-for-blog.png" alt="They Will Kill You Logo" width={291} height={80} />
            </Link>

            <Flex direction="column" align="center" mt="md">
                <Link href="/privacy-policy" className={classes.link}>Privacy Policy</Link>
                <Link href="/terms-of-service" className={classes.link}>Terms of Service</Link>
            </Flex>

            <Flex direction="column" gap={5} align="end">
                <Text className={classes.followText} visibleFrom="md">Follow Us</Text>
                <Flex gap="md" className={classes.icons}>
                    <Link href="https://shop.theywillkillyou.com" target="_blank" aria-label="Shop">
                        <FaStore />
                    </Link>
                    <Link href="https://www.facebook.com/theywillkillyoufb" target="_blank" aria-label="Facebook">
                        <FaFacebook />
                    </Link>
                    <Link href="https://www.youtube.com/@theywillkillyou" target="_blank" aria-label="YouTube">
                        <FaYoutube />
                    </Link>
                    <Link href="https://www.tiktok.com/@theywillkillyou_tt" target="_blank" aria-label="TikTok">
                        <FaTiktok />
                    </Link>
                    <Link href="https://www.instagram.com/theywillkillyou" target="_blank" aria-label="Instagram">
                        <FaInstagram />
                    </Link>
                </Flex>
            </Flex>
        </Container>
        </footer>
    );
}
