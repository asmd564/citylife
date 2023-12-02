import React, { useState, useEffect } from "react";
import style from "./users.module.css";
import axios from "axios";
import { useDropzone } from 'react-dropzone';
import { Close } from "../../../icons/close";
import { Dots } from "../../../icons/dots";
import { Pen } from "../../../icons/pen";
import { Trash } from "../../../icons/trash";

export const Users = () => {
    const [newUser, setNewUser] = useState(false)
    const [data, setData] = useState([]);
    const [inputText, setInputText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [file, setFile] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        exp: '',
        phone: '',
        position: ''
    });
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://46.41.141.5:3001/users')
                setData(response.data);
                setFilteredData(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    const handleAdd = () => {
        setNewUser(true);
    }

    const handleClose = () => {
        setNewUser(false);
    }

    const handleInputChange = (e) => {
        const searchText = e.target.value.toLowerCase();
        setInputText(searchText);
        
        if (searchText.trim() === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter(item => (
                item.name.toLowerCase().includes(searchText) || item.surname.toLowerCase().includes(searchText)
            ));
            setFilteredData(filtered);
        }
    };

    const handleOpenMenu = (userId) => {
        setSelectedUserId(userId === selectedUserId ? null : userId);
    }

    const handleOpenConfirm = () => {
        setConfirm(true);
    }

    const handleCloseConfirm = () => {
        setConfirm(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('surname', formData.surname);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('exp', formData.exp);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('position', formData.position);
        formDataToSend.append('avatar', file); // Add the file to FormData

        try {
            const response = await axios.post('http://46.41.141.5:3001/registration', formDataToSend);
            console.log('Registration successful:', response.data);
            setFormData({
                name: '',
                surname: '',
                email: '',
                password: '',
                exp: '',
                phone: '',
                position: ''
            });
            setFile(null);
            setNewUser(false);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const onDrop = (acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        setFile(Object.assign(selectedFile, {
          preview: URL.createObjectURL(selectedFile)
        }));
      };
    
      const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: 'image/*',
        maxFiles: 1
      });

    const inputStyle = {
        background: 'none',
    }

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://46.41.141.5:3001/users/${userId}`);
            const updatedData = data.filter(item => item.id !== userId);
            setData(updatedData);
            setFilteredData(updatedData);
            setConfirm(false);
            console.log(`Пользователь с ID ${userId} удален`);
        } catch (error) {
            console.error('Ошибка удаления пользователя:', error);
        }
    };

    return (
        <section className={`${style.users} container`}>
            <h2 className={style.users__title}>Працівники</h2>
            <div className={style.input__wrapper}>
                <input 
                    type="text"
                    placeholder="Пошук по імені"
                    className={style.input}
                    style={inputStyle}
                    value={inputText}
                    onChange={handleInputChange}
                />
                <button className={style.add__button} onClick={handleAdd}>Додати рієлтора</button>
            </div>
            <div className={style.list__wrapper}>
                <div className={style.list__titles}>
                    <p className={`${style.list__title} ${style.list1}`}>Фото</p>
                    <p className={`${style.list__title} ${style.list2}`}>Імʼя та посада</p>
                    <p className={`${style.list__title} ${style.list3}`}>Досвід у сфері нерухомості </p>
                    <p className={`${style.list__title} ${style.list4}`}>Номер тел. (Telegram, Viber)</p>
                    <p className={`${style.list__title} ${style.list5}`}>Контактний номер</p>
                </div>

                {filteredData.map(item => (
                    <div className={style.users__list}>
                    <div className={style.card__wrapper}>
                        <div className={style.avatar__wrapper}>
                            <img src={item.avatar} alt="avatar" />
                        </div>
                        <div className={style.name__wrapper}>
                            <h3 className={style.name}>{`${item.name} ${item.surname}`}</h3>
                            <p className={style.description}>Менеджер з продажу агентства нерухомості "City live".</p>
                        </div>
                        <div className={style.exp}>
                            <p className={style.exp__p}>{`З ${item.exp} року`}</p>
                        </div>
                        <div className={style.social}>
                            <p className={style.social__p}>{item.phone}</p>
                        </div>
                        <div className={style.phone}>
                            <p className={style.phone__p}>{item.phone}</p>
                        </div>
                        <div className={style.buttons}>
                            <button className={style.dots} onClick={() => handleOpenMenu(item.id)}><Dots /></button>
                            <div className={style.hidden__menu}>
                                {selectedUserId === item.id && (
                                    <div className={style.hidden__menu__wrapper}>
                                    <button className={style.edit}><Pen />Редагувати дані працівника</button>
                                    <button className={style.edit} onClick={handleOpenConfirm}><Trash />Деактивувати працівника</button>
                                    {confirm && (
                                        <div className={style.hidden__submit}>
                                        <div className={style.hidden__submit__wrapper}>
                                            <p className={style.hidden__title}>Ви впевнені, що хочете видалити цього працівника із системи?</p>
                                            <button className={style.delete__close} onClick={handleCloseConfirm}>Скасувати</button>
                                            <button className={style.delete} onClick={() => handleDeleteUser(item.id)}>Видалити</button>
                                        </div>  
                                    </div>
                                    )}
                                    
                                </div>
                                )}
                            </div>
                        </div>

                        {/* <button onClick={() => handleDeleteUser(item.id)}>Удалить</button> */}
                    </div>
                </div>
                ))}
           
            </div>
            {newUser && (
                <form className={style.registration__form} onSubmit={handleSubmit}>
                    <div className={style.form__wrapper}>
                        <button className={style.close} onClick={handleClose}><Close /></button>
                        <h3 className={style.form__title}>Додати працівника</h3>
                        <div className={style.form__wrapper1}>
                            <div>
                                <div className={style.drop} {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center', width: '184px', height: '184px' }}>
                                    <input {...getInputProps()} />
                                    {file ? (
                                    <img src={file.preview} alt="Preview" style={{ maxWidth: '184px', maxHeight: '184px' }} />
                                    ) : (
                                    <p>Drop your image here or  browse</p>
                                    )}
                                </div>
                            </div>

                            <div className={style.input__wrapper__all}>
                                <div className={style.input__wrapper2}>
                                    <div className={style.input__wrapper1}>
                                        <label htmlFor="name" style={{background: 'none', display: 'block'}}>Імʼя</label>
                                        <input 
                                            type="text"
                                            id="name"
                                            style={{background: 'none', display: 'block'}}
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                <div className={style.input__wrapper1}>
                                        <label htmlFor="surname">Прізвище</label>
                                        <input
                                            type="text"
                                            id="surname"
                                            style={{background: 'none', display: 'block'}}
                                            required
                                            value={formData.surname}
                                            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                                        />
                                </div>
                                </div>

                                <div className={style.input__wrapper2}>
                                    <div className={style.input__wrapper1}>
                                        <label htmlFor="email" style={{background: 'none', display: 'block'}}>E-mail</label>
                                        <input
                                            type="email"
                                            id="email"
                                            style={{background: 'none', display: 'block'}}
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                <div className={style.input__wrapper1}>
                                        <label htmlFor="password">Пароль</label>
                                        <input
                                            type="password"
                                            id="password"
                                            style={{background: 'none', display: 'block'}}
                                            required
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                </div>
                                </div>                       
                            </div>

                            <div className={style.input__wrapper5}>
                                    <div className={style.input__wrapper1}>
                                        <label htmlFor="exp" style={{background: 'none', display: 'block'}}>Досвід роботи</label>
                                        <input 
                                            type="text"
                                            id="exp"
                                            style={{background: 'none', display: 'block'}}
                                            required
                                            value={formData.exp}
                                            onChange={(e) => setFormData({ ...formData, exp: e.target.value })}
                                        />
                                    </div>

                                <div className={style.input__wrapper1}>
                                        <label htmlFor="phone">Телефон</label>
                                        <input
                                            type="phone"
                                            id="phone"
                                            style={{background: 'none', display: 'block'}}
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                </div>
                                <div className={style.input__wrapper1}>
                                        <label htmlFor="position">Должность</label>
                                        <input
                                            type="text"
                                            id="position"
                                            style={{background: 'none', display: 'block'}}
                                            required
                                            value={formData.position}
                                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        />
                                </div>
                                </div>  

                        </div>
                        <button className={style.submit}>Зберегти</button>
                        <button className={style.submit}>Скасувати</button>
                    </div>
                </form>
            )}
            
        </section>
    )
}