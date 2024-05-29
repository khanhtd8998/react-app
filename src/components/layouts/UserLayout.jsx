import React from 'react'
import HeaderUser from '../user/HeaderUser'
import FooterUser from '../user/FooterUser'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <>
        <HeaderUser></HeaderUser>
        <Outlet></Outlet>
        <FooterUser></FooterUser>
    </>
  )
}

export default UserLayout