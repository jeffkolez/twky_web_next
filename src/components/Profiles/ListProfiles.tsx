import React from 'react';
import { Container, Flex, Space, Table, Skeleton } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { ProfilesList } from '@/types';
import classes from './ListProfiles.module.css';

const ScrollToTop = () => {
  const pathname = usePathname();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const ListProfiles = ({ data = [], isLoading }: { data?: ProfilesList[], isLoading: boolean, letter?: string }) => (
  <Container size="xl" mt="xl" p={{ base: '20px', md: 0 }}>
    <ScrollToTop />
    <Flex direction="row" justify="flex-start" style={{ flex: 2 }}>
      {isLoading ? (
        <Skeleton height={40} width="100%" />
      ) : (
        <div className={classes.tableContainer}>
          <Table className={classes.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Nationality</th>
                <th>Victims</th>
              </tr>
            </thead>
            <tbody>
              {data.map(profile => (
                <tr key={profile.id}>
                  <td>
                    <a
                      href={`/profile/${profile.shortUrl}`}
                      className={classes.link}
                    >
                      {profile.name}
                    </a>
                  </td>
                  <td>{profile.date}</td>
                  <td>{profile.nationality}</td>
                  <td>{profile.victims}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Flex>
  </Container>
);

export default ListProfiles;
