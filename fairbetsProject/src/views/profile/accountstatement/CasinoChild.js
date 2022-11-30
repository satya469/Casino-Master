import React, { Component } from "react"
import { Badge, Table } from "reactstrap"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import { history } from "../../../history"
import { connect } from "react-redux"
import { ChevronDown, ChevronLeft, ChevronRight } from "react-feather"
import { AccountStatement } from "../../../redux/actions/profile"
import { selectedStyle, pagenation_set } from "../../../configs/providerConfig"
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem, Col, Row } from "reactstrap"
import { dateConvert } from "../../../redux/actions/auth"
import Media from 'react-media'
import Datepicker from "../../lib/Datepicker"

const CustomHeader = props => {
  const { totalRecords, sortIndex } = props.dataList

  return (
    <div className='p-0'>
      <Row>
        <Col xs='6' className='justify-content-start align-items-center flex' md="3">
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
        <Col md='6' sm='12' xs='12'>
          <Datepicker onChange={date => { props.setDate(date) }} />
        </Col>
      </Row>
    </div>
  )
}

const MobileCustomHeader = props => {

  return (
    <div className='p-1'>
      <Row>
        <Col md='6' sm='12' xs='12' className="text-center d-flex align-items-center justify-content-center">
          <Datepicker onChange={date => { props.setDate(date) }} />
        </Col>
      </Row>
    </div>
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
        minWidth: "100px",
      },
      {
        name: "TYPE",
        selector: "TYPE",
        sortable: true,
        minWidth: "100px",

      },
      {
        name: "NAME",
        selector: "NAME",
        sortable: true,
        minWidth: "100px",

      },
      {
        name: "transactionid",
        selector: "transactionid",
        sortable: true,
        minWidth: "100px",
      },
      {
        name: "roundid",
        selector: "roundid",
        sortable: true,
        minWidth: "100px",
      },
      {
        name: "status",
        selector: "status",
        sortable: true,
        minWidth: "100px",
        cell: row => (
          <Badge pill color={row.status === 'BET' || row.status === "WITHDRAWl" ? 'danger' : 'success'}>{row.status}</Badge>
        )
      },
      {
        name: "credited",
        selector: "credited",
        sortable: true,
        minWidth: "50px",
        cell: row => (
          <div>
            {parseInt(row.credited)}
          </div>
        )
      },
      {
        name: "debited",
        selector: "debited",
        sortable: true,
        minWidth: "50px",
        cell: row => (
          <div>
            {parseInt(row.debited)}
          </div>
        )
      },
      {
        name: "commission",
        selector: "commission",
        sortable: true,
        minWidth: "50px",
      },
      {
        name: "lastbalance",
        selector: "lastbalance",
        sortable: true,
        minWidth: "100px",
        cell: row => (
          <div>
            {parseInt(row.lastbalance)}
          </div>
        )
      },
      {
        name: "updatedbalance",
        selector: "updatedbalance",
        sortable: true,
        minWidth: "100px",
        cell: row => (
          <div>
            {parseInt(row.updatedbalance)}
          </div>
        )
      },
      {
        name: "updated",
        selector: "updated",
        sortable: true,
        cell: row => (
          <span>
            {dateConvert(row.updated)}
          </span>
        )
      },
      {
        name: "IPADDRESS",
        selector: "ipaddress",
        sortable: true
      },

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
    this.props.AccountStatement(this.state.date, this.props.parsedFilter)
  }


  handlePagination = page => {
    const { parsedFilter, AccountStatement } = this.props
    const perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : pagenation_set[0]
    const urlPrefix = `${history.location.pathname}`
    history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
    const params = { page: page.selected + 1, perPage }
    AccountStatement(this.state.date, params)
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
    const { parsedFilter, AccountStatement } = this.props
    const page = parsedFilter.page !== undefined ? parsedFilter.page : 1
    history.push(`${history.location.pathname}?page=${page}&perPage=${value}`)
    const params = { page, perPage: value }
    AccountStatement(this.state.date, params)
  }

  DateRange_change = (e) => {
    this.setState({ selectionRange: e.selection })
  }


  date_change = (e) => {
    this.setState({ date: e })
    this.props.AccountStatement(e, this.props.parsedFilter)
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
                                    {item.PROVIDERID}
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
                                    {item.TYPE}
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
                                    {item.NAME}
                                  </div>
                                </Row>
                              </td>
                            </tr>


                            <tr>
                              <td className="pb-0">
                                <Row className="m-0">
                                  <div className="w-50 text-left">
                                    transactionid
                                  </div>
                                  <div className="w-50 text-left">
                                    {item.transactionid}
                                  </div>
                                </Row>
                              </td>
                            </tr>

                            <tr>
                              <td className="pb-0">
                                <Row className="m-0">
                                  <div className="w-50 text-left">
                                    roundid
                                  </div>
                                  <div className="w-50 text-left">
                                    {item.roundid}
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
                                    <Badge pill color={item.status === 'BET' || item.status === "WITHDRAWl" ? 'danger' : 'success'}>{item.status}</Badge>  </div>
                                </Row>
                              </td>
                            </tr>

                            <tr>
                              <td className="pb-0">
                                <Row className="m-0">
                                  <div className="w-50 text-left">
                                    credited
                                  </div>
                                  <div className="w-50 text-left">
                                    {parseInt(item.credited)}
                                  </div>
                                </Row>
                              </td>
                            </tr>

                            <tr>
                              <td className="pb-0">
                                <Row className="m-0">
                                  <div className="w-50 text-left">
                                    debited
                                  </div>
                                  <div className="w-50 text-left">
                                    {parseInt(item.debited)}
                                  </div>
                                </Row>
                              </td>
                            </tr>

                            <tr>
                              <td className="pb-0">
                                <Row className="m-0">
                                  <div className="w-50 text-left">
                                    commission
                                  </div>
                                  <div className="w-50 text-left">
                                    {
                                      item.commission
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
                                    {parseInt(item.lastbalance)}
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
                                    {parseInt(item.updatedbalance)}
                                  </div>
                                </Row>
                              </td>
                            </tr>

                            <tr>
                              <td className="pb-0">
                                <Row className="m-0">
                                  <div className="w-50 text-left">
                                    updated
                                  </div>
                                  <div className="w-50 text-left">
                                    {dateConvert(item.updated)}
                                  </div>
                                </Row>
                              </td>
                            </tr>

                            <tr>
                              <td className="pb-0">
                                <Row className="m-0">
                                  <div className="w-50 text-left">
                                    IPADDRESS
                                  </div>
                                  <div className="w-50 text-left">
                                    {parseInt(item.ipaddress)}
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
                      containerClassName="vx-pagination separated-pagination pagination-end pagination-sm mb-5 pb-1"
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
  return { dataList: state.profile.acocuntstatement, }
}

export default connect(mapStateToProps, { AccountStatement, })(DepositStatusChild)