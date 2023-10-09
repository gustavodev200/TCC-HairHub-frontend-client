import {
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import React, { useState } from "react";
import * as C from "./styles";
import { ScheduleOutputDTO } from "@/@types/schedules";

const FooterClient = () => {
  const [scheduleToEdit, setcheduleToEdit] = useState<ScheduleOutputDTO>();
  const [showModalSchedule, setShowModalSchedule] = useState(false);

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
    <C.FooterContainer style={{ textAlign: "center", background: "#242731" }}>
      <C.FooterInfos>
        <div>
          <Image
            src="/images/logo_hair_hub.svg"
            width={100}
            height={100}
            alt="Logo Hair Hub"
          />
        </div>
        <C.FooterContact>
          <C.FooterTitle>Contato</C.FooterTitle>
          <span>{`(62) 985623456`}</span>
          <a>hairhuboficial@gmail.com</a>
        </C.FooterContact>
        <C.FooterSocialMedia>
          <C.FooterTitle>Rede social</C.FooterTitle>
          <C.FooterContentSocialMedia>
            <a href="#" target="_blank">
              <InstagramOutlined />
            </a>
            <a href="#" target="_blank">
              <FacebookOutlined />
            </a>
            <a href="#">
              <TwitterOutlined />
            </a>
          </C.FooterContentSocialMedia>
        </C.FooterSocialMedia>
        <C.FooterBarberNav>
          <C.FooterTitle>Barbearia</C.FooterTitle>
          <C.FooterBarberNavLink href="/client/home">
            Home
          </C.FooterBarberNavLink>
          <C.FooterBarberNavLink href="/client/schedules">
            Agendamentos
          </C.FooterBarberNavLink>
          <C.FooterBarberNavLink href="/client/profile">
            Meu Perfil
          </C.FooterBarberNavLink>
        </C.FooterBarberNav>
        <C.FooterKnowBarber>
          <C.FooterTitle>Venha conhecer nossa Barbearia!</C.FooterTitle>
          <C.ButtonContainer>
            <C.ButtonContent onClick={() => handleOpenModalSchedule()}>
              <span>
                <CalendarOutlined />
              </span>{" "}
              AGENDAR
            </C.ButtonContent>
          </C.ButtonContainer>
        </C.FooterKnowBarber>
      </C.FooterInfos>

      <C.FooterCopyright>
        <span>
          Hair Hub Barbershop ©2023 Created by <span>Gustavo Lage</span>
        </span>
      </C.FooterCopyright>
    </C.FooterContainer>
  );
};

export default FooterClient;
