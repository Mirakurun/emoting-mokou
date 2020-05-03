export function addMedia(state, payload) {
  state.media.push(payload);
}

export function clearMedia(state) {
  state.media = [];
}

export function clearUser(state) {
  state.displayName = '';
  state.favorites = [];
  state.media = [];
  state.profileBanner = '';
  state.profileImage = '';
  state.role = '';
  state.username = '';
}

export function deleteMedia(state, index) {
  if (index > -1) {
    state.media.splice(index, 1);
  }
}

export function setDarkMode(state, payload) {
  state.darkMode = payload;
}

export function setFavorites(state, payload) {
  state.favorites = payload;
}

export function setUser(state, payload) {
  const {
    darkMode,
    displayName,
    favorites,
    media,
    profileBanner,
    profileImage,
    role,
    username,
  } = payload;

  state.darkMode = darkMode;
  state.displayName = displayName;
  state.favorites = favorites;
  state.media = media;
  state.profileBanner = profileBanner;
  state.profileImage = profileImage;
  state.role = role;
  state.username = username;
}
