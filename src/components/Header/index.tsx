import react from 'react'
import { Layout, Input } from 'antd';

import Logo from '../../assets/logo-no-background.png'

import "./styles.scss";

const { Header } = Layout;
const { Search } = Input;

export const HeaderDefault = ({ children }: { children: JSX.Element }) => {
  return (
    <Layout className="layout-header">
      <Header className="header">
        <div className="area-logo-img">
          <img className="logo-img" src={Logo} alt="logo-videozone" />
        </div>
        <div className="container-search">
          <Search placeholder="Search" allowClear onSearch={() => console.log('teste')} style={{ width: 200 }} />
        </div>
      </Header>
      <Layout style={{ background: 'red' }}>
        {children}
      </Layout>
    </Layout>
  )
}