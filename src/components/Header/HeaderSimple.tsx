import { useEffect, useState } from 'react';
import { Container, Group, Burger, Avatar, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Logo from './logo.png';
import classes from './HeaderSimple.module.css';
import { Link } from 'react-router-dom';

const links = [
  { link: '/', label: 'Home' },
  { link: '/create', label: 'Notes' },
  { link: '/profile', label: 'Profile' },
];

interface User {
  userID: string;
  name: string;
  goals: {
    goal1: string;
    goal2: string;
    goal3: string;
  };
}

export function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      data-active={active === link.link || undefined}
      onClick={() => {
        setActive(link.link);
      }}
    >
      {link.label}
    </Link>
  ));

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <img src={Logo} height="50" alt="Logo" />
        <Group gap={5} visibleFrom="xs">
          {items}
        </Group>
        <Group>
          <Text>{currentUser ? currentUser.name : ''}</Text>
          <Avatar radius="xl" />
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
