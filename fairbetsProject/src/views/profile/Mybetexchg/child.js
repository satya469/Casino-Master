import React, { Component } from "react"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import { connect } from "react-redux"
import { ChevronDown, ChevronLeft, ChevronRight } from "react-feather"
import { getBetHistory, cancelBet } from "../../../redux/actions/betexchg/history"
import { selectedStyle, pagenation_set } from "../../../configs/providerConfig"
import { Col, Row, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Nav, NavItem, NavLink, Badge, Table } from "reactstrap"
import { history } from "../../../history"
import Confirm from "reactstrap-confirm"
import { dateConvert } from "../../../redux/actions/auth"
import Media from 'react-media'

const CustomHeader = props => {
	return (
		<Row>
			<Col md="3" xs='12' className='mt-1'>
				<UncontrolledDropdown className="data-list-rows-dropdown d-block ">
					<DropdownToggle color="" className="sort-dropdown">
						<span className="align-middle mx-50">
							{`${props.index[0] ? props.index[0] : 0} - ${props.index[1] ? props.index[1] : 0} of ${props.total}`}
						</span>
						<ChevronDown size={15} />
					</DropdownToggle>
					<DropdownMenu tag="div" right>
						{
							pagenation_set.map((item, i) => (
								<DropdownItem tag="a" key={i} onClick={() => props.handleRowsPerPage(item)}>{item} </DropdownItem>
							))
						}
					</DropdownMenu>
				</UncontrolledDropdown>
			</Col>
		</Row>
	)
}

class DepositStatusChild extends Component {

	static getDerivedStateFromProps(props) {
		return {
			data: props.dataList.data,
			totalPages: props.dataList.totalPages,
			totalRecords: props.dataList.totalRecords,
			sortIndex: props.dataList.sortIndex
		}
	}

	state = {
		data: [],
		totalPages: 0,
		totalRecords: 0,
		sortIndex: [],
		columns: [

			{
				name: "matchName",
				selector: "matchName",
				minWidth: "200px",
				sortable: true
			},
			{
				name: "marketName",
				selector: "marketName",
				minWidth: "100px",
				sortable: true
			},
			{
				name: "oddName",
				selector: "oddName",
				minWidth: "100px",
				sortable: true
			},
			{
				name: "Sport",
				selector: "oddName",
				minWidth: "100px",
				sortable: true,
				cell: row => (
					<>{row.sportid.name}</>
				)
			},
			{
				name: "stake",
				selector: "stake",
				minWidth: "100px",
				sortable: true
			},
			{
				name: "price",
				selector: "price",
				minWidth: "100px",
				sortable: true
			},
			{
				name: "backlay",
				selector: "backlay",
				minWidth: "100px",
				sortable: true,
				cell: row => (
					<div>
						{
							row.backlay === "back" ? <div style={{ background: "#0293cc", color: "white", padding: "0.5rem", textAlign: "center" }} >{row.backlay}</div> : <div style={{
								background: "red", color: "white", padding: "0.5rem", textAlign: "center"
							}} >{row.backlay}</div>
						}
					</div>
				)
			},
			{
				name: "profit",
				selector: "profit",
				minWidth: "100px",
				sortable: true
			},
			{
				name: "betLoss",
				selector: "betLoss",
				minWidth: "100px",
				sortable: true
			},
			{
				name: "status",
				selector: "status",
				minWidth: "100px",
				sortable: true
			},
			{
				name: "lastbalance",
				selector: "lastbalance",
				minWidth: "100px",
				sortable: true
			},
			{
				name: "updatedbalance",
				selector: "updatedbalance",
				minWidth: "100px",
				sortable: true
			},
			{
				name: "DATE",
				selector: "DATE",
				minWidth: "100px",
				sortable: true,
				cell: row => (
					<span>
						{dateConvert(row.DATE)}
					</span>
				)
			},
		],
		columns1: [
			{
				name: "matchName",
				selector: "matchName",
				minWidth: "200px",
				sortable: true
			},
			{
				name: "marketName",
				selector: "marketName",
				minWidth: "100px",
				sortable: true
			},
			{
				name: "oddName",
				selector: "oddName",
				minWidth: "100px",
				sortable: true
			},
			{
				name: "Sport",
				selector: "oddName",
				minWidth: "100px",
				sortable: true,
				cell: row => (
					<>{row.sportid.name}</>
				)
			},
			{
				name: "stake",
				selector: "stake",
				minWidth: "100px",
				sortable: true
			},
			{
				name: "price",
				selector: "price",
				minWidth: "100px",
				sortable: true
			},
			{
				name: "backlay",
				selector: "backlay",
				minWidth: "100px",
				sortable: true,
				cell: row => (
					<div>
						{
							row.backlay === "back" ? <div style={{ background: "#0293cc", color: "white", padding: "0.5rem", textAlign: "center" }} >{row.backlay}</div> : <div style={{
								background: "red", color: "white", padding: "0.5rem", textAlign: "center"
							}} >{row.backlay}</div>
						}
					</div>
				)
			},
			{
				name: "profit",
				selector: "profit",
				minWidth: "100px",
				sortable: true
			},
			{
				name: "betLoss",
				selector: "betLoss",
				minWidth: "100px",
				sortable: true
			},
			{
				name: "wining amount",
				selector: "wining amount",
				minWidth: "100px",
				sortable: true,
				cell: row => (
					<div>
						{
							row.status === "LOSS" ? <Badge color="danger">{row.stake}</Badge> : <Badge color="success" >{row.profit}</Badge>
						}
					</div>
				)
			},
			{
				name: "status",
				selector: "status",
				minWidth: "100px",
				sortable: true
			},
			{
				name: "lastbalance",
				selector: "lastbalance",
				minWidth: "100px",
				sortable: true
			},
			{
				name: "updatedbalance",
				selector: "updatedbalance",
				minWidth: "100px",
				sortable: true
			},
			{
				name: "DATE",
				selector: "DATE",
				minWidth: "100px",
				sortable: true,
				cell: row => (
					<span>
						{dateConvert(row.DATE)}
					</span>
				)
			},
		],
		active: "1"
	}

	componentDidMount() {
		const { active } = this.state
		this.props.getBetHistory({ active }, this.props.parsedFilter)
	}

	cancelbet = async (row) => {
		let flag = await Confirm()
		if (flag) {
			this.props.cancelBet(row, {}, this.props.parsedFilter)
		}
	}

	handlePagination = page => {
		const { active } = this.state
		const { parsedFilter, getBetHistory } = this.props
		const perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : pagenation_set[0]
		const urlPrefix = `${history.location.pathname}`
		history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
		const params = { page: page.selected + 1, perPage }
		getBetHistory({ active }, params)
	}

	handleRowsPerPage = value => {
		const { active } = this.state
		const { parsedFilter, getBetHistory } = this.props
		const page = parsedFilter.page !== undefined ? parsedFilter.page : 1
		history.push(`${history.location.pathname}?page=${page}&perPage=${value}`)
		const params = { page, perPage: value }
		getBetHistory({ active }, params)
	}

	toggle = (tab) => {
		if (this.state.active !== tab) {
			this.setState({ active: tab })
			this.props.getBetHistory({ active: tab }, this.props.parsedFilter)
		}
	}

	render() {
		const { data, active, totalPages, sortIndex, totalRecords } = this.state

		let columns = active === "1" ? this.state.columns : this.state.columns1

		return (

			<React.Fragment>
				<Nav tabs justified>
					<NavItem>
						<NavLink
							active={this.state.active === '1'}
							onClick={() => {
								this.toggle('1')
							}}
							className="text-uppercase"
						>
							Active Bet
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							active={this.state.active === '2'}
							onClick={() => {
								this.toggle('2')
							}}
							className="text-uppercase"
						>
							Settled Bet
						</NavLink>
					</NavItem>

				</Nav>
				<div id="admindata_table" className={`data-list list-view`}>
					<Media queries={{ small: "(max-width: 768px)", large: "(min-width: 769px)" }}>
						{matches => (
							<React.Fragment>
								{matches.small &&
									<>
										<Table bordered responsive>
											{
												data.map((row, i) => (
													<tbody key={i}>
														<tr>
															<td className="pb-0">
																<Row className="m-0">
																	<div className="w-50 text-left">
																		matchName
																	</div>
																	<div className="w-50 text-left">
																		{row.matchName}
																	</div>
																</Row>
															</td>
														</tr>

														<tr>
															<td className="pb-0">
																<Row className="m-0">
																	<div className="w-50 text-left">
																		marketName
																	</div>
																	<div className="w-50 text-left">
																		{row.marketName}
																	</div>
																</Row>
															</td>
														</tr>

														<tr>
															<td className="pb-0">
																<Row className="m-0">
																	<div className="w-50 text-left">
																		oddName
																	</div>
																	<div className="w-50 text-left">
																		{row.oddName}
																	</div>
																</Row>
															</td>
														</tr>


														<tr>
															<td className="pb-0">
																<Row className="m-0">
																	<div className="w-50 text-left">
																		Sport
																	</div>
																	<div className="w-50 text-left">
																		<>{row.sportid.name}</>
																	</div>
																</Row>
															</td>
														</tr>

														<tr>
															<td className="pb-0">
																<Row className="m-0">
																	<div className="w-50 text-left">
																		stake
																	</div>
																	<div className="w-50 text-left">
																		{row.stake}
																	</div>
																</Row>
															</td>
														</tr>

														<tr>
															<td className="pb-0">
																<Row className="m-0">
																	<div className="w-50 text-left">
																		price
																	</div>
																	<div className="w-50 text-left">
																		{
																			row.price
																		}
																	</div>
																</Row>
															</td>
														</tr>

														<tr>
															<td className="pb-0">
																<Row className="m-0">
																	<div className="w-50 text-left">
																		backlay
																	</div>
																	<div className="w-50 text-left">
																		{
																			row.backlay === "back" ? <div style={{ background: "#0293cc", color: "white", padding: "0.5rem", textAlign: "center", borderRadius: "5px" }} >{row.backlay}</div> : <div style={{
																				background: "red", color: "white", padding: "0.5rem", textAlign: "center", borderRadius: "5px"
																			}} >{row.backlay}</div>
																		}
																	</div>
																</Row>
															</td>
														</tr>

														<tr>
															<td className="pb-0">
																<Row className="m-0">
																	<div className="w-50 text-left">
																		profit
																	</div>
																	<div className="w-50 text-left">
																		{row.profit}
																	</div>
																</Row>
															</td>
														</tr>

														<tr>
															<td className="pb-0">
																<Row className="m-0">
																	<div className="w-50 text-left">
																		betLoss
																	</div>
																	<div className="w-50 text-left">
																		{
																			row.betLoss
																		}
																	</div>
																</Row>
															</td>
														</tr>

														<tr>
															<td className="pb-0">
																<Row className="m-0">
																	<div className="w-50 text-left">
																		wining amount
																	</div>
																	<div className="w-50 text-left">
																		{
																			row.status === "LOSS" ? <Badge color="danger">{row.stake}</Badge> : <Badge color="success" >{row.profit}</Badge>
																		}
																	</div>
																</Row>
															</td>
														</tr>

														<tr>
															<td className="pb-0">
																<Row className="m-0">
																	<div className="w-50 text-left">
																		status
																	</div>
																	<div className="w-50 text-left">
																		{
																			row.status
																		}
																	</div>
																</Row>
															</td>
														</tr>


														<tr>
															<td className="pb-0">
																<Row className="m-0">
																	<div className="w-50 text-left">
																		lastbalance
																	</div>
																	<div className="w-50 text-left">
																		{
																			row.lastbalance
																		}
																	</div>
																</Row>
															</td>
														</tr>

														<tr>
															<td className="pb-0">
																<Row className="m-0">
																	<div className="w-50 text-left">
																		updatedbalance
																	</div>
																	<div className="w-50 text-left">
																		{
																			row.updatedbalance
																		}
																	</div>
																</Row>
															</td>
														</tr>

														<tr>
															<td className="pb-0">
																<Row className="m-0">
																	<div className="w-50 text-left">
																		DATE
																	</div>
																	<div className="w-50 text-left">
																		{dateConvert(row.DATE)}
																	</div>
																</Row>
															</td>
														</tr>

													</tbody>
												))
											}
										</Table>
										<ReactPaginate
											previousLabel={<ChevronLeft size={15} />}
											nextLabel={<ChevronRight size={15} />}
											breakLabel="..."
											breakClassName="break-me"
											pageCount={totalPages}
											containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
											activeClassName="active"
											forcePage={this.props.parsedFilter.page ? parseInt(this.props.parsedFilter.page - 1) : 0}
											onPageChange={page => this.handlePagination(page)}
										/>
									</>
								}
								{
									matches.large &&
									<>
										<DataTable
											columns={columns}
											data={data}
											pagination
											paginationServer
											paginationComponent={() => (
												<ReactPaginate
													previousLabel={<ChevronLeft size={15} />}
													nextLabel={<ChevronRight size={15} />}
													breakLabel="..."
													breakClassName="break-me"
													pageCount={totalPages}
													containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-0 mt-2"
													activeClassName="active"
													forcePage={this.props.parsedFilter.page ? parseInt(this.props.parsedFilter.page - 1) : 0}
													onPageChange={page => this.handlePagination(page)}
												/>
											)}
											noHeader
											subHeader
											responsive
											pointerOnHover
											selectableRowsHighlight
											customStyles={selectedStyle}
											subHeaderComponent={
												<CustomHeader
													handleRowsPerPage={this.handleRowsPerPage}
													total={totalRecords}
													index={sortIndex}
												/>
											}
											sortIcon={<ChevronDown />}
										/>
									</>
								}
							</React.Fragment>
						)}
					</Media>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		dataList: state.betexch.historyData
	}
}

export default connect(mapStateToProps, { getBetHistory, cancelBet })(DepositStatusChild)
