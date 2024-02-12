import React, { useEffect ,useState} from 'react'
import User from './UserCard'

import { useUserList } from '../store/UserContext'
import Snackbar from '@mui/material/Snackbar';


const API_PAGE_SIZE = 100
function Users() {

    const { userList, setUserList } = useUserList()
    const [openError, setOpenError] =  useState(false);
    useEffect(() => {
        async function getUsers() {
            let last = 0
            if (userList.length > 0) {
                return
            }
            let newUsers = await getUsersFromApi(last, API_PAGE_SIZE)
            setUserList(newUsers)

        }
        getUsers()
    }, [])



    useEffect(() => {

        let lastItem = userList[userList.length - 1]
        lastItem && addObservor(lastItem)

    }, [userList])


    const getUsersFromApi = async (lastId, size) => {
        try {
            let data = await fetch(`https://api.github.com/users?since=${lastId}&per_page=${size}`)
            let newUsers = await data.json()
            return newUsers
        }
        catch (ex) {
            console.error("error Fetching data", ex)
            setOpenError(true);
            return []

        }
    }

    const addObservor = (lastItem) => {
        const target = document.getElementById('scrollLast');
        var scrollCounter = 0
        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {
                if (entry.isIntersecting) {

                    async function updateUsersList() {

                        // if user scrolls multiple times before fetching data ignore it
                        if (scrollCounter > 0) {
                            return
                        }
                        scrollCounter++

                        let newUsers = await getUsersFromApi(lastItem.id, API_PAGE_SIZE)
                        if(newUsers && newUsers.length==0){
                            scrollCounter--
                            return
                        }
                        let newUserList = userList.concat(newUsers)
                        setUserList(newUserList)

                    }
                    updateUsersList()

                }

            });
        });
        target && observer.observe(target);

    }

    const getUserList = () => {

        return userList.map((item, index) => {

            return < div key={item.id}> <User
                userId={item.id} userName={item.login} avatar={item.avatar_url}></User>
                {(userList.length - 1 === index) ? <div id="scrollLast"> </div> : " "}

            </div>

        })
    }
    return (

        <div style={{ display: 'flex', gap: "10px", flexWrap: "wrap", padding: "50px" }}>
            {
                getUserList()
            }
              < Snackbar
               anchorOrigin={{ vertical:'top', horizontal:'center' }}
            open = { openError }
            autoHideDuration = { 5000}
            onClose={()=>setOpenError(false)}
            message = "Error occured while fetching data."
                />
        </div>

    )
}

export default Users