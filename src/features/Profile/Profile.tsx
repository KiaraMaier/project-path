import { Paper, Text, Center } from '@mantine/core';
import undraw_write from './undraw_profile.svg';
import { UserPreview } from './UserPreview';
import { NewUserForm } from './AddNewUser';

export function Profile() {
  return (
    <Center>
      <Paper shadow="xs" p="xl" style={{ maxWidth: '100%', width: '75%' }}>
        <Center>
          <img src={undraw_write} alt="moments" style={{ maxWidth: '35%' }} />
        </Center>
        <NewUserForm />
        <UserPreview />
      </Paper>
    </Center>
  );
}
