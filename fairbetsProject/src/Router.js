import React, { Suspense, lazy, Fragment } from "react"
import { Router, Switch, Route, Redirect } from "react-router-dom"
import ReactGA from 'react-ga'
import { connect } from "react-redux"
import { ToastContainer } from "react-toastify"
import { ContextLayout } from "./utility/Layout"
import FallbackSpinner from "./components/@vuexy/spinner/Fallback-spinner"
import { load_fp_data, first_slider_load, firstpage_gamelist, getThem } from "./redux/actions/auth/loginActions"
import { history } from "./history"
import Player from './views/PlayGame/player'
import { getSession, fake_session, liveChatRender, getURL } from "./redux/actions/auth"
import { startSportsSocket, getAllSportsType, getFirstPageEvents } from "./redux/actions/sports/index"
import { ExchgSocket } from "./redux/actions/exchg"
import { UserContext } from './utility/UserContext'
import { fairbets } from "./authServices/rootconfig"

var FirstPage = null
if (fairbets) {
	FirstPage = lazy(() => import("./views/fairbetsfirstpage/FirstPage"))
} else {
	FirstPage = lazy(() => import("./views/firstpage/FirstPage"))
}

const BetHistory = lazy(() => import("./views/Sports/history/index"))

const Sports = lazy(() => import("./views/Sports/mainComponent/Sports"))
const Live = lazy(() => import("./views/Sports/mainComponent/Live"))
const Upcoming = lazy(() => import("./views/Sports/mainComponent/Upcoming"))

const SportEvents = lazy(() => import("./views/Sports/Events"))
const SattaPage = lazy(() => import("./views/Satta"))

// const Exchg = lazy(() => import("./views/Exchg/exchg/index"));

// const ExchgEvents = lazy(() => import("./views/Exchg/Events"))
// const Exchangepage = lazy(() => import("./views/exchange"))

const Casino = lazy(() => import("./views/GamePages/Casino"))
const LiveCasino = lazy(() => import("./views/GamePages/LiveCasino"))
const VirtualSports = lazy(() => import("./views/GamePages/VirtualSpots"))
const Poker = lazy(() => import("./views/GamePages/Poker"))
const CockFight = lazy(() => import("./views/GamePages/CockFight"))
const Animal = lazy(() => import("./views/GamePages/animal"))
const HorseRace = lazy(() => import("./views/GamePages/horserace"))
const Cricket = lazy(() => import("./views/GamePages/cricket"))
const Teenpatti = lazy(() => import("./views/GamePages/teenpatti"))
const AndarBahar = lazy(() => import("./views/GamePages/andharbahar"))

const YaarResponse = lazy(() => import("./views/PaymentGatway/YaarResponse"))
const Paygate10Response = lazy(() => import("./views/PaymentGatway/Paygate10Response"))
const yaarpaysubmit = lazy(() => import("./views/PaymentGatway/yaarpaysubmit"))
const paymoroReturn = lazy(() => import("./views/PaymentGatway/promoreturn"))
const paymorosubmit = lazy(() => import("./views/PaymentGatway/paymorosubmit"))
const rushpaymentreturn = lazy(() => import("./views/PaymentGatway/rushpaymentreturn"))
const paygincardpayment = lazy(() => import("./views/PaymentGatway/paygincardpayment"))

const Emailverify = lazy(() => import("./views/profile/Emailverify"))
const Wlt_deposit = lazy(() => import("./views/profile/MyWallet/Deposit"))
const Wlt_withdraw = lazy(() => import("./views/profile/MyWallet/Withdraw"))
const Wlt_balancehistory = lazy(() => import("./views/profile/MyWallet/Balencehistory"))

const Pro_profileinfo = lazy(() => import("./views/profile/MyProfile/MyProfile"))
const Pro_changepassword = lazy(() => import("./views/profile/MyProfile/ChangePassword"))
const Pro_security = lazy(() => import("./views/profile/MyProfile/Security"))
const Pro_news = lazy(() => import("./views/profile/MyProfile/Newsletter"))
const Messages = lazy(() => import("./views/profile/Messages/Messages"))
const Exposure = lazy(() => import("./views/profile/Exposure"))
const Mybetexchg = lazy(() => import("./views/profile/Mybetexchg"))
const Accountstatement = lazy(() => import("./views/profile/accountstatement"))

const Bet_sports = lazy(() => import("./views/profile/Mybets/SportsBook"))
const Bet_casinos = lazy(() => import("./views/profile/Mybets/Casino"))
const Satta_history = lazy(() => import("./views/Satta/bethistory"))

const Bns_sports = lazy(() => import("./views/profile/MyBonuses/SportsBook"))
const Bns_casinos = lazy(() => import("./views/profile/MyBonuses/Casino"))

const FAQ = lazy(() => import("./views/FAQ/FAQ"))
const About = lazy(() => import("./views/Opage/About"))
const Contact = lazy(() => import("./views/Opage/Contact"))
const PrivacyPolicy = lazy(() => import("./views/Opage/PrivacyPolicy"))
const LiveChat = lazy(() => import("./views/pages/LiveChat"))

const ForgotPasswordverify = lazy(() => import("./views/pages/forgotpassword_reset"))
const EmailverifyResend = lazy(() => import("./views/pages/emailverifyresend"))
const SattaGames = lazy(() => import("./views/Satta/gamespage"))
const error404 = lazy(() => import("./views/pages/misc/error/404"))
const SportsLmt = lazy(() => import("./views/pages/SportsLmt"))

const Betexchmain = lazy(() => import("./views/betexch/Betexchmain"))
const Betexchevent = lazy(() => import("./views/betexch/Betexchevent"))
const Betexchodds = lazy(() => import("./views/betexch/Betexchodds"))
const MarketsBetexchodds = lazy(() => import("./views/betexch/Betexchmarketodds"))
const Betexchmymarkets = lazy(() => import("./views/betexch/Betexchmymarkets"))
// const Undermaintaiance  = lazy(() => import("./views/pages/Undermaintaiance "))

const RouteConfig = ({ component: Component, FullLayout, VerticalLayout, SportsLayout, AppSportsLayout, ExchangeLayout, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => {
				return (
					<ContextLayout.Consumer>
						{context => {
							const LayoutTag = ExchangeLayout === true ? context.ExchangeLayout : AppSportsLayout === true ? context.AppSportsLayout :
								FullLayout === true ? context.FullLayout : SportsLayout === true ? context.SportsLayout : VerticalLayout === true ? context.VerticalLayout : context.horizontalLayout
							return (
								<LayoutTag {...props} permission={"props.user"} >
									<Suspense fallback={<FallbackSpinner />}>
										<Component {...props} />
									</Suspense>
								</LayoutTag>
							)
						}}
					</ContextLayout.Consumer>
				)
			}}
		/>
	)
}

const AppRoute = (RouteConfig)

const RequireAuth = (data) => {

	if (!getSession()) {
		fake_session()
		return <Redirect to={getURL()} />
	}
	if (data.children) {
		const items = data.children.props.children
		for (const i in items) {
			if (items[i] && items[i].props.path === data.location.pathname) {
				return items.slice(0, items.length - 1)
			}
		}
		return items.slice(items.length - 1, data.children.length)
	} else {
		return false
	}
}

class AppRouter extends React.Component {
	static contextType = UserContext

	async UNSAFE_componentWillMount() {
		await this.props.getThem()
	}

	async componentDidMount() {
		await this.props.getAllSportsType()
		this.props.first_slider_load()
		this.props.getFirstPageEvents()
		const { telegram, user } = this.context
		if (!telegram) {
			this.props.load_fp_data()
			this.props.firstpage_gamelist()
			this.props.startSportsSocket(user)
			this.props.ExchgSocket()
			// this.props.liveChatRender()
		}
		if (process.env.NODE_ENV !== "development") {
			setInterval(() => {
				console.clear()
			}, 2000)
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.firstpagesettingtrackcode) {
			if (prevProps.firstpagesettingtrackcode !== this.props.firstpagesettingtrackcode && this.props.firstpagesettingtrackcode.trackcode) {
				ReactGA.initialize(this.props.firstpagesettingtrackcode.trackcode)
				ReactGA.pageview(history.location.pathname + history.location.search)
			}
		}
	}

	render() {

		const { state, gamedata, gameurl, Ratio, token, mode } = this.props.player
		const { sports } = this.context

		return (
			<Router history={history}>
				{ /* games play form */}
				{state ? <Player gamedata={gamedata} gameurl={gameurl} Ratio={Ratio} state={state} token={token} mode={mode} /> : null}
				<Switch>
					<AppRoute exact path="/" component={FirstPage}  />
					{/* <AppRoute path="/new" component={FirstPage} /> */}
					<AppRoute path="/Satta/pages" component={SattaPage} />
					<AppRoute path="/Mybets/satta/games" component={SattaGames} />
					<AppRoute path="/virtual-sports" component={VirtualSports} />
					<AppRoute path="/casino" component={Casino} />
					<AppRoute path="/poker" component={Poker} />
					<AppRoute path="/live-casino" component={LiveCasino} />
					<AppRoute path="/cock-fight" component={CockFight} />
					<AppRoute path="/animal" component={Animal} />
					<AppRoute path="/Horse-Race" component={HorseRace} />
					<AppRoute path="/Cricket" component={Cricket} />
					<AppRoute path="/Teenpatti" component={Teenpatti} />
					<AppRoute path="/Andhar-Bahar" component={AndarBahar} />
					<AppRoute path="/mic/error" component={error404} />
					<AppRoute path="/PaymentGateway/YaarResponse" component={YaarResponse} /> {/* yaarpay rediection */}
					<AppRoute path="/PaymentGateway/Paygate10Response" component={Paygate10Response} />
					<AppRoute path="/PaymentGateway/yaarpaysubmit" component={yaarpaysubmit} FullLayout />
					<AppRoute path="/paymentGateWay/paymoroReturn" component={paymoroReturn} />
					<AppRoute path="/PaymentGateway/paymorosubmit" component={paymorosubmit} FullLayout />
					<AppRoute path="/paymentGateWay/rushpaymentreturn" component={rushpaymentreturn} />
					<AppRoute path="/paymentGateWay/paygeInCardreturn" component={paygincardpayment} />

					<AppRoute path="/limit" component={SportsLmt} FullLayout />

					<AppRoute path="/liveChat" component={LiveChat} FullLayout />
					<AppRoute path="/emailverify" component={Emailverify} />
					<AppRoute path="/forgotpasswordverify" component={ForgotPasswordverify} />
					<AppRoute path="/FAQ" component={FAQ} />
					<AppRoute path="/about" component={About} />
					<AppRoute path="/contact" component={Contact} />
					<AppRoute path="/PrivacyPolicy" component={PrivacyPolicy} />
					<AppRoute path="/Inplay" component={Live} SportsLayout />
					<AppRoute path="/Upcoming" component={Upcoming} SportsLayout />

					{
						sports ?
							<AppRoute path="/sports" component={Sports} AppSportsLayout />
							:
							<AppRoute path="/sports" component={Sports} SportsLayout />
					}
					{
						sports ?
							<AppRoute path="/sportsevent" component={SportEvents} AppSportsLayout />
							:
							<AppRoute path="/sportsevent" component={SportEvents} SportsLayout />
					}
					{
						sports ?
							<AppRoute path="/betexchmain" component={Betexchmain} AppSportsLayout />
							:
							<AppRoute path="/betexchmain" component={Betexchmain} ExchangeLayout />
					}
					{
						sports ? <AppRoute path="/betexchevent" component={Betexchevent} AppSportsLayout />
							: <AppRoute path="/betexchevent" component={Betexchevent} ExchangeLayout />
					}
					{
						sports ?
							<AppRoute path="/betexchodds" component={Betexchodds} AppSportsLayout />
							: <AppRoute path="/betexchodds" component={Betexchodds} ExchangeLayout />
					}

					{
						sports ?
							<AppRoute path="/betexchmymarkets" component={Betexchmymarkets} AppSportsLayout /> :
							<AppRoute path="/betexchmymarkets" component={Betexchmymarkets} ExchangeLayout />
					}
					{
						sports ?
							<AppRoute path="/betexchmarketsodds" component={MarketsBetexchodds} AppSportsLayout /> :
							<AppRoute path="/betexchmarketsodds" component={MarketsBetexchodds} ExchangeLayout />
					}



					{/* It is required auth */}
					<RequireAuth>
						<Fragment>
							{/* <AppRoute path="/exchg" component={Exchangepage} /> */}
							{/* <AppRoute path="/exchgevent" component={ExchgEvents} SportsLayout/> */}
							<AppRoute path="/Mybets/accountstatement" component={Accountstatement} VerticalLayout />
							<AppRoute path="/bethistory" component={BetHistory} VerticalLayout />
							<AppRoute path="/emailverifysend" component={EmailverifyResend} />
							<AppRoute path="/Mybets/betexchg" component={Mybetexchg} VerticalLayout />
							<AppRoute path="/mywallet/deposit" component={Wlt_deposit} VerticalLayout />
							<AppRoute path="/mywallet/withdraw" component={Wlt_withdraw} VerticalLayout />
							<AppRoute path="/mywallet/balance-history" component={Wlt_balancehistory} VerticalLayout />
							<AppRoute path="/myprofile/profile-info" component={Pro_profileinfo} VerticalLayout />
							<AppRoute path="/myprofile/change-password" component={Pro_changepassword} VerticalLayout />
							<AppRoute path="/myprofile/security" component={Pro_security} VerticalLayout />
							<AppRoute path="/myprofile/news-letter" component={Pro_news} VerticalLayout />
							<AppRoute path="/Mybets/sports" component={Bet_sports} VerticalLayout />
							<AppRoute path="/Mybets/casinos" component={Bet_casinos} VerticalLayout />
							<AppRoute path="/Mybets/exposure" component={Exposure} VerticalLayout />
							<AppRoute path="/Mybets/satta" component={Satta_history} VerticalLayout />
							<AppRoute path="/Bonuses/sports" component={Bns_sports} VerticalLayout />
							<AppRoute path="/Bonuses/casinos" component={Bns_casinos} VerticalLayout />
							<AppRoute path="/Messages/messages" component={Messages} VerticalLayout />


						</Fragment>
					</RequireAuth>



				</Switch>
				{/* toast notification. */}
				<ToastContainer />
			</Router>
		)
	}
}


const mapStateToPropss = (state) => ({
	firstpagesettingtrackcode: state.auth.register,
	player: state.player
})

const mapDispatchToProps = {
	getThem,
	load_fp_data,
	startSportsSocket,
	first_slider_load,
	firstpage_gamelist,
	ExchgSocket,
	getAllSportsType,
	getFirstPageEvents,
	liveChatRender
}

export default connect(mapStateToPropss, mapDispatchToProps)(AppRouter)
