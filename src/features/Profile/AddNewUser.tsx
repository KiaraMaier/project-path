import React, { useState } from 'react';
import { Table, TextInput, Button, Container, Group } from '@mantine/core';

interface UserGoals {
  goal1: string;
  goal2: string;
  goal3: string;
}

interface User {
  name: string;
  goals: UserGoals;
}

export function NewUserForm() {
  const [newUser, setNewUser] = useState<User>({
    name: '',
    goals: {
      goal1: '',
      goal2: '',
      goal3: '',
    },
  });
  const [users, setUsers] = useState<User[]>(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setNewUser((prevUser) => ({
        ...prevUser,
        name: value,
      }));
    } else {
      // For goal inputs, we need to update the nested goals object
      setNewUser((prevUser) => ({
        ...prevUser,
        goals: {
          ...prevUser.goals,
          [name]: value,
        },
      }));
    }
  };

  const handleSubmit = () => {
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setNewUser({
      name: '',
      goals: {
        goal1: '',
        goal2: '',
        goal3: '',
      },
    });
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
                    value={newUser.goals.goal1}
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
                    value={newUser.goals.goal2}
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
                    value={newUser.goals.goal3}
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
