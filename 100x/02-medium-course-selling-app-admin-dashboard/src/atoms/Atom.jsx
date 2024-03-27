import { atom } from "recoil"
const varUserName = atom({
    key : 'userName',
    default : ""
})

const varPassword = atom({
    key: 'password',
    default : ""
})

export {varUserName, varPassword} 