const initialState = {
    data: [],
    params: null,
    allData: [],
    totalPages: 0,
    filteredData: [],
    totalRecords: 0,
    sortIndex: [0, 0],
    result : {}
  }
  
  
const ReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case "REPORT_GET_DATA":
            return {
                ...state,
                data: action.data,
                totalPages: action.totalPages,
                params: action.params["params"],
                sortIndex : [action.params["skip"] + 1, action.params["skip2"]],
                totalRecords: action.totalRecords
            }

        case "REPORT_TOTAL_DATA" :
            return {
                ...state,
                result : action.data
            }
        default:
            return state
    }
}
    
  export default ReportReducer
    