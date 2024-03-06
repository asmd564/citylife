import React, { useState, useEffect } from "react";
import Dropzone from 'react-dropzone';
import axios from "axios";
import style from './edit.module.css';
import { Oval } from "react-loader-spinner";

export const Edit = ({ user }) => {
    const [avatar, setAvatar] = useState(user.avatar || '');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [preview, setPreview] = useState(user.avatar || null);
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        if (user) {
          setName(user.name || '');
          setSurname(user.surname || '');
          setEmail(user.email || '');
          setAvatar(user.avatar || null);
        }
      }, [user]);
  
    // Функция для загрузки аватара
    const handleDrop = (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
          console.error('Ошибка при загрузке файла:', rejectedFiles[0].errors[0].message);
      } else {
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
      setLoader(true)
  
      try {
          if (formData) {
              const response = await axios.put(`${process.env.REACT_APP_BE_HOST}/users/${user.id}`, formData);
          } else {
              console.log('Нет изменений для сохранения');
          }
          setLoader(false)
          setMessage(true);
          setTimeout(() => {
            setMessage(false);
        }, 3000);

      } catch (error) {
          console.error('Ошибка при обновлении данных пользователя:', error);
          if (error.response && error.response.status) {
              console.error('Статус ошибки:', error.response.status);
          } else {
              console.error('Отсутствует объект ошибки ответа или его статус');
          }
          setLoader(false)
          setErrorMessage(true);
          setTimeout(() => {
            setErrorMessage(false);
        }, 3000);
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
            <input className={style.input} type="text" value={name} onChange={(e) => handleNameChange(e)} placeholder="Name"  style={{background: 'none', padding: 0, margin: 0, marginBottom: 40}}/>
            <input className={style.input} type="text" value={surname} onChange={(e) => handleSurnameChange(e)} placeholder="Surname" style={{background: 'none', padding: 0, margin: 0, marginBottom: 40}}/>
            <input className={style.input} type="password" value={password} onChange={(e) => handlePasswordChange(e)} placeholder="Password" style={{background: 'none', padding: 0, margin: 0, marginBottom: 40}}/>
            <input className={style.input} type="email" value={email} onChange={(e) => handleEmailChange(e)} placeholder="Email" style={{background: 'none', padding: 0, margin: 0, marginBottom: 40}}/>
            <button type="submit" className={style.submit}>{loader ? <Oval width={20} height={20}/> : 'Save'}</button>
            {errorMessage && (
              <p className={style.error}>Помилка оновлення даних</p>
            )}
            {message && (
              <p className={style.okMessage}>Дані успішно оновлено</p>
            )}
          </form>
        </div>
      </div>
    );
  };