import React, { Component } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import {Root} from "../../authServices/rootconfig"
import avatar from "../../assets/avatar.png"
import { Row } from "reactstrap"
import {UserContext} from '../../utility/UserContext'

const id_preffix = Root.id_preffix
class SidebarHeader extends Component {
    static contextType = UserContext

	state = {
		users : {},
		avatar : null,
		mbalance : '0 ',
		bbalance : '0 '
    }

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.bal !== this.props.bal) {
			this.setState({bbalance : this.props.bal ? parseInt(this.props.bal.bonusbalance).toString() : '0 ', mbalance :this.props.bal ? parseInt(this.props.bal.balance - this.props.bal.bonusbalance).toString() : '0 ' })
        }
	}

	render() {
        const { user } = this.context
		const {currencyLabel} = this.props
		return (
			<div className="navbar-header">
				<ul className="nav navbar-nav flex-row">
					<li className="nav-item nav-toggle">
						<div className="nav-link">
						<Link to="#" className="d-block m-1">
							<div className="d-flex align-items-center textstyle">
								{user && user.avatar ? (
									<img src={Root.imageurl + user.avatar}  alt='' className="p-0 m-0"/>
								) : (
									<img src={avatar} alt='' className="p-0 m-0"/>  
								)}
								<small className="d-table-row ml-1 font-weight-bold textstyle p-0" style={{fontSize:"16px"}}>{user && user.fakeid ?  id_preffix + user.signup_device + user.fakeid : ""}</small>
							</div>
							<div className="d-flex mt-1 textstyle p-0 align-items-center justify-content-left">
								<small className="textstyle" style={{fontSize:"1rem"}}>{user && user.email ? `${user.username  } : ${  user.email}` : ""}</small> 
							</div>
						</Link>
						<Row>
							<div>Main Balance<br/>{this.state.mbalance}{currencyLabel}</div>
							<div>Bonus Balance<br/>{this.state.bbalance}{currencyLabel}</div>
						</Row>
						</div>
					</li>
				</ul>
			</div>
		)
	}
}

const getusers = (state) => {
    return {
        bal : state.balance.value,
		currencyLabel : state.auth.login.currencyLabel
    }
  }
export default connect(getusers)(SidebarHeader)
