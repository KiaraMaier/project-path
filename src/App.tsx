import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { MantineProvider } from '@mantine/core';
import { HeaderSimple } from './components/Header/HeaderSimple';
import { NewNotePage } from './features/NotePage/components/NewNotePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './features/HomePage/Home';
import { Profile } from './features/Profile/Profile';
import { GeneratedNote } from './features/NoteGeneration/GeneratedNote';
import { ActivitiesBox } from './features/NotePage/components/ActivitiesBox';

function App() {
  return (
    <MantineProvider>
      <Router>
        <HeaderSimple />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<ActivitiesBox />} />
          <Route path="/newnote" element={<NewNotePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/generate" element={<GeneratedNote />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}
export default App;
