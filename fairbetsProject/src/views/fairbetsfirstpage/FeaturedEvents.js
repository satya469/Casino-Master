import React, { Component } from 'react'
import { connect } from 'react-redux'
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import SportsBet from "../Sports/InsideItems/SportsBet"
import { Fragment } from 'react'
import {Col, Row} from "reactstrap"

export class FeaturedEvents extends Component {
    render() {
        let { firstPageSportsData } = this.props

        return (
            <Fragment>
                <Row className="m-0 firstpagesatta">
                    <Col className="text" sm="12" >
                        <svg width="22" height="22" viewBox="0 0 16 16" >
                            <path d="M1.705 6.337l2.839 2.767a.542.542 0 01.155.48l-.67 3.906 3.508-1.845a.542.542 0 01.505 0l3.508 1.845-.67-3.907a.542.542 0 01.155-.479l2.839-2.767-3.923-.57a.54.54 0 01-.407-.296L7.79 1.917 6.035 5.47a.54.54 0 01-.408.296l-3.922.57zm10.564 8.684a.545.545 0 01-.252-.062L7.79 12.736 3.562 14.96a.543.543 0 01-.786-.57l.808-4.708-3.42-3.334a.54.54 0 01.3-.924l4.726-.687L7.304.453a.542.542 0 01.971 0l2.114 4.283 4.726.687a.54.54 0 01.3.924l-3.42 3.334.807 4.707a.541.541 0 01-.533.633z" fill="currentColor">
                            </path>
                        </svg>
                        Featured Matches
                    </Col>
                    <div className="w-100 h-100" >
                        {
                            firstPageSportsData && firstPageSportsData.length ?
                                <div className='sports-event h-100'>
                                    {
                                        <SportsBet sportsBetItem={Object.assign({}, { data: firstPageSportsData })} firstpage={true} />
                                    }
                                </div>
                                :
                                <React.Fragment>
                                    <SkeletonTheme color="#202020" highlightColor="#444" >
                                        <Skeleton count={10} />
                                    </SkeletonTheme>
                                </React.Fragment>
                        }
                    </div>
                </Row>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    firstPageSportsData: state.sports.firstPageSportsData,

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedEvents)
