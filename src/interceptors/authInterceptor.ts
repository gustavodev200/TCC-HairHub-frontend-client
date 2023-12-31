import { ErrorMessages } from "@/@types/messages";
import { InternalAxiosRequestConfig } from "axios";
import { deleteCookie, getCookie } from "cookies-next";

export const authInterceptor = async (config: InternalAxiosRequestConfig) => {
  const needsToAuth = config.headers?.authHeader !== undefined;

  if (needsToAuth) {
    try {
      const accessToken = getCookie("@hairhub:client");

      if (!accessToken) throw new Error(ErrorMessages.MSGE12);

      const newConfig: any = {
        ...config,

        headers: { ...config.headers, Authorization: `Bearer ${accessToken}` },
      };

      delete newConfig.headers["authHeader"];

      return newConfig;
    } catch {
      deleteCookie("@hairhub:client");
    }
  }

  return config;
};
