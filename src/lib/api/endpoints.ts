export const API_ENDPOINTS = {
  // User 관련
  users: {
    list: '/api/v1/users',
    detail: (id: number) => `/api/v1/users/${id}`,
    create: '/api/v1/users',
    update: (id: number) => `/api/v1/users/${id}`,
    delete: (id: number) => `/api/v1/users/${id}`,
  },
} as const;
