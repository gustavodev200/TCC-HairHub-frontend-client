"use client";

import { useState } from "react";
import { Button, Image, Space } from "antd";
import * as C from "./styles";
import { formatCurrency } from "@/helpers/utils/formatCurrency";
import { ScheduleOutputDTO } from "@/@types/schedules";
import { changeFormatData } from "@/helpers/utils/changeFormatData";
import { changeFormatHour } from "@/helpers/utils/changeFormatHour";
import { ModalSchedule } from "../ModalSchedule";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scheduleService } from "@/services/schedule";

export const MySchedulesCard = ({
  schedule,
}: // onEdit,
{
  schedule: ScheduleOutputDTO;
  // onEdit: (schedule?: ScheduleOutputDTO) => void;
}) => {
  const queryClient = useQueryClient();

  const changeStatus = useMutation({
    mutationFn: (params: any) =>
      scheduleService.changeStatus(params.id, params.schedule_status),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["schedulings"]),
        queryClient.invalidateQueries(["clients"]);
    },
  });

  return (
    <>
      <C.Container>
        <C.ContentOneCard>
          <C.ImageContent>
            <Image
              src="https://cdn-icons-png.flaticon.com/256/149/149071.png"
              width={60}
              height={60}
              alt="Logo Hair Hub Barbershop"
              style={{
                borderRadius: "10px",
              }}
            />

            <C.InfoNameBarber>
              <span>PROFISSIONAL:</span>
              <h5>{schedule.employee?.name}</h5>
            </C.InfoNameBarber>
          </C.ImageContent>
          <C.ScheduledContent>
            <C.ScheduledContentDay>
              <span>AGENDADO PARA:</span>
              <span>{changeFormatData(schedule.start_date_time)}</span>
            </C.ScheduledContentDay>
            <C.ScheduledContentHours>
              <span>HORÁRIO:</span>
              <span>{changeFormatHour(schedule.start_date_time)}</span>
            </C.ScheduledContentHours>
          </C.ScheduledContent>
        </C.ContentOneCard>

        {schedule.services?.map((item) => (
          <C.ContentTwoCard key={item.id}>
            <C.ScheduledContentService>
              <span>SERVIÇO:</span>
              <h6>{item.name}</h6>
            </C.ScheduledContentService>

            <C.ScheduledContentCurrency>
              <span>VALOR:</span>
              <span>{formatCurrency(item.price as number)}</span>
            </C.ScheduledContentCurrency>
          </C.ContentTwoCard>
        ))}

        <C.ButtonContent>
          <C.ButtonStyle
            // onClick={() => onEdit(schedule)}
            type="primary"
            color="#c1820b"
          >
            EDITAR
          </C.ButtonStyle>

          {schedule.schedule_status === "scheduled" ? (
            <C.ButtonStyle
              loading={changeStatus.isLoading}
              type="primary"
              color="#3498DB"
              onClick={() =>
                changeStatus.mutate({
                  id: schedule.id as string,
                  schedule_status:
                    schedule.schedule_status === "scheduled"
                      ? "confirmed"
                      : null,
                })
              }
            >
              CONFIRMAR
            </C.ButtonStyle>
          ) : null}
          <C.ButtonStyle type="primary" color="#E74C3C">
            CANCELAR
          </C.ButtonStyle>
        </C.ButtonContent>
      </C.Container>
    </>
  );
};
