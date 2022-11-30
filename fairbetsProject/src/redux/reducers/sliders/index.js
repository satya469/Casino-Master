const initialState = {
  
}

  const sliders = (state = initialState, action) => {
    switch (action.type) {
        case "LIVECASINOSLIDERIMGS": {
            return {
              ...state, livecasino_images: action.data
            }
          }
          case "CASINOSLIDERIMGS": {
            return {
              ...state, casino_images: action.data
            }
          }
      
          case "VIRTUALSLIDERIMGS": {
            return {
              ...state, virtual_images: action.data
            }
          }
      
          case "POKERSLIDERIMGS": {
            return {
              ...state, poker_images: action.data
            }
          }
          case "COCKFIGHTSLIDERIMGS": {
            return {
              ...state, cockfight_images: action.data
            }
          }
      
          case "ANIMALSLIDERIMGS": {
            return {
              ...state, animal_images: action.data
            }
          }
      
          case "TEENPATTISLIDERS": {
            return {
              ...state, teenpatti_images: action.data
            }
          }
      
          case "HORSERACESLIDERS": {
            return {
              ...state, horserace_images: action.data
            }
          }
      
          case "AHDARBAHARSLIDERS": {
            return {
              ...state, andarbahar_images: action.data
            }
          }
      
          case "CRECKETSLIDERS": {
            return {
              ...state, cricket_images: action.data
            }
          }
        default:
        return state
    }
  }
  
export default sliders
  