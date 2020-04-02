import { axiosInstance } from 'boot/axios';

export async function fetchUser({ commit }) {
  try {
    const { data, status } = await axiosInstance.get('/user/profile');

    if (status === 200) {
      commit('setUser', data);
    }
    if (status === 401) {
      commit('clearUser');
    }
  } catch (error) {
    console.error(error);
  }
}

export async function setDarkMode({ commit }, payload) {
  try {
    const { data, status } = await axiosInstance.post('/user/darkmode', {
      darkmode: payload,
    });

    if (status === 200) {
      commit('setDarkMode', data.darkMode);
    }
  } catch (error) {
    console.error(error);
  }
}