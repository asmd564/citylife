import React, { useState, useEffect } from "react";
import Dropzone from 'react-dropzone';
import axios from "axios";
import style from './edit.module.css';

export const Edit = ({ user }) => {
    const [avatar, setAvatar] = useState(user.avatar || '');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [preview, setPreview] = useState(user.avatar || null); 

    useEffect(() => {
        if (user) {
          setName(user.name || '');
          setSurname(user.surname || '');
          setEmail(user.email || '');
          setAvatar(user.avatar || null);
        }
      }, [user]);
  
    // Функция для загрузки аватара
    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file instanceof Blob) {
            setAvatar(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); // Установка превью после чтения файла
            };
            reader.readAsDataURL(file);
        } else {
            console.error('Переданный файл не является объектом Blob');
        }
    };

    // Функции для обновления данных пользователя
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handleSurnameChange = (e) => {
      setSurname(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    // Функция для отправки обновленных данных на сервер
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Проверка заполненности или изменения данных перед отправкой
      const formData = new FormData();
      if (name !== user.name && name.trim() !== '') {
          formData.append('name', name);
      }
      if (surname !== user.surname && surname.trim() !== '') {
          formData.append('surname', surname);
      }
      if (password !== user.password && password.trim() !== '') {
        formData.append('password', password);
    }
      if (email !== user.email && email.trim() !== '') {
          formData.append('email', email);
      }
      if (avatar) {
          formData.append('avatar', avatar);
      }
  
      try {
          if (formData) {
              const response = await axios.put(`http://46.41.141.5:3001/users/${user.id}`, formData);
              console.log('Данные успешно обновлены:', response.data);
          } else {
              console.log('Нет изменений для сохранения');
          }
      } catch (error) {
          console.error('Ошибка при обновлении данных пользователя:', error);
          if (error.response && error.response.status) {
              console.error('Статус ошибки:', error.response.status);
          } else {
              console.error('Отсутствует объект ошибки ответа или его статус');
          }
      }
  };
  
    return (
      <div>
        <h2 className={style.title}>Мій профіль</h2>
        {/* Форма для редактирования данных пользователя */}
        <div className={style.form__wrapper}>
          <form onSubmit={handleSubmit} enctype="multipart/form-data" className={style.form}>
                  <Dropzone onDrop={handleDrop} accept="image/*" multiple={false}>
                  {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <div className={style.dropzone__img}>
                      {preview ? (
          
                             <img src={preview} alt="Avatar Preview" className={style.avatar}/>
                          
                         
                      ) : (
                              <p>Drop an image here or click to select one.</p>
                         
                      )}
                       </div>
                      </div>
                  )}
              </Dropzone>
            <input type="text" value={name} onChange={handleNameChange} placeholder="Name"  style={{background: 'none', padding: 0, margin: 0, marginBottom: 40}}/>
            <input type="text" value={surname} onChange={handleSurnameChange} placeholder="Surname" style={{background: 'none', padding: 0, margin: 0, marginBottom: 40}}/>
            <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" style={{background: 'none', padding: 0, margin: 0, marginBottom: 40}}/>
            <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" style={{background: 'none', padding: 0, margin: 0, marginBottom: 40}}/>
            <button type="submit" className={style.submit}>Save</button>
          </form>
        </div>
      </div>
    );
  };