"use client";

import { useEffect, useState } from "react";
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
import { CommentModal } from "../components/CommentModal";
import { CommentOutputDTO } from "@/@types/comments";
import { Client } from "@/@types/client";

export default function Schedules() {
  const [scheduleToEdit, setScheduleToEdit] = useState<ScheduleOutputDTO>();
  const [showModalSchedule, setShowModalSchedule] = useState(false);
  const [user, setUser] = useState<Token | null>(null);

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

  useEffect(() => {
    const accessToken = getCookie("@hairhub:client");

    const decodedToken: Token = jwtDecode(accessToken as string);
    setUser(decodedToken);
  }, []);

  const { data, isLoading } = useQuery(["clients", user?.sub], {
    enabled: !!user,
    queryFn: () => clientService.getClientById(user?.sub as string),
  });

  return (
    <>
      <ModalSchedule
        open={showModalSchedule}
        scheduleToEdit={scheduleToEdit}
        onClose={handleCloseModalSchedule}
      />
      {isLoading ? (
        <SpinColor />
      ) : (
        <C.Container>
          <C.Content>
            <C.Title>Meus Agendamentos</C.Title>

            {isLoading ? (
              <SpinColor />
            ) : (
              <C.MySchedulesContainer>
                {data?.scheduling?.length !== undefined &&
                data.scheduling.length > 0 ? (
                  data.scheduling.map((schedule) =>
                    schedule.schedule_status !== "canceled" ? (
                      <MySchedulesCard
                        key={schedule.id as string}
                        schedule={schedule}
                        onEdit={handleOpenModalSchedule}
                      />
                    ) : null
                  )
                ) : (
                  <C.MessageScheduleNotFound>
                    Nenhum agendamento encontrado.
                  </C.MessageScheduleNotFound>
                )}
              </C.MySchedulesContainer>
            )}
          </C.Content>
        </C.Container>
      )}

      <FooterClient />
    </>
  );
}
