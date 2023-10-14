import { AssignmentType } from "@/@types/role";

const prefix = "/client";

const baseRoutes = [
  prefix,
  `${prefix}/home`,
  `${prefix}/schedules`,
  `${prefix}/profile`,
];

const authorizedRoutesByRole = {
  [AssignmentType.CLIENT]: baseRoutes,
  [AssignmentType.EMPLOYEE]: baseRoutes,
  [AssignmentType.ADMIN]: baseRoutes,
  [AssignmentType.ATTENDANT]: baseRoutes,
};

export function getAuthorizedRoutesByRoles(role: AssignmentType) {
  if (role !== AssignmentType.CLIENT) {
    throw new Error(`Invalid role: ${role}. Only CLIENT role is allowed.`);
  }

  return authorizedRoutesByRole[role] || [];
}
