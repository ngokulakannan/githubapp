import React, { useEffect, useState, useRef } from 'react'
import User from './UserCard'

import { useUserList } from '../store/UserContext'
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const API_PAGE_SIZE = 100
function Users() {

    const { userList, setUserList } = useUserList()
    const [openError, setOpenError] = useState(false);
    const [username , setUsername] = useState("")
    const [userLocation , setLocation] = useState("")
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
                        if (newUsers && newUsers.length == 0) {
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

        return userList && userList?.length !== 0 && userList.map((item, index) => {

            return < div key={item.id}> <User
                userId={item.id} userName={item.login} avatar={item.avatar_url}></User>
                {(userList.length - 1 === index) ? <div id="scrollLast"> </div> : " "}

            </div>

        })
    }

    const searchUsers = async ()=>{
        let query = ""
        if(username==="" && userLocation===""){
            let newUsers = await getUsersFromApi(0, API_PAGE_SIZE)
            setUserList(newUsers)
            return
        }
        if(username!==""){
            query+=  username
        }
        if(userLocation!==""){
            query+= " location:"+userLocation
        }
        query = "q=" +encodeURIComponent(query)
        let searchedUsers = await searchUsersFromApi(query,100)
        setUserList(searchedUsers)

       
    }

    const searchUsersFromApi = async (query,size) => {
        try {
            let data = await fetch(`https://api.github.com/search/users?${query}`)
            let newUsers = await data.json()
            
            return newUsers?.items
        }
        catch (ex) {
            console.error("error Fetching data", ex)
            setOpenError(true);
            return []

        }
    }


    return (
        <>
            <div>
                <TextField   label="Name" variant="standard" onChange={(event)=> setUsername(event.target.value)} value={username} /> &nbsp;&nbsp;
                <TextField   label="Location" variant="standard"  onChange={(event)=> setLocation(event.target.value)} value={userLocation} />
                <Button variant="contained" onClick={()=>searchUsers()}>Search</Button>
            </div>
            <div style={{ display: 'flex', gap: "10px", flexWrap: "wrap", padding: "50px" }}>



                {
                    getUserList()
                }
                < Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={openError}
                    autoHideDuration={5000}
                    onClose={() => setOpenError(false)}
                    message="Error occured while fetching data."
                />
            </div>
        </>

    )
}

export default Users