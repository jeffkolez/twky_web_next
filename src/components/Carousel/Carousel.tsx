import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Flex, Image, Modal } from '@mantine/core';
import { useDisclosure, useWindowEvent } from '@mantine/hooks';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { Thumb } from './CarouselThumbsButton';

type PropType = {
  name: string;
  slides: string[];
};

const Carousel: React.FC<PropType> = (props) => {
    const [opened, { open, close }] = useDisclosure(false);

    const { name, slides } = props;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel();
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true,
    });

    const onThumbClick = useCallback(
        (index: number) => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        emblaMainApi.scrollTo(index);
        },
        [emblaMainApi, emblaThumbsApi]
    );

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return;
        setSelectedIndex(emblaMainApi.selectedScrollSnap());
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaMainApi) return;
        onSelect();
        emblaMainApi.on('select', onSelect);
        emblaMainApi.on('reInit', onSelect);
    }, [emblaMainApi, onSelect]);

    function handleLeft() {
        if (!emblaThumbsApi) return;
        const newIndex = Math.max(selectedIndex - 1, 0);
        onThumbClick(newIndex);
    }

    function handleRight() {
        if (!emblaThumbsApi) return;
        const newIndex = Math.min(selectedIndex + 1, slides.length - 1);
        onThumbClick(newIndex);
    }

    useWindowEvent('keydown', (e) => {
        if (e.key === 'ArrowLeft') handleLeft();
        if (e.key === 'ArrowRight') handleRight();
    });

  return (
        <>
        <Modal
            opened={opened}
            onClose={close}
            title={name}
            >
            <Flex direction="row" justify="stretch" align="center">
                <BiLeftArrow
                    style={{ flex: 1, cursor: 'pointer' }}
                    onClick={() => handleLeft()}
                />
                <Image src={slides[selectedIndex]} style={{ flex: 10 }} />
                <BiRightArrow
                    style={{ flex: 1, cursor: 'pointer' }}
                    onClick={() => handleRight()}
                />
            </Flex>
        </Modal>
        <div className="embla">
            <div className="embla__viewport" ref={emblaMainRef}>
                <div className="embla__container">
                    {slides.map((src, index) => (
                        <div className="embla__slide" key={index}>
                            <div className="embla__slide__number">
                                <span>{index + 1}</span>
                            </div>
                            <img
                                className=""
                                src={src}
                                alt="Your alt text"
                                onClick={open}
                                />
                        </div>
                    ))}
                </div>
            </div>
            <div className="embla-thumbs">
                <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
                    <div className="embla-thumbs__container">
                        {slides.map((src, index) => (
                            <Thumb
                                onClick={() => onThumbClick(index)}
                                selected={index === selectedIndex}
                                index={index}
                                imgSrc={src}
                                key={index}
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
