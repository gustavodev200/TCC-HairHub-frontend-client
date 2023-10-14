"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FooterClient from "../components/FooterClient";
import { MySchedulesCard } from "../components/MySchedulesCard";
import * as C from "./styles";
import { scheduleService } from "@/services/schedule";
import { getCookie } from "cookies-next";
import { Token } from "@/@types/token";
import jwtDecode from "jwt-decode";
import { SpinColor } from "../home/styles";
import { clientService } from "@/services/client";

export default function Schedules() {
  const accessToken = getCookie("@hairhub");
  const decodedToken: Token = jwtDecode(accessToken as string);

  const { data, isLoading } = useQuery(["clients"], {
    queryFn: () => clientService.getClientById(decodedToken.sub as string),
  });

  return (
    <>
      <C.Container>
        <C.Content>
          <C.Title>Meus Agendamentos</C.Title>
          <C.MySchedulesConatainer>
            {isLoading ? (
              <SpinColor />
            ) : (
              data?.schedules?.map((schedule) => (
                <MySchedulesCard
                  key={schedule.id as string}
                  schedule={schedule}
                />
              ))
            )}
          </C.MySchedulesConatainer>
        </C.Content>
      </C.Container>
      <FooterClient />
    </>
  );
}
