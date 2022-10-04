import { useState, useEffect } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { Space, Card, Avatar, Statistic } from 'antd';

import { GithubOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default function GithubUserPage() {
  const [searchParams] = useSearchParams();

  // Gettign user details
  const [user, setUser] = useState(null);
  const getUser = async (username) => {
    fetch(`http://localhost:3000/users/github/${username}`)
      .then((res) => res.json())
      .then((json) => {
        setUser(json);
      })
      .catch((error) => console.log(error));
  };

  // Getting repo details
  const [repo, setRepo] = useState(null);
  const getRepo = async (username) => {
    fetch(`http://localhost:3000/users/github/${username}/repos`)
      .then((res) => res.json())
      .then((json) => {
        setRepo(json);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUser(searchParams.get('user'));
    getRepo(searchParams.get('user'));
  }, []);

  if (user === null) {
    return <p>Loading</p>;
  }

  console.log(user);

  return (
    <div
      style={{
        paddingTop: 20,
        paddingBottom: 20,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        style={{
          width: 350,
        }}
      >
        <Space style={{ marginBottom: 20 }}>
          <Avatar src={user.avatar_url} />
          <div>
            <span>{user.login}</span>
          </div>
          <GithubOutlined />
        </Space>
        <br />
        <span style={{ fontSize: 20 }}>{user.name}</span>
        <br />
        <a href={user.web_url}>{user.web_url}</a>
        <br />
        <Space size={15}>
          <Statistic title='Followers' value={user.followers} />
          <Statistic title='Following' value={user.following} />
        </Space>
        <br />
        <span style={{ fontSize: 20 }}>User repos:</span>
        <br />
        <Space direction='vertical'>
          {repo.map((repo) => {
            return (
              <div
                style={{
                  width: '100%',
                  backgroundColor: '#fafafa',
                  border: '1px solid #cfcfcf',
                  padding: '4px 15px',
                  borderRadius: 3,
                }}
              >
                <span>{repo.name}</span>
                <br />
                <a href={repo.html_url}>{repo.html_url}</a>
              </div>
            );
          })}
        </Space>
      </Card>
    </div>
  );
}
