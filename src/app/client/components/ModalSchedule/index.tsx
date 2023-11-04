"use client";

import {
  ScheduleOutputDTO,
  SchedulesUpdateParamsDTO,
} from "@/@types/schedules";
import { disableDateByDayOfWeek } from "@/helpers/utils/disableDateByDayOfWeek";

import { clientService } from "@/services/client";
import { employeeService } from "@/services/employee";
import { scheduleService } from "@/services/schedule";
import { serviceApi } from "@/services/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Modal,
  Select,
  DatePicker,
  TimePicker,
  Space,
  SelectProps,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

import styled from "styled-components";
import isBetween from "dayjs/plugin/isBetween";

import { getCookie } from "cookies-next";
import jwtDecode from "jwt-decode";
import { Token } from "@/@types/token";

import { Employee } from "@/@types/employee";
import AvailableHoursBarber from "../AvailableHoursBarber";
import { IService } from "@/@types/service";

dayjs.extend(isBetween);

interface ModalProps {
  scheduleToEdit?: ScheduleOutputDTO;
  open: boolean;
  onClose: () => void;
  employeeInfo?: Employee;
  serviceSelected?: IService;
}

export const ModalSchedule: React.FC<ModalProps> = ({
  scheduleToEdit,
  open,
  onClose,
}) => {
  const [startDateTime, setStartDateTime] = useState<string[]>([]);
  const [endDateTime, setEndDateTime] = useState<string[]>([]);
  const [employeeInfo, setEmployeeInfo] = useState<Employee | null>(null);

  const [tokenName, setTokenName] = useState<Token>({} as Token);
  const [selected, setSelected] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { Option } = Select;

  const { resetFields, setFieldsValue, validateFields, setFieldValue } = form;
  const serviceWatch = Form.useWatch("services", {
    form,
    preserve: true,
  });

  const startDateTimeWatch = Form.useWatch("start_date_time", {
    form,
    preserve: true,
  });

  const barberWatch = Form.useWatch("employee", {
    form,
    preserve: true,
  });

  const { data, isLoading } = useQuery(["employees"], {
    queryFn: () => employeeService.getAllBarbers(),
  });

  const { data: dataClients, isLoading: isLoadingClients } = useQuery(
    ["clients"],
    {
      queryFn: () => clientService.getAllClients(),
    }
  );

  const { data: dataServices, isLoading: isLoadingServices } = useQuery(
    ["services"],
    {
      queryFn: () => serviceApi.getServicesOnly(),
    }
  );

  const createSchedule = useMutation({
    mutationFn: (data: ScheduleOutputDTO) => scheduleService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["schedulings"]),
        queryClient.invalidateQueries(["clients"]);
    },
  });

  const editSchedule = useMutation({
    mutationFn: (data: SchedulesUpdateParamsDTO) =>
      scheduleService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["schedulings"]),
        queryClient.invalidateQueries(["clients"]);
    },
  });

  const handleCancel = () => {
    if (createSchedule.isLoading || editSchedule.isLoading) {
      return;
    }

    resetFields();
    onClose();
  };

  const handleSubmit = () => {
    validateFields()
      .then((data) => {
        if (scheduleToEdit) {
          editSchedule
            .mutateAsync({
              ...scheduleToEdit,
              ...data,
              start_date_time: dayjs(selectedDate)
                .set("hour", dayjs(data.start_date_time).get("hour"))
                .set("minute", dayjs(data.start_date_time).get("minute"))
                .toISOString(),
              end_date_time: dayjs(selectedDate)
                .set("hour", dayjs(data.end_date_time).get("hour"))
                .set("minute", dayjs(data.end_date_time).get("minute"))
                .toISOString(),
            })
            .then(() => {
              handleCancel();
            })
            .catch(() => {});
        } else {
          createSchedule
            .mutateAsync({
              ...data,
              start_date_time: dayjs(selectedDate)
                .set("hour", dayjs(data.start_date_time).get("hour"))
                .set("minute", dayjs(data.start_date_time).get("minute"))
                .toISOString(),
              end_date_time: dayjs(selectedDate)
                .set("hour", dayjs(data.end_date_time).get("hour"))
                .set("minute", dayjs(data.end_date_time).get("minute"))
                .toISOString(),
            })
            .then(() => {
              handleCancel();
            })
            .catch(() => {});
        }
      })
      .catch(() => {});
  };

  const handleSelectChange = (selectedValue: string) => {
    setSelected(selectedValue);
    // Encontre o barbeiro selecionado
    const selectedBarber = data?.find((item) => item.id === selectedValue);

    // Verifique se o barbeiro foi encontrado
    if (selectedBarber) {
      // Acesse os available_days do barbeiro selecionado
      const availableDays = selectedBarber.shifts.flatMap((shift) =>
        shift.available_days.map((day) => day)
      );

      // Atualize o estado com os available_days
      setDayOfWeek(availableDays);
    } else {
      // Caso o barbeiro não seja encontrado, defina dayOfWeek como vazio

      setDayOfWeek([]);
    }
    setSelectedDate(null);
  };

  useEffect(() => {
    if (scheduleToEdit) {
      setFieldsValue({
        id: scheduleToEdit.id,
        start_date_time: dayjs(scheduleToEdit.start_date_time),
        end_date_time: dayjs(scheduleToEdit.end_date_time),
        services: scheduleToEdit.services.map((service) => service.id),
        client: scheduleToEdit.client.id,
        employee: scheduleToEdit.employee.id,
      });
      handleSelectChange(scheduleToEdit.employee.id);

      setSelectedDate(dayjs(scheduleToEdit.start_date_time));
    }
  }, [scheduleToEdit, setFieldsValue]);

  const handleChangeDatePicker = (value: Dayjs | null) => {
    setSelectedDate(value);
  };

  useEffect(() => {
    let totalMinutes = 0;

    serviceWatch?.forEach((selectedService: string) => {
      const service = dataServices?.find((item) => item.id === selectedService);
      if (service) {
        totalMinutes += service.time;
      }
    });

    if (totalMinutes > 0 && startDateTimeWatch) {
      setFieldValue(
        "end_date_time",
        dayjs(startDateTimeWatch).add(totalMinutes, "m")
      );
    } else {
      setFieldValue("end_date_time", null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceWatch, startDateTimeWatch]);

  useEffect(() => {
    const accessToken = getCookie("@hairhub:client");

    if (!accessToken) {
      return;
    }

    const decodedToken: Token = jwtDecode(accessToken);

    setTokenName(decodedToken);
  }, []);

  useEffect(() => {
    const barberWatchArray = Array.isArray(barberWatch)
      ? barberWatch
      : [barberWatch];

    barberWatchArray.forEach((selectedEmployee: string) => {
      const employee = data?.find((item) => item.id === selectedEmployee);
      if (employee) {
        setStartDateTime(
          employee.shifts.map((shift) =>
            dayjs(shift.start_time).format("HH:mm")
          )
        );

        setEndDateTime(
          employee.shifts.map((shift) => dayjs(shift.end_time).format("HH:mm"))
        );

        setEmployeeInfo(employee);
      }
    });
  }, [barberWatch]);

  return (
    <ModalWrapper
      centered
      title={`${scheduleToEdit ? "EDITAR" : "ADICIONAR"} AGENDAMENTO `}
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
          loading={createSchedule.isLoading || editSchedule.isLoading}
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
          disabled={createSchedule.isLoading || editSchedule.isLoading}
          form={form}
          initialValues={{
            name: "",
          }}
        >
          <Form.Item
            required
            label="Barbeiro"
            name="employee"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
          >
            <Select
              placeholder="Selecione um barbeiro"
              // defaultValue="Selecione um barbeiro"
              optionFilterProp="label"
              filterOption={(input: string, option: any) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => handleSelectChange(value as string)}
              options={data?.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>

          <AvailableHoursBarber employeeInfo={employeeInfo as Employee} />

          <Form.Item
            required
            label="Data/Agendamento"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              disabledDate={(current) =>
                disableDateByDayOfWeek(current, dayOfWeek, true)
              }
              onChange={(date) => handleChangeDatePicker(date)}
              format="DD/MM/YYYY"
              value={selectedDate}
            />
          </Form.Item>

          <Form.Item
            required
            label="Cliente"
            name="client"
            style={{ width: "100%" }}
            initialValue={tokenName.name}
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
          >
            <Select
              placeholder="Selecione um barbeiro"
              optionFilterProp="label"
              // onChange={(value) => handleSelectChange(value)}
            >
              <Option value={tokenName.sub}>{tokenName.name}</Option>
            </Select>
          </Form.Item>

          <Form.Item
            required
            label="Serviços"
            name="services"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Campo Obrigatório!" }]}
          >
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Selecione serviços"
              optionFilterProp="label"
              filterOption={(input: string, option: any) =>
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              options={dataServices?.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
            />
          </Form.Item>

          <Space.Compact block>
            <Form.Item
              label="Horário/Início"
              required
              style={{ display: "inline-block", width: "50%" }}
              name="start_date_time"
              rules={[{ required: true, message: "" }]}
            >
              <TimePicker
                format="HH:mm"
                style={{ width: "100%" }}
                placeholder="Início"

                // disabledTime={} Desabilitar Hours de acordo com o turno
              />
            </Form.Item>

            <Form.Item
              label="Horário/Fim"
              required
              name="end_date_time"
              style={{ display: "inline-block", width: "50%" }}
              rules={[{ required: true, message: "" }]}
            >
              <TimePicker
                name="end_date_time"
                format="HH:mm"
                style={{ width: "100%" }}
                placeholder="Término"
              />
            </Form.Item>
          </Space.Compact>
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

const InfoContent = styled.div`
  display: flex;
  margin-bottom: 10px;
  align-items: center;

  h4 {
    margin-right: 10px;
  }
`;
