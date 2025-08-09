import {useState} from "react";
import {Text} from "@mantine/core";

import classes from './RichTextViewer.module.css';

const RichTextViewer = ({richText, ...rest}: {richText: string, [x: string]: any}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
      <>
        <div dangerouslySetInnerHTML={{__html: richText}} {...rest} style={{ maxWidth: '940px' }} />
        {isExpanded ? null : (
          <Text className={classes.showMore} onClick={() => setIsExpanded(true)}>SHOW MORE</Text>
        )}
      </>
    );
};

export default RichTextViewer
