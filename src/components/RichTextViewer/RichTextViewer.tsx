"use client";

import { useState } from "react";
import { Text } from "@mantine/core";

import classes from './RichTextViewer.module.css';

interface RichTextViewerProps extends React.HTMLAttributes<HTMLDivElement> {
    richText: string;
}

const RichTextViewer: React.FC<RichTextViewerProps> = ({ richText, ...rest }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <>
            <div
                dangerouslySetInnerHTML={{ __html: richText }}
                {...rest}
                style={{ maxWidth: '940px' }}
            />
            {isExpanded ? null : (
                <Text
                    className={classes.showMore}
                    onClick={() => setIsExpanded(true)}
                >
                    SHOW MORE
                </Text>
            )}
        </>
    );
};

export default RichTextViewer;
