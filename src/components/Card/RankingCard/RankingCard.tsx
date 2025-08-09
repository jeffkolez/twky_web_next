import { Table, Text, Flex, Pagination } from '@mantine/core';
import classes from './RankingCard.module.css';

const PAGE_SIZE = 5;

export type RankingCardProps = {
  title: string;
  rows: any;
};

export default ({ title, rows }: RankingCardProps) =>
   (
    <Table verticalSpacing="xs" className={classes.rankedTable}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th colSpan={4}>
            <Flex direction="row" justify="space-between" align="center">
              <Text>{title}</Text>
              <Text>View all</Text>
            </Flex>
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Tfoot>
        <Table.Td colSpan={4}>
          <Pagination total={rows.length / PAGE_SIZE} />
        </Table.Td>
      </Table.Tfoot>
    </Table>
  );
