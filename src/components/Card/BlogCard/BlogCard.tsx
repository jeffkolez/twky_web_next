import { Image, Text, Group, Flex } from '@mantine/core';
import classes from './BlogCard.module.css';

export type BlogCardProps = {
  image: string;
  title: string;
  description: string;
  date: string;
  category: string;
};

export default ({ image, title, description, date, category }: BlogCardProps) => (
  <Flex className={classes.card}>
    <Flex direction="row">
      <Image
        src={image}
        alt={title}
      />

      <Flex direction="column" p="20px">
        <Group>
          <Text fz="xl" fw={700} className={classes.title}>
            {title}
          </Text>
        </Group>
        <Text mt="sm" mb="md" c="dimmed" fz="xs">
          {description}
        </Text>
        <Text mt="sm" mb="md" c="dimmed" fz="xs">
          {date} • {category}
        </Text>
      </Flex>
    </Flex>
  </Flex>
);
