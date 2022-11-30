import React from "react"
import { Row, Col } from "reactstrap"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import {Casino, LiveCasino} from "./Casino"
import {CasinoSlider} from "../GamePages/CasinoComponents"
import * as FpMngAction from "../../redux/actions/auth/loginActions"
// import { SlideDown } from 'react-slidedown'
import SattaLiveResult from "./sattaresult"
import FeaturedEvents from "./FeaturedEvents"
import {UserContext} from '../../utility/UserContext'
import Betexchfirst from "./betexchfirst"

class FirstPage extends React.Component {
	static contextType = UserContext
	
	play = (item) => {
		const {user} = this.context
		console.log(user)
		if(!user){
			this.props.setloginpage({login : true, register : false})
		}else{
			this.props.playsaccount(item,true)
		}
	}

	render() {
		const {user} = this.context
		const {firstpages1,casinoitems,livecasinoitems,} = this.props.FirstPage
		// const Tag =  SlideDown

		return (
			<React.Fragment>
				<CasinoSlider slider_images={firstpages1} play={this.play} bool={true}  me={this.props}   {...this.props}/>
				{/* <Betexchfirst /> */}
				{/* <FeaturedEvents />  */}
				{/* <SattaLiveResult /> */}
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
					livecasinoitems || casinoitems ? 
					<React.Fragment>
						<Row>
							<Col xs="6" md="6" lg="6">
								<h2 className='m-0 mt-3 mb-2 pl-1'>Live Casino</h2>
							</Col>
							<Col xs="6" md="6" lg="6">
								<h3 className='m-0 pl-1 float-right'><Link to="/live-casino">More</Link></h3>
							</Col>
						</Row>
						{livecasinoitems ? <LiveCasino data={livecasinoitems} me={this.props}  user={user}  />:null}
						<Row>
							<Col xs="6" md="6" lg="6">
								<h2 className='m-0 mt-3 mb-2 pl-1'>Casino</h2>
							</Col>
							<Col xs="6" md="6" lg="6">
								<h3 className='m-0 pl-1 float-right'><Link to="/casino">More</Link></h3>
							</Col>
						</Row>
						{casinoitems ? <Casino data={casinoitems} me={this.props} user={user}  />:null}

					</React.Fragment>
					: 
					null
				}
			</React.Fragment>
		)
	}
}
const mapStateToProps = (state) => ({
	FirstPage : state.auth.register,
})

const mapDispatchToProps = FpMngAction

export default connect(mapStateToProps, mapDispatchToProps)(FirstPage)
