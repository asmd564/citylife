import React, { useEffect, useState} from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Route, Routes, Navigate } from 'react-router-dom';
import { AddNewProject } from "../addNewProject/addNewProject";
import { AdminHeader } from "../../../components/header/adminHeader/adminHeader";
import { MyProducts } from "./myProducts/myProducts";
import { Default } from "./default/default";
import { UserSettings } from "./settings/userSettings";
import { Edit } from "../edit/edit";
import { Users } from "../users/users";
import EditProject from "../../editProject/editProject";
import { ProductPreviev } from "../productPreviev/productPreviev";
import { AllProjects } from "../allProjects/allProjects";
import { AllProjectsUser } from "../allProjects/allProjectsUser";

const UserProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BE_HOST}/users/${id}`)
        setData(response.data);
     } catch (error) {
        console.error('Ошибка получения данных о продукте:', error);
     }
};


  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
        <AdminHeader id={id} user={data} />
      <Routes>
        <Route path="/" element={<Default user={data}/>}/>
        <Route path="my-products" element={<MyProducts/>}/>
        <Route path="add-product" element={<AddNewProject user={data}/>} />
        <Route path="users" element={<Users />}/>
        <Route path="all-projects" element={<AllProjects />}/>
        <Route path="all-objects" element={<AllProjectsUser />}/>
        <Route path="profile" element={<Edit user={data}/>}/>
        <Route path="my-products/edit/:projectId" element={<EditProject user={data}/>}/>
        <Route path="my-products/:projectId" element={<ProductPreviev />}/>

      </Routes>
    </>
  );
};

export default UserProfile;