import { useControls } from "leva"
import FanGroup from "../components/FanGroup";

const Experience = () => {
  return (
    <>  
        <ambientLight color={"#fff"} intensity={3} />
        <FanGroup />
    </>
  )
}

export default Experience