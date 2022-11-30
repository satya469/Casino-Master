import React, { useContext, useEffect, useState } from "react"
import { Button, Table} from "reactstrap"
import {ChevronUp, ChevronDown} from 'react-feather'
import {Bonusmenuload, ClaimRequest} from "../../../redux/actions/promotions/bonus"
import confirm from "reactstrap-confirm"
import {dateConvert} from "../../../redux/actions/auth"
import {UserContext} from "../../../utility/UserContext"
import {LoadingContext} from "../../../utility/loading"


const Casino = () => {
    
    const {user} = useContext(UserContext)
    const {showLoading,hideLoading} = useContext(LoadingContext)
    const [allData, setallData] = useState({
        data:[]
    })
    const [active, setactive] = useState("")

    const activeHander = (key) => {
        if (key === active) {
            setactive(null)
        } else {
            setactive(key)
        }
    }

    const ClaimBonusEvent = async(item) => {
        const result =  await confirm()
        if (result) {
            showLoading()
            let d = await ClaimRequest(item)
            if (d.status) {
                setallData(Object.assign({},{data : d.data}))
            }
            hideLoading()
        }
    }

    const load = async () => {
        showLoading()
        let r = await Bonusmenuload(2)
        hideLoading()
        if (r.status) {
            setallData({ data: r.data})
        }
    }
 /*eslint-disable */
    useEffect(() => {
        load()
    }, [user])
 /*eslint-enable */
    
    return (
        <div className='casino-bonus-page'>
            <div className='body'>
                {
                    allData.data && allData.data.length ? allData.data.map((item, key) => (
                        <div key={key} className='item'>
                            <div onClick={() => activeHander(key)} className='item-header cursor-pointer'>
                                <span>{item.comment}</span>
                                <span>---</span>
                                <span>Available BONUS</span>
                                <span>{active === key ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}</span>
                            </div>
                            {
                                active === key ? (
                                        <Table className="item-body" bordered responsive>
                                            <thead>
                                                <tr>
                                                    <td>
                                                        BonusID
                                                    </td>
                                                    <td>
                                                        Bonus
                                                    </td>
                                                    <td>
                                                        Amount
                                                    </td>
                                                    <td>
                                                        wager
                                                    </td>
                                                    <td>
                                                        timeline
                                                    </td>
                                                    <td>
                                                        Percent
                                                    </td>
                                                    {
                                                        !item.accept ? <>
                                                            <td>
                                                                remaind
                                                            </td>
                                                            <td>
                                                                date
                                                            </td>
                                                        </> : <td>
                                                            Status
                                                        </td>
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        {item.Numberid}
                                                    </td>
                                                    <td>
                                                        {item.Bonusname}
                                                    </td>
                                                    <td>
                                                        { item.amount }
                                                    </td>
                                                    <td>
                                                        { item.wager }
                                                    </td>
                                                    <td>
                                                        { item.timeline }
                                                    </td>
                                                    <td>
                                                        { item.percent } %
                                                    </td>
                                                        {
                                                            !item.accept ? <React.Fragment>
                                                                <td>
                                                                    {
                                                                        item.remaind
                                                                    }
                                                                </td>
                                                                <td className="d-block">
                                                                    <div>
                                                                        {dateConvert(item.createdAt)} ~ 
                                                                    </div>
                                                                    <div>
                                                                        {dateConvert(item.expiredAt)}                                                                        
                                                                    </div>
                                                                </td>
                                                            </React.Fragment> : <td>
                                                                <Button  className='igamez-button' onClick={() => ClaimBonusEvent(item)} outline >Claim</Button>
                                                            </td>
                                                        }
    
                                                </tr>
                                            </tbody>
                                        </Table>
                                ) : null
                            }
                        </div>
                    )) : null 
                }
            </div>
        </div>
    )
}

export default Casino
