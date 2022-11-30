import React from "react"
import { Link } from "react-router-dom"
import classnames from "classnames"
import SideMenuGroup from "./SideMenuGroup"
import { ChevronRight } from "react-feather"
import { history } from "../../../history"
import {connect} from "react-redux"
import * as FaIcon from 'react-icons/fa'
import { handleGroupClick} from "../../../redux/actions/exchg/index"

class SideMenuContent extends React.Component {
  constructor(props) {
    super(props)

    this.parentArr = []
    this.collapsedPath = null
    this.redirectUnauthorized = () => {
      history.push("/misc/not-authorized")
    }
  }

  state = {
    flag: true,
    isHovered: false,
    activeGroups: [],
    currentActiveGroup: [],
    tempArr: [],
    activeitem : null,
    hoveredMenuItem: null
  }


  // Exchangeget_item_navLink = (id) =>{
  //   let sidebar = this.props.data;
  //   let item = {};
  //   function fact(node){
  //     if(node.navLink === id){
  //       item = node;
  //       return;
  //     }
  //     if(node.children && node.children.length > 0){
  //       for(let j in node.children){
  //         if(id === node.children[j].navLink){
  //           item = node.children[j];
  //           return;
  //         }
  //         fact(node.children[j]);
  //       }
  //     }else{
  //       return;
  //     }
  //   }

  //   for(var i in sidebar){
  //     fact(sidebar[i]);
  //   }
  //   return item;
  // }

  initRender = () => {
    const sidebar = this.props.data
    const { activeitem} = this.props.exchgangedata
    if (activeitem && activeitem.length) {
      // let item = sidebar[0];
      // let match = Exchangeget_item(activeitem,exchg_header_data);
      // this.props.handleGroupClick(match.Id, null, match.type,match,0)
    } else {
      if (sidebar && sidebar.length) {
        const item = sidebar[0]
        this.props.handleGroupClick(item.Id, null, item.type, item, 0)
      }
    }
  }

  componentDidMount() {
    this.initRender()
  }

  handleSidebarMouseEnter = (Id) => {
    this.setState({hoveredMenuItem : Id})
  }

  render() {
    const sidebar = this.props.data
    // Loop over sidebar items
    // eslint-disable-next-line
    const {activeGroups, activeitem} = this.props.exchgangedata;
    const menuItems = sidebar && sidebar.map((item, i) => {

      const CustomAnchorTag = Link
      const Tag = FaIcon["FaFutbol"]
      // checks if item has groupheader\

      const renderItem = (
        <li 
          className={classnames("nav-item", {

            "has-sub": item.type === "collapse",

            open: activeGroups.includes(item.Id),

            "sidebar-group-active": activeGroups.includes(item.Id),

            hover: this.state.hoveredMenuItem === item.Id,

            active: activeitem === item.Id  && item.type === "item"

          })}

          key={item.Id}
          onClick={  e => {
            e.stopPropagation()
            if (item.type === "item") {
               this.props.handleGroupClick(item.Id, null, item.type, item, i)
              if (this.props.deviceWidth <= 1200 && item.type === "item") {
                this.props.toggleMenu()
              }
            } else {
               this.props.handleGroupClick(item.Id, null, item.type, item, i)
            }
          }}>

          <CustomAnchorTag
            to={ history.location.pathname }
            className={`d-flex justify-content-start`}
            onMouseEnter={() => { this.handleSidebarMouseEnter(item.Id) }} 
            onMouseLeave={() => { this.handleSidebarMouseEnter(item.Id) }}
            key={item.Id}
            target={undefined}>
            <div className="menu-text"> 
            <Tag /> 
            <span className="menu-item menu-title"> {item.Name} </span> </div> 
            {item.type === "collapse" ? (<ChevronRight className="menu-toggle-icon" size={13} />) : ("")}

          </CustomAnchorTag>
          {item.type === "collapse" ? (
            <SideMenuGroup
              group={item}
              handleGroupClick={this.props.handleGroupClick}
              activeGroup={activeGroups}
              handleActiveItem={activeitem}
              activeItemState={activeitem}
              handleSidebarMouseEnter={this.handleSidebarMouseEnter}
              activePath={this.props.activePath}
              hoverIndex={this.state.hoveredMenuItem}
              triggerActive={undefined}
              currentActiveGroup={this.state.currentActiveGroup}
              redirectUnauthorized={this.redirectUnauthorized}
              collapsedMenuPaths={this.props.collapsedMenuPaths}
              toggleMenu={this.props.toggleMenu}
              deviceWidth={this.props.deviceWidth}
            />
          ) : (
            ""
          )}
        </li>
      )

      // if ( item.navLink && item.collapsed !== undefined && item.collapsed === true ) { 
      //   this.collapsedPath = item.navLink;
      //   this.props.collapsedMenuPaths(item.navLink)
      // }

      if (item.type === "collapse" || item.type === "item") {
        return renderItem
      } else {
        // return <div></div>
        return this.redirectUnauthorized()
      }
    })
    return <React.Fragment>{menuItems}</React.Fragment>
  }
}

const mapStateToProps = (state) => ({
	exchgangedata : state.exchgange
})

const mapDispatchToProps = {
  handleGroupClick
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuContent)
