import './App.css';
import 'antd/dist/antd.css';

import IndexPage from './pages';
import SearchPage from './pages/search';
import GithubUserPage from './pages/githubUser';
import GitlabUserPage from './pages/gitlabUser';

import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';

import { PageHeader, Tag } from 'antd';

const Root = () => {
  const navigate = useNavigate();
  return (
    <div className='app'>
      <PageHeader
        title='Git Viewer'
        subTitle='by Dylan Payne'
        tags={<Tag color='green'>Online</Tag>}
        onBack={() => navigate('/')}
      />
      <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/github' element={<GithubUserPage />} />
        <Route path='/gitlab' element={<GitlabUserPage />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

export default App;
