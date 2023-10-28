"use client";

import * as C from "./styles";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import { IService, IServiceInputDTO } from "@/@types/service";
import { serviceApi } from "@/services/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Upload, Input } from "antd";
import { useEffect, useState } from "react";

import FooterClient from "../components/FooterClient";
import { UploadButton } from "./components/UploadButton";
import { Client } from "@/@types/client";
import { clientService } from "@/services/client";

interface ModalProps {
  clientToEdit?: Client;
  onClose: () => void;
}

export default function Profile({ clientToEdit, onClose }: ModalProps) {
  const [imageUrl, setImageUrl] = useState<string>();
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { resetFields, setFieldsValue, validateFields } = form;

  const editClient = useMutation({
    mutationFn: (data: FormData) => clientService.editClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["clients"]);
    },
  });

  const handleCancel = () => {
    if (editClient.isLoading) {
      return;
    }

    resetFields();
    onClose();
  };

  const handleSubmit = () => {
    validateFields()
      .then((data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("phone", data.phone);
        formData.append("email", data.email);

        if (data.image.file) {
          formData.append("image", data.image.file?.originFileObj);
        }

        if (clientToEdit) {
          formData.append("id", clientToEdit.id ?? "");
          editClient
            .mutateAsync(formData)
            .then(() => {
              handleCancel();
            })
            .catch(() => {});
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (clientToEdit) {
      setFieldsValue({
        name: clientToEdit.name,
        phone: clientToEdit.phone,
        email: clientToEdit.email,
      });
    }
  }, [clientToEdit, setFieldsValue]);

  return (
    <>
      <C.Container>
        <C.Title>Meu Perfil</C.Title>
        <C.ProfileContainer>
          <C.FormContainer>
            <C.FormContentWrapper
              layout="vertical"
              size="middle"
              disabled={editClient.isLoading}
              form={form}
              initialValues={{
                name: "",
                phone: "",
                email: "",
              }}
              onFinish={handleSubmit}
            >
              {/* <Form.Item label="Image" name="image" valuePropName="image">
                <Upload
                  name="image"
                  listType="picture-card"
                  maxCount={1}
                  className="avatar-uploader"
                >
                  {clientToEdit?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={clientToEdit?.image}
                      alt="avatar"
                      width={75}
                      height={85}
                    />
                  ) : (
                    <UploadButton isLoading={createService.isLoading} />
                  )}
                </Upload>
              </Form.Item> */}

              <Form.Item
                label="Nome"
                name="name"
                rules={[{ message: "Campo Obrigatório!" }]}
              >
                <Input
                  size="large"
                  // prefix={<ScissorOutlined />}
                  placeholder="Nome"
                />
              </Form.Item>

              <Form.Item
                label="Telefone"
                name="phone"
                rules={[{ message: "Campo Obrigatório!" }]}
              >
                <Input
                  size="large"
                  // prefix={<ScissorOutlined />}
                  placeholder="(99) 99999-9999"
                />
              </Form.Item>

              <Form.Item
                label="Telefone"
                name="email"
                rules={[{ message: "Campo Obrigatório!" }]}
              >
                <Input
                  size="large"
                  // prefix={<ScissorOutlined />}
                  placeholder="teste@teste.com"
                />
              </Form.Item>

              {/* <Form.Item
                label="Telefone"
                name="phone"
                rules={[{ message: "Campo Obrigatório!" }]}
              >
                <Input
                  size="large"
                  // prefix={<ScissorOutlined />}
                  placeholder="(99) 99999-9999"
                />
              </Form.Item> */}

              <C.ButtonSubmit
                type="primary"
                loading={editClient.isLoading}
                size="large"
                htmlType="submit"
              >
                ATUALIZAR
              </C.ButtonSubmit>
            </C.FormContentWrapper>
          </C.FormContainer>
        </C.ProfileContainer>
      </C.Container>
      <FooterClient />
    </>
  );
}
