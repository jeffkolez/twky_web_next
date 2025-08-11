import { Table, Text, Flex, Pagination } from '@mantine/core';
import type { ReactNode } from 'react';
import classes from './RankingCard.module.css';

const PAGE_SIZE = 5;

export type RankingCardProps = {
    title: string;
    rows: ReactNode[];
};

const RankingCard: React.FC<RankingCardProps> = ({ title, rows }) => {
    const totalPages = Math.max(1, Math.ceil((rows?.length ?? 0) / PAGE_SIZE));

    return (
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
                <Table.Tr>
                    <Table.Td colSpan={4}>
                        <Pagination total={totalPages} />
                    </Table.Td>
                </Table.Tr>
            </Table.Tfoot>
        </Table>
    );
};

RankingCard.displayName = 'RankingCard';
export default RankingCard;
