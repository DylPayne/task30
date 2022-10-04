import { useNavigate } from 'react-router-dom';

import { Input } from 'antd';

const { Search } = Input;

export default function IndexPage() {
  let navigate = useNavigate();

  // Navigating to url where search results will be displayed
  // Passing the search result via a url param
  const onSearch = (username) => {
    navigate(`/search?username=${username}`);
  };

  return (
    <div
      style={{
        width: '100%',
        height: 'calc(100vh - 120px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: 20,
          height: 200,
          width: 500,
          backgroundColor: '#fafafa',
          border: '1px solid #cfcfcf',
          borderRadius: 3,
        }}
      >
        <h2>Welcome to Git Viewer!</h2>
        <p>Search for a user:</p>
        <Search
          placeholder='Search for a user'
          size='large'
          onSearch={onSearch}
        />
      </div>
    </div>
  );
}
