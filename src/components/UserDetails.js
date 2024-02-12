import React, { useEffect, useState } from 'react'

import { Link, useParams } from 'react-router-dom'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
const logoSVG = require('../images/logo.svg')

function UserDetails() {
  let { userId } = useParams();
  let [userDetail, setUserDetail] = useState(null)


  useEffect(() => {
    async function getUser() {
      let userData = await getUsersFromApi()
      console.log(userData)
      setTimeout(() => setUserDetail(userData), 2000)
    }
    getUser()
  }, [userId])

  const getUsersFromApi = async () => {
    let data = await fetch(`https://api.github.com/users/${userId}`)
    let newUsers = await data.json()
    return newUsers
  }

  return (
    <div >


      <div style={{ textAlign: "-webkit-center" }}>


        <Card sx={{ maxWidth: 345, m: 2 }}>
          <CardHeader
            avatar={
              userDetail == null ? (
                <Skeleton animation="wave" variant="circular" width={40} height={40} />
              ) : (
                <Avatar
                  alt="github logo"
                  src={logoSVG.default}
                />
              )
            }

            title={
              userDetail == null ? (
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />
              ) : (
                userDetail.name
              )
            }
            subheader={
              userDetail == null ? (
                <Skeleton animation="wave" height={10} width="40%" />
              ) : (
                userDetail.login
              )
            }
          />
          {userDetail == null ? (
            <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
          ) : (
            <CardMedia
              component="img"
              height="140"
              image={userDetail.avatar_url}
              alt="Nicola Sturgeon on a TED talk stage"
            />
          )}
          <CardContent>
            {userDetail == null ? (
              <>
                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                <Skeleton animation="wave" height={10} width="80%" />
              </>
            ) : (

              <div style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                Followers : {userDetail.followers} <br />
                Following : {userDetail.following}<br />
                Email : {userDetail.email ? userDetail.email : "Not Available"}<br />
                Twitter : {userDetail.twitter_username ? userDetail.twitter_username : "Not Available"}<br />

              </div>
            )}
          </CardContent>
        </Card>
      </div>
      

      Back to <Link to="/" >Users List</Link>
    </div>
  )
}

export default UserDetails