import React from 'react';
import Image from 'next/image';

type ThumbProps = {
    selected: boolean;
    imgSrc: string;
    index: number;
    onClick: () => void;
    alt?: string;
    width?: number;
    height?: number;
};

export const Thumb: React.FC<ThumbProps> = ({
    selected,
    imgSrc,
    index,
    onClick,
    alt,
    width = 96,
    height = 72,
}) => {
    return (
        <div
            className={'embla-thumbs__slide'.concat(
                selected ? ' embla-thumbs__slide--selected' : ''
            )}
        >
            <button
                onClick={onClick}
                className="embla-thumbs__slide__button"
                type="button"
                aria-pressed={selected}
            >
                <div className="embla-thumbs__slide__number">
                    <span>{index + 1}</span>
                </div>
                <Image
                    className="embla-thumbs__slide__img"
                    src={imgSrc}
                    alt={alt ?? `Thumbnail ${index + 1}`}
                    width={width}
                    height={height}
                    style={{ objectFit: 'cover' }}
                />
            </button>
        </div>
    );
};
