import {RouterProvider} from 'react-router-dom'
import router from './Components/Router'
import style from './index.module.css'

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App