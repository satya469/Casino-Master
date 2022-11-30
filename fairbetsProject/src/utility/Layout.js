import React from "react"
import VerticalLayout from "../layouts/VerticalLayout"
import FullLayout from "../layouts/FullpageLayout"
import HorizontalLayout from "../layouts/HorizontalLayout"
import themeConfig from "../configs/themeConfig"
import SportsLayout from "../layouts/SportsLayout"
import AppSportsLayout from "../layouts/AppSportsLayout"
import ExchangeLayout from "../layouts/exchangeLayout"

const layouts = {
  vertical: VerticalLayout,
  full: FullLayout,
  sports: SportsLayout,
  horizontal: HorizontalLayout,
  appsports : AppSportsLayout,
  exchange : ExchangeLayout,
}

const ContextLayout = React.createContext()

class Layout extends React.Component {
  state = {
    activeLayout: "",
    width: window.innerWidth,
    lastLayout: null,
    direction: themeConfig.direction
  }

  updateWidth = () => {
    this.setState({
      width: window.innerWidth
    })
  }
  componentDidMount = () => {
    this.handleDirUpdate()
    if (this.state.activeLayout === "horizontal" && this.state.width <= 1199) {
      this.setState({
        activeLayout: "horizontal"
      })
    } else if (
      themeConfig.layout === "horizontal" &&
      this.state.width >= 1200
    ) {
      this.setState({
        activeLayout: "horizontal"
      })
    } else {
      this.setState({
        activeLayout: "horizontal"
      })
    }
  }

  componentDidUpdate() {
    this.handleDirUpdate()
  }

  handleDirUpdate = () => {
    const dir = this.state.direction
    if (dir === "rtl") document.getElementsByTagName("html")[0].setAttribute("dir", "rtl")
    else document.getElementsByTagName("html")[0].setAttribute("dir", "ltr")
  }


  render() {
    const { children } = this.props
    return (
      <ContextLayout.Provider
      
        value={{
          state: this.state,
          FullLayout: layouts["full"],
          VerticalLayout: layouts["vertical"],
          horizontalLayout: layouts["horizontal"],
          SportsLayout: layouts['sports'],
          AppSportsLayout: layouts['appsports'],
          ExchangeLayout : layouts.exchange,
          switchLayout: layout => {
            this.setState({ activeLayout: layout })
          },
          switchDir: dir => { 
            this.setState({ direction: dir })
          }
        }}
      >
        {children}
        
      </ContextLayout.Provider>
    )
  }
}

export  { Layout, ContextLayout }
