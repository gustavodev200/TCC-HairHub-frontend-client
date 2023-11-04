import { CommentInputDTO, CommentOutputDTO } from "@/@types/comments";
import Api from "./api";
import { SuccessMessages } from "@/@types/messages";

const baseUrl = "/comments";

async function create(data: CommentInputDTO): Promise<CommentOutputDTO> {
  return Api.post(`${baseUrl}`, data, {
    headers: {
      authHeader: true,
      "success-message": SuccessMessages.MSGS04,
    },
  }).then((res) => res.data);
}

async function getComments(): Promise<CommentOutputDTO[]> {
  return Api.get(`${baseUrl}`, {
    headers: {
      authHeader: true,
    },
  }).then((res) => res.data);
}

export const commentService = { create, getComments };
