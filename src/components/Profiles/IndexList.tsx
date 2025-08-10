"use client";

import { Container } from '@mantine/core';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import classes from './IndexList.module.css';

const Cta = () => {
    const alphabet = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
    const { letter: currentLetter } = useParams<{ letter: string }>();
    const currentIndex = alphabet.indexOf(currentLetter?.toUpperCase() || 'A');
    const prevLetter = alphabet[(currentIndex - 1 + alphabet.length) % alphabet.length];
    const nextLetter = alphabet[(currentIndex + 1) % alphabet.length];

    return (
        <Container size="xl" className={classes.container}>
            <h3>Search Killers By Name</h3>
            <div className={classes.navigationContainer}>
                {currentLetter && (
                    <Link href={`/list/${prevLetter}`} className={classes.navigationLink}>
                        &#8592;
                    </Link>
                )}
                <div className={classes.alphabetContainer}>
                    {alphabet.map((letter) => (
                        <Link
                            href={`/list/${letter}`}
                            key={letter}
                            className={`${classes.alphabetLink} ${
                                currentLetter === letter ? classes.active : ''
                            }`}
                        >
                            {letter}
                        </Link>
                    ))}
                </div>
                {currentLetter && (
                    <Link href={`/list/${nextLetter}`} className={classes.navigationLink}>
                        &#8594;
                    </Link>
                )}
            </div>
        </Container>
  );
};

export default Cta;