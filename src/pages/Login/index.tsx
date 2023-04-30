import react from 'react'
import './styles.scss'

import Logo from '../../assets/logo-no-background.png'

import { FormProvider, useForm } from 'react-hook-form';
import { Button, Col, Row, Space, Tooltip } from 'antd';
import { Input } from '../../components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
import { InfoCircleOutlined } from '@ant-design/icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { apiRequest } from '../../service/config-http';
import { useUser } from '../../context/userContext';

export const Login = () => {
  const {
    setUsername,
    setAvatar,
    setEmail,
    setUid,
    setAccessToken
  } = useUser();
  const methods = useForm();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleLogin = async (data: any) => {
    await apiRequest.post('/sign-in', data)
      .then((response: any) => {
        const { userData } = response.data
        setUid(userData.user.uid)
        setEmail(userData.user.email)
        setAccessToken(userData.user.stsTokenManager.accessToken)
      })
      .catch((error: any) => {
        console.error(error)
      })
  }

  return (
    <div className="background-container">
      <article className="container-login">
        <img className="logo-img" src={Logo} alt="logo-videozone" />

        <FormProvider {...methods}>
          <form className="form-login" onSubmit={handleSubmit(handleLogin)}>
            <Space className='space__login' direction="vertical" size={30} style={{ display: 'flex' }}>
              <Row style={{ width: '100%' }}>
                <Col span={24}>
                  <Input
                    name="email"
                    label="Email"
                    labelColor='var(--text-gray)'
                    required
                    type="email"
                    maxLength={80}
                    placeholder="Type your email..."
                    autoComplete="off"
                    prefix={<FontAwesomeIcon icon={faEnvelope} />}
                  />
                </Col>
              </Row>

              <Row style={{ width: '100%' }}>
                <Col span={24}>
                  <Input
                    name="password"
                    label="Password"
                    labelColor='var(--text-gray)'
                    required
                    type="password"
                    minLength={6}
                    maxLength={30}
                    placeholder="Type your passord..."
                    autoComplete="off"
                    prefix={<FontAwesomeIcon icon={faKey} />}
                  />
                </Col>
              </Row>

              <Row style={{ width: '100%' }}>
                <Col span={24}>
                  <Button htmlType='submit' className='btn-login' type="primary">Login</Button>
                </Col>
              </Row>

              <Row style={{ width: '100%' }}>
                <Col span={24}>
                  <a className="forgot-password">Forgot your password?</a>
                </Col>
              </Row>
            </Space>
          </form>
        </FormProvider>
      </article>
    </div>
  )
}