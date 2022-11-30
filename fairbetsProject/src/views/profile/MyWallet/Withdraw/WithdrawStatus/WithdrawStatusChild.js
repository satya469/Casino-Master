import React, { Component } from "react"
import {Col, Row, Input} from "reactstrap"
import DataTable from "react-data-table-component"
import ReactPaginate from "react-paginate"
import { history } from "../../../../../history"
import { connect } from "react-redux"
import { ChevronDown,  ChevronLeft,  ChevronRight} from "react-feather"
import { WithdrawHistoryLoad, WithdrawalCancel} from "../../../../../redux/actions/paymentGateWay"
import {selectedStyle, pagenation_set} from "../../../../../configs/providerConfig"
import DatePicker from "../../../../lib/Datepicker"
import {UncontrolledDropdown,  DropdownMenu,  DropdownToggle, DropdownItem, Button} from "reactstrap"
import {dateConvert} from "../../../../../redux/actions/auth"

const CustomHeader = props => {
  const {totalRecords, sortIndex } = props.dataList
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
      <Col xs="12" sm='12'  md="6" className='mt-1'>
        <DatePicker  onChange={date => { props.setDate(date) }} />
      </Col>
    </Row>
  )
}

class DepositStatusChild extends Component {
    
    state = {
        data: [],
       
        columns: [
          {
            name: "Action",
            minWidth:  "200px",
            selector: "createDate",
            sortable: true,
            cell: row => (
              <div>
                {
                  row.status === "Pending" ? <Button color="primary" outline className="" onClick={() => this.props.WithdrawalCancel(this.state.date, this.props.parsedFilter, row)}>
                    Cancel
                  </Button> : <Button color="primary" disabled>
                    Cancel
                  </Button>
                }
              </div>
            )
          },
          {
            name: "amount",
            selector: "amount",
            minWidth:  "100px",
            sortable: true
          },
          {
            name: "status",
            selector: "status",
            minWidth:  "100px",
            sortable: true
          },
          {
            name: "Comment",
            selector: "type",
            sortable: true,
            minWidth:  "100px",
            cell : row => (
              <div>
                <Input type="textarea" readOnly={true}  value={row.comment ? row.comment : "comment"} />
              </div>
            )
          },
          {
            name: "paymentType",
            minWidth:  "100px",
            selector: "type",
            sortable: true
          },
          {
            name: "fee",
            minWidth:  "50px",
            selector: "commission",
            sortable: true
          },
          {
            minWidth:  "100px",
            name: "lastbalance",
            selector: "lastbalance",
            sortable: true,
            cell : row => (
              <div>
                {row.lastbalance.toFixed(0)}
              </div>
            )
          },
          {
            name: "updatedbalance",
            minWidth:  "100px",
            selector: "updatedbalance",
            sortable: true,
            cell : row => (
              <div>
                {row.updatedbalance.toFixed(0)}
              </div>
            )
          },
          {
            name: "createDate",
            minWidth:  "100px",
            selector: "createDate",
            sortable: true,
            cell: row => (
                <span>
                  {dateConvert(row.createDate)}
                </span>
            )
          },
        
          
        ],
      
        date : {   
          start: new Date(),
          end : new Date(new Date().valueOf() + 24 * 60 * 60 * 1000)
        }
    }

     componentDidMount() {
      this.props.WithdrawHistoryLoad(this.state.date, this.props.parsedFilter)
    }

    handlePagination = page => {
      const { parsedFilter, WithdrawHistoryLoad } = this.props
      const perPage = parsedFilter.perPage !== undefined ? parsedFilter.perPage : pagenation_set[0]
      const urlPrefix = `${history.location.pathname}`
      history.push(`${urlPrefix}?page=${page.selected + 1}&perPage=${perPage}`)
      const params = { page: page.selected + 1, perPage }
      WithdrawHistoryLoad(this.state.date, params)
    }
  
    componentDidUpdate(preveProps, prevState) {
      if (preveProps.dataList !== this.props.dataList) {
        const datalist = this.props.dataList
        this.setState({
          data : datalist.data,
          totalPages: datalist.totalPages
        })
      }
    }
  
    handleRowsPerPage = value => {
      const { parsedFilter, WithdrawHistoryLoad } = this.props
      const page = parsedFilter.page !== undefined ? parsedFilter.page : 1
      history.push(`${history.location.pathname}?page=${page}&perPage=${value}`)
      const params = { page, perPage: value }
      WithdrawHistoryLoad(this.state.date, params)
    }

    date_change = async (e) => {
        this.setState({date : e})
        this.props.WithdrawHistoryLoad(e, this.props.parsedFilter)        
    }


  render() {
    const { columns, data, totalPages } = this.state
    return (
      <div id="admindata_table" className={`data-list list-view`}>
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
              forcePage={this.props.parsedFilter.page ? parseInt(this.props.parsedFilter.page - 1) : 0 }
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
              dataList={this.props.dataList}
              handleRowsPerPage={this.handleRowsPerPage}
            />
          }
          sortIcon={<ChevronDown />}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    dataList: state.withdraw
  }
}

export default connect(mapStateToProps, {WithdrawHistoryLoad, WithdrawalCancel})(DepositStatusChild)
