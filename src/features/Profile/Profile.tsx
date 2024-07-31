import { Paper, Text, Center } from '@mantine/core';
import undraw_write from './undraw_profile.svg';

export function Profile() {
  return (
    <Center>
      <Paper
        shadow="xs"
        p="xl"
        style={{ maxWidth: '100%', width: '50%', height: '30rem' }}
      >
        <Text>Profile Page</Text>
        <Center>
          <img src={undraw_write} alt="moments" style={{ maxWidth: '35%' }} />
        </Center>
      </Paper>
    </Center>
  );
}
