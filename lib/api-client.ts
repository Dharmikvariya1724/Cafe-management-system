/**
 * Cafe Management API Client
 * Bridge connecting Next.js Frontend to Express.js + MongoDB Backend Server
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function getAuthHeader(): Record<string, string> {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('admin-token');
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
  }
  return {};
}

export async function fetchFromAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      signal: options.signal || controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
        ...options.headers,
      },
      ...options,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || errorData.message || `HTTP error ${res.status}`);
    }

    return await res.json();
  } catch (error: any) {
    if (error?.name !== 'AbortError') {
      console.warn(`[API Client Warning] Backend request failed (${endpoint}):`, error?.message || error);
    }
    return null;
  }
}

export const api = {
  // Auth API
  loginAdmin: async (username: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid credentials');
      if (data.token) {
        localStorage.setItem('admin-token', data.token);
        localStorage.setItem('admin-logged-in', 'true');
      }
      return data;
    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  },

  verifyAdminToken: async () => {
    return fetchFromAPI<{ authenticated: boolean; user?: any }>('/auth/verify');
  },

  getAdminProfile: () => fetchFromAPI<any>('/auth/profile'),
  updateAdminProfile: (data: any) => fetchFromAPI('/auth/profile', { method: 'PUT', body: JSON.stringify(data) }),
  changeAdminPassword: (data: any) => fetchFromAPI('/auth/change-password', { method: 'PUT', body: JSON.stringify(data) }),

  logoutAdmin: () => {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-logged-in');
  },

  // Menu APIs
  getMenuItems: () => fetchFromAPI<any[]>('/menu'),
  createMenuItem: (data: any) => fetchFromAPI('/menu', { method: 'POST', body: JSON.stringify(data) }),
  updateMenuItem: (id: string, data: any) => fetchFromAPI(`/menu/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteMenuItem: (id: string) => fetchFromAPI(`/menu/${id}`, { method: 'DELETE' }),

  // Order APIs
  getOrders: () => fetchFromAPI<any[]>('/orders'),
  getUnseenOrdersCount: () => fetchFromAPI<{ unseenCount: number }>('/orders/unseen-count'),
  markOrdersSeen: (orderIds?: string[]) => fetchFromAPI('/orders/mark-seen', { method: 'PATCH', body: JSON.stringify({ orderIds }) }),
  createOrder: (data: any) => fetchFromAPI('/orders', { method: 'POST', body: JSON.stringify(data) }),
  updateOrderStatus: (id: string, status: string) => fetchFromAPI(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteOrder: (id: string) => fetchFromAPI(`/orders/${id}`, { method: 'DELETE' }),

  // Settings APIs
  getSettings: () => fetchFromAPI<any>('/settings'),
  updateSettings: (data: any) => fetchFromAPI('/settings', { method: 'PUT', body: JSON.stringify(data) }),

  // Table APIs
  getTables: () => fetchFromAPI<any[]>('/tables'),
  getTableByToken: (token: string) => fetchFromAPI(`/tables/token/${token}`),
  createTable: (data: any) => fetchFromAPI('/tables', { method: 'POST', body: JSON.stringify(data) }),
  updateTable: (id: string, data: any) => fetchFromAPI(`/tables/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTable: (id: string) => fetchFromAPI(`/tables/${id}`, { method: 'DELETE' }),

  // Reservation APIs
  getReservations: () => fetchFromAPI<any[]>('/reservations'),
  createReservation: (data: any) => fetchFromAPI('/reservations', { method: 'POST', body: JSON.stringify(data) }),
  updateReservationStatus: (id: string, status: string) => fetchFromAPI(`/reservations/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  deleteReservation: (id: string) => fetchFromAPI(`/reservations/${id}`, { method: 'DELETE' }),

  // Contact Message APIs
  getMessages: () => fetchFromAPI<any[]>('/messages'),
  createMessage: (data: any) => fetchFromAPI('/messages', { method: 'POST', body: JSON.stringify(data) }),
  toggleMessageReply: (id: string, replied: boolean) => fetchFromAPI(`/messages/${id}/reply`, { method: 'PATCH', body: JSON.stringify({ replied }) }),
  deleteMessage: (id: string) => fetchFromAPI(`/messages/${id}`, { method: 'DELETE' }),

  // Review APIs
  getReviews: () => fetchFromAPI<any[]>('/reviews'),
  getPublicReviews: () => fetchFromAPI<any[]>('/reviews?verified=true'),
  createReview: (data: any) => fetchFromAPI('/reviews', { method: 'POST', body: JSON.stringify(data) }),
  toggleReviewVerification: (id: string, verified: boolean) => fetchFromAPI(`/reviews/${id}/verify`, { method: 'PATCH', body: JSON.stringify({ verified }) }),
  deleteReview: (id: string) => fetchFromAPI(`/reviews/${id}`, { method: 'DELETE' }),

  // Gallery APIs
  getGallery: () => fetchFromAPI<any[]>('/gallery'),
  createGalleryImage: (data: any) => fetchFromAPI('/gallery', { method: 'POST', body: JSON.stringify(data) }),
  updateGalleryImage: (id: string, data: any) => fetchFromAPI(`/gallery/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteGalleryImage: (id: string) => fetchFromAPI(`/gallery/${id}`, { method: 'DELETE' }),

  // Newsletter API
  subscribeNewsletter: (email: string) => fetchFromAPI('/newsletter', { method: 'POST', body: JSON.stringify({ email }) }),
};
