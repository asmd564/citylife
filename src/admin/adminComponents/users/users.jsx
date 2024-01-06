import React, { useState, useEffect } from "react";
import style from "./users.module.css";
import axios from "axios";
import { useDropzone } from 'react-dropzone';
import { Close } from "../../../icons/close";
import { Dots } from "../../../icons/dots";
import { Pen } from "../../../icons/pen";
import { Trash } from "../../../icons/trash";
import { Oval } from "react-loader-spinner";

export const Users = () => {
    const [newUser, setNewUser] = useState(false)
    const [data, setData] = useState([]);
    const [inputText, setInputText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [file, setFile] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
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
    const [editMode, setEditMode] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);
    const [originalUserData, setOriginalUserData] = useState({});

    const [formDataEdit, setFormDataEdit] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        exp: '',
        phone: '',
        position: ''
    });

    const [fileEdit, setFileEdit] = useState(null);
    const [avatar, setAvatar] = useState('');
    const [preview, setPreview] = useState(null);



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
        document.body.style.overflow = 'hidden';
    }

    const handleClose = () => {
        setNewUser(false);
        setEditMode(false)
        document.body.style.overflow = 'unset';
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
        setConfirm(false);
        setSelectedUserId(null);
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('surname', formData.surname);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('password', formData.password);
        formDataToSend.append('exp', formData.exp);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('position', formData.position);
        

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
            setLoading(false);
            setNewUser(false);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    const handleNameChange = (e) => {
        setFormDataEdit(prevData => ({ ...prevData, name: e.target.value }));
      };
      
      const handleSurnameChange = (e) => {
        setFormDataEdit(prevData => ({ ...prevData, surname: e.target.value }));
      };
      
      const handleEmailChange = (e) => {
        setFormDataEdit(prevData => ({ ...prevData, email: e.target.value }));
      };
      
      const handlePasswordChange = (e) => {
        setFormDataEdit(prevData => ({ ...prevData, password: e.target.value }));
      };
      
      const handleExpChange = (e) => {
        setFormDataEdit(prevData => ({ ...prevData, exp: e.target.value }));
      };
      
      const handlePhoneChange = (e) => {
        setFormDataEdit(prevData => ({ ...prevData, phone: e.target.value }));
      };
      
      const handlePositionChange = (e) => {
        setFormDataEdit(prevData => ({ ...prevData, position: e.target.value }));
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

    const handleEditUser = async (userId) => {
        try {
          const response = await axios.get(`http://46.41.141.5:3001/users/${userId}`);
          const userData = response.data;
      
          // Сохранение исходных данных пользователя перед редактированием
          setOriginalUserData(userData);
      
          // Установка данных пользователя для редактирования
          setFormDataEdit(userData);
          setPreview(userData.avatar); // Установка превью изображения
      
          setAvatar(userData.avatar); // Установка аватара для сохранения при редактировании
      
          setEditMode(true);
          setEditingUserId(userId);
        } catch (error) {
          console.error('Ошибка загрузки данных пользователя:', error);
        }
      };
      
      const handleSubmitEdit = async (e) => {
        e.preventDefault();
        setLoading(true);
      
        const editedData = { ...formDataEdit };
        const isDataChanged = Object.keys(editedData).some(
          key => editedData[key] !== originalUserData[key]
        );
      
        if (!isDataChanged && !fileEdit) {
          console.log('No changes made');
          return;
        }
      
        try {
          const formDataToSend = new FormData();
          formDataToSend.append('name', editedData.name);
          formDataToSend.append('surname', editedData.surname);
          formDataToSend.append('email', editedData.email);
          formDataToSend.append('password', editedData.password);
          formDataToSend.append('exp', editedData.exp);
          formDataToSend.append('phone', editedData.phone);
          formDataToSend.append('position', editedData.position);
          if (fileEdit) {
            formDataToSend.append('avatar', fileEdit);
          }
      
          const editResponse = await axios.put(`http://46.41.141.5:3001/users/${editingUserId}`, formDataToSend);
          console.log('Edit successful:', editResponse.data);
          setEditMode(false);
          setEditingUserId(null);
          setLoading(false);
        } catch (error) {
          console.error('Error editing user:', error);
          setLoading(false);
        }
      };
      

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
                    <div className={style.users__list} key={item.id}>
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
                                    <button className={style.edit} onClick={() => handleEditUser(item.id)}><Pen />Редагувати дані працівника</button>
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
                        <button className={`${style.submit} ${style.active}`}>{loading ? <Oval width={16} height={16} /> : 'Зберегти'}</button>
                        <button className={style.submit} type="button" onClick={handleClose}>Скасувати</button>
                    </div>
                </form>
            )}
            {editMode && (
            <form className={style.registration__form} onSubmit={handleSubmitEdit} enctype="multipart/form-data">
            <div className={style.form__wrapper}>
                <button className={style.close} type="button" onClick={handleClose}><Close /></button>
                <h3 className={style.form__title}>Редагувати працівника</h3>
                <div className={style.form__wrapper1}>

                    <div className={style.input__wrapper__all}>
                        <div className={style.input__wrapper2}>
                            <div className={style.input__wrapper1}>
                                <label htmlFor="name" style={{background: 'none', display: 'block'}}>Імʼя</label>
                                <input 
                                    type="text"
                                    id="name"
                                    style={{background: 'none', display: 'block'}}
                                    required
                                    defaultValue={formDataEdit.name}
                                    onChange={handleNameChange}
                                />
                            </div>

                        <div className={style.input__wrapper1}>
                                <label htmlFor="surname">Прізвище</label>
                                <input
                                    type="text"
                                    id="surname"
                                    style={{background: 'none', display: 'block'}}
                                    required
                                    defaultValue={formDataEdit.surname}
                                    onChange={handleSurnameChange}
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
                                    defaultValue={formDataEdit.email}
                                    onChange={handleEmailChange}
                                />
                            </div>

                        <div className={style.input__wrapper1}>
                                <label htmlFor="password">Пароль</label>
                                <input
                                    type="password"
                                    id="password"
                                    style={{background: 'none', display: 'block'}}
                                    defaultValue={formDataEdit.password}
                                    onChange={handlePasswordChange}
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
                                    defaultValue={formDataEdit.exp}
                                    onChange={handleExpChange}
                                />
                            </div>

                        <div className={style.input__wrapper1}>
                                <label htmlFor="phone">Телефон</label>
                                <input
                                    type="phone"
                                    id="phone"
                                    style={{background: 'none', display: 'block'}}
                                    required
                                    defaultValue={formDataEdit.phone}
                                    onChange={handlePhoneChange}
                                />
                        </div>
                        <div className={style.input__wrapper1}>
                                <label htmlFor="position">Должность</label>
                                <input
                                    type="text"
                                    id="position"
                                    style={{background: 'none', display: 'block'}}
                                    required
                                    defaultValue={formDataEdit.position}
                                    onChange={handlePositionChange}
                                />
                        </div>
                        </div>  

                </div>
                <button className={`${style.submit} ${style.active}`}>Зберегти</button>
                <button className={style.submit} onClick={handleClose} type="button">Скасувати</button>
            </div>
        </form>

        )}
        </section>
    )
}