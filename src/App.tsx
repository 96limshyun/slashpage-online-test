import './App.css'
import ElevatorManager from './components/ElevatorManager/ElevatorManager'
function App() {
  // const moving = () => {
  //   setIsMoving(true)
  //   while(idx+ 1 !== curFloor) {
  //     setTimeout(() => {
  //       setCurrenFloor((prevFloor) => prevFloor + 1)
  //     }, 500)
  //   }
  //   setIsMoving(false)
  // }

  return (
    <>
      <ElevatorManager/>
    </>
  )
}

export default App

// FloorNav
// ElevatorWrap - Elevator
// idx+ 1 === curFloor 이면 Elevator 컴포넌트를 그림
// while 로 호출한 부분 까지 
// setTimeout(()=> {
//  setCurrentFloor((prev) => prev + 1)
//}, 500)