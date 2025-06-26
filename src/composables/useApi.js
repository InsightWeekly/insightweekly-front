import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';

const API_URL = import.meta.env.VITE_API_URL;

export function useApi(endpoint) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);
  const authStore = useAuthStore();

  const fetchData = async (options = {}) => {
    loading.value = true;
    error.value = null;
    try {
      const url = `${API_URL}/${endpoint}`;

      const headers = options.headers || {};
      if (authStore.token) {
        headers['Authorization'] = `Token ${authStore.token}`;
      }

      const response = await axios({
        url,
        ...options,
        headers,
      });
      data.value = response.data;
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  };

  return { data, error, loading, fetchData };
} 