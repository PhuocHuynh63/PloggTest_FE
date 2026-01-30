import envConfig from "@configs/env";
import { getSession } from "next-auth/react";
type CustomOptions = RequestInit & {
  baseUrl?: string;
};

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  options: CustomOptions = {}
) => {
  let accessToken: string | undefined;

  try {
    if (typeof window !== "undefined") {
      const session = await getSession();
      accessToken = (session as any)?.accessToken;
    } else {
      // const session = await getServerSession(authOptions);
      // accessToken = (session as any)?.accessToken;
    }
  } catch (error) {
    console.error("Error getting session:", error);
  }

  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
    ...options.headers,
  };

  const baseUrl = options.baseUrl || envConfig?.NEXT_PUBLIC_API_URL;
  const fullUrl = `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    method,
    headers,
    body: isFormData ? options.body : options.body ? JSON.stringify(options.body) : undefined,
  });

  // Lấy dữ liệu ra trước
  const payload = await res.json();

  // KIỂM TRA LỖI Ở ĐÂY
  if (!res.ok) {
    // Ném ra một object chứa thông tin lỗi để bên ngoài catch được
    throw {
      statusCode: res.status,
      message: payload?.message || "Đã có lỗi xảy ra",
      error: payload
    };
  }

  return payload as Response;

};

const http = {
  get: <T>(url: string, options?: Omit<CustomOptions, "body">) => request<T>("GET", url, options),
  post: <T>(url: string, body: any, options?: Omit<CustomOptions, "body">) => request<T>("POST", url, { ...options, body }),
  put: <T>(url: string, body: any, options?: Omit<CustomOptions, "body">) => request<T>("PUT", url, { ...options, body }),
  patch: <T>(url: string, body: any, options?: Omit<CustomOptions, "body">) => request<T>("PATCH", url, { ...options, body }),
  delete: <T>(url: string, body: any, options?: Omit<CustomOptions, "body">) => request<T>("DELETE", url, { ...options, body }),
};

export default http;