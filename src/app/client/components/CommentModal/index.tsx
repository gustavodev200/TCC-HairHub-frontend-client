"use client";

import { Client } from "@/@types/client";
import { CommentInputDTO, CommentOutputDTO } from "@/@types/comments";
import { ScheduleOutputDTO } from "@/@types/schedules";
import { Token } from "@/@types/token";
import { clientService } from "@/services/client";
import { commentService } from "@/services/comments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Modal, Input, Select } from "antd";
import { Rate } from "antd/lib";
import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import styled from "styled-components";

const { TextArea } = Input;

interface ModalProps {
  commentToEdit?: CommentOutputDTO;
  open: boolean;
  onClose: () => void;
  selectedCommentScheduleById?: ScheduleOutputDTO;
}

export const CommentModal: React.FC<ModalProps> = ({
  commentToEdit,
  open,
  onClose,
  selectedCommentScheduleById,
}) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [user, setUser] = useState<Token | null>(null);

  const { resetFields, setFieldsValue, validateFields } = form;

  useEffect(() => {
    const accessToken = getCookie("@hairhub:client");

    const decodedToken: Token = jwtDecode(accessToken as string);
    setUser(decodedToken);
  }, []);

  const { data: dataClients, isLoading } = useQuery(["clients", user?.sub], {
    enabled: !!user,
    queryFn: () => clientService.getClientById(user?.sub as string),
  });

  const createComments = useMutation({
    mutationFn: (data: CommentInputDTO) => commentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });

  //   const editComments = useMutation({
  //     mutationFn: (data: CommentOutputDTO) => commentService.update(data),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["categories"]);
  //     },
  //   });

  const handleCancel = () => {
    if (createComments.isLoading) {
      return;
    }

    resetFields();
    onClose();
  };

  const handleSubmit = () => {
    validateFields()
      .then((data) => {
        const dataToUse = {
          ...data,
          client: {
            id: dataClients?.id,
          },
          employee: {
            id: selectedCommentScheduleById?.employee.id,
          },
        };

        if (commentToEdit) {
          //   editComments
          //     .mutateAsync({
          //       ...commentToEdit,
          //       ...data,
          //     })
          //     .then(() => {
          //       handleCancel();
          //     })
          //     .catch(() => {});
        } else {
          createComments
            .mutateAsync(dataToUse)
            .then(() => {
              handleCancel();
            })
            .catch(() => {});
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (commentToEdit && dataClients) {
      setFieldsValue({
        content: commentToEdit.content,
        client: dataClients.id,
        employee: selectedCommentScheduleById?.employee.id,
      });
    }
  }, [commentToEdit, setFieldsValue, dataClients]);

  return (
    <ModalWrapper
      centered
      title={`${commentToEdit ? "EDITAR" : "ADICIONAR"} COMENTÁRIO`}
      open={open}
      onCancel={handleCancel}
      footer={[
        <ButtonModal
          onClick={handleCancel}
          key="cancel"
          type="primary"
          backgroundcolor="#F05761"
        >
          Cancelar
        </ButtonModal>,

        <ButtonModal
          key="save"
          type="primary"
          backgroundcolor="#6cb66f"
          loading={createComments.isLoading}
          onClick={handleSubmit}
        >
          Salvar
        </ButtonModal>,
      ]}
    >
      <FormContainer>
        <Form
          layout="vertical"
          size="middle"
          disabled={createComments.isLoading}
          form={form}
          initialValues={{
            name: "",
          }}
        >
          <Form.Item
            required
            label="Avaliar"
            name="star"
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
          >
            <Rate />
          </Form.Item>

          <Form.Item
            required
            label="Comentário"
            name="content"
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Cliente" name="client" style={{ width: "100%" }}>
            <Select
              disabled
              mode="tags"
              style={{ width: "100%" }}
              optionFilterProp="label"
              filterOption={(input: string, option: any) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              defaultValue={[
                { label: dataClients?.name, value: dataClients?.id },
              ]}
            />
          </Form.Item>

          <Form.Item label="Barbeiro" name="employee" style={{ width: "100%" }}>
            <Select
              disabled
              mode="tags"
              style={{ width: "100%" }}
              optionFilterProp="label"
              filterOption={(input: string, option: any) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              defaultValue={[
                {
                  label: selectedCommentScheduleById?.employee?.name,
                  value: selectedCommentScheduleById?.employee?.id,
                },
              ]}
            />
          </Form.Item>
        </Form>
      </FormContainer>
    </ModalWrapper>
  );
};

const FormContainer = styled.div`
  margin: 25px 0;
`;

const ModalWrapper = styled(Modal)`
  margin-top: 15;
`;

const ButtonModal = styled(Button)`
  background: ${(props) => props.backgroundcolor};
`;
