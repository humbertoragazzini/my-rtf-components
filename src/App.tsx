import { MainCanvas } from './components/atoms/MainCanvas'
import { Div } from './components/atoms/Div'
import './App.css'

function App() {
  return (
    <div className='bg-black w-screen h-screen'>
      <MainCanvas>
        <Div color="hotpink" position={[0, 0, 0]} />
      </MainCanvas>
    </div>
  )
}

export default App
