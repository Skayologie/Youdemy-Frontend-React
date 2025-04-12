
import Layout from './Component/Layout';
import Home from './Home';
import Categories from './Categories';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import ResponsiveAppBar from './Component/navbar'
import CreateCategory from './CreateCategorie'
import CreateCourse from './CreateCourse'
import { Toaster } from 'react-hot-toast';
import CourseDetails from './CourseDetails';

function App() {
  return (
    <>
      <Router>
        <ResponsiveAppBar/>
        <Toaster
        position="top-center"
        reverseOrder={false}
      />
          <Routes>
            <Route path="/" element={<Layout content={<Home/>}/>}/>
            <Route path="/Categories" element={<Layout content={<Categories/>}/>}/>
            <Route path="/CreatePost" element={<Layout content={<CreateCourse/>}/>}/>
            <Route path="/Course/:id" element={<Layout content={<CourseDetails/>}/>}/>
            <Route path="/CreateCategory" element={<Layout content={<CreateCategory/>}/>}/>
            </Routes>
      </Router>
    </>
  );
}

export default App;
