import React, { useContext } from 'react'
import { useSelector } from 'react-redux'
import { LoadingContext } from "../../../utility/loading"
import { UserContext } from "../../../utility/UserContext"

const contextLoading = () => {
    /*eslint-disable */
    const { loading } = useSelector(state => state.loading)
    const { loadingCount } = useContext(LoadingContext)
    const { sports } = useContext(UserContext)
    /*eslint-enable */
    return (
        <>
            {
                (loadingCount > 0 || loading) && !sports  ?
                    <div className='fallback-spinner vh-100 position-fixed w-100' style={{ zIndex: 10001, background: 'rgba(0,0,0,0.5)' }}>
                        <div className="w-100 h-100 d-flex align-items-center justify-content-center" style={{ transition: ".6s transform ease" }}>
                            <div className='loading'>
                                <div className='effect-1 effects'></div>
                                <div className='effect-2 effects'></div>
                                <div className='effect-3 effects'></div>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </>
    )
}

export default contextLoading
