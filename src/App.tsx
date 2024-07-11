import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import './App.css';
import { HeaderSimple } from './features/Header/HeaderSimple';
import { Home } from './features/Homepage/Home';

function App() {
  return (
    <MantineProvider>
      <HeaderSimple />
      <Home />
    </MantineProvider>
  );
}
export default App;
