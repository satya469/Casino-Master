import { AXIOS_REQUEST } from "../auth/index"

export const Bonusmenuload = async (type) => {
    const rdata = await AXIOS_REQUEST("promotions/bonusMenuloadFromMail", {type})
    return rdata
}

export const ClaimRequest = async (data) => {
    const rdata = await AXIOS_REQUEST("promotions/ClaimRequest", {data})
    return rdata
}

export const CancelEvent = async (data) => {
    const rdata = await AXIOS_REQUEST("promotions/CancelRequest", {data})
    return rdata
}