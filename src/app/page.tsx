"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { LoginComponent } from "@/components/LoginComponent";
import styled from "styled-components";
import { ErrorMessages } from "@/@types/messages";
import { useRouter } from "next/navigation";
import { useUser } from "@/stores/useUser";
import { authService } from "@/services/auth";

export default function Page() {
  const { push } = useRouter();
  const { accessToken, setAccessToken } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  interface FormValues {
    email: string;
    password: string;
  }

  const onFinish = (values: unknown) => {
    const formValues = values as FormValues;
    setIsLoading(true);

    authService
      .login(formValues.email, formValues.password)
      .then((token) => {
        setAccessToken(token);
        push("/client/home");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (accessToken) {
      push("/client/home");
    }
  }, [accessToken]); // eslint-disable-line

  return (
    <LoginComponent>
      <FormConatainer
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        disabled={isLoading}
        autoComplete="off"
        size="large"
      >
        <Title>
          <h2>ENTRAR</h2>
        </Title>
        <Form.Item
          label="E-mail"
          name="email"
          rules={[{ required: true, message: ErrorMessages.MSGE01 }]}
        >
          <Input
            placeholder="E-mail"
            prefix={<MailOutlined style={{ color: "#9a9a9a" }} />}
          />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="password"
          rules={[{ required: true, message: ErrorMessages.MSGE01 }]}
        >
          <InputContent
            placeholder="Sua senha"
            prefix={<LockOutlined style={{ color: "#9a9a9a" }} />}
          />
          {/* <Link style={{ color: "#fff " }} href="/dashboard">
            Esqueci minha senha?
          </Link> */}
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Lembrar-me?</Checkbox>
        </Form.Item>

        <Form.Item>
          <ButtonSubmit type="primary" htmlType="submit">
            {isLoading ? "Carregando..." : "ENTRAR"}
          </ButtonSubmit>
        </Form.Item>
      </FormConatainer>
    </LoginComponent>
  );
}

const ButtonSubmit = styled(Button)`
  width: 100%;
  background-color: #c1820b;
`;

const FormConatainer = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    color: #fff !important;
  }
`;

const InputContent = styled(Input.Password)`
  width: 100% !important;
`;

const Title = styled.div`
  h2 {
    font-size: 35px;
    font-weight: bold;
    color: #fff;
  }
`;
