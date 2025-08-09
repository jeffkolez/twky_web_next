import { Anchor, Table } from '@mantine/core';
import ReactCountryFlag from 'react-country-flag';
import RankingCard, { RankingCardProps } from './RankingCard';

const data = [
  {
    country: 'United States',
    countryCode: 'US',
    murderCount: 148,
  },
  {
    country: 'United States',
    countryCode: 'US',
    murderCount: 148,
  },
  {
    country: 'United States',
    countryCode: 'US',
    murderCount: 148,
  },
  {
    country: 'United States',
    countryCode: 'US',
    murderCount: 148,
  },
  {
    country: 'United States',
    countryCode: 'US',
    murderCount: 148,
  },
];

const rows = data.map((row, index) => (
  <Table.Tr key={index}>
    <Table.Td>
      {index + 1}
    </Table.Td>
    <Table.Td>
      <ReactCountryFlag
        countryCode={row.countryCode}
        svg
        style={{
          width: '2em',
          height: '2em',
          borderRadius: '50%',
        }}
        title={row.countryCode}
      />
    </Table.Td>
    <Table.Td>{row.country}</Table.Td>
    <Table.Td>
      <Anchor component="button" fz="sm">
        {row.murderCount} murders
      </Anchor>
    </Table.Td>
  </Table.Tr>
));

export default {
  args: {
    title: 'By Country',
    rows,
  },
  title: 'Ranking Card',
};

export const Usage = (args: RankingCardProps) => <RankingCard {...args} />;
