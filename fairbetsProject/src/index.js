import React, { Suspense, lazy} from "react"
import { Provider } from "react-redux"
import { Layout } from "./utility/Layout"
import { store } from "./redux/storeConfig/store"
import ReactDOM from "react-dom"
import Spinner from "./components/@vuexy/spinner/Fallback-spinner"
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
// import './i18n';
import { UserProvider  } from "./utility/UserContext"
import { LoadingProvider } from './utility/loading'
import Contextloading from './components/@vuexy/spinner/context-loading'

const LazyApp = lazy(() => import("./App"))

ReactDOM.render(
    <Provider store={store}>
      <LoadingProvider>
        <UserProvider>
            <Suspense fallback={<Spinner />}>
              <Layout>
                  <Contextloading />
                  <LazyApp />
              </Layout>
            </Suspense>
        </UserProvider>
      </LoadingProvider>
    </Provider>,
  document.getElementById("root")
)
