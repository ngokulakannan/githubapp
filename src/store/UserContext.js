import React, { useContext, createContext, useState } from 'react'

export const userCtx = createContext()
export const useUserList = () => {
    return useContext(userCtx)
}
function UserContext({ children }) {
    const [userList, setUserList] = useState([])
    return (
        <userCtx.Provider value={{userList,setUserList}}>{children}</userCtx.Provider>
    )
}

export default UserContext