import react, { useEffect, useState } from 'react'
import './styles.scss'

import Logo from '../../assets/logo-no-background.png'

import { FormProvider, useForm } from 'react-hook-form'
import { Button, message, Col, Row, Space, Upload, UploadProps, UploadFile, Progress, Divider, notification } from 'antd';
import { Input } from '../../components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faKey, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { DatePicker } from '../../components/DatePicker';
import moment from 'moment';
import { Select } from '../../components/Select';
import { yupResolver } from "@hookform/resolvers/yup";
import { COUNTRIES } from '../../utils/countriesEnum';
import { validations } from './utils/validations';
import { UploadOutlined } from '@ant-design/icons';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../../infra/firebase-config';
import uuid from 'react-uuid';
import { apiRequest } from '../../service/config-http';
import { UserRegisterInterface } from '../../interface/User';
import { useNavigate } from 'react-router-dom';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const Register = () => {
  const navigate = useNavigate()
  const methods = useForm<UserRegisterInterface>({
    resolver: yupResolver(validations)
  });
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  const [fileUpload, setFileUpload] = useState<any>();
  const [uploading, setUploading] = useState('');
  const [exceptionUpload, setExceptionUpload] = useState(false)
  const [avatarUploadedUrl, setAvatarUploadedUrl] = useState('')
  const [loadingRegister, setLoadingRegister] = useState(false)

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType, title: string, message: string) => {
    api.open({
      type: type,
      message: title,
      description: message || 'Error on execute action',
      className: 'notification-custom',
      style: {
        background: 'var(--blue-500)',
        color: '#ffffff'
      },
    });
  };

  const props: UploadProps = {
    onRemove: () => {
      setFileUpload(null);
    },
    beforeUpload: (file) => {
      setFileUpload(file);

      return false;
    }
  };

  const avatarUpload = (file: any) => {
    setExceptionUpload(false)
    const acceptTypeFiles = ['image/png', 'image/jpg', 'image/jpeg']

    if (!acceptTypeFiles.includes(file.type)) {
      setExceptionUpload(true)
      setUploading('100')
      return
    }

    const avatarRef = ref(storage, `avatar/${file.name + '-' + uuid()}`)
    const uploadTask = uploadBytesResumable(avatarRef, file)

    uploadTask.on('state_changed',
      (snapshot) => {
        const uploadProgress = Number((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed()
        setUploading(uploadProgress)
        switch (snapshot.state) {
          case 'paused':
            break;
          case 'running':
            break;
        }
      },
      (error: any) => {
        setExceptionUpload(true)
        setUploading('100')
        return
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAvatarUploadedUrl(downloadURL);
        });
      })
  }

  useEffect(() => {

    if (fileUpload) {
      avatarUpload(fileUpload)
    }
  }, [fileUpload])



  const handleRegister = async (userData: UserRegisterInterface) => {
    setLoadingRegister(true)
    const payloadRegister = {
      ...userData,
      avatarUrl: avatarUploadedUrl,
    }

    await apiRequest.post('sign-up', payloadRegister)
      .then((response) => {
        openNotificationWithIcon('success', 'Success!', 'Usuário criado com usuário!')
        setLoadingRegister(false)
        setTimeout(() => {
          navigate('/sign-in')
        }, 2000)

      })
      .catch((error: any) => {
        if (!error.response.data?.success && error.response.data?.errorMessage?.name === "FirebaseError") {

          const { code } = error.response.data?.errorMessage
          if (code === "auth/email-already-in-use") {
            setError('email', { type: 'error', message: 'Email já cadastrado!' })
          }
        } else {
          openNotificationWithIcon('error', 'Ops...', error.response.data?.errorMessage)
        }
        setLoadingRegister(false)
      })
  }

  return (
    <>
      {contextHolder}

      <div className="background-container">

        <article className="container-register">
          <img className="logo-img" src={Logo} alt="logo-videozone" />

          <FormProvider {...methods}>
            <form className="form-register" onSubmit={handleSubmit(handleRegister)}>
              <Space className='space-register' direction="vertical" size={16} style={{ display: 'flex' }}>
                <Row style={{ width: '100%' }}>
                  <Col span={24}>
                    <Input
                      name="email"
                      label="E-mail"
                      required
                      type="email"
                      maxLength={80}
                      placeholder="Digite seu e-mail..."
                      autoComplete="off"
                      prefix={<FontAwesomeIcon icon={faEnvelope} />}
                    />
                  </Col>
                </Row>

                <Row style={{ width: '100%' }}>
                  <Col span={24}>
                    <Input
                      name="username"
                      label="Nome de Usuário"
                      required
                      type="text"
                      maxLength={80}
                      placeholder="Digite seu nome de usuário..."
                      autoComplete="off"
                      prefix={<FontAwesomeIcon icon={faUserAlt} />}
                    />
                  </Col>
                </Row>

                <Row gutter={10}>
                  <Col className="gutter-row" span={12}>
                  <Select name='country' required label='País' options={COUNTRIES} />
                  </Col>
                  <Col className="gutter-row" span={12}>
                  <DatePicker disabledDateCustom={moment().subtract(4, 'year')} name='birthdate' required label='Data de Nascimento' />
                  </Col>
                </Row>

                <Row style={{ width: '100%' }}>
                  <Col span={24}>
                    <Input
                      name="password"
                      label="Senha"
                      required
                      type="text"
                      minLength={6}
                      maxLength={30}
                      placeholder="Digite sua senha..."
                      autoComplete="off"
                      prefix={<FontAwesomeIcon icon={faKey} />}
                    />
                  </Col>
                </Row>

                <Row style={{ width: '100%' }}>
                  <Col span={12}>
                    <Upload disabled={fileUpload && !exceptionUpload} accept=".png,.jpg,.jpeg" maxCount={1} name="avatar" showUploadList={false} {...props}>
                      <Button className="button-upload" icon={<UploadOutlined />}>Avatar upload</Button>
                    </Upload>
                  </Col>

                  {fileUpload &&
                    <Col span={12}>
                      <Progress percent={Number(uploading)} status={exceptionUpload ? 'exception' : 'success'} size="small" />
                    </Col>
                  }

                </Row>

                <Row style={{ width: '100%' }}>
                  <Col span={24}>
                    <Button loading={loadingRegister} htmlType='submit' className='btn-register' type="primary">Registrar-se</Button>
                  </Col>
                </Row>
                <Row style={{ width: '100%' }}>
                  <Col span={24}>
                    <a onClick={() => navigate('/sign-in')} className='btn-login' type="primary">Já possui conta?</a>
                  </Col>
                </Row>
              </Space>
            </form>
          </FormProvider>
        </article>
      </div>
    </>
  )
}