import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { MantineProvider } from '@mantine/core';
import { HeaderSimple } from './components/Header/HeaderSimple';
import { NewNote } from './features/NotePage/components/NewNote';

function App() {
  return (
    <MantineProvider>
      <HeaderSimple />
      <NewNote />
    </MantineProvider>
  );
}
export default App;
