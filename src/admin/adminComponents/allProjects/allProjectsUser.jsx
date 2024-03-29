import React, { useEffect, useState } from "react";
import style from "./allProjects.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ProductCardAdmin } from "../../../components/ui/product__card/product__card__admin";
import { ProductCardAll } from "../../../components/ui/product__card/product__card__all";
import { Oval } from "react-loader-spinner";
import { ProductCardUser } from "../../../components/ui/product__card/product__card__user";

export const AllProjectsUser = () => {
    const [proudcts, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [activeUser, setActiveUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
      setLoading(true);
      try {
        const productsResponse = await axios.get(`${process.env.REACT_APP_BE_HOST}/products`);
        const usersResponse = await axios.get(`${process.env.REACT_APP_BE_HOST}/users`);

        setProducts(productsResponse.data);
        setUsers(usersResponse.data);
        setFilteredProducts(productsResponse.data)

        console.log(usersResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    useEffect(() => {
        fetchData();
      }, []);
    
    useEffect(() => {
    const filtered = proudcts.filter(product => product.id.toString().includes(searchTerm));
    setFilteredProducts(filtered);
    },[searchTerm, proudcts])

    

      const filterUsers = (id) => {
        const filter = proudcts.filter((item) => item.user_id === id);
    
        setFilteredProducts(filter);
        setActiveUser(id);
      };
      const filterClear = () => {
        setFilteredProducts(proudcts);
        setActiveUser(null);
      }


    return (
        <section className={style.allprojects}>
            <h1 className={style.title}>Всі об'єкти</h1>
            <div className={style.search}>
                <input
                    type="text"
                    className={style.search__input}
                    placeholder="Пошук за ID"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className={style.users__wrapper}>
                <p className={style.paragraph}>Квартири від рієлторів: {filteredProducts.length}</p>
                <div className={`${style.users__card} ${style.user__card__all} ${activeUser === null ? style.active : ""}`} onClick={filterClear}>Всi</div>
                <div className={style.users}>
                        {users.map( user => (
                            <div className={`${style.users__card} ${activeUser === user.id ? style.active : ''}`} key={user.id} onClick={() => filterUsers(user.id)}>{user.name} {user.surname}</div>
                        ))}
                </div>
            </div>

           {loading ?
           <div className={style.loading}>
              <Oval /> 
           </div>
            :
            <>
               <div className={style.filtered__products}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                    <ProductCardUser product={product} key={product.id} />
                    ))
                ) : (
                    <p className={style.no__projects}>Немає оголошень</p>
                )}
            </div>
            </>
          }
        </section>
        
    )
}