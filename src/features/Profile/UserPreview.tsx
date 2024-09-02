import React, { useState, useEffect } from 'react';
import { Avatar, Center, Chip, Container, Group, Table } from '@mantine/core';

interface UserGoals {
  goal1: string;
  goal2: string;
  goal3: string;
}

interface User {
  name: string;
  goals: UserGoals;
}
export function UserPreview() {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUserData(JSON.parse(savedUsers));
    }
  }, []);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  return (
    <Container mt="xl">
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Goals</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {userData.map((user: User) => (
            <React.Fragment key={user.name}>
              <Table.Tr>
                <Table.Td rowSpan={3}>
                  <Group>
                    {userData.map((user: User) => (
                      <Chip
                        key={user.name}
                        checked={selectedUser?.name === user.name}
                        onChange={() => handleUserSelect(user)}
                      >
                        {user.name}
                      </Chip>
                    ))}
                  </Group>
                </Table.Td>
                <Table.Td>{user.goals.goal1}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>{user.goals.goal2}</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>{user.goals.goal3}</Table.Td>
              </Table.Tr>
            </React.Fragment>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
}
