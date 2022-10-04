import { useState, useEffect } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import { Space, Card, Avatar, Statistic } from 'antd';

import { GitlabOutlined } from '@ant-design/icons';

const { Meta } = Card;

export default function GitlabUserPage() {
  const [searchParams] = useSearchParams();

  // Getting user details
  const [user, setUser] = useState(null);
  const getUser = async (id) => {
    fetch(`http://localhost:3000/users/gitlab/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setUser(json);
      })
      .catch((error) => console.log(error));
  };

  // Getting repo details
  const [repo, setRepo] = useState(null);
  const getRepo = async (id) => {
    fetch(`http://localhost:3000/users/gitlab/${id}/repos`)
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

  return (
    <div
      style={{
        paddingTop: 200,
        paddingBottom: 200,
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
            <span>{user.username}</span>
          </div>
          <GitlabOutlined />
        </Space>
        <br />
        <Space direction='vertical'>
          <div>
            <span style={{ fontSize: 20 }}>{user.name}</span>
            <br />
            <a href={user.web_url}>{user.web_url}</a>
          </div>
          <Space size={15}>
            <Statistic title='Followers' value={user.followers} />
            <Statistic title='Following' value={user.following} />
          </Space>
          <span style={{ fontSize: 20 }}>User repos:</span>
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
                  <a href={repo.web_url}>{repo.web_url}</a>
                </div>
              );
            })}
          </Space>
        </Space>
      </Card>
    </div>
  );
}
