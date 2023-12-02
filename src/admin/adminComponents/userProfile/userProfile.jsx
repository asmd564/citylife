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

const UserProfile = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
        const response = await axios.get(`http://46.41.141.5:3001/users/${id}`)
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
        <Route path="profile" element={<UserSettings user={data}/>}/>
        <Route path="users" element={<Users />}/>
        <Route path="my-products/:id" element={<Edit />}/>

      </Routes>
    </>
  );
};

export default UserProfile;