import { api } from './client';
import { API_ENDPOINTS } from './endpoints';
import type { User, UserCreateInput, UserUpdateInput, ApiResponse, PaginatedResponse } from '@/types';

// 사용자 목록 조회 (페이지네이션, 검색)
export async function getUsers(params?: {
  page?: number;
  page_size?: number;
  search?: string;
}) {
  const queryParams = new URLSearchParams();

  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.page_size) queryParams.append('page_size', params.page_size.toString());
  if (params?.search) queryParams.append('search', params.search);

  const endpoint = queryParams.toString()
    ? `${API_ENDPOINTS.users.list}?${queryParams.toString()}`
    : API_ENDPOINTS.users.list;

  const response = await api.get<ApiResponse<PaginatedResponse<User>>>(endpoint);
  return response.data!;
}

// 단일 사용자 조회
export async function getUser(id: number) {
  const response = await api.get<ApiResponse<User>>(API_ENDPOINTS.users.detail(id));
  return response.data!;
}

// 사용자 생성
export async function createUser(data: UserCreateInput) {
  const response = await api.post<ApiResponse<User>>(
    API_ENDPOINTS.users.create,
    data
  );
  return response.data!;
}

// 사용자 수정
export async function updateUser(id: number, data: UserUpdateInput) {
  const response = await api.put<ApiResponse<User>>(
    API_ENDPOINTS.users.update(id),
    data
  );
  return response.data!;
}

// 사용자 삭제
export async function deleteUser(id: number) {
  await api.delete<void>(API_ENDPOINTS.users.delete(id));
}
