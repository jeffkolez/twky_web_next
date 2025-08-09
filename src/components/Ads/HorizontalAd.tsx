import { Container, Skeleton } from '@mantine/core';
import { Adsense } from '@ctrl/react-adsense';

export default () => (
    <Container size="xl" mt="62px">
      <Adsense
        client="ca-pub-3531052691024296"
        slot="1175191079"
        style={{ width: '100%', height: '184px' }}
        format="fluid"
      />
    </Container>
    /*<Container size="xl" mt="62px">
      <Skeleton h="184px" />
    </Container>*/
  );
