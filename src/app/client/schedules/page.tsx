"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FooterClient from "../components/FooterClient";
import * as C from "./styles";
import { SpinColor } from "../home/styles";
import { clientService } from "@/services/client";
import { MySchedulesCard } from "../components/MySchedulesCard";
import { ScheduleOutputDTO } from "@/@types/schedules";
import { ModalSchedule } from "../components/ModalSchedule";
import jwtDecode from "jwt-decode";
import { getCookie } from "cookies-next";
import { Token } from "@/@types/token";

export default function Schedules() {
  const [scheduleToEdit, setScheduleToEdit] = useState<ScheduleOutputDTO>();
  const [showModalSchedule, setShowModalSchedule] = useState(false);

  const accessToken = getCookie("@hairhub");
  const decodedToken: Token = jwtDecode(accessToken as string);

  const { data, isLoading } = useQuery(["clients"], {
    queryFn: () => clientService.getClientById(decodedToken?.sub as string),
  });

  const handleOpenModalSchedule = (schedule?: ScheduleOutputDTO) => {
    if (schedule) {
      setScheduleToEdit(schedule);
    }

    setShowModalSchedule(true);
  };

  const handleCloseModalSchedule = () => {
    setShowModalSchedule(false);

    if (scheduleToEdit) {
      setScheduleToEdit(undefined);
    }
  };

  return (
    <>
      {/* <ModalSchedule
        open={showModalSchedule}
        scheduleToEdit={scheduleToEdit}
        onClose={handleCloseModalSchedule}
      /> */}
      <C.Container>
        <C.Content>
          <C.Title>Meus Agendamentos</C.Title>
          {isLoading ? (
            <SpinColor />
          ) : (
            <C.MySchedulesContainer>
              {data?.scheduling?.length !== undefined &&
              data.scheduling.length > 0 ? (
                data.scheduling.map((schedule) => (
                  <MySchedulesCard
                    key={schedule.id as string}
                    schedule={schedule}
                    onEdit={handleOpenModalSchedule}
                  />
                ))
              ) : (
                <C.MessageScheduleNotFound>
                  Nenhum agendamento encontrado.
                </C.MessageScheduleNotFound>
              )}
            </C.MySchedulesContainer>
          )}
        </C.Content>
      </C.Container>
      <FooterClient />
    </>
  );
}
