import { useState, useEffect } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { Input, Card, Avatar } from 'antd';

const { Search } = Input;

// Style for grid inside of card
const gridStyle = {
  width: '50%',
  textAlign: 'left',
};

export default function SearchPage() {
  // Getting params from url
  const [searchParams] = useSearchParams();

  // Function to get users
  const [githubUsers, setGithubUsers] = useState([]);
  const [gitlabUsers, setGitlabUsers] = useState([]);
  const getUsers = async (username) => {
    fetch(`http://localhost:3000/users/search?username=${username}`)
      .then((res) => res.json())
      .then((json) => {
        // Splitting github and gitlab results into two different states
        setGithubUsers(json.github.items);
        setGitlabUsers(json.gitlab);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUsers(searchParams.get('username'));
  }, []);

  return (
    <div
      style={{
        width: '100%',
        minHeight: 'calc(100vh - 120px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card title='Search' style={{ width: 600 }}>
        <Card.Grid hoverable={false} style={gridStyle}>
          <h3>Github Users</h3>
          <br />
          {githubUsers.map((user) => {
            return (
              <div
                key={user.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 15,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={user.avatar_url} />
                  <div style={{ marginLeft: 15 }}>
                    <span>{user.login}</span>
                  </div>
                </div>
                <a href={`/github?user=${user.login}`}>View user</a>
              </div>
            );
          })}
        </Card.Grid>
        <Card.Grid hoverable={false} style={gridStyle}>
          <h3>Gitlab Users</h3>
          <br />
          {gitlabUsers.map((user) => {
            return (
              <div
                key={user.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 15,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={user.avatar_url} />
                  <div style={{ marginLeft: 15 }}>
                    <span>{user.username}</span>
                    <br />
                    <span>{user.name}</span>
                  </div>
                </div>
                <a href={`/gitlab?user=${user.id}`}>View user</a>
              </div>
            );
          })}
        </Card.Grid>
      </Card>
    </div>
  );
}
