import React, { Component } from 'react'
import { connect } from 'react-redux'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import SportsBet from "../Sports/InsideItems/SportsBet"
import { Fragment } from 'react'

export class FeaturedEvents extends Component {
    render() {
        const { firstPageSportsData } = this.props

        return (
            <Fragment>
                <div className="w-100 h-100" >
                    {
                        firstPageSportsData && firstPageSportsData.length ? <div className='sports-event h-100'>
                                {
                                    <SportsBet sportsBetItem={Object.assign({}, { data: firstPageSportsData })} firstpage={true} />
                                }
                            </div> : <React.Fragment>
                                <SkeletonTheme color="#202020" highlightColor="#444" >
                                    <Skeleton count={10} />
                                </SkeletonTheme>
                            </React.Fragment>
                    }
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    firstPageSportsData: state.sports.firstPageSportsData

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedEvents)
