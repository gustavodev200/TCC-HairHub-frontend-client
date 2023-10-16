"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FooterClient from "../components/FooterClient";
import * as C from "./styles";
import { scheduleService } from "@/services/schedule";
import { getCookie } from "cookies-next";
import { Token } from "@/@types/token";
import jwtDecode from "jwt-decode";
import { SpinColor } from "../home/styles";
import { clientService } from "@/services/client";
import { MySchedulesCard } from "../components/MySchedulesCard";
import { ScheduleOutputDTO } from "@/@types/schedules";
import { ModalSchedule } from "../components/ModalSchedule";
import { Employee } from "@/@types/employee";
import { Client } from "@/@types/client";

export default function Schedules() {
  const accessToken = getCookie("@hairhub");
  const decodedToken: Token = jwtDecode(accessToken as string);
  const [scheduleToEdit, setcheduleToEdit] = useState<ScheduleOutputDTO>();
  const [showModalSchedule, setShowModalSchedule] = useState(false);

  const { data, isLoading } = useQuery(["clients"], {
    queryFn: () => clientService.getClientById(decodedToken.sub as string),
  });

  const handleOpenModalSchedule = (schedule?: ScheduleOutputDTO) => {
    if (schedule) {
      setcheduleToEdit(schedule);
    }

    setShowModalSchedule(true);
  };

  const handleCloseModalSchedule = () => {
    setShowModalSchedule(false);

    if (scheduleToEdit) {
      setcheduleToEdit(undefined);
    }
  };

  return (
    <>
      <C.Container>
        <C.Content>
          <C.Title>Meus Agendamentos</C.Title>
          {isLoading ? (
            <SpinColor />
          ) : (
            <C.MySchedulesConatainer>
              {data?.scheduling?.length !== undefined &&
              data.scheduling.length > 0 ? (
                data.scheduling.map((schedule) => (
                  <MySchedulesCard
                    key={schedule.id as string}
                    schedule={schedule}
                    // onEdit={handleOpenModalSchedule}
                  />
                ))
              ) : (
                <C.MessageScheduleNotFound>
                  Nenhum agendamento encontrado.
                </C.MessageScheduleNotFound>
              )}
            </C.MySchedulesConatainer>
          )}
        </C.Content>
      </C.Container>
      <FooterClient />
      {/* <ModalSchedule
        open={showModalSchedule}
        scheduleToEdit={scheduleToEdit as ScheduleOutputDTO}
        onClose={handleCloseModalSchedule}
      /> */}
    </>
  );
}
