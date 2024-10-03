import { BASE_URL } from "../base"

const Auth = "rooms"

export const register_api = `${BASE_URL}/${Auth}/register/`
export const login_api = `${BASE_URL}/${Auth}/login/`
export const logout_api = `${BASE_URL}/${Auth}/logout/`
export const room_api = `${BASE_URL}/${Auth}/rooms/`
export const roomview_api = `${BASE_URL}/${Auth}/roomsview/`
export const deposit_api = `${BASE_URL}/${Auth}/deposit/`

// http://localhost:8000/rooms/rooms-filter/?address=Nagarkot

export const filter_room_api = `${BASE_URL}/${Auth}/rooms-filter/`
// export const add_room_api = `${BASE_URL}/${Auth}/rooms/`