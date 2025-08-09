"use client";

import { Group, Burger, Flex } from '@mantine/core';
import {
  FaFacebook,
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaStore,
} from 'react-icons/fa';
import { useState } from 'react';
import classes from './Header.module.css';
import SearchAuto from '@/components/SearchAuto/SearchAuto';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [opened, setOpened] = useState(false);
    const handleBurgerClick = () => setOpened((prev) => !prev);

    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                <div className={classes.topRow}>
                    <Link href="/" className={classes.logo}>
                        <Image src="/logo.svg" alt="They Will Kill You Logo" width={306} height={47} />
                    </Link>
                    <Burger
                        opened={opened}
                        onClick={handleBurgerClick}
                        size="sm"
                        className={classes.burger}
                        color="white"
                    />
                </div>
                <div className={classes['auto-wrapper']}>
                    <SearchAuto
                        onOptionSubmit={(value: string) => router.push(`/profile/${value}`)}
                        onChange={setSearch}
                        onKeyDown={() => router.push(`/search/${search}`)}
                    />
                </div>
                <Group gap={5} visibleFrom="md">
                    <Flex gap="md">
                        <Link href="https://shop.theywillkillyou.com" target="_blank">
                            <FaStore color="white" size="24px" />
                        </Link>
                        <Link href="https://www.facebook.com/theywillkillyoufb" target="_blank">
                            <FaFacebook color="white" size="24px" />
                        </Link>
                        <Link href="https://www.youtube.com/@theywillkillyou" target="_blank">
                            <FaYoutube color="white" size="24px" />
                        </Link>
                        <Link href="https://www.tiktok.com/@theywillkillyou_tt" target="_blank">
                            <FaTiktok color="white" size="24px" />
                        </Link>
                        <Link href="https://www.instagram.com/theywillkillyou" target="_blank">
                            <FaInstagram color="white" size="24px" />
                        </Link>
                    </Flex>
                </Group>
                <div className={`${classes.mobileMenu} ${opened ? classes.open : ''}`}>
                    <Flex direction="column" gap="md">
                        <Link href="https://shop.theywillkillyou.com" target="_blank">
                            <FaStore color="white" size="24px" />
                        </Link>
                        <Link href="https://www.facebook.com/theywillkillyoufb" target="_blank">
                            <FaFacebook color="white" size="24px" />
                        </Link>
                        <Link href="https://www.youtube.com/@theywillkillyou" target="_blank">
                            <FaYoutube color="white" size="24px" />
                        </Link>
                        <Link href="https://www.tiktok.com/@theywillkillyou_tt" target="_blank">
                            <FaTiktok color="white" size="24px" />
                        </Link>
                        <Link href="https://www.instagram.com/theywillkillyou" target="_blank">
                            <FaInstagram color="white" size="24px" />
                        </Link>
                    </Flex>
                </div>
            </div>
        </header>
    );
};