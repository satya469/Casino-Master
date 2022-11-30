
const initialState = {
    loading: false
}

  const player = (state = initialState, action) => {
    switch (action.type) {
      case "HOMEPAGELOADIN":
        return { ...state, loading : action.data}
      default:
        return state
    }
  }
  
export default player