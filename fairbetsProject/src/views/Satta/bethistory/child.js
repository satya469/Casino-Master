import React, { Component } from "react"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import { history } from "../../../history"
import { connect } from "react-redux"
import { ChevronDown, ChevronLeft, ChevronRight } from "react-feather"
import { reports_email_load } from "../../../redux/actions/satta/matka"
import { selectedStyle, pagenation_set } from "../../../configs/providerConfig"
import DatePicker from "../../lib/Datepicker"
import { TabContent, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Col, Row, Badge, Table } from 'reactstrap'
import { dateConvert, dateConvert1 } from "../../../redux/actions/auth"
import Media from 'react-media'

const CustomHeader = props => {
    const { totalRecords, sortIndex } = props.dataList
    return (
        <Row>
            <Col md='3' className='justify-content-start align-items-center flex'>
                <UncontrolledDropdown className="data-list-rows-dropdown d-block ">
                    <DropdownToggle color="" className="sort-dropdown">
                        <span className="align-middle mx-50">
                            {`${sortIndex[0]} - ${sortIndex[1]} of ${totalRecords}`}
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
            <Col xs="12" sm='12' md="6" className='mt-1'>
                <DatePicker onChange={date => { props.setDate(date) }} />
            </Col>
        </Row>
    )
}

const MobileCustomHeader = props => {
    return (
        <Row>

            <Col xs="12" sm='12' md="6" className='mt-1'>
                <DatePicker onChange={date => { props.setDate(date) }} />
            </Col>
        </Row>
    )
}
class DepositStatusChild extends Component {

    state = {
        data: [],

        columns: [
            {
                name: "Betid",
                selector: "transactionid",
                sortable: true
            },
            {
                name: "BazarName",
                selector: "BazzarName",
                sortable: true,
                cell: row => (
                    <div>
                        {row.bazaarid.bazaarname}
                    </div>
                )
            },
            {
                name: "Gamename",
                selector: "GameName",
                sortable: true,
                cell: row => (
                    <div>
                        {row.gameid.name}
                    </div>
                )
            },
            {
                name: "Timer",
                selector: "Timer",
                sortable: true,
                cell: row => (
                    <div className="text-uppercase">
                        {row.time_flag === "1" ? "open" : row.time_flag === "2" ? "close" : row.time_flag === "3" ? "Open-Close" : row.time_flag}
                    </div>
                )
            },
            {
                name: "betnumber",
                selector: "betnumber",
                sortable: true
            },
            {
                name: "amount",
                selector: "amount",
                sortable: true
            },
            {
                name: "odds",
                selector: "odds",
                sortable: true,
                cell: row => (
                    <div>
                        {
                            parseInt(row.winamount) / parseInt(row.amount)
                        }
                    </div>
                )
            },
            {
                name: "winamount",
                selector: "winamount",
                sortable: true
            },
            {
                name: "status",
                selector: "status",
                sortable: true,
                cell: row => (
                    <Badge pill color={row.status === "bet" ? "light-warning" : row.status === "win" ? "light-success" : "light-danger"}>
                        {row.status}

                    </Badge >
                )
            },
            {
                name: "Bet Date",
                selector: "Bet Date",
                sortable: true,
                cell: row => (
                    <span>
                        {dateConvert1(row.DATE)}
                    </span>
                )
            },
            {
                name: "Place Date",
                selector: "Place Date",
                sortable: true,
                cell: row => (
                    <span>
                        {dateConvert(row.createdAt)}
                    </span>
                )
            }
        ],

        date: {
            start: new Date(),
            end: new Date(new Date().valueOf() + 24 * 60 * 60 * 1000)
        },
        active: "1"
    }

    componentDidMount() {
        this.props.reports_email_load(this.state.date, this.state.active, this.props.parsedFilter)
    }

    handlePagination = page => {
        const { parsedFilter, reports_email_load } = this.props
        const perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : pagenation_set[0]
        const urlPrefix = `${history.location.pathname}`
        history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
        const params = { page: page.selected + 1, perPage }
        reports_email_load(this.state.date, this.state.active, params)
    }

    componentDidUpdate(preveProps, prevState) {
        if (preveProps.dataList !== this.props.dataList) {
            const datalist = this.props.dataList
            this.setState({
                data: datalist.data,
                totalPages: datalist.totalPages
            })
        }
    }

    handleRowsPerPage = value => {
        const { parsedFilter, reports_email_load } = this.props
        const page = parsedFilter.page !== undefined ? parsedFilter.page : 1
        history.push(`${history.location.pathname}?page=${page}&perPage=${value}`)
        const params = { page, perPage: value }
        reports_email_load(this.state.date, this.state.active, params)
    }

    date_change = async (e) => {
        this.setState({ date: e })
        this.props.reports_email_load(e, this.state.active, this.props.parsedFilter)
    }

    toggle = (tab) => {
        if (this.state.active !== tab) {
            this.setState({ active: tab })
            this.props.reports_email_load(this.state.date, tab, this.props.parsedFilter)
        }
    }

    render() {
        const { columns, data, totalPages } = this.state
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
                            Regular Bazar
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
                            King Bazar
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            active={this.state.active === '3'}
                            onClick={() => {
                                this.toggle('3')
                            }}
                            className="text-uppercase"
                        >
                            StarLine Bazar
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent className='py-50' activeTab={this.state.active}>
                    <div id="admindata_table" className={`data-list list-view`}>

                        <Media queries={{ small: "(max-width: 768px)", large: "(min-width: 769px)" }}>
                            {matches => (
                                <React.Fragment>
                                    {matches.small &&
                                        <>
                                            <>
                                                <MobileCustomHeader
                                                    date={this.state.date}
                                                    dataList={this.props.dataList}
                                                    setDate={(e) => this.date_change(e)}
                                                    handleRowsPerPage={this.handleRowsPerPage}
                                                />
                                                <Table bordered responsive>
                                                    {
                                                        data.map((row, i) => (
                                                            <tbody key={i}>
                                                                <tr>
                                                                    <td className="pb-0">
                                                                        <Row className="m-0">
                                                                            <div className="w-50 text-left">
                                                                                Betid
                                                                            </div>
                                                                            <div className="w-50 text-left">
                                                                                {row.transactionid}
                                                                            </div>
                                                                        </Row>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="pb-0">
                                                                        <Row className="m-0">
                                                                            <div className="w-50 text-left">
                                                                                BazzarName
                                                                            </div>
                                                                            <div className="w-50 text-left">
                                                                                {row.bazaarid.bazaarname}
                                                                            </div>
                                                                        </Row>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="pb-0">
                                                                        <Row className="m-0">
                                                                            <div className="w-50 text-left">
                                                                                GameName
                                                                            </div>
                                                                            <div className="w-50 text-left">
                                                                                {row.gameid.name}
                                                                            </div>
                                                                        </Row>
                                                                    </td>
                                                                </tr>


                                                                <tr>
                                                                    <td className="pb-0">
                                                                        <Row className="m-0">
                                                                            <div className="w-50 text-left">
                                                                                Timer
                                                                            </div>
                                                                            <div className="w-50 text-left">
                                                                                {row.time_flag === "1" ? "open" : row.time_flag === "2" ? "close" : row.time_flag === "3" ? "Open-Close" : row.time_flag}
                                                                            </div>
                                                                        </Row>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="pb-0">
                                                                        <Row className="m-0">
                                                                            <div className="w-50 text-left">
                                                                                betnumber
                                                                            </div>
                                                                            <div className="w-50 text-left">
                                                                                {
                                                                                    row.betnumber
                                                                                }
                                                                            </div>
                                                                        </Row>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="pb-0">
                                                                        <Row className="m-0">
                                                                            <div className="w-50 text-left">
                                                                                amount
                                                                            </div>
                                                                            <div className="w-50 text-left">
                                                                                {row.amount}
                                                                            </div>
                                                                        </Row>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="pb-0">
                                                                        <Row className="m-0">
                                                                            <div className="w-50 text-left">
                                                                                odds
                                                                            </div>
                                                                            <div className="w-50 text-left">
                                                                                {
                                                                                    parseInt(row.winamount) / parseInt(row.amount)
                                                                                }
                                                                            </div>
                                                                        </Row>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="pb-0">
                                                                        <Row className="m-0">
                                                                            <div className="w-50 text-left">
                                                                                winamount
                                                                            </div>
                                                                            <div className="w-50 text-left">
                                                                                {row.winamount}
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
                                                                                <Badge pill color={row.status === "bet" ? "light-warning" : row.status === "win" ? "light-success" : "light-danger"}>
                                                                                    {row.status}

                                                                                </Badge >
                                                                            </div>
                                                                        </Row>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="pb-0">
                                                                        <Row className="m-0">
                                                                            <div className="w-50 text-left">
                                                                                Bet Date
                                                                            </div>
                                                                            <div className="w-50 text-left">
                                                                                {dateConvert1(row.DATE)}
                                                                            </div>
                                                                        </Row>
                                                                    </td>
                                                                </tr>

                                                                <tr>
                                                                    <td className="pb-0">
                                                                        <Row className="m-0">
                                                                            <div className="w-50 text-left">
                                                                                Place Date
                                                                            </div>
                                                                            <div className="w-50 text-left">
                                                                                {dateConvert(row.createdAt)}
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
                                                        date={this.state.date}
                                                        dataList={this.props.dataList}
                                                        setDate={(e) => this.date_change(e)}
                                                        handleRowsPerPage={this.handleRowsPerPage}
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
                </TabContent>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        dataList: state.profile.sattas
    }
}

export default connect(mapStateToProps, { reports_email_load })(DepositStatusChild)
