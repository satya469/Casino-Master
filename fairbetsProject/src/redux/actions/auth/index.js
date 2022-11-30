import * as loginAction from "./loginActions"
import { Root } from "../../../authServices/rootconfig"
import { history } from "../../../history"
import axios from "axios"
import { toast } from "react-toastify"
import queryString from "query-string"
import moment from "moment"
import {halfred, fullred} from "../../../configs/providerConfig"

const token = Root.token
const telegramtoken = Root.telegramtoken
const telegramEnable = "isExist"

export default loginAction

export const getURL = () =>{
	return "/"
}

export const Gogletrans = (text) => {

}

export const validateEmailType = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const GetYYMMHH = (date) => {
	return moment(new Date(date)).format('YYYY-MM-DD')
}

export const checkingTelegram = () => {
	const params = queryString.parse(window.location.search)
	if (params.telegram || sessionStorage.getItem(telegramEnable) === "true") {
		return true
	} else {
		return false
	}
}
export const setTelegram = () => {
	sessionStorage.setItem(telegramEnable, "true")
}

export const validateUsername = (fld) => {

	let error = ""

	if (fld === "") {
		error = "You didn't enter a username.\n"
		// toast.error(error);
		alert(error, "error")
		return false
	} else {

	}
	return true
}

export const validateEmail = (fld) => {

	let error = ""

	if (fld === "") {
		error = "You didn't enter a username.\n"
		alert(error, "error")
		return false
	} else if (fld.indexOf("@") !== -1) {
		const mails = fld.split("@")
		const f1 = mails[1].includes(mails[0])
		const f2 = mails[0].includes(mails[1])
		if (f1 || f2) {
			alert("Please enter correct email.", "error")
			return false
		} else {
			return true
		}
	} else {
		return true
	}
}

export const validateEmail1 = (fld) => {

	let error = ""

	if (fld === "") {
		error = "You didn't enter a username.\n"
		alert(error, "error")
		return false
	} else if (fld.indexOf("@") !== -1) {
		const mails = fld.split("@")
		const f1 = mails[1].includes(mails[0])
		const f2 = mails[0].includes(mails[1])
		if (f1 || f2) {
			alert("Please enter correct email.", "error")
			return false
		} else {
			return true
		}
	} else {
		return false
	}
}

export const get_item = (id, sidebar) => {
	let item = {}
	function fact(node) {
		if (node.id === id) {
			item = node
			return
		}
		if (node.children && node.children.length > 0) {
			for (const j in node.children) {
				if (id === node.children[j].id) {
					item = node.children[j]
					return
				}
				fact(node.children[j])
			}
		} else {
			
		}
	}

	for (const i in sidebar) {
		fact(sidebar[i])
	}
	return item
}


export const Exchangeget_item = (id, sidebar) => {
	let item = {}
	function fact(node) {
		if (node.Id === id) {
			item = node
			return
		}
		if (node.children && node.children.length > 0) {
			for (const j in node.children) {
				if (id === node.children[j].Id) {
					item = node.children[j]
					return
				}
				fact(node.children[j])
			}
		} else {
			
		}
	}

	for (const i in sidebar) {
		fact(sidebar[i])
	}
	return item
}


export const get_item_navLink = (id, sidebar) => {
	let item = null
	function fact(node) {
		if (node.navLink === id) {
			item = node
			return
		}
		if (node.children && node.children.length > 0) {
			for (const j in node.children) {
				if (id === node.children[j].navLink) {
					item = node.children[j]
					return
				}
				fact(node.children[j])
			}
		} else {
			
		}
	}

	for (const i in sidebar) {
		fact(sidebar[i])
	}
	return item
}


export const setSession = (string) => {

	if (checkingTelegram()) {
		sessionStorage.setItem(telegramtoken, string)
	} else {
		localStorage.setItem(token, string)
	}
	return true
}

export const get_betsdata = () => {
	try {
		const data = window.sessionStorage.getItem("sattadata")
		if (data) {
			return JSON.parse(data)
		} else {
			return {}
		}
	} catch (e) {
		return {}
	}
}

export const get_provider = (bool) => {
	try {
		const data = window.sessionStorage.getItem(`setprovider${  bool}`)
		if (data) {
			return JSON.parse(data)
		} else {
			return []
		}
	} catch (e) {
		return []
	}
}

export const get_type = (bool) => {
	try {
		const data = window.sessionStorage.getItem(`settype${  bool}`)
		if (data) {
			return JSON.parse(data)
		} else {
			return { label: "ALL", value: 'All' }
		}
	} catch (e) {
		return { label: "ALL", value: 'All' }
	}
}

export const checkRemaningTime = (date, time, bettingdate, opencloseflag, opentime) => {
	if (date && time && time.getTime) {
		const server = time.getTime
		const dddd = new Date(bettingdate).getTime()

		const times = date.split(":")
		let mms = (parseInt(times[0]) * 3600 * 1000 + parseInt(times[1]) * 60 * 1000) + dddd - 330 * 60 * 1000

		if (opencloseflag) {
			const opentimeH = parseInt(opentime.split(":")[0])
			if (opentimeH > parseInt(times[0])) {
				mms += 24 * 3600 * 1000
			}
		}

		const remain = mms - server

		if (remain < 1) {
			return false
		} else {
			return remain
		}
	} else {
		return false
	}
}


export const timerChecking = (bazaaritem, opentimeclosetime, time, bettingdate, opencloseflag, opentime) => {

	const isch = checkRemaningTime(opentimeclosetime, time, bettingdate, opencloseflag, opentime)
	if (isch) {
		const rMin = isch / 1000 / 60
		if (rMin < bazaaritem.blocktime) {
			return false
		} else {
			return true
		}
	} else {
		return false
	}
}

export const get_remaining_time = (date, time, bettingdate, opencloseflag, opentime) => {

	if (date && time && time.getTime) {

		const server = time.getTime
		const dddd = new Date(bettingdate).getTime()

		const times = date.split(":")
		let mms = (parseInt(times[0]) * 3600 * 1000 + parseInt(times[1]) * 60 * 1000) + dddd - 330 * 60 * 1000

		if (opencloseflag) {
			const opentimeH = parseInt(opentime.split(":")[0])
			if (opentimeH > parseInt(times[0])) {
				mms += 24 * 3600 * 1000
			}
		}

		const remain = mms - server

		if (remain < 1) {
			return "00 : 00 : 00 : 00"
		} else {
			const D = parseInt(remain / 1000 / 3600 / 24)
			const h = parseInt((remain - D * 24 * 3600 * 1000) / 3600 / 1000)
			const m = parseInt(((remain - D * 24 * 3600 * 1000) - h * 3600 * 1000) / 60 / 1000)
			const s = parseInt((remain - D * 24 * 3600 * 1000 - h * 3600 * 1000 - m * 60 * 1000) / 1000)

			const rr = `${NumConvert(D)  }d : ${  NumConvert(h)  }h : ${  NumConvert(m)  }m : ${  NumConvert(s)  }s`
			return rr
		}
	} else {
		return "00 : 00 : 00 : 00"
	}
}

export const NumConvert = (number) => {
	if (parseInt(number) > 9) {
		return number
	} else {
		return `0${  parseInt(number)}`
	}
}

export const get_date = (time) => {
	const times = time.split(":")
	if (times.length >= 1) {
		let time = ""
		if (parseInt(times[0]) > 12) {
			time = `${convert((parseInt(times[0]) - 12))  }:${  convert(times[1])  } PM`
			return time
		} else if (parseInt(times[0]) === 12) {
			time = `12:${  convert(times[1])  } PM`
			return time
		} else if (parseInt(times[0]) === 0) {
			time = `12:${  convert(times[1])  }  AM`
			return time
		} else {
			time = `${convert(parseInt(times[0]))  }:${  convert(times[1])  }  AM`
			return time
		}
	}
	function convert(number) {
		if (parseInt(number) > 9) {
			return number
		} else {
			return `0${  parseInt(number)}`
		}
	}
}


export const Sureget_options = (timers, timer, bettingdate) => {
	if (timer) {

		let stepmin = parseInt(parseFloat(timers.interval) * 60)
		stepmin = stepmin > 0 ? stepmin : 60
		const gettime1 = new Date(bettingdate).getTime()
		const gettime2 = new Date(timer.toDateString).getTime() + 330 * 60 * 1000
		let closetime = parseInt((timers.closetime).split(":")[0])
		const opentime = parseInt(timers.opentime.split(":")[0])

		if (opentime > closetime) {
			closetime += 24
		}

		const opentimemin = parseInt(timers.opentime.split(":")[1]) + opentime * 60
		const closetimemin = parseInt(timers.closetime.split(":")[1]) + closetime * 60

		const options = []
		for (let i = opentimemin; i <= closetimemin; i += stepmin) {
			const hhmm = gettimeHHMMFromMM(i)
			let hh = hhmm.h
			const mm = hhmm.m
			if (hh > 23) {
				hh -= 24
			}

			const now = parseInt(timer.toTimeString.slice(0, 2))
			if (gettime1 > gettime2) {
				// let tt = hh;
				// if (hh > 23) {
				// 	tt -= 24;
				// }
				const item = get_date(`${hh  }:${  mm}`)
				options.push(item)
			} else if (gettime1 === gettime2) {
				if (hh > now) {
					// if (hh > 23) {
					// 	let item = get_date(hh - 24 + ":" + mm);
					// 	options.push(item);
					// } else {
						const item = get_date(`${hh  }:${  mm}`)
						options.push(item)
					// }
				}
			} else {
				break
			}

		}
		return options
	} else {
		return []
	}
}

export const gettimeHHMMFromMM = (mm) => {
	//ss = 1000s
	const h = parseInt(mm / 60)
	const m = mm % 60
	return {
		h,
		m
	}
}

export const get_options = (timers) => {

	let stepmin = parseInt(parseFloat(timers.interval) * 60)
	stepmin = stepmin > 0 ? stepmin : 60
	let closetime = parseInt((timers.closetime).split(":")[0])
	const opentime = parseInt(timers.opentime.split(":")[0])
	const options = []
	if (opentime > closetime) {
		closetime += 24
	}

	const opentimemin = parseInt(timers.opentime.split(":")[1]) + opentime * 60
	const closetimemin = parseInt(timers.closetime.split(":")[1]) + closetime * 60

	for (let i = opentimemin; i <= closetimemin; i += stepmin) {
		const hhmm = gettimeHHMMFromMM(i)
		const hh = hhmm.h
		const mm = hhmm.m
		let tt = hh
		if (hh > 23) {
			tt -= 24
		}
		const item = get_date(`${tt  }:${  mm}`)
		options.push(item)
	}

	return options
}


export const dateChecking = (date) => {
	//Fri Apr 23 2021 13:38:36 GMT+0530 (India Standard Time)
	const date1 = new Date(date.toString().slice(0, 15))
	const date2 = new Date(new Date().toLocaleDateString())
	if (date2 > date1) {
		return false
	} else {
		return true
	}
}

export const dateConvert = (date) => {
	// 2021-03-28T00:29:02.157Z
	if (date && date.length) {
		const dd = `${date.slice(5, 7)  }/${  date.slice(8, 10)  }/${  date.slice(0, 4)  }, ${  get_date(date.slice(11, 19))}`
		return dd
	} else {
		date = new Date().toJSON()
		const dd = `${date.slice(5, 7)  }/${  date.slice(8, 10)  }/${  date.slice(0, 4)  }, ${  get_date(date.slice(11, 19))}`
		return dd
	}
}

export const mmdd_hhMMConvert = (date) => {
	// 2021-03-28T00:29:02.157Z
	if (date && date.length) {
		const dd = `${date.slice(5, 7)  }/${  date.slice(8, 10)  }  , ${  get_date(date.slice(11, 19))}`
		return dd
	} else {
		date = new Date().toJSON()
		const dd = `${date.slice(5, 7)  }/${  date.slice(8, 10)  }  , ${  get_date(date.slice(11, 19))}`
		return dd
	}
}

export const dateConvert1 = (date) => {
	// 2021-03-28T00:29:02.157Z
	if (date && date.length) {
		const dd = `${date.slice(5, 7)  }/${  date.slice(8, 10)  }/${  date.slice(0, 4)  }`
		return dd
	} else {
		date = new Date().toJSON()
		const dd = `${date.slice(5, 7)  }/${  date.slice(8, 10)  }/${  date.slice(0, 4)  }`
		return dd
	}
}

export const get_betid = () => {
	const a = `${new Date().valueOf()  }`
	const b = a.slice((a.length - 1 - 7), (a.length - 1))
	return b
}

export const getSession = () => {
	const session = sessioninfor()
	if (session) {
		return session
	} else {
		return false
	}
}

export const url_path = () => {
	return history.location.pathname
}

export const sessioninfor = () => {
	if (checkingTelegram()) {
		const auth = sessionStorage.getItem(telegramtoken)
		return auth
	} else {
		const auth = localStorage.getItem(token)
		return auth
	}
}

export const fake_session = () => {
	if (checkingTelegram()) {
		sessionStorage.removeItem(telegramtoken)
		return true
	} else {
		localStorage.removeItem(token)
		return true
	}
}

export const instance = axios.create({
	baseURL: Root.apiurl,
	timeout: 500000,
	headers: {
		authorization: encodeURIComponent(sessioninfor()),
		"Content-Type": "application/json",
		device: window.innerWidth,
		"user-device": "web"
	}
})


export const AXIOS_REQUEST = async (url, inputdata, dispatch, loading) => {

	try {
		if (loading) {
			window.postMessage(JSON.stringify({action:"loading", value: true}), "*")
			if (dispatch) {
				dispatch({ type: "HOMEPAGELOADIN", data: true })
			}
		}
		const Response =  await axios.create({
			baseURL: Root.apiurl,
			timeout: 500000,
			headers: {
				authorization: encodeURIComponent(await sessioninfor()),
				"Content-Type": "application/json",
				device: window.innerWidth,
				"user-device": "web"
			}
		}).post(url, inputdata)

		if (loading) {
			window.postMessage(JSON.stringify({action:"loading", value: false}), "*")
			setTimeout(() => {
				if (dispatch) {
					dispatch({ type: "HOMEPAGELOADIN", data: false })
				}
			}, 100)
		}
		if (Response.data) {
			if (Response.data.session) {
				dispatch({ type: "LOGOUT_WITH_JWT" })
				Root.socket.emit("sessiondestroy", { token: fake_session() })
				fake_session()
				Root.socket.disconnect()
				window.location.assign("/")
			} else {
				return Response.data
			}
		} else {
			return { status: false, error: "error" }
		}
	} catch (e) {
		if (loading) {
			window.postMessage(JSON.stringify({action:"loading", value: false}), "*")
			if (dispatch) {
				dispatch({ type: "HOMEPAGELOADIN", data: false })
			}
		}
		return { status: false, error: "error" }
	}
}

export const set_page = (params, rdata) => {
	const { page, perPage } = params
	let totalPages = Math.ceil(rdata.data.length / perPage)
	let fdata = []
	let newparams = {}
	if (page !== undefined && perPage !== undefined) {
		const calculatedPage = (page - 1) * perPage
		const calculatedPerPage = page * perPage
		if (calculatedPage > rdata.data.length) {
			totalPages = Math.ceil(rdata.data.length / perPage)
			fdata = rdata.data.slice(0, perPage)
			newparams['page'] = 0
			newparams['perPage'] = perPage
		} else {
			fdata = rdata.data.slice(calculatedPage, calculatedPerPage)
			newparams = params
		}
	} else {
		totalPages = Math.ceil(rdata.data.length / 7)
		fdata = rdata.data.slice(0, 7)
		newparams = params
	}
	if (fdata.length === 0) {
		newparams['page'] = 0
		newparams['perPage'] = 7
		fdata = rdata.data.slice(0, 7)
	}
	return { fdata, totalPages, params: newparams }
}

export const alert = (string, type) => {
	if (string && string.length > 0) {

		switch (type) {
			case "success":
				toast.success(string)
				break
			case "warn":
				toast.warn(string)
				break
			case "error":
				toast.error(string)
				break
			default:
				toast.error(string)
				break
		}
		
	}
}

export const liveChatRender = (item) => {
	if (window.innerWidth <= 767 && item && item.status) {
		const s1 = document.createElement("script")
		s1.async = true
		s1.src = item.src
		s1.charset = 'UTF-8'
		s1.setAttribute('crossorigin', '*')
		document.body.appendChild(s1)
	}
}

export const feedbackRender = (item) => {

	window.hj = window.hj || function () {
		(window.hj.q = window.hj.q || []).push(arguments)
	}
	if ( item && item.status) {

		window._hjSettings = {
			hjid: item.hjid,
			hjsv: item.hjsv
		}

		const a = document.getElementsByTagName('head')[0]

		const r = document.createElement('script')

		r.async = true

		r.src = `${item.src + item.hjid  }.js?sv=${  item.hjsv}`

		a.appendChild(r)
	}

}

export const singleMotor = (Numbers, digit) => {

	function ischeck(number) {

		const nums = []
		for (const i in number) {
			const ii = parseInt(number[i]) === 0 ? 10 : parseInt(number[i])
			nums.push(ii)
		}
		for (let i = 0; i < nums.length - 1; i++) {
			for (let j = i; j < nums.length; j++) {
				if (nums[i] > nums[j]) {
					return false
				}
			}
		}
		return true
	}
	function arrayCreate(array, size) {

		function iter(parts) {
			return function (v) {
				const temp = parts.concat(v)
				if (parts.includes(v)) {
					return
				}
				if (!ischeck(temp)) {
					return
				}
				if (temp.length === size) {
					if (ischeck(temp)) {
						result.push(temp)
					}
					return
				}
				array.forEach(iter(temp))
			}
		}

		var result = []
		array.forEach(iter([]))
		return result
	}
	return arrayCreate(Numbers, digit).map(a => a.join(''))
}

export const sdMotor = (Numbers, digit) => {
	function Dpischeck(number) {
		const nums = []
		for (const i in number) {
			const ii = parseInt(number[i]) === 0 ? 10 : parseInt(number[i])
			nums.push(ii)
		}
		for (let i = 0; i < nums.length - 1; i++) {
			for (let j = i; j < nums.length; j++) {
				if (nums[i] > nums[j]) {
					return false
				}
			}
		}
		return true
	}
	function cartesian(args) {
		const r = [], max = args.length - 1
		function helper(arr, i) {
			for (let j = 0, l = args[i].length; j < l; j++) {
				const a = arr.slice(0) // clone arr
				a.push(args[i][j])
				if (i === max) {
					if (Dpischeck(a)) {
						r.push(a)
					}
				} else {
					if (Dpischeck(a)) {
						helper(a, i + 1)
					}
				}
			}
		}
		helper([], 0)
		return r
	}

	const rows = []
	for (let i = 0; i < digit; i++) {
		rows.push(Numbers)
	}

	let items =  cartesian(rows).map(a => a.join(''))
	let array = []
	for (let i in items) {
		let d1 = items[i][0],d2=items[i][1],d3=items[i][2]
		if (d1 === d2 && d2 === d3){
			continue;
		}
		
		array.push(items[i])
	}
	return array
}

export const doubleMotor = (Numbers, digit) => {
	function Dpischeck(number) {
		const nums = []
		for (const i in number) {
			const ii = parseInt(number[i]) === 0 ? 10 : parseInt(number[i])
			nums.push(ii)
		}
		for (let i = 0; i < nums.length - 1; i++) {
			for (let j = i; j < nums.length; j++) {
				if (nums[i] > nums[j]) {
					return false
				}
			}
		}
		return true
	}
	function cartesian(args) {
		const r = [], max = args.length - 1
		function helper(arr, i) {
			for (let j = 0, l = args[i].length; j < l; j++) {
				const a = arr.slice(0) // clone arr
				a.push(args[i][j])
				if (i === max) {
					if (Dpischeck(a)) {
						r.push(a)
					}
				} else {
					if (Dpischeck(a)) {
						helper(a, i + 1)
					}
				}
			}
		}
		helper([], 0)
		return r
	}

	const rows = []
	for (let i = 0; i < digit; i++) {
		rows.push(Numbers)
	}

	let items =  cartesian(rows).map(a => a.join(''))
	let array = []
	for (let i in items) {
		let d1 = items[i][0],d2=items[i][1],d3=items[i][2]
		if (d1 === d2 && d2 === d3){
			continue;
		}
		if (d1 !== d2 && d1 !== d3 && d2 !== d3) {
			continue;
		}
		array.push(items[i])
	}
	return array
}

export const getMinbetPrice = (bazaartype, bool,item,price,gamelink) => {
	if (bazaartype === "1" && bool === "2") {
		if (halfred.indexOf(item) !== -1 ) {
			// 60c1bea7b746f26369073e75
			return gamelink['60c1bea7b746f26369073e75'].minbetprice
		} else if (fullred.indexOf(item) !== -1) {
			// 60c1bec5b746f26369073e77
			return gamelink['60c1bec5b746f26369073e77'].minbetprice
		} else {
			return price
		}
	} else {
		return price
	}
}

export const favicon = (item) => {
	if (item && item.length) {
		var link = document.querySelector('link[rel="shortcut icon"]')
		if (!link) {
			link = document.createElement('link')
			link.id = 'favicon'
			link.rel = 'shortcut icon'
			document.head.appendChild(link)
		}
		link.href = Root.imageurl + item
	}
}

export const metakeywords = (item) => {
	if (item && item.length) {
		const link1 = document.querySelector('meta[name="keywords"]')
		if (!link1) {
			let meta = document.createElement('meta')
			meta.name="keywords"
			meta.content = item
			document.head.appendChild(meta)
		}
	}
}

export const metadescription = (item) => {
	if (item && item.length) {
		const link1 = document.querySelector('meta[name="description"]')
		if (!link1) {
			let meta = document.createElement('meta')
			meta.name="description"
			meta.content = item
			document.head.appendChild(meta)
		}
	}
}

export const title = (item) => {
	if (item && item.length) {
		const title = document.querySelector('title')
		if (!title) {
			let titletag = document.createElement('title')
			titletag.textContent = item
			document.head.appendChild(titletag)
		}
	}
}
