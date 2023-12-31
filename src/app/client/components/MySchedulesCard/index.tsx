"use client";

import { Image } from "antd";
import {
  CheckCircleOutlined,
  StopOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import * as C from "./styles";
import { formatCurrency } from "@/helpers/utils/formatCurrency";
import { ScheduleOutputDTO } from "@/@types/schedules";
import { changeFormatData } from "@/helpers/utils/changeFormatData";
import { changeFormatHour } from "@/helpers/utils/changeFormatHour";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { scheduleService } from "@/services/schedule";
import { CommentOutputDTO } from "@/@types/comments";
import { useState } from "react";
import { CommentModal } from "../CommentModal";
import { trace } from "console";
import { ScheduleStatus } from "@/@types/scheduleStatus";

export const MySchedulesCard = ({
  schedule,
  onEdit,
}: {
  schedule: ScheduleOutputDTO;
  onEdit: (schedule: ScheduleOutputDTO) => void;
}) => {
  const queryClient = useQueryClient();
  const [commentToEdit, setCommentToEdit] = useState<CommentOutputDTO>();
  const [showModalComment, setShowModalComment] = useState(false);
  const [selectedCommentScheduleById, setSelectedCommentScheduleById] =
    useState<string>();

  const { data } = useQuery({
    queryKey: ["schedulings"],
    queryFn: () => scheduleService.getPaginated(),
  });

  const handleOpenModalComment = (comment?: CommentOutputDTO) => {
    if (comment) {
      setCommentToEdit(comment);
    }

    setShowModalComment(true);
  };

  const handleOpenModalScheduleComment = (id?: string) => {
    if (id) {
      setSelectedCommentScheduleById(id);
    }

    setShowModalComment(true);
  };

  const handleCloseModalComment = () => {
    setShowModalComment(false);
    if (commentToEdit) {
      setCommentToEdit(undefined);
    }
  };

  const changeStatus = useMutation({
    mutationFn: (params: any) =>
      scheduleService.changeStatus(params.id, params.schedule_status),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["schedulings"]),
        queryClient.invalidateQueries(["clients"]);
    },
  });

  return (
    <>
      <C.Container>
        <C.ContentOneCard>
          <C.ImageContent>
            <Image
              src="https://cdn-icons-png.flaticon.com/256/149/149071.png"
              width={60}
              height={60}
              alt="Logo Hair Hub Barbershop"
              style={{
                borderRadius: "10px",
              }}
            />

            <C.InfoNameBarber>
              <span>PROFISSIONAL:</span>
              <h5>{schedule.employee?.name}</h5>
            </C.InfoNameBarber>
          </C.ImageContent>
          <C.ScheduledContent>
            <C.ScheduledContentDay>
              <span>AGENDADO PARA:</span>
              <span>{changeFormatData(schedule.start_date_time)}</span>
            </C.ScheduledContentDay>
            <C.ScheduledContentHours>
              <span>HORÁRIO:</span>
              <span>{changeFormatHour(schedule.start_date_time)}</span>
            </C.ScheduledContentHours>
          </C.ScheduledContent>
        </C.ContentOneCard>

        {schedule.services?.map((item) => (
          <C.ContentTwoCard key={item.id}>
            <C.ScheduledContentService>
              <span>SERVIÇO:</span>
              <h6>{item.name}</h6>
            </C.ScheduledContentService>

            <C.ScheduledContentCurrency>
              <span>VALOR:</span>
              <span>{formatCurrency(item.price as number)}</span>
            </C.ScheduledContentCurrency>
          </C.ContentTwoCard>
        ))}

        <C.ContainerActions>
          {schedule.schedule_status === ScheduleStatus.CONFIRMED && (
            <C.ConfirmedScheduleCard>
              <LikeOutlined /> CONFIRMADO
            </C.ConfirmedScheduleCard>
          )}
          {schedule.schedule_status !== ScheduleStatus.CANCELED ? (
            <>
              {schedule.schedule_status !== ScheduleStatus.FINISHED ? (
                <C.ButtonContent>
                  {schedule.schedule_status !== ScheduleStatus.CONFIRMED && (
                    <C.ButtonStyle
                      onClick={() => onEdit(schedule)}
                      type="primary"
                      color="#c1820b"
                    >
                      EDITAR
                    </C.ButtonStyle>
                  )}

                  {schedule.schedule_status === ScheduleStatus.SCHEDULED && (
                    <C.ButtonStyle
                      loading={changeStatus.isLoading}
                      type="primary"
                      color="#3498DB"
                      onClick={() =>
                        changeStatus.mutate({
                          id: schedule.id as string,
                          schedule_status: ScheduleStatus.CONFIRMED,
                        })
                      }
                    >
                      CONFIRMAR
                    </C.ButtonStyle>
                  )}

                  {schedule.schedule_status !== ScheduleStatus.CONFIRMED && (
                    <C.ButtonStyle
                      type="primary"
                      color="#E74C3C"
                      onClick={() =>
                        changeStatus.mutate({
                          id: schedule.id,
                          schedule_status: ScheduleStatus.CANCELED,
                        })
                      }
                    >
                      CANCELAR
                    </C.ButtonStyle>
                  )}
                </C.ButtonContent>
              ) : (
                <C.ScheduleStatusFinished>
                  <C.ButtonStyle
                    type="primary"
                    color="#782ecc"
                    onClick={() => handleOpenModalScheduleComment(schedule.id)}
                  >
                    AVALIAR
                  </C.ButtonStyle>
                  <C.FinishedScheduleCard>
                    <CheckCircleOutlined /> FINALIZADO
                  </C.FinishedScheduleCard>
                </C.ScheduleStatusFinished>
              )}
            </>
          ) : (
            <C.ScheduleStatusFinished>
              <C.CanceledScheduleCard>
                <StopOutlined /> CANCELADO
              </C.CanceledScheduleCard>
            </C.ScheduleStatusFinished>
          )}
        </C.ContainerActions>
      </C.Container>

      <CommentModal
        open={showModalComment}
        commentToEdit={commentToEdit}
        onClose={handleCloseModalComment}
        selectedCommentScheduleById={data?.data.find(
          (comment) => comment.id === selectedCommentScheduleById
        )}
      />
    </>
  );
};
