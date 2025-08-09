import { Button, Container, Flex, Input, Text } from '@mantine/core';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import classes from './Search.module.css';

export default () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  return (
    <section className={classes.fullWidth}>
      <Container size="xl" className={classes.searchContainer}>
        <Text className={classNames(classes.searchTitle, classes.withOffset)}>
          Who are you looking for?
        </Text>
        <Flex className={classes.withOffset}>
          <Input
            radius={0}
            placeholder="Type Something"
            w="calc(100% - 142px)"
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                navigate(`/search/${search}`);
              }
            }}
          />
          <Link to={`/search/${search}`}>
            <Button color="#F00" w="142px">Search</Button>
          </Link>
        </Flex>
      </Container>
    </section>
  );
};
