"use client";

import { Image } from "antd";
import * as C from "./styles";
import { ClockCircleOutlined } from "@ant-design/icons";
import { IService } from "@/@types/service";
import { formatCurrency } from "@/helpers/utils/formatCurrency";
import { useState } from "react";
import { ScheduleOutputDTO } from "@/@types/schedules";
import { ModalSchedule } from "../ModalSchedule";

interface ServiceCardProps {
  service: IService;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const [scheduleToEdit, setcheduleToEdit] = useState<ScheduleOutputDTO>();
  const [showModalSchedule, setShowModalSchedule] = useState(false);

  const handleOpenModalSchedule = (service?: ScheduleOutputDTO) => {
    if (service) {
      setcheduleToEdit(service);
    }

    setShowModalSchedule(true);
  };
  const handleCloseModalSchedule = () => {
    setShowModalSchedule(false);

    if (scheduleToEdit) {
      setcheduleToEdit(undefined);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <ModalSchedule
        open={showModalSchedule}
        scheduleToEdit={scheduleToEdit}
        onClose={handleCloseModalSchedule}
      />
      <C.Container>
        <C.ContainerOne>
          <C.ImageContent>
            <Image
              src={service.image}
              width={70}
              height={70}
              alt="Logo Hair Hub Barbershop"
              style={{
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </C.ImageContent>

          <C.InfoServiceContainer>
            <h4>{service.name}</h4>
            <span>
              <ClockCircleOutlined style={{ marginRight: "10px" }} />
              {service.time}min
            </span>
            <span>
              <strong>{formatCurrency(service.price)}</strong>
            </span>
          </C.InfoServiceContainer>
        </C.ContainerOne>

        <C.ButtonContainer>
          <C.ButtonContent onClick={() => handleOpenModalSchedule()}>
            AGENDAR
          </C.ButtonContent>
        </C.ButtonContainer>
      </C.Container>
    </>
  );
};
