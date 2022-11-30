import {AXIOS_REQUEST} from "../auth/index"
import {toast} from "react-toastify"
import {Root} from "../../../authServices/rootconfig"

export const ExchgSocket = () => {
    return async (dispatch, getState) => {
        setTimeout(() => {
            if (Root.socket) {

                
                // let activeitem = state.exchgange.activeitem;
                
                Root.socket.on("GetDataFimMenu", data => {
                    
                    const state =  getState()
                    const lastitems = state.exchgange.exchg_header_data
                    // let activeGroups = state.exchgange.activeGroups;
                    const activeHeader = state.exchgange.activeHeader
                    const rows = []
                    const items = data.data
                    for (const i in items) {
                        const item = lastitems.find(obj => obj.Id ===  items[i].Id)
                        if (item) {
                        rows.push(item)
                        } else {
                        rows.push(items[i])
                        }
                    }

                    dispatch({
                        type : "EXCHG_Header_update",
                        data :rows
                    })
        
                    if (activeHeader) {
                        const isactive = rows.find(obj => obj.Id === activeHeader.Id)
                        if (!isactive) {
                            dispatch(handleGroupClick(rows[0].Id, null, rows[0].type, rows[0], 0))
                        }
                    }
        
        
                })
        
                Root.socket.on("GetFimMatch", data => {
        
                    if (data && data.data) {
                    
                        const itemId = data.data.Id
                        const state =  getState()
                        const lastitems = state.exchgange.exchg_header_data
                        const activeGroups = state.exchgange.activeGroups
                        // let activeHeader = state.exchgange.activeHeader;

                        if (activeGroups.indexOf(itemId) !== -1) {
                            const index = lastitems.findIndex(obj => obj.Id === itemId)
                            if (index !== -1) {
                                
                                
                                lastitems[index].children = data.data.children
                                dispatch({
                                    type : "EXCHG_Header_update",
                                    data : lastitems
                                })

                                for (const i in activeGroups) {
                                    const isitem = Exchangeget_item(activeGroups[i], [data.data])
                                    if (!isitem) {
                                        if (data.data.children.length) {
                                            const child = data.data.children[0]
                                            dispatch(handleGroupClick(child.Id, itemId, child.type, child))
                                        }
                                        break
                                    } 
                                } 

                            } else {
                            
                            }
                        }
            
                    }
                })

                Root.socket.on("GETOddsData", data => {
                    dispatch({type : "CURRENT_MATCH_MARKET", data : data.data})

                })
            }
        }, 5000)
    }
}

export const getExchgHeaderData = () => {
    return async(dispatch, getState) => {
        const exchg_header_data = getState().exchgange.exchg_header_data
        if (exchg_header_data && exchg_header_data.length) {

        } else {
            const rdata = await AXIOS_REQUEST("exchg/getExchgHeaderData", {}, dispatch)
            if (rdata.status) {
                dispatch({ type: "EXCHG_FULL_HEADER_DATA", data : rdata.data })
            } else {
                toast.error("Please check your connection.")
                
            }
        }
    }
}

export const addBetSlip = (betSlipData) => {
    return async (dispatch) => {
        dispatch({type : "SET_EXCHG_BETSLIP", data :  betSlipData})
    }
}

export const exchgPlaceBet = (data) => {
    return async (dispatch) => {
        await AXIOS_REQUEST("exchg/sendPlaceBet", { data }, dispatch, true)
        dispatch(addBetSlip({}))
        
    }
}

export const get_groups_active = (id, sidebar) => {
    let open_group = []
    const s_item =  Exchangeget_item(id, sidebar)
    open_group  = get_groups(s_item)
    return open_group
  }

  export const  get_groups_parent = (parent, sidebar) => {
    const groups = []
    function fact(node) {
      groups.push(node.Id)
      const n = Exchangeget_item(node.Id, sidebar)
      if (n.ParentId === "0") {
        
      } else {
        fact({Id : n.ParentId})
      }
    }
    fact({ Id :parent})
    return groups
  }

export const  get_groups = (childs) => {
    const groups = []
    let node = {}
    function fact(item) {
      if (item.children &&  item.children.length > 0) {
        groups.push(item.Id)
        fact(item.children[0])
      } else {
        node = item
        
      }
    }
    fact(childs)
    return {groups, node}
}

export const getTypelistGet = (sitem) => {
    return async dispatch => {
        const rdata = await AXIOS_REQUEST("exchg/getExchgMarketData", {data : sitem}, dispatch, true)
        if (rdata.status) {
            dispatch({type : "CURRENT_MATCH_MARKET", data : rdata.data})
        } else {
            dispatch({type : "CURRENT_MATCH_MARKET", data : []})
        }
    }
}  

export const  handleGroupClick =  (id, parent = null, type = "", sitem, index) => {

    return async (dispatch, getState) => {
        let items = []
        const array = getState().exchgange.exchg_header_data

        if (type === "item" && sitem) {
            await dispatch(getTypelistGet(sitem))
        }

        if (sitem && sitem.ParentId === "0") {
            if (sitem.children.length) {
                items = array
            } else {
                const rdata = await AXIOS_REQUEST("exchg/getExchgData", {data : sitem}, dispatch, true)
                if (rdata.status) {
                    const rows = array
                    rows[index]['children'] = rdata.data
                    items = rows
                    dispatch({ type: "EXCHG_FULL_HEADER_DATA", data : rows, active : sitem })
                } else {
                    items = array
                }
            }
        } else {
            items = array
        }
    
        let open_group = getState().exchgange.activeGroups
        let activeitem = ""
    
        if (type === "item" && parent === null) {
            open_group = []
            dispatch({type : "SETACTIVEITEM", activeitem : id})
            
        } else if (type === "item" && parent) {
        
            const p_groups = get_groups_parent(parent, items)
            open_group = p_groups
    
            dispatch({type : "SETACTIVEGROUPS", activeGroups : p_groups,  activeitem : id})
    
          // history.push(activeitem.navLink)
    
        } else if (type === "collapse" && parent === null) {
    
          if (open_group.indexOf(id) === -1) { 
            open_group = []
            const d_ = get_groups_active(id, items)
            open_group = d_["groups"]
            activeitem = d_["node"]

            dispatch({type : "SETACTIVEGROUPS", activeGroups : open_group,  activeitem : activeitem.Id})
            await dispatch(getTypelistGet(activeitem))
    
            // history.push(d_["node"].navLink)
          } else {
            dispatch({type : "SETACTIVEGROUPS", activeGroups : [],  activeitem : null})    
            
          }
        } else if (type === "collapse" && parent) {
            if (open_group.indexOf(id) === -1) {
                open_group = []
                const d_ = get_groups_active(id, items)
                const p_groups = get_groups_parent(parent, items)
                const groups = d_["groups"]
                activeitem = d_["node"]
                open_group = p_groups
                open_group = [...open_group, ...groups]

                dispatch({type : "SETACTIVEGROUPS", activeGroups : open_group,  activeitem : activeitem.Id})
                await dispatch(getTypelistGet(activeitem))

                // history.push(d_["node"].navLink)
            } else {
                open_group = []
                const p_groups = get_groups_parent(parent, items)
                open_group = p_groups
                dispatch({type : "SETGROUP", activeGroups : open_group})
            }
        }
    }
}


export const Exchangeget_item = (id, sidebar) => {
    let item = {}
    function fact(node) {
      if (node.Id === id) {
        item = node
        return
      }
      if (node.children && node.children.length > 0) {
        for (const j in node.children) {
          if (id === node.children[j].Id) {
            item = node.children[j]
            return
          }
          fact(node.children[j])
        }
      } else {
        
      }
    }

    for (const i in sidebar) {
      fact(sidebar[i])
    }
    return item
}