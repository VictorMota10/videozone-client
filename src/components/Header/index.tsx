import react, { useEffect, useState } from 'react'
import { Layout, Input, Avatar, Dropdown, MenuProps, Space, Button } from 'antd';

import Logo from '../../assets/logo-no-background.png'

import "./styles.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/userContext';
import { UserDataLogged } from '../../interface/User';

const { Header } = Layout;
const { Search } = Input;

export const HeaderDefault = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate()

  const {
    username,
    email,
    avatarUrl,
    userUid,
    setUsername,
    setAvatar,
    setEmail,
    setUserUid,
    setAccessToken
  } = useUser();

  const items: MenuProps['items'] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ];

  const handlePersistUserDataInContext = (userData: UserDataLogged) => {
    console.log(userData)
    setUserUid(userData.uid)
    setEmail(userData.email)
    setAccessToken(userData.accessToken)
    setUsername(userData.username)
  }

  useEffect(() => {
    let userDataStorage = localStorage.getItem('userData')
    if(userDataStorage){
      handlePersistUserDataInContext(JSON.parse(userDataStorage))
    }
    
  }, [])

  useEffect(() => {
    console.log(username)
  }, [username])

  return (
    <Layout className="layout-header">
      <Header className="header">
        <div className="area-logo-img">
          <img className="logo-img" src={Logo} alt="logo-videozone" />
        </div>
        <div className="container-search">
          <Search className="search-input" placeholder="Search" allowClear onSearch={() => console.log('teste')} style={{ width: 200 }} />
        </div>
        <div className="container-account">
          {username && userUid ?
            <>
              <Avatar className="avatar-account" size="large" icon={<FontAwesomeIcon icon={faUserAlt} />} />
              <Dropdown className='salute-user' menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    Hi, {username}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </>
            : <div className="auth-container">
              <Button className="login-button" onClick={() => navigate('/login')}>Login</Button>
              <Button className="register-button" onClick={() => navigate('/register')}>Register</Button>
            </div>}
        </div>
      </Header>
      <Layout style={{ background: 'red' }}>
        {children}
      </Layout>
    </Layout>
  )
}