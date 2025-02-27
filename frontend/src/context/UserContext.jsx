import React, { createContext, useState } from 'react'

export const UserDataContext = createContext()


const UserContext = ({ children }) => {

    const [ user, setUser ] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        }
    })
    const [rideData, setRideData] = useState(null)

    return (
        <div>
            <UserDataContext.Provider value={{ user, setUser, rideData, setRideData }}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext