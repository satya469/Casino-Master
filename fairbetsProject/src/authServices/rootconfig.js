
const select = "fairbets"
 /*eslint-disable */
const local = {
  apiurl: "http://localhost:1998/admin/",
  socket : null,
  imageurl  : 'https://cms.fairbets.co/uploads/',
  // imageurl  : 'http://localhost:1998/uploads/',
  appurl  : 'https://cms.fairbets.co/apps/',
  homepagedomain : "https://fairbets.co",
  admindomain : "http://localhost:1998",
  token : "player_fairbets_token",
  id_preffix : "fair"
}

const domainconfig = {
  kasino9 : { domain : "kasino9.com", prefix : "kas"},
  starkasino : { domain : "starkasino.io", prefix : "star"},
  kasagames : { domain : "kasagames.com", prefix : "kas"},
  onepari : { domain : "onepari.com", prefix : "one"},
  fairbets : { domain : "fairbets.co", prefix : "fair"},
  grandwin : { domain : "grandwin777.com", prefix : "gran"},  
  pride777 : { domain : "pride777.com", prefix : "pri"},
  rbet1 : { domain : "rbet1.com", prefix : "rbet"},
  rbet : { domain : "rbet.com", prefix : "rbet"},
  royal : { domain : "royalbetz.com", prefix : "royal"},
  cbet : { domain : "cbet247.com", prefix : "cbet"}
}

const domain = domainconfig[select].domain

const pro = {
  apiurl: `https://cms.${domain}/admin/`,
  imageurl  : `https://cms.${domain}/uploads/`,
  appurl  : `https://cms.${domain}/apps/`,
  homepagedomain : `https://${domain}`,
  admindomain : `https://cms.${domain}`,
  token : `player${domain}token`, 
  telegramtoken : `playertelegram${domain}token`,
  id_preffix : domainconfig[select].prefix,
  socket : null,

}

// export const Root = process.env.NODE_ENV !== "development" ? local : pro
export const Root = local

export const fairbets = select === "fairbets"
export const starkasino = select === "starkasino" || select === "onepariio"
export const imageicon = true
export const onepariio = select === "onepariio"

 /*eslint-enable */