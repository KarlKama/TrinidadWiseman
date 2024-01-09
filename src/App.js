import './css/App.css';
import { Route, Routes } from 'react-router-dom';
import Article from './pages/Article';
import Table from './pages/Table';
import UserArticle from './pages/UserArticle';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <div className="App page">
      <NavigationBar/>

      <Routes>
        <Route path='' element = { <Article/> } />
        <Route path='article' element = { <Article/> } />
        <Route path='table' element = { <Table/> } />
        <Route path='article/:id' element = { <UserArticle/> } />
      </Routes>
    </div>
  );
}

export default App;
