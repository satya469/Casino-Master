import React from "react"
import { connect } from "react-redux"
import { getExchgHeaderData } from "../../redux/actions/exchg/index"
import LeftMenu from "./leftmenus"
import Maketshow from "./Maketshow"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

class Sports extends React.Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    componentDidMount() {
        this.props.getExchgHeaderData()
    }

    render() {
        const {allHeaderData, currentMarketData} = this.props
        return (
            <div className='height-100 w-100'>
                {
                    allHeaderData &&  allHeaderData.length ? <LeftMenu data = {allHeaderData} /> : <div className="exchange-main-menu main-menu menu-fixed menu-light menu-accordion menu-shadow">
                             <SkeletonTheme  color="#202020" highlightColor="#444" >
                                <Skeleton count={40} />
                            </SkeletonTheme>
                    </div>
                }
                {
                    currentMarketData && currentMarketData.length ? <Maketshow data={currentMarketData} /> :  <div className="exchange">
                             <SkeletonTheme  color="#202020" highlightColor="#444" >
                                <Skeleton count={20} />
                            </SkeletonTheme>
                    </div>
                }
                
            </div>
        )
    }
}

const load_data = (state) => {
	return {
        allHeaderData : state.exchgange.exchg_header_data,
        currentMarketData : state.exchgange.currentMarketData
	}
}

const mapDispatchToProps = {
    getExchgHeaderData
    
}

export default connect(load_data, mapDispatchToProps)(Sports)