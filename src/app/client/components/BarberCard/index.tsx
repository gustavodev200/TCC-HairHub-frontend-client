"use client";

import { Image } from "antd";
import * as C from "./styles";

export const BarberCard = () => {
  return (
    <C.Container>
      <C.ContainerOne>
        <div>
          <C.AspasContainer>
            <Image src="/images/aspa.svg" width={35} height={35} alt="Aspas" />
          </C.AspasContainer>
          <C.FeedbackClient>
            É um site bem completo e inteligente. Sistema MT bom para barbeiros
            e para quem quer encontrar barbearias em qlqr lugar do Brasil
          </C.FeedbackClient>
        </div>
        <C.ImageContent>
          <Image
            src="https://i0.wp.com/www.canalmasculino.com.br/wp-content/uploads/2017/08/cortes-cabelo-masculinos-side-part-01-570x570.jpg?resize=570%2C570"
            width={60}
            height={60}
            alt="Logo Hair Hub Barbershop"
            style={{
              borderRadius: "100%",
            }}
          />

          <C.InfoServiceContainer>
            <C.BarberName>Rodrigo do corte</C.BarberName>
            <C.SubtitleProfile>Barbeiro</C.SubtitleProfile>
          </C.InfoServiceContainer>
        </C.ImageContent>
      </C.ContainerOne>
    </C.Container>
  );
};
