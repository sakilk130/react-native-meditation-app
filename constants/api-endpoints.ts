export const API_ENDPOINTS = {
  GET_MEDITATIONS: '/api/v1/meditation',
  GET_MEDITATION_BY_ID: (id: number) => `/api/v1/meditation/${id}`,
  GET_AFFIRMATIONS_CATEGORY: '/api/v1/affirmation-category',
  GET_AFFIRMATION_GALLERY_BY_ID: (id: number) =>
    `/api/v1/affirmation-gallary/${id}`,
};
