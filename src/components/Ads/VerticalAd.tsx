import { Container, Skeleton } from '@mantine/core';
import { Adsense } from '@ctrl/react-adsense';

export default () => (
    <Container size="xl" ml="24px">
      <Adsense
        client="ca-pub-3531052691024296"
        slot="1175191079"
        style={{ width: '446px%', height: '397px' }}
        format="fluid"
      />
    </Container>
    /*<Container size="xl" ml="24px">
      <Skeleton h="446px" w="397px" />
    </Container>*/
  );
