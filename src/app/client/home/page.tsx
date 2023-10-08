"use client";

import { serviceApi } from "@/services/service";
import { BarberCard } from "../components/BarberCard";
import ImageSlider from "../components/ImageSlider";
import { ServiceCard } from "../components/ServiceCard";

import "@/styles/LoadingSmall.css";
import * as C from "./styles";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { IService } from "@/@types/service";
import FeedbackClientsSlider from "../components/FeedbackClientsSlider";
import { Footer } from "antd/es/layout/layout";

export default function Home() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["services"], {
    queryFn: () => serviceApi.getServicesOnly(),
    onSuccess: () => {
      queryClient.invalidateQueries(["services"]);
    },
  });

  return (
    <>
      <C.Container>
        <C.SliderImageContainer>
          {/* <C.Title>Novidades e Destaques:</C.Title> */}
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
      <Footer style={{ textAlign: "center" }}>
        Hair Hub Barbershop ©2023 Created by Gustavo Lage
      </Footer>
    </>
  );
}
