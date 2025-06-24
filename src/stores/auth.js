import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useApi } from '@/composables/useApi';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'));
  const user = ref(JSON.parse(localStorage.getItem('user')));

  const isLoggedIn = computed(() => !!token.value);

  function setToken(newToken) {
    token.value = newToken;
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
  }
  
  async function login(credentials) {
    const { data, error, fetchData } = useApi('account/login');
    await fetchData({
      method: 'post',
      data: credentials,
    });

    if (data.value && data.value.token) {
      setToken(data.value.token);
      // You might want to fetch user details here and set the user ref
      return true;
    }
    return false;
  }

  async function signup(credentials) {
    const { data, error, fetchData } = useApi('account/signup');
    const { username, password } = credentials;

    await fetchData({
      method: 'post',
      data: credentials,
    });

    if (error.value) {
      // Extract and show backend validation errors if possible
      const errorMessages = error.value.response?.data;
      if (errorMessages) {
        alert(Object.values(errorMessages).join('\n'));
      }
      return false;
    }

    // Automatically log in after successful signup
    return await login({ username, password });
  }

  function logout() {
    setToken(null);
    user.value = null;
    localStorage.removeItem('user');
  }

  return { token, user, isLoggedIn, login, logout, setToken, signup };
}); 