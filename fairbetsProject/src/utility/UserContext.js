import React, { createContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import merge from 'lodash.merge'
import { getSession, checkingTelegram, fake_session, setSession, feedbackRender, liveChatRender, setTelegram } from '../redux/actions/auth'
import * as Apis from "../redux/actions/auth/apiservice"
import queryString from "query-string"
import { history } from '../history'
import * as Init from "../redux/actions/auth"

const UserContext = createContext({
	user: null,
	telegram: false,
	sports: true,
	settings: {},
	socketid: "",
	setUserDetails: userDetails => { },
	uniqueid: ""
})
/*eslint-disable */

const UserProvider = ({ children }) => {
	const dispatch = useDispatch()

	const setUserDetails = ({ user, telegram, settings, sports }) => {
		updateUserDetails(prevState => {
			const newState = { ...prevState }
			return merge(newState, { user, telegram, settings, sports })
		})
	}

	const userState = {
		user: null,
		setUserDetails,
		telegram: checkingTelegram(),
		settings: {},
		sports: true,
		socketid: "",
		uniqueid: new Date().valueOf()
	}

	const setSettings = ({ settings }) => {
		updateUserDetails(prevState => {
			const newState = { ...prevState }
			return merge(newState, { settings })
		})
	}

	const setsports = ({ sports, socketid }) => {
		updateUserDetails(prevState => {
			const newState = { ...prevState }
			return merge(newState, { sports, socketid })
		})
	}

	const [userDetails, updateUserDetails] = useState(userState)

	const load = async () => {
		const get_sess = getSession() // session existing
		if (get_sess) {
			const r = await Apis.GetUserAuth({ token: get_sess })
			if (r.status) {
				const user = {
					email: r.data.email,
					mobilenumber: r.data.mobilenumber,
					avatar: r.data.avatar,
					username: r.data.username,
					firstname: r.data.firstname,
					lastname: r.data.lastname,
					_id: r.data._id,
					signup_device: r.data.signup_device,
					fakeid: r.data.fakeid,
					balance: r.data.playerid.balance,
					bonusbalance: r.data.playerid.bonusbalance,
					exposurelimit: r.data.playerid.exposurelimit,
				}
				const telegram = checkingTelegram()
				dispatch(Apis.SocketConnect(userDetails.uniqueid,get_sess, user, telegram))
				setUserDetails({ user, telegram })
				const rd = await Apis.GetUseProfileLod()
				if (rd.status) {
					dispatch(Apis.SetUserProfileSetting(rd))
				}
			}
		} else {
			const params = queryString.parse(window.location.search)
			if (params && params.token && params.telegram) {
				const rdata = await Apis.LoginById({ token: params.token })
				if (rdata.status) {
					setTelegram()
					const telegram = true
					const d = rdata.user
					const user = {
						email: d.email,
						mobilenumber: d.mobilenumber,
						avatar: d.avatar,
						username: d.username,
						firstname: d.firstname,
						lastname: d.lastname,
						_id: d._id,
						signup_device: d.signup_device,
						fakeid: d.fakeid,
						balance: d.playerid.balance,
						bonusbalance: d.playerid.bonusbalance,
						exposurelimit: d.data.playerid.exposurelimit,
					}
					dispatch(Apis.SocketConnect(userDetails.uniqueid,rdata.data, user, telegram))
					setUserDetails({ user, telegram })
					setSession(rdata.data)
					const rd = await Apis.GetUseProfileLod()
					if (rd.status) {
						dispatch(Apis.SetUserProfileSetting(rd))
					}                                //   window.location.reload();
				} else {
					dispatch(Apis.SocketConnect(userDetails.uniqueid,))
					alert("error")
					history.push("/mic/error?telegram=true")
					// window.location.assign("/mic/error?telegram=true")
				}
			} else {
				dispatch(Apis.SocketConnect(userDetails.uniqueid,))
				fake_session()
			}
		}

		const fp = await Apis.getFirstPageSet()
		if (fp.status) {
			Init.favicon(fp.data.favicon)
			Init.metakeywords(fp.data.metakeywords)
			Init.metadescription(fp.data.metadescription)
			Init.title(fp.data.title)
			setSettings({ settings: fp.data })
			let { FeedBackSetting, LiveChatSetting } = fp.data
			const params = queryString.parse(window.location.search)
			if (!params.sportsbook) {
				feedbackRender(FeedBackSetting)
				liveChatRender(LiveChatSetting)
				setsports({ sports: false })
			} else {
				setsports({ sports: true, socketid: params.socketid })
			}
		}
	}

	useEffect(() => {
		load()
	}, [])

	return (
		<UserContext.Provider value={userDetails}>
			{children}
		</UserContext.Provider>
	)
}

export { UserProvider, UserContext }
 /*eslint-enable */
