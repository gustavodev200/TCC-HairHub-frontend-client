"use client";

import { Button, Image, Space } from "antd";
import * as C from "./styles";
import { formatCurrency } from "@/helpers/utils/formatCurrency";
import { ScheduleOutputDTO } from "@/@types/schedules";

export const MySchedulesCard = ({
  key,
  schedule,
}: {
  key: string;
  schedule: ScheduleOutputDTO;
}) => {
  return (
    <C.Container>
      <C.ContentOneCard>
        <C.ImageContent>
          <Image
            src="https://i0.wp.com/www.canalmasculino.com.br/wp-content/uploads/2017/08/cortes-cabelo-masculinos-side-part-01-570x570.jpg?resize=570%2C570"
            width={60}
            height={60}
            alt="Logo Hair Hub Barbershop"
            style={{
              borderRadius: "10px",
            }}
          />

          <C.InfoNameBarber>
            <span>PROFISSIONAL:</span>
            <h5>{schedule.employee.name}</h5>
          </C.InfoNameBarber>
        </C.ImageContent>
        <C.ScheduledContent>
          <C.ScheduledContentDay>
            <span>AGENDADO PARA:</span>
            <span>{schedule.start_date_time}</span>
          </C.ScheduledContentDay>
          <C.ScheduledContentHours>
            <span>HORÁRIO:</span>
            <span>{schedule.start_date_time}</span>
          </C.ScheduledContentHours>
        </C.ScheduledContent>
      </C.ContentOneCard>

      <C.ContentTwoCard>
        {schedule.services?.map((item) => (
          <>
            <C.ScheduledContentService>
              <span>SERVIÇO:</span>
              <h6>{item.name}</h6>
            </C.ScheduledContentService>

            <C.ScheduledContentCurrency>
              <span>VALOR:</span>
              <span>{formatCurrency(item.price as number)}</span>
            </C.ScheduledContentCurrency>
          </>
        ))}
      </C.ContentTwoCard>

      <C.ButtonContent>
        <C.ButtonStyle type="primary" color="#c1820b">
          EDITAR
        </C.ButtonStyle>

        <C.ButtonStyle type="primary" color="#3498DB">
          CONFIRMAR
        </C.ButtonStyle>
        <C.ButtonStyle type="primary" color="#E74C3C">
          CANCELAR
        </C.ButtonStyle>
      </C.ButtonContent>
    </C.Container>
  );
};
