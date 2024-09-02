import React, { useState, useEffect } from 'react';
import { Avatar, Center, Container, Group, Table } from '@mantine/core';

interface UserGoals {
  goal1: string;
  goal2: string;
  goal3: string;
}

interface User {
  userID: string;
  name: string;
  goals: UserGoals;
}
export function UserPreview() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    // Fetch data from user.json
    fetch('/user.json')
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error fetching user data:', error));
  }, []);

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
            <React.Fragment key={user.userID}>
              <Table.Tr>
                <Table.Td rowSpan={3}>
                  {user.name}
                  <Avatar mt="sm" color="cyan" radius="xl" size="md"></Avatar>
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
