import {FIRSTPAGESLIDER, FIRSTPAGEDATA, FIRSTPAGEGAMELIST} from "../../types"
const initdata = {

}
export const register = (state = initdata, action) => {
  switch (action.type) {
    
    case FIRSTPAGEDATA :
      return {
        ...state,
        firstmenu : action.data.firstmenu,
        middlemenu : action.data.middlemenu,
        
        contactus : action.data.contactus,
        firstquick : action.data.firstquick,
        privacypolicy : action.data.privacypolicy,
        faqpage : action.data.faqpage,
        newtext : action.data.newtext,
        sociallink : action.data.sociallink,
        aboutus : action.data.aboutus,
        paymentimgs : action.data.paymentimgs,
        providerimgs : action.data.providerimgs,
        trackcode : action.data.trackcode,
        title : action.data.title,
        logoimg : action.data.logoimg,
        footertext : action.data.footertext,
        favicon : action.data.favicon,
        signupbuttons : action.data.signupbuttons,
        appurl : action.data.appurl,
        forgotpassword : action.data.forgotpassword,
        TimerButton : action.data.TimerButton,
        DownloadButton : action.data.DownloadButton

      }
    case FIRSTPAGESLIDER :
      return {
        ...state, 
        firstpages1 : action.data.firstpages1,
        firstpages2 : action.data.firstpages2,
        firstpages3 : action.data.firstpages3,
        firstpages4 : action.data.firstpages4
        
      }

      case FIRSTPAGEGAMELIST :
        return {
          ...state, 
          livecasinoitems : action.data.livecasinoitems,
          casinoitems : action.data.casinoitems
        }
      
    default: {
      return state
    }
  }
}
