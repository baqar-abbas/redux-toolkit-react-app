import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {  fetchUsers } from "./userSlice"

const UserView = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, []);
    return (
      <div>
        <h2>List of Users</h2>
        {user.loading ? <p>Loading...</p> : null}
        {!user.loading && user.error ? <p>{user.error}</p> : null}
        {/* <ul>
          {user.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul> */}
        {!user.loading && user.users.length > 0 ? (
          <div>
            {user.users.map((user) => (
              <p key={user.id}>{user.name}</p>
            ))}
          </div>
        )  : null }
      </div>
    )
  }
  
  export default UserView
  