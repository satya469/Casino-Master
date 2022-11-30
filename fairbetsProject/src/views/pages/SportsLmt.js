import React, { useEffect } from "react"
import queryString from "query-string"

const SportsLmt = () => {

    useEffect(() => {
        const params = queryString.parse(window.location.search)
        const {sportid, event_id} = params//23059347/1
        const thisSportId = parseInt(sportid)
        if (sportid && event_id) {
            if (thisSportId === 1 || thisSportId === 21 || thisSportId === 5) {
                
                const P = document.createElement("p")
                P.id = "matchId"
                P.className = event_id
                document.body.appendChild(P)
    
                const script = document.createElement("script")
                script.src = "/sport-lmt.js"
                script.async = true
                document.body.appendChild(script)
            }
        }
    }, [])  

    return (
        <div className="sportslimitpage">
            <div className="widgets">
                <div className="sr-widget sr-widget-1"></div>
            </div>
        </div>
    )
}

export default SportsLmt