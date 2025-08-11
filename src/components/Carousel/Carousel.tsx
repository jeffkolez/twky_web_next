"use client";

import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Flex, Image as MantineImage, Modal } from '@mantine/core';
import { useDisclosure, useWindowEvent } from '@mantine/hooks';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import NextImage from 'next/image';
import { Thumb } from './CarouselThumbsButton';

type PropType = {
    name: string;
    slides: string[];
};

const Carousel: React.FC<PropType> = ({ name, slides }) => {
    const [opened, { open, close }] = useDisclosure(false);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
    });

    const onThumbClick = useCallback(
        (index: number) => {
            if (!emblaMainApi) return;
            emblaMainApi.scrollTo(index);
        },
        [emblaMainApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        const snap = emblaMainApi.selectedScrollSnap();
        setSelectedIndex(snap);
        emblaThumbsApi.scrollTo(snap);
    }, [emblaMainApi, emblaThumbsApi]);

    useEffect(() => {
        if (!emblaMainApi) return;
        onSelect();
        emblaMainApi.on('select', onSelect);
        emblaMainApi.on('reInit', onSelect);
    }, [emblaMainApi, onSelect]);

    function handleLeft() {
        const newIndex = Math.max(selectedIndex - 1, 0);
        onThumbClick(newIndex);
    }

    function handleRight() {
        const newIndex = Math.min(selectedIndex + 1, slides.length - 1);
        onThumbClick(newIndex);
    }

    useWindowEvent('keydown', (e) => {
        if (e.key === 'ArrowLeft') handleLeft();
        if (e.key === 'ArrowRight') handleRight();
    });

    return (
        <>
            <Modal opened={opened} onClose={close} title={name}>
                <Flex direction="row" justify="stretch" align="center">
                    <BiLeftArrow
                        style={{ flex: 1, cursor: 'pointer' }}
                        onClick={handleLeft}
                        aria-label="Previous image"
                        role="button"
                        tabIndex={0}
                    />
                    <MantineImage
                        src={slides[selectedIndex]}
                        alt={`${name} image ${selectedIndex + 1}`}
                        style={{ flex: 10 }}
                    />
                    <BiRightArrow
                        style={{ flex: 1, cursor: 'pointer' }}
                        onClick={handleRight}
                        aria-label="Next image"
                        role="button"
                        tabIndex={0}
                    />
                </Flex>
            </Modal>

            <div className="embla">
                <div className="embla__viewport" ref={emblaMainRef}>
                    <div className="embla__container">
                        {slides.map((src, index) => (
                            <div className="embla__slide" key={src ?? index}>
                                <div className="embla__slide__number">
                                    <span>{index + 1}</span>
                                </div>

                                {/* Responsive wrapper for next/image with fill */}
                                <div
                                    className="embla__slide__imgWrapper"
                                    style={{
                                        position: 'relative',
                                        width: '100%',
                                        paddingTop: '56.25%', // 16:9; adjust to your aspect
                                        cursor: 'pointer',
                                    }}
                                    onClick={open}
                                    role="button"
                                    tabIndex={0}
                                >
                                    <NextImage
                                        src={src}
                                        alt={`${name} image ${index + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="embla-thumbs">
                    <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                        <div className="embla-thumbs__container">
                            {slides.map((src, index) => (
                                <Thumb
                                    key={src ?? index}
                                    onClick={() => onThumbClick(index)}
                                    selected={index === selectedIndex}
                                    index={index}
                                    imgSrc={src}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Carousel;
