import { Text, Container, Paper, Grid, Group } from '@mantine/core';

export function Home() {
  return (
    <div>
      <Container>
        <Grid grow gutter="md">
          <Grid.Col span={6}>
            <Group>
              <Paper
                shadow="xs"
                p="sm"
                style={{ maxWidth: '100%', width: '100%', height: '10rem' }}
              >
                <Text>My Goals go here</Text>
              </Paper>
            </Group>
          </Grid.Col>

          <Grid.Col span={6} style={{ gridColumn: 'span 2' }}>
            <Paper
              shadow="xs"
              p="sm"
              style={{ maxWidth: '100%', width: '100%', height: '330%' }}
            >
              <Text>Questions to answer - This col over the two rows!</Text>
            </Paper>
          </Grid.Col>

          <Grid.Col span={6}>
            <Paper
              shadow="xs"
              p="sm"
              style={{ maxWidth: '100%', width: '100%', height: '22rem' }}
            >
              <Text>This is my note so far</Text>
            </Paper>
          </Grid.Col>
          <Grid.Col span={6}></Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
