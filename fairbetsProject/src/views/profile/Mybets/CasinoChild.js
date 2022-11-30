import React, { Component } from "react"
import { Badge, Table } from "reactstrap"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import { history } from "../../../history"
import { connect } from "react-redux"
import { ChevronDown, ChevronLeft, ChevronRight } from "react-feather"
import { reports_email_load, bethistoryFromEmailTotal } from "../../../redux/actions/profile"
import { selectedStyle, pagenation_set } from "../../../configs/providerConfig"
import DatePicker from "../../lib/Datepicker"
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Col, Row, Label } from "reactstrap"
import { dateConvert } from "../../../redux/actions/auth"
import Media from 'react-media'

const CustomHeader = props => {
  const { totalRecords, sortIndex, result } = props.dataList

  return (
    <Row>
      {
        result ? <>
          <Col sm="12" md="3">
            <Label>
              Total Deposit : {result.totaldeposit}
            </Label>
          </Col>
          <Col sm="12" md="3">
            <Label>
              Total Bet :{result.totalbet}
            </Label>
          </Col>
          <Col sm="12" md="3">
            <Label>
              Total Win : {result.totalwin}
            </Label>
          </Col>
          <Col sm="12" md="3">
            <Label>
              Net balance : {result.currentwalletbalance}
            </Label>
          </Col>
        </> : null
      }

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
  const {  result } = props.dataList

  return (
    <Row>
      {
        result ? <>
          <Col sm="3" xs="3" >
            <Label>
              Total Deposit : {result.totaldeposit}
            </Label>
          </Col>
          <Col sm="3"xs="3" >
            <Label>
              Total Bet :{result.totalbet}
            </Label>
          </Col>
          <Col sm="3" xs="3" >
            <Label>
              Total Win : {result.totalwin}
            </Label>
          </Col>
          <Col sm="3" xs="3" >
            <Label>
              Net balance : {result.currentwalletbalance}
            </Label>
          </Col>
        </> : null
      }

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
        name: "PROVIDERID",
        selector: "PROVIDERID",
        sortable: true,
        cell: row => (
          <div>
            {row.gameid.PROVIDERID}
          </div>
        )
      },
      {
        name: "NAME",
        selector: "NAME",
        sortable: true,
        cell: row => (
          <div>
            {row.gameid.NAME}
          </div>
        )
      },
      {
        name: "Previous Balance",
        selector: "AMOUNT",
        sortable: true,
        cell: row => (
          <span>
            {row.betting.prevbalance ? row.betting.prevbalance.toFixed(0) : "0"}
          </span>
        )
      },
      {
        name: "AMOUNT",
        selector: "AMOUNT",
        sortable: true,
        cell: row => (
          <span>
            {row.AMOUNT ? row.TYPE === 'BET' ? `-${row.AMOUNT.toFixed(0)}` : row.AMOUNT.toFixed(0) : "0"}
          </span>
        )
      },
      {
        name: "Net  Balance",
        selector: "AMOUNT",
        sortable: true,
        cell: row => (
          <span>
            {row.betting.prevbalance ? row.TYPE === 'BET' ? (row.betting.prevbalance - row.AMOUNT).toFixed(0) : (row.betting.prevbalance + row.AMOUNT).toFixed(0) : "0"}
          </span>
        )
      },
      {
        name: "TYPE",
        selector: "TYPE",
        sortable: true,
        cell: row => (
          <Badge pill color={row.TYPE === 'BET' ? 'danger' : 'success'}>{row.TYPE}</Badge>
        )
      },
      {
        name: "DATE",
        selector: "DATE",
        sortable: true,
        cell: row => (
          <span>
            {dateConvert(row.DATE)}
          </span>
        )
      },
      {
        name: "gameid",
        selector: "gameid",
        sortable: true,
        cell: row => (
          <div>
            {row.gameid.ID}
          </div>
        )
      },
      {
        name: "roundId",
        selector: "roundId",
        sortable: true
      },
      {
        name: "transactionId",
        selector: "transactionId",
        sortable: true
      }
    ],
    date: {
      start: new Date(),
      end: new Date(new Date().valueOf() + 24 * 60 * 60 * 1000)
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  componentDidMount() {
    this.props.reports_email_load(this.state.date, this.props.parsedFilter)
    this.props.bethistoryFromEmailTotal(this.state.date, this.props.parsedFilter)
  }


  handlePagination = page => {
    const { parsedFilter, reports_email_load } = this.props
    const perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : pagenation_set[0]
    const urlPrefix = `${history.location.pathname}`
    history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
    const params = { page: page.selected + 1, perPage }
    reports_email_load(this.state.date, params)
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
    reports_email_load(this.state.date, params)
  }

  DateRange_change = (e) => {
    this.setState({ selectionRange: e.selection })
  }


  date_change = (e) => {
    this.setState({ date: e })
    this.props.reports_email_load(e, this.props.parsedFilter)
    this.props.bethistoryFromEmailTotal(e, this.props.parsedFilter)
  }


  render() {
    const { columns, data, totalPages } = this.state
    return (
      <>
        <div id="admindata_table" className={`data-list list-view`}>

          <Media queries={{ small: "(max-width: 768px)", large: "(min-width: 769px)" }}>
            {matches => (
              <React.Fragment>
                {matches.small &&
                  <>
                    <MobileCustomHeader
                      date={this.state.date}
                      setDate={(e) => this.date_change(e)}
                      handleRowsPerPage={this.handleRowsPerPage}
                      dataList={this.props.dataList}
                    />
                    <Table bordered responsive>
                      {
                        data.map((item, i) => (
                          <tbody key={i}>
                            <tr>
                              <td className="pb-0">
                                <Row className="m-0">
                                  <div className="w-50 text-left">
                                    PROVIDERID
                                  </div>
                                  <div className="w-50 text-left">
                                    {item.gameid.PROVIDERID}
                                  </div>
                                </Row>
                              </td>
                            </tr>

                            <tr>
                              <td className="pb-0">
                                <Row className="m-0">
                                  <div className="w-50 text-left">
                                  NAME
                                  </div>
                                  <div className="w-50 text-left">
                                    {item.gameid.NAME}
                                  </div>
                                </Row>
                              </td>
                            </tr>

                            <tr>
                              <td className="pb-0">
                                <Row className="m-0">
                                  <div className="w-50 text-left">
                                  Previous Balance
                                  </div>
                                  <div className="w-50 text-left">
                                  {item.betting.prevbalance ? item.betting.prevbalance.toFixed(0) : "0"}
                                  </div>
                                </Row>
                              </td>
                            </tr>


                            <tr>
                              <td className="pb-0">
                                <Row className="m-0">
                                  <div className="w-50 text-left">
                                  AMOUNT
                                  </div>
                                  <div className="w-50 text-left">
                                  {item.AMOUNT ? item.TYPE === 'BET' ? `-${item.AMOUNT.toFixed(0)}` : item.AMOUNT.toFixed(0) : "0"}
                                  </div>
                                </Row>
                              </td>
                            </tr>

                            <tr>
                              <td className="pb-0">
                                <Row className="m-0">
                                  <div className="w-50 text-left">
                                  Net  Balance
                                  </div>
                                  <div className="w-50 text-left">
                                  {item.betting.prevbalance ? item.TYPE === 'BET' ? (item.betting.prevbalance - item.AMOUNT).toFixed(0) : (item.betting.prevbalance + item.AMOUNT).toFixed(0) : "0"}
                                  </div>
                                </Row>
                              </td>
                            </tr>

                            <tr>
                              <td className="pb-0">
                                <Row className="m-0">
                                  <div className="w-50 text-left">
                                  TYPE
                                  </div>
                                  <div className="w-50 text-left">
                                  <Badge pill color={item.TYPE === 'BET' ? 'danger' : 'success'}>{item.TYPE}</Badge>                                  </div>
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
                                  {dateConvert(item.DATE)}
                                  </div>
                                </Row>
                              </td>
                            </tr>

                            <tr>
                              <td className="pb-0">
                                <Row className="m-0">
                                  <div className="w-50 text-left">
                                  gameid
                                  </div>
                                  <div className="w-50 text-left">
                                  {item.gameid.ID}
                                  </div>
                                </Row>
                              </td>
                            </tr>

                            <tr>
                              <td className="pb-0">
                                <Row className="m-0">
                                  <div className="w-50 text-left">
                                  roundId
                                  </div>
                                  <div className="w-50 text-left">
                                    {
                                      item.roundId
                                    }
                                  </div>
                                </Row>
                              </td>
                            </tr>

                            <tr>
                              <td className="pb-0">
                                <Row className="m-0">
                                  <div className="w-50 text-left">
                                  transactionId
                                  </div>
                                  <div className="w-50 text-left">
                                    {
                                      item.transactionId
                                    }
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
                      forcePage={
                        this.props.parsedFilter.page ? parseInt(this.props.parsedFilter.page - 1) : 0
                      }
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
                          forcePage={
                            this.props.parsedFilter.page ? parseInt(this.props.parsedFilter.page - 1) : 0
                          }
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
                          setDate={(e) => this.date_change(e)}
                          handleRowsPerPage={this.handleRowsPerPage}
                          dataList={this.props.dataList}
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
      </>
    )
  }
}

const mapStateToProps = state => {
  return { dataList: state.report, }
}

export default connect(mapStateToProps, { reports_email_load, bethistoryFromEmailTotal })(DepositStatusChild)
