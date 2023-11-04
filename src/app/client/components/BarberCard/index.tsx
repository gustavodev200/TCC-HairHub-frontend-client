"use client";

import { Image } from "antd";
import * as C from "./styles";
import { CommentClientDTO, CommentEmployeeDTO } from "@/@types/comments";
import { translateRole } from "@/helpers/utils/translateRoles";
import { AssignmentType } from "@/@types/role";

export interface BarberCardProps {
  content: string;
  client: CommentClientDTO;
  employee: CommentEmployeeDTO;
}

export const BarberCard = ({ client, employee, content }: BarberCardProps) => {
  return (
    <C.Container>
      <C.ContainerOne>
        <C.AttendPerBarbeiroStyle>
          <span>
            Atendido por: <span>{employee.name}</span>
          </span>
        </C.AttendPerBarbeiroStyle>
        <div>
          <C.AspasContainer>
            <Image src="/images/aspa.svg" width={35} height={35} alt="Aspas" />
          </C.AspasContainer>
          <C.FeedbackClient>{content}</C.FeedbackClient>
        </div>
        <C.ImageContent>
          <Image
            src="https://cdn-icons-png.flaticon.com/256/149/149071.png"
            width={60}
            height={60}
            alt="Logo Hair Hub Barbershop"
            style={{
              borderRadius: "100%",
            }}
          />

          <C.InfoServiceContainer>
            <C.BarberName>{client.name}</C.BarberName>
            <C.SubtitleProfile>
              {translateRole(client.role as AssignmentType)}
            </C.SubtitleProfile>
          </C.InfoServiceContainer>
        </C.ImageContent>
      </C.ContainerOne>
    </C.Container>
  );
};
