import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { ordered, restocked } from "./icecreamSlice"

const IcecreamView = () => {
  const [value, setValue] = useState(1)
  const numOfIcecreams = useSelector(state => state.icecream.numOfIcecreams)
  const dispatch = useDispatch()
  return (
    <div>
      <h2>Number of Icecream - {numOfIcecreams}</h2>
        <button onClick={() => dispatch(ordered(1))}>Order Icecream</button>
        <br />
        <input type="number" value={value} onChange={e => setValue(e.target.value)} />
        <button onClick={() => dispatch(restocked(parseInt(value)))}>Restock Icecream</button>
    </div>
  )
}

export default IcecreamView
