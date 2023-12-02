import React from "react"
import { Route, Routes, Navigate } from 'react-router-dom';
import style from './admin.module.css';
import { Login } from "./adminComponents/login/login";
import UserProfile from "./adminComponents/userProfile/userProfile";
import { useAuth } from "../context/authContext";
import { AdminHeader } from "../components/header/adminHeader/adminHeader";


export const Admin = () => {
    const { isAuthenticated } = useAuth();
    
    return (
        <>
        <section className={style.admin}>
            <Routes>
            <Route path="login" element={<Login />} />
            <Route
                path="/dashboard/:id/*"
                element={isAuthenticated ? <UserProfile /> : <Navigate to="/admin/login" />}
            />
            </Routes>
        </section>
        </>
    )
}