const initialState = {
  PaymentMethod : null,
  PayResultsData : null,
  TransactionHistoryData : null,
  data: [],
  params: null,
  allData: [],
  totalPages: 0,
  filteredData: [],
  totalRecords: 0,
  sortIndex: [0, 0],
  PaymentMenuData:[],
  Comment : ""
}


const paymentGateWay = (state = initialState, action) => {
  switch (action.type) {
    case "PAYMENTMETHOD_DATA":
      return {...state, PaymentMethod: action.data}
    case "PAYMENT_RESULTS_DATA":
      return {...state, PayResultsData: action.data}
    case "PAYMENTMENU_DATA":
      return {...state, PaymentMenuData: action.data}
    case "TRANSACTION_HISTORY_DATA":
      return {...state, TransactionHistoryData: action.data}
    case "PAYMENTMENU_DATARESSTRIC":
      return {...state, Comment: action.data}

      
    //---------------------


    case "TRANSACTION_HISTORY__GET_DATA":
      return {
        ...state,
        data: action.data,
        totalPages: action.totalPages,
        params: action.params["params"],
        sortIndex : [action.params["skip"] + 1, action.params["skip2"]],
        totalRecords: action.totalRecords
      }
    
      default:
      return state
  }
}
  
export default paymentGateWay
  