import React from 'react'
import queryString from "query-string"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import {AXIOS_REQUEST} from "../../redux/actions/auth/index"
import {history} from "../../history"

class YaarPayResponse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status : false
        }
    }
    
    async componentDidMount() {

        const data =  queryString.parse(this.props.location.search)
        if (data) {
            const subdata = await AXIOS_REQUEST("/paymentGateWay/getpaymoroSubmitdata", {orderno : data.orderno })
            if (subdata.status) {
                document.getElementById("yaarpay").innerHTML = subdata.data
                // document.forms["paymerosubmit"].submit();
            } else {
                history.push("/")
            }
            // var form = document.createElement("form");
            // var element1 = document.createElement("input"); 
            // var element2 = document.createElement("input");  
            // var element3 = document.createElement("input");  
            // var element4 = document.createElement("input");  
            // var element5 = document.createElement("input");  
            // var element6 = document.createElement("input");  
            // var element7 = document.createElement("input");  
            // var element8 = document.createElement("input");  
            // var element9 = document.createElement("input");  
            // var element10 = document.createElement("input");  
            // var element11 = document.createElement("input");  
        
            // form.method = "POST";
            // form.action = data.request_url;   
            // form.acceptCharset = "UTF-8";   
        
            // element1.value = data['mchId'];
            // element1.name = "mchId";

            // element2.value = data['depositBankCode'];
            // element2.name = "depositBankCode";

            // element3.value = data['mchOrderNo'];
            // element3.name = "mchOrderNo";

            // element4.value = data['appId'];
            // element4.name = "appId";

            // element5.value = data['amount'];
            // element5.name = "amount";

            // element6.value = data['channelId'];
            // element6.name = "channelId";

            // element7.value = data['currency'];
            // element7.name = "currency";

            // element8.value = data['notifyUrl'];
            // element8.name = "notifyUrl";

            // element9.value = data['returnUrl'];
            // element9.name = "returnUrl";

            // element10.value = data['version'];
            // element10.name = "version";

            // element11.value = data['sign'];
            // element11.name = "sign";
            
            // form.appendChild(element1);  
            // form.appendChild(element2);  
            // form.appendChild(element3);  
            // form.appendChild(element4);  
            // form.appendChild(element5);  
            // form.appendChild(element6);  
            // form.appendChild(element7);  
            // form.appendChild(element8);  
            // form.appendChild(element9);  
            // form.appendChild(element10);  
            // form.appendChild(element11);  
            // document.getElementById("yaarpay").appendChild(form);
            // form.submit();
        }
    }

    
    render () {
        return (
            <React.Fragment>
                <div id="yaarpay" style={{display:"none"}}>
                </div>
                <SkeletonTheme  color="#202020" highlightColor="#444">
                <Skeleton count={15} />
              </SkeletonTheme>
            </React.Fragment>
        )
    }
}

export default (YaarPayResponse)