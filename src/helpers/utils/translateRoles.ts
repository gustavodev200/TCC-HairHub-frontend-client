import { AssignmentType } from "@/@types/role";

export const translateRole = (role: AssignmentType): string => {
  switch (role) {
    case AssignmentType.ADMIN:
      return "Administrador";
    case AssignmentType.EMPLOYEE:
      return "Funcionário";
    case AssignmentType.CLIENT:
      return "Cliente";
    case AssignmentType.ATTENDANT:
      return "Atendente";
    default:
      return role;
  }
};
