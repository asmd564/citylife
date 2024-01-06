import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import style from './myProducts.module.css';
import { ProductCardAdmin } from "../../../../components/ui/product__card/product__card__admin";

export const MyProducts = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [productIdToDelete, setProductIdToDelete] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://46.41.141.5:3001/products`) 
            const filteredData = response.data.filter(item => item.user_id == id);
            setProduct(filteredData);
        } catch (error) {
            console.error(error);
        }
    };



    useEffect(() => {
        fetchProducts()
    }, [id]);

    const handleDeleteProduct = async (productId) => {
        try {
            await axios.delete(`http://46.41.141.5:3001/products/${productId}`);
            setProduct(prevProducts => prevProducts.filter(item => item.id !== productId));
        } catch (error) {
            console.error('Ошибка удаления продукта:', error);
        }
    };

    const updateProductsList = () => {
        fetchProducts(); // Обновление списка продуктов
    };



    return (
        <div className={style.section__wrapper}>
            <h2 className={style.title}>Мої оголошення</h2>
            <div className={style.cards__wrapper}>
                {product && product.length > 0 ? (
                product.map(item => (
                            <ProductCardAdmin key={item.id} product={item} onDelete={() => handleDeleteProduct(item.id)} updateProductsList={updateProductsList}/>
                    ))
                ) : (
                    <h3>У вас ще немає оголошень...</h3>
                )}
            
            </div>
            {productIdToDelete && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Вы уверены, что хотите удалить?</p>
                        <button onClick={() => handleDeleteProduct(productIdToDelete)}>Да</button>
                        <button onClick={() => setProductIdToDelete(null)}>Отмена</button>
                    </div>
                </div>
            )}
        </div>
    )
}