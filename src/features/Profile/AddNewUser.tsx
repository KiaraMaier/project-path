import React, { useState } from 'react';
import {
  Center,
  Table,
  TextInput,
  Button,
  Avatar,
  Container,
  Group,
} from '@mantine/core';

interface NewUser {
  name: string;
  goal1: string;
  goal2: string;
  goal3: string;
}

export function NewUserForm() {
  const [newUser, setNewUser] = useState<NewUser>({
    name: '',
    goal1: '',
    goal2: '',
    goal3: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('New User:', newUser);
    // Handle form submission logic here, e.g., saving the new user data
  };

  return (
    <Container mt="xl">
      <form onSubmit={handleSubmit}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Goals</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <React.Fragment>
              <Table.Tr>
                <Table.Td rowSpan={3}>
                  <TextInput
                    placeholder="Enter name"
                    name="name"
                    value={newUser.name}
                    onChange={handleChange}
                    required
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    placeholder="Enter first goal"
                    name="goal1"
                    value={newUser.goal1}
                    onChange={handleChange}
                    required
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <TextInput
                    placeholder="Enter second goal"
                    name="goal2"
                    value={newUser.goal2}
                    onChange={handleChange}
                    required
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>
                  <TextInput
                    placeholder="Enter third goal"
                    name="goal3"
                    value={newUser.goal3}
                    onChange={handleChange}
                    required
                  />
                </Table.Td>
              </Table.Tr>
              <Table.Tr></Table.Tr>
            </React.Fragment>
          </Table.Tbody>
        </Table>
        <Group mt="sm" mr="sm" justify="flex-end">
          <Button type="submit" color="cyan">
            Create User
          </Button>
        </Group>
      </form>
    </Container>
  );
}
