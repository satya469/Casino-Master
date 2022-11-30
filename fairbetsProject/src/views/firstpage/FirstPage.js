import React from "react"
import { Row, Col } from "reactstrap"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { Casino, LiveCasino } from "./Casino"
import { CasinoSlider } from "../GamePages/CasinoComponents"
import * as FpMngAction from "../../redux/actions/auth/loginActions"
// import { SlideDown } from 'react-slidedown'
import SattaLiveResult from "./sattaresult"
import FeaturedEvents from "./FeaturedEvents"
import { fairbets, starkasino } from "../../authServices/rootconfig"
import { Fragment } from "react"
import MiddleComp from "./middlemenu"
import Media from "react-media"
import {UserContext} from '../../utility/UserContext'

class FirstPage extends React.Component {
	static contextType = UserContext

	play = (item) => {
		const {user} = this.context
		if (!user) {
			this.props.setloginpage({ login: true, register: false })
		} else {
			this.props.playsaccount(item, true)
		}
	}

	render() {
		const {user} = this.context
		const { firstpages1, casinoitems, livecasinoitems, middlemenu, firstpages4 } = this.props.FirstPage
		return (
			<React.Fragment>

				<Fragment>
					{
						starkasino ? 
					<Row className="">
						<div style={{ width: "80%", paddingRight: "0.5rem" }}>
							<CasinoSlider slider_images={firstpages1} play={this.play} user={user} bool={true} me={this.props}   {...this.props} />
						</div>
						<div style={{ width: "20%", paddingLeft: "0.5rem" }}>
							<CasinoSlider slider_images={firstpages4} play={this.play} user={user}  bool={true} me={this.props}   {...this.props} />
						</div>
					</Row> :
						<CasinoSlider slider_images={firstpages1} play={this.play} user={user} bool={true} me={this.props}   {...this.props} />
					}
				</Fragment>


				{
					fairbets ? <Fragment>
							<FeaturedEvents />
							<SattaLiveResult />
						</Fragment> : null
				}

				{
					starkasino && middlemenu && middlemenu.length ? <Fragment>
							<Row className="m-0 firstpagesatta">

								<Media queries={{
									small: "(max-width: 768px)",
									medium: "(min-width: 769px) and (max-width: 1152px)",
									large: "(min-width: 1153px)"
								}}>
									{matches => (
										<React.Fragment>
											{matches.small &&
												<Fragment>
													<Col className="text" sm="12" >
														<svg width="22" height="22" viewBox="0 0 16 16" >
															<path d="M1.705 6.337l2.839 2.767a.542.542 0 01.155.48l-.67 3.906 3.508-1.845a.542.542 0 01.505 0l3.508 1.845-.67-3.907a.542.542 0 01.155-.479l2.839-2.767-3.923-.57a.54.54 0 01-.407-.296L7.79 1.917 6.035 5.47a.54.54 0 01-.408.296l-3.922.57zm10.564 8.684a.545.545 0 01-.252-.062L7.79 12.736 3.562 14.96a.543.543 0 01-.786-.57l.808-4.708-3.42-3.334a.54.54 0 01.3-.924l4.726-.687L7.304.453a.542.542 0 01.971 0l2.114 4.283 4.726.687a.54.54 0 01.3.924l-3.42 3.334.807 4.707a.541.541 0 01-.533.633z" fill="currentColor">
															</path>
														</svg>
														Featured Matches
													</Col>
													<Col sm="12">
														<FeaturedEvents />
													</Col>
													<Col className="text " sm="12">
														<svg width="22" height="22" viewBox="0 0 16 16" >
															<path d="M1.705 6.337l2.839 2.767a.542.542 0 01.155.48l-.67 3.906 3.508-1.845a.542.542 0 01.505 0l3.508 1.845-.67-3.907a.542.542 0 01.155-.479l2.839-2.767-3.923-.57a.54.54 0 01-.407-.296L7.79 1.917 6.035 5.47a.54.54 0 01-.408.296l-3.922.57zm10.564 8.684a.545.545 0 01-.252-.062L7.79 12.736 3.562 14.96a.543.543 0 01-.786-.57l.808-4.708-3.42-3.334a.54.54 0 01.3-.924l4.726-.687L7.304.453a.542.542 0 01.971 0l2.114 4.283 4.726.687a.54.54 0 01.3.924l-3.42 3.334.807 4.707a.541.541 0 01-.533.633z" fill="currentColor">
															</path>
														</svg>
															Satta
                    								</Col>
													<Col className="" sm="12" >
														<SattaLiveResult />
													</Col>
												</Fragment>
											}
											{matches.medium &&
												<Fragment>
													<Col className="text" sm="12" >
														<svg width="22" height="22" viewBox="0 0 16 16" >
															<path d="M1.705 6.337l2.839 2.767a.542.542 0 01.155.48l-.67 3.906 3.508-1.845a.542.542 0 01.505 0l3.508 1.845-.67-3.907a.542.542 0 01.155-.479l2.839-2.767-3.923-.57a.54.54 0 01-.407-.296L7.79 1.917 6.035 5.47a.54.54 0 01-.408.296l-3.922.57zm10.564 8.684a.545.545 0 01-.252-.062L7.79 12.736 3.562 14.96a.543.543 0 01-.786-.57l.808-4.708-3.42-3.334a.54.54 0 01.3-.924l4.726-.687L7.304.453a.542.542 0 01.971 0l2.114 4.283 4.726.687a.54.54 0 01.3.924l-3.42 3.334.807 4.707a.541.541 0 01-.533.633z" fill="currentColor">
															</path>
														</svg>
														Featured Matches
													</Col>
													<Col sm="12">
														<FeaturedEvents />
													</Col>
													<Col className="text " sm="12">
														<svg width="22" height="22" viewBox="0 0 16 16" >
															<path d="M1.705 6.337l2.839 2.767a.542.542 0 01.155.48l-.67 3.906 3.508-1.845a.542.542 0 01.505 0l3.508 1.845-.67-3.907a.542.542 0 01.155-.479l2.839-2.767-3.923-.57a.54.54 0 01-.407-.296L7.79 1.917 6.035 5.47a.54.54 0 01-.408.296l-3.922.57zm10.564 8.684a.545.545 0 01-.252-.062L7.79 12.736 3.562 14.96a.543.543 0 01-.786-.57l.808-4.708-3.42-3.334a.54.54 0 01.3-.924l4.726-.687L7.304.453a.542.542 0 01.971 0l2.114 4.283 4.726.687a.54.54 0 01.3.924l-3.42 3.334.807 4.707a.541.541 0 01-.533.633z" fill="currentColor">
															</path>
														</svg>
															Satta
                    								</Col>
													<Col className="" sm="12" >
														<SattaLiveResult />
													</Col>
												</Fragment>
											}
											{matches.large &&
												<Fragment>
													<Col md="6" className="text" sm="12" >
														<svg width="22" height="22" viewBox="0 0 16 16" >
															<path d="M1.705 6.337l2.839 2.767a.542.542 0 01.155.48l-.67 3.906 3.508-1.845a.542.542 0 01.505 0l3.508 1.845-.67-3.907a.542.542 0 01.155-.479l2.839-2.767-3.923-.57a.54.54 0 01-.407-.296L7.79 1.917 6.035 5.47a.54.54 0 01-.408.296l-3.922.57zm10.564 8.684a.545.545 0 01-.252-.062L7.79 12.736 3.562 14.96a.543.543 0 01-.786-.57l.808-4.708-3.42-3.334a.54.54 0 01.3-.924l4.726-.687L7.304.453a.542.542 0 01.971 0l2.114 4.283 4.726.687a.54.54 0 01.3.924l-3.42 3.334.807 4.707a.541.541 0 01-.533.633z" fill="currentColor">
															</path>
														</svg>
														Featured Matches
													</Col>
													<Col md="6" className="text " sm="12">
														<svg width="22" height="22" viewBox="0 0 16 16" >
															<path d="M1.705 6.337l2.839 2.767a.542.542 0 01.155.48l-.67 3.906 3.508-1.845a.542.542 0 01.505 0l3.508 1.845-.67-3.907a.542.542 0 01.155-.479l2.839-2.767-3.923-.57a.54.54 0 01-.407-.296L7.79 1.917 6.035 5.47a.54.54 0 01-.408.296l-3.922.57zm10.564 8.684a.545.545 0 01-.252-.062L7.79 12.736 3.562 14.96a.543.543 0 01-.786-.57l.808-4.708-3.42-3.334a.54.54 0 01.3-.924l4.726-.687L7.304.453a.542.542 0 01.971 0l2.114 4.283 4.726.687a.54.54 0 01.3.924l-3.42 3.334.807 4.707a.541.541 0 01-.533.633z" fill="currentColor">
															</path>
														</svg>
															Satta
                    								</Col>
													<Col md="6" sm="12">
														<FeaturedEvents />
													</Col>
													<Col md="6" className="" sm="12" >
														<SattaLiveResult />
													</Col>
												</Fragment>
											}
										</React.Fragment>
									)}
								</Media>
							</Row>
							<Media queries={{
								small: "(max-width: 768px)",
								medium: "(min-width: 769px) and (max-width: 999px)",
								large: "(min-width: 1000px)"
							}}>
								{matches => (
									<React.Fragment>
										{matches.large &&
											<MiddleComp middlemenu={middlemenu} />
										}
									</React.Fragment>
								)}
							</Media>
						</Fragment> : null
				}

				{/* <Row className="m-0 marqueetext">
					{newtext ? 
					// eslint-disable-next-line
						<marquee>
							{newtext ? newtext.map((item, i) => (
								<span key={i}><strong>{item.title}</strong>{item.navLink}</span>
							)):null}
						</marquee>
					:null}
				</Row> */}
				{/* <Tag >
						<Row className="m-0">
							<Col xs="12" md="12" lg="12" className="mb-1 p-0">
								<div className="fp-center-letter">
									<h3>THE ULTIMATE PLAYER EXPERIENCE</h3>
								</div>
							</Col>
						</Row>
					</Tag> */}
				{
					livecasinoitems || casinoitems ? <React.Fragment>
							<Row className="m-0 mt-1"  >
								<Col xs="6" md="6" lg="6">
									<h2 className='m-0'>Live Casino</h2>
								</Col>
								<Col xs="6" md="6" lg="6">
									<h3 className='m-0 float-right'><Link to="/live-casino">More</Link></h3>
								</Col>
							</Row>
							{livecasinoitems ? <LiveCasino data={livecasinoitems} me={this.props} user={user} /> : null}
							<Row className="m-0 mt-1">
								<Col xs="6" md="6" lg="6">
									<h2 className='m-0'>Casino</h2>
								</Col>
								<Col xs="6" md="6" lg="6">
									<h3 className='m-0 float-right'><Link to="/casino">More</Link></h3>
								</Col>
							</Row>
							{casinoitems ? <Casino data={casinoitems} me={this.props} user={user} /> : null}

						</React.Fragment> : null
				}

			</React.Fragment>
		)
	}
}
const mapStateToProps = (state) => ({
	FirstPage: state.auth.register,
})

const mapDispatchToProps = FpMngAction

export default connect(mapStateToProps, mapDispatchToProps)(FirstPage)
