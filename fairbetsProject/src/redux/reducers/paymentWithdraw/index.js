const initialState = {
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  totalRecords: 0,
  sortIndex: [0, 0]
}


const PaymentGateWayReducer = (state = initialState, action) => {
  switch (action.type) {
    case "WITHDRAW_HISTORY__GET_DATA":
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params["params"],
        sortIndex: [action.params["skip"] + 1, action.params["skip2"]],
        totalRecords: action.totalRecords
      }
    default:
      return state
  }
}

export default PaymentGateWayReducer
