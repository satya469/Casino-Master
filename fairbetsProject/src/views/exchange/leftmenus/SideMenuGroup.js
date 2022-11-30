import React from "react"
import { Link } from "react-router-dom"
import classnames from "classnames"
import { ChevronRight } from "react-feather"
import * as FaIcon from 'react-icons/fa'
import {history} from "../../../history"

class SideMenuGroup extends React.Component {
  constructor(props) {
    super(props)
    this.flag = true
    this.parentArray = []
    this.childObj = {}
  }
  state = {
    isOpen: false
  }


  renderChild(item, activeGroup, handleGroupClick, handleActiveItem, parent) {

    return (
      <ul className="menu-content">
        {item.children ? item.children.map(child => {
          const Tag = FaIcon["FaFutbol"]
          return (
              <li key={child.Id}
                className={classnames({
                  hover: this.props.hoverIndex === child.Id,
                  "has-sub": child.type === "collapse",
                  open: child.type === "collapse" && activeGroup.includes(child.Id),
                  active: this.props.activeItemState === child.Id && child.type === "item"
                })}
                onClick={e => {
                  e.stopPropagation()
                  handleGroupClick(child.Id, item.Id, child.type, child)
                  if (this.props.deviceWidth <= 1200 && child.type === "item") {
                    this.props.toggleMenu()
                  }
                }}>
                <Link
                  className={classnames({ "d-flex justify-content-between": child.type === "collapse" })}
                  to={  history.location.pathname }
                  href={""}
                  onMouseEnter={() => { this.props.handleSidebarMouseEnter(child.Id) }}
                  onMouseLeave={() => { this.props.handleSidebarMouseEnter(child.Id) }}
                  key={child.Id}
                  onClick={e => { return child.type === "collapse" ? e.preventDefault() : "" }}
                  target={undefined}>
                  <div className="menu-text">
                    <Tag />
                    <span className="menu-item menu-title">
                      {child.Name}
                    </span>
                  </div>
                  {child.type === "collapse" ? (<ChevronRight className="menu-toggle-icon" size={13} />) : ("")} 
                </Link>
                {child.children && child.children.length > 0 ? this.renderChild(child, activeGroup, handleGroupClick, handleActiveItem, item.Id) : ""}
              </li>
            ) 
        }) : null}
      </ul>
    )
  }

  render() {
    return (
      <React.Fragment>
        {this.renderChild(
          this.props.group,
          this.props.activeGroup,
          this.props.handleGroupClick,
          this.props.handleActiveItem,
          null
        )}
      </React.Fragment>
    )
  }
}
export default SideMenuGroup
