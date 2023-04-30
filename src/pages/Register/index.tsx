import react, { useEffect, useState } from 'react'
import './styles.scss'

import Logo from '../../assets/logo-no-background.png'

import { FormProvider, useForm } from 'react-hook-form'
import { Button, message, Col, Row, Space, Upload, UploadProps, UploadFile, Progress } from 'antd';
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

export const Register = () => {
  const methods = useForm({
    resolver: yupResolver(validations)
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [fileUpload, setFileUpload] = useState<any>();
  const [uploading, setUploading] = useState('');
  const [avatarUploadedUrl, setAvatarUploadedUrl] = useState('')

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
    const avatarRef = ref(storage, `avatar/${file.name + uuid()}`)
    const uploadTask = uploadBytesResumable(avatarRef, file)

    uploadTask.on('state_changed',
      (snapshot) => {
        const uploadProgress = Number((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed()
        setUploading(uploadProgress)
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error: any) => {
        console.error(error)
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

  const handleRegister = async () => {

  }

  return (
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
                    label="Email"
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
                    name="username"
                    label="Username"
                    required
                    type="text"
                    maxLength={80}
                    placeholder="Type your username..."
                    autoComplete="off"
                    prefix={<FontAwesomeIcon icon={faUserAlt} />}
                  />
                </Col>
              </Row>

              <Row style={{ width: '100%' }} gutter={10}>
                <Col span={12}>
                  <Select name='country' required label='Country' options={COUNTRIES} />
                </Col>
                <Col span={12}>
                  <DatePicker disabledDateCustom={moment().subtract(4, 'year')} name='birthdate' required label='Birthdate' />
                </Col>
              </Row>

              <Row style={{ width: '100%' }}>
                <Col span={24}>
                  <Input
                    name="password"
                    label="Password"
                    required
                    type="text"
                    minLength={6}
                    maxLength={30}
                    placeholder="Type your passord..."
                    autoComplete="off"
                    prefix={<FontAwesomeIcon icon={faKey} />}
                  />
                </Col>
              </Row>

              <Row style={{ width: '100%' }}>
                <Col span={12}>
                  <Upload maxCount={1} name="avatar" showUploadList={false} {...props}>
                    <Button className="button-upload" icon={<UploadOutlined />}>Avatar upload</Button>
                  </Upload>
                </Col>

                {fileUpload &&
                  <Col span={12}>
                    <Progress percent={Number(uploading)} size="small" />
                  </Col>
                }

              </Row>

              <Row style={{ width: '100%' }}>
                <Col span={24}>
                  <Button htmlType='submit' className='btn-register' type="primary">Register</Button>
                </Col>
              </Row>
            </Space>
          </form>
        </FormProvider>
      </article>
    </div>
  )
}