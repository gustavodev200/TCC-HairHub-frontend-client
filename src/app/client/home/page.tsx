"use client";

import { serviceApi } from "@/services/service";
import ImageSlider from "../components/ImageSlider";
import { ServiceCard } from "../components/ServiceCard";
import "@/styles/LoadingSmall.css";
import * as C from "./styles";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IService } from "@/@types/service";
import FeedbackClientsSlider from "../components/FeedbackClientsSlider";
import FooterClient from "../components/FooterClient";
import { ScheduleOutputDTO } from "@/@types/schedules";
import { ModalSchedule } from "../components/ModalSchedule";
import { useState } from "react";
import { employeeService } from "@/services/employee";

export default function Home() {
  const queryClient = useQueryClient();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>();
  const [scheduleToEdit, setcheduleToEdit] = useState<ScheduleOutputDTO>();
  const [showModalSchedule, setShowModalSchedule] = useState(false);
  const [selectedConsumeScheduleId, setSelectedConsumeScheduleId] =
    useState<string>();
  const [showModalConsumeSchedule, setShowModalConsumeSchedule] =
    useState(false);

  const { data, isLoading } = useQuery(["services"], {
    queryFn: () => serviceApi.getServicesOnly(),
  });

  const { data: dataEmployee, isLoading: isLoadingEmployee } = useQuery(
    ["employee"],
    {
      queryFn: () => employeeService.getOnlyBarbers(),
    }
  );

  const handleOpenModalSchedule = (schedule?: ScheduleOutputDTO) => {
    if (schedule) {
      setcheduleToEdit(schedule);
    }

    setShowModalSchedule(true);
  };

  const handleOpenModalScheduleService = (id?: string) => {
    if (id) {
      setSelectedConsumeScheduleId(id);
      setSelectedEmployeeId(id);
    }

    setShowModalConsumeSchedule(true);
  };

  const handleCloseModalSchedule = () => {
    setShowModalSchedule(false), setShowModalConsumeSchedule(false);

    if (scheduleToEdit) {
      setcheduleToEdit(undefined);
    }
  };

  return (
    <>
      <ModalSchedule
        open={showModalSchedule}
        scheduleToEdit={scheduleToEdit}
        onClose={handleCloseModalSchedule}
        employeeInfo={dataEmployee?.find(
          (employee) => employee.id === selectedEmployeeId
        )}
      />
      <C.Container>
        <C.SliderImageContainer>
          <ImageSlider />
        </C.SliderImageContainer>

        <C.SelectedServiceContainer>
          <div>
            <C.TitleTopicsPage>Nossos serviços</C.TitleTopicsPage>
            {isLoading ? (
              <div className="loading-antd">
                <C.SpinColor size="large" />
              </div>
            ) : (
              <C.GridContainer>
                {data?.map((service: IService) =>
                  service.status === "active" ? (
                    <ServiceCard key={service.id} service={service} />
                  ) : null
                )}
              </C.GridContainer>
            )}
          </div>

          <div>
            <C.TitleTopicsPage>Nossos Clientes</C.TitleTopicsPage>
            <C.BarberSelectedConatainer>
              <FeedbackClientsSlider />
            </C.BarberSelectedConatainer>
          </div>
        </C.SelectedServiceContainer>
      </C.Container>
      <FooterClient />
    </>
  );
}
