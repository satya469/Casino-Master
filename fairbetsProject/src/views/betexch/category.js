import React, { useState } from "react"
import { ChevronDown, ChevronRight, CornerRightUp } from "react-feather"
import { useDispatch, useSelector } from "react-redux"
import { ButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap'
import { useHistory } from "react-router-dom"
import { setactiveSport, setmatchelist, setmatches } from "../../redux/actions/betexchg"
import Media from 'react-media'

const Category = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [ComDropdownOpen, setComDropdownOpen] = useState(false)
    const { activeSport, Sportlist, allmatchelist, activematche } = useSelector(state => state.betexch)
    const history = useHistory()
    const dispatch = useDispatch()

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const ComtoggleDropdown = () => {
        setComDropdownOpen(!ComDropdownOpen)
    }

    const setactive = (item) => {
        history.push(`/betexchevent?eventname=${item.name}`)
        dispatch(setactiveSport(item))
    }

    const setcompetition = (item) => {
        if (allmatchelist.length) {
            let competitions = allmatchelist[0].Serlist.find(obj => obj.competition.id === item.competition.id)
            if (competitions) {
                history.push(`/betexchevent?eventname=${activeSport.name}&competition=${competitions.competition.name}`)
                let Serlist = [competitions]
                let row = Object.assign({}, allmatchelist[0])
                row.Serlist = Serlist
                dispatch(setmatchelist([row]))
                dispatch(setmatches(competitions))
            } else {
            }
        }
    }

    const getCompetition = () => {
        let d = allmatchelist.length === 1 ? allmatchelist[0].Serlist : []
        return d
    }

    const competitions = getCompetition()

    return (
        <Media queries={{ small: "(max-width: 768px)", large: "(min-width: 769px)" }}>
            {matches => (
                <React.Fragment>
                    {matches.small &&
                        <>
                            <div className={"category d-flex align-items-center justify-content-between"}>
                                <ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                    <DropdownToggle color='flat-info' caret>
                                        {activeSport ? activeSport.name : ""}
                                        {
                                            dropdownOpen ?
                                                <ChevronDown /> :
                                                <ChevronRight />

                                        }
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {
                                            Sportlist.map((item, i) => (
                                                <DropdownItem tag="div" onClick={() => setactive(item)} key={i} >{item.name}</DropdownItem>
                                            ))
                                        }
                                    </DropdownMenu>
                                </ButtonDropdown >
                                <ButtonDropdown isOpen={ComDropdownOpen} toggle={ComtoggleDropdown}>
                                    <DropdownToggle color='flat-info' caret className="max-200 textstyle" >
                                        {
                                            activematche && activematche.competition ? activematche.competition.name : "Select Matches"
                                        }
                                        {
                                            ComDropdownOpen ?
                                                <ChevronDown /> :
                                                <ChevronRight />

                                        }
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {
                                            competitions.map((item, i) => (
                                                <DropdownItem tag="div" onClick={() => setcompetition(item)} key={i} >{item.competition.name}</DropdownItem>
                                            ))
                                        }
                                    </DropdownMenu>
                                </ButtonDropdown >

                                <Button.Ripple color='flat-info' onClick={() => history.goBack()}>
                                    <CornerRightUp size={14} />
                                    <span className='align-middle ml-25'>BACk</span>
                                </Button.Ripple>
                            </div>
                        </>
                    }
                    {
                        matches.large &&
                        <>
                            <div className={"category d-flex align-items-center justify-content-between"}>
                                <div>
                                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
                                        <DropdownToggle color='flat-info' caret>
                                            {activeSport ? activeSport.name : ""}
                                            {
                                                dropdownOpen ?
                                                    <ChevronDown /> :
                                                    <ChevronRight />

                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                Sportlist.map((item, i) => (
                                                    <DropdownItem tag="div" onClick={() => setactive(item)} key={i} >{item.name}</DropdownItem>
                                                ))
                                            }
                                        </DropdownMenu>
                                    </ButtonDropdown >
                                    <ButtonDropdown isOpen={ComDropdownOpen} toggle={ComtoggleDropdown}>
                                        <DropdownToggle color='flat-info' caret>
                                            {
                                                activematche && activematche.competition ? activematche.competition.name : "Select Matches"
                                            }
                                            {
                                                ComDropdownOpen ?
                                                    <ChevronDown /> :
                                                    <ChevronRight />

                                            }
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                competitions.map((item, i) => (
                                                    <DropdownItem tag="div" onClick={() => setcompetition(item)} key={i} >{item.competition.name}</DropdownItem>
                                                ))
                                            }
                                        </DropdownMenu>
                                    </ButtonDropdown >
                                </div>

                                <Button.Ripple color='flat-info' onClick={() => history.push(`/betexchevent?eventname=${activeSport.name}`)}>
                                    <CornerRightUp size={14} />
                                    <span className='align-middle ml-25'>BACk</span>
                                </Button.Ripple>
                            </div>
                        </>
                    }
                </React.Fragment>
            )}
        </Media>
    )

}

export default Category
