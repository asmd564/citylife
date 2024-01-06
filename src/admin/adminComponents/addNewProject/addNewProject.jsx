import React, { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import ProjectMap from '../../../components/ProjectMap/ProjectMap';
import style from './addNewProject.module.css';
import Select from 'react-select';
import { Oval } from 'react-loader-spinner';

export const AddNewProject = ({ user }) => {
    const [type, setType] = useState('');
    const [buildingOption, setBuildingOption] = useState('');
    const [stateOption, setStateOption] = useState('');
    const [buildingType, setBuildingType] = useState('');
    const [heating, setHeating] = useState('');
    const [waterheating, setWaterheating] = useState('');
    const [currency, setCurrency] = useState('');
    const [top, setTop] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [mapLng, setMapLng] = useState('');
    const [mapLat, setMapLat] = useState('');
    const [images, setImages] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formNotSubmitted, setFormNotSubmitted] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    const imagePreviews = acceptedFiles.map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));

    setImages(prevImages => [...prevImages, ...imagePreviews]);
  }, []);

  const removeImage = index => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const rearrangeImages = (startIndex, endIndex) => {
    const updatedImages = Array.from(images);
    const [removed] = updatedImages.splice(startIndex, 1);
    updatedImages.splice(endIndex, 0, removed);
    setImages(updatedImages);
  };

  const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: true,
    });
  
    const handleTypeChange = (selectedOption) => {
        setType(selectedOption.value);
    };

    const handleTop = (selectedOption) => {
        setTop(selectedOption.value);
    };

    const handleBuildingOptionChange = (selectedOption) => {
        setBuildingOption(selectedOption.value);
    };

    const handleStateOption = (selectedOption) => {
        setStateOption(selectedOption.value);
    };

    const handleBuildingType = (selectedOption) => {
        setBuildingType(selectedOption.value);
    };

    const handleHeatingType = (selectedOption) => {
        setHeating(selectedOption.value);
    };

    const handleWaterHeatingType = (selectedOption) => {
        setWaterheating(selectedOption.value);
    };

    const handleCurrencyType = (selectedOption) => {
        setCurrency(selectedOption.value);
    };

    

    const typeOptions = [
        { value: 'rent', label: 'Оренда' },
        { value: 'sell', label: 'Продаж' },
      ];

      const topOptions = [
        { value: 'true', label: 'Так' },
        { value: 'false', label: 'Нi' },
      ];

    const typeOfHeating = [
        { value: 'Індивідуальне газове', label: 'Індивідуальне газове' },
        { value: 'Індивідуальне електричне', label: 'Індивідуальне електричне' },
        { value: 'Централізоване', label: 'Централізоване' },
        { value: 'Твердопаливний котел', label: 'Твердопаливний котел'},
    ]

    const typeOfWaterHeating = [
        { value: 'котел', label: 'Котел' },
        { value: 'бойлер', label: 'Бойлер' },
        { value: 'колонка', label: 'Колонка' },
    ]
    
      const buildingTypeOptions = [
        { value: 'Будинок', label: 'Будинок'},
        { value: 'Квартира', label: 'Квартира'},
        { value: 'Дача', label: 'Дача'},
        { value: 'Земля', label: 'Земля'},
        { value: 'Комерційна нерухомість', label: 'Комерційна нерухомість'},
      ]


      const buildingOptions = [
        { value: 'цегляний', label: 'Цегляний'},
        { value: 'панельний', label: 'Панельний'},
        { value: 'монолітний', label: 'Монолітний'},
        { value: 'дерев\'яний', label: 'Дерев\'яний'},
       
      ]

      const stateOptions = [
        { value: 'З ремонтом', label: 'З ремонтом' },
        { value: 'Без ремонту', label: 'Без ремонту' },
      ];

      const typeCurrency = [
        { value: '$', label: '$' },
        { value: '€', label: '€' },
        { value: 'UAH', label: 'UAH' },
      ]

      const handleLatChange = (e) => {
        setLat(e.target.value);
        setMapLat(Number(e.target.value));
        
    };

    const handleHidden = () => {
        setHidden(true);
    }

    const handleCloseHidden = () => {
        setHidden(false);
    }

    const handleLngChange = (e) => {
        setLng(e.target.value);
        setMapLng(Number(e.target.value));
    };

    const formRef = useRef(null);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
    
        const formData = new FormData();
        formData.append('user_id', user.id);
        formData.append('name', e.target.name.value);
        formData.append('district', e.target.district.value);
        formData.append('adress', e.target.adress.value);
        formData.append('city', e.target.city.value);
        formData.append('lat', lat);
        formData.append('lng', lng);
        formData.append('description', e.target.description.value);
        formData.append('price', e.target.price.value);
        formData.append('rooms', e.target.rooms.value);
        formData.append('area', e.target.area.value);
        formData.append('flor', e.target.flor.value);
        formData.append('type', type);
        formData.append('isHouse', buildingOption);
        formData.append('state', stateOption);
        formData.append('buildingtype', buildingType);
        formData.append('heating', heating);
        formData.append('waterheating', waterheating);
        formData.append('currency', currency);
        formData.append('top', top);


    
        images.forEach((image) => {
          formData.append('images', image);
        });
    
        try {
          const response = await axios.post(`http://46.41.141.5:3001/products`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          if (formRef.current) {
            formRef.current.reset();
                setType('');
                setBuildingOption('');
                setStateOption('');
                setBuildingType('');
                setHeating('');
                setWaterheating('');
                setCurrency('');
                setTop('');
                setLat('');
                setLng('');
                setImages([]);

        }
          setFormSubmitted(true);
          setHidden(false);
          setIsLoading(false);

            setTimeout(() => {
                setFormSubmitted(false);
            }, 3000);
        } catch (error) {
          console.error('Ошибка отправки данных:', error);
          setFormNotSubmitted(true);
          setIsLoading(false);

            setTimeout(() => {
                setFormNotSubmitted(false);
            }, 3000);
        }

      };

      const handleReset = () => {
        if (formRef.current) {
            formRef.current.reset();
                setType('');
                setBuildingOption('');
                setStateOption('');
                setBuildingType('');
                setHeating('');
                setWaterheating('');
                setCurrency('');
                setTop('');
                setLat('');
                setLng('');
                setImages([]);

        }
      }
    

    return (
        <section className={style.add}>
            <h1 className={style.title}>Додати обʼєкт</h1>
            <p className={style.subtitle}>Заповніть будь ласка всі поля , завантажте не більше 30 фото обʼєкту. Ви завжди матимете можливість редагувати ці дані і знову опублікувати.</p>
                <form action="" className={`${style.form} container`} onSubmit={handleFormSubmit} ref={formRef}>
                <h2 className={style.form__title}>Опис обʼєкта</h2>
                    <div className={style.form__wrapper}>
                        <div className={style.first__input__wrapper}>
                            <input type="text" className={style.hidden__input} value={user.id} name="user_id" id="user_id"/>
                            <label htmlFor="name" className={style.labelWithMargin}>Заголовок</label>
                            <input type="text" id="name" name="name" placeholder='Повний заголовок для сторінки обʼєкта' />
                            <div className={style.inputs__group__wrapper}>
                                <div className={style.group__wrapper}>
                                    <label htmlFor="district" className={style.labelWithMargin}>Район</label>
                                    <input type="text" name="district" id="district" placeholder="Напишіть район" />

                                    <label htmlFor="adress" className={style.labelWithMargin}>Вулиця</label>
                                    <input type="text" name="adress" id="adress" placeholder="Адреса i номер будинку" />
                                </div>
                                <div className={style.group__wrapper}>
                                    <label htmlFor="lat" className={style.labelWithMargin}>Широта</label>
                                    <input type="text" name="lat" id="lat" placeholder="Широта" value={lat} onChange={handleLatChange} />

                                    <label htmlFor="lng" className={style.labelWithMargin}>Долгота</label>
                                    <input type="text" name="lng" id="lng" placeholder="Долгота" value={lng} onChange={handleLngChange} />
                                </div>  
                            </div>
                            <ProjectMap lat={mapLat} lng={mapLng}/>

                            <label htmlFor="description" className={style.labelWithMargin}>Опис обʼєкта</label>
                                <textarea type="text" name="description" id="description" placeholder="Напишіть детальний опис" className={style.textarea} />
                        </div>
                        <div className={style.form__wrapper2}>
                        <div className={style.custom__select__wrapper1}>
                                <label htmlFor="city" className={style.labelWithMargin}>Місто</label>
                                <input type="text" name="city" id="city" placeholder="Подайте місто" />
                             </div>
                            <div className={style.custom__select__wrapper}>
                                <label htmlFor="type" className={style.labelWithMargin}>Тип операції</label>
                                <Select
                                    classNamePrefix='custom-select'
                                    placeholder= 'Виберіть тип операції'
                                    options={typeOptions}
                                    onChange={handleTypeChange}   
                                    
                                />
                            </div>

                            <div className={style.custom__select__wrapper}>
                                <label htmlFor="isHouse" className={style.labelWithMargin}>Тип нерухомості</label>
                                <Select
                                    classNamePrefix='custom-select'
                                    placeholder= 'Виберіть тип нерухомості'
                                    options={buildingTypeOptions}
                                    onChange={handleBuildingOptionChange}   
                                />
                            </div>
                            <div className={style.custom__select__wrapper1}>
                                <label htmlFor="rooms" className={style.labelWithMargin}>Кількість кімнат</label>
                                <input type="text" name="rooms" id="rooms" placeholder="Напишіть к-ість кімнат" />
                             </div>
                             <div className={style.custom__select__wrapper1}>
                                <label htmlFor="area" className={style.labelWithMargin}>Площа, м²</label>
                                <input type="text" name="area" id="area" placeholder="Загальна/житлова/пл. кухнi" />
                             </div>

                             <div className={style.custom__select__wrapper1}>
                                <label htmlFor="flor" className={style.labelWithMargin}>Поверх</label>
                                <input type="text" name="flor" id="flor" placeholder="Поверх/Кiлькiсть поверхiв" />
                             </div>
                             <div className={style.custom__select__wrapper}>
                                <label htmlFor="state" className={style.labelWithMargin}>Стан</label>
                                <Select
                                    classNamePrefix='custom-select'
                                    placeholder= 'Виберіть стан нерухомості'
                                    options={stateOptions}
                                    onChange={handleStateOption}   
                                />
                            </div>

                            <div className={style.custom__select__wrapper}>
                                <label htmlFor="buildingtype" className={style.labelWithMargin}>Тип будинку</label>
                                <Select
                                    classNamePrefix='custom-select'
                                    placeholder= 'Виберіть тип нерухомості'
                                    options={buildingOptions}
                                    onChange={handleBuildingType}   
                                />
                            </div>
                            <div className={style.custom__select__wrapper}>
                                <label htmlFor="heating" className={style.labelWithMargin}>Опалення</label>
                                <Select
                                    classNamePrefix='custom-select'
                                    placeholder= 'Виберіть тип опалення'
                                    options={typeOfHeating}
                                    onChange={handleHeatingType}   
                                />
                            </div>
                            <div className={style.custom__select__wrapper}>
                                <label htmlFor="waterheating" className={style.labelWithMargin}>Підігрів води</label>
                                <Select
                                    classNamePrefix='custom-select'
                                    placeholder= 'Виберіть підігрів води'
                                    options={typeOfWaterHeating}
                                    onChange={handleWaterHeatingType}   
                                />
                            </div>

                            <div className={style.custom__select__wrapper1}>
                                <label htmlFor="price" className={style.labelWithMargin}>Ціна</label>
                                <input type="text" name="price" id="price" placeholder="Ціна" />
                             </div>
                             <div className={style.custom__select__wrapper}>
                                <label htmlFor="top" className={style.labelWithMargin}>Топ</label>
                                <Select
                                    classNamePrefix='custom-select'
                                    placeholder= 'В топ?'
                                    options={topOptions}
                                    onChange={handleTop}   
                                />
                            </div>
                             <div className={style.custom__select__wrapper}>
                                <label htmlFor="currency" className={style.labelWithMargin}>Валюта</label>
                                <Select
                                    classNamePrefix='custom-select'
                                    placeholder= 'Виберіть валюту'
                                    options={typeCurrency}
                                    onChange={handleCurrencyType}   
                                />
                            </div>
                    </div>
                    </div>

                    <div>
                        <div className={style.image__preview__container}>
                            {images.map((image, index) => (
                            <div key={index} className={style.image__preview} draggable
                                onDragStart={(e) => e.dataTransfer.setData('text/plain', index)}>
                                <button onClick={() => removeImage(index)} className={style.img__btn}>Видалити</button>
                                <img 
                                    src={image.preview}
                                    alt={`preview-${index}`}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
                                        rearrangeImages(draggedIndex, index);
                                    }}
                                    draggable
                                    onDragStart={(e) => e.dataTransfer.setData('text/plain', index)}
                                />
                            </div>
                            ))}
                            <div className={style.dropzone} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Перетягніть свої фото сюди або натиснути <span>Завантажити</span></p>
                        </div>
                        </div>
                    </div>
                    <div className={style.button__wrapper}>
                        <button className={style.clear__btn} onClick={handleReset} type="button">Скасувати</button>
                        <button className={style.submit__btn} onClick={handleHidden} type="button">Опублікувати</button>

                        {hidden && (
                            <div className={style.submit__hidden}>
                            <div className={style.submit__hidden__wrapper}>
                                <p className={style.submit__title}>Ви впевнені, що хочете опублікувати цей проект?</p>
                                <button className={style.clear__btn} onClick={handleCloseHidden} type="button">Скасувати</button>
                                <button className={isLoading ? `${style.submit__btn} ${style.submit__btn__1}` : `${style.submit__btn}`}>
                                    {isLoading ? (
                                        <Oval
                                        height={20}
                                        width={20}
                                        color="#808080"
                                        wrapperStyle={{}}
                                        wrapperClass={style.oval}
                                        visible={true}
                                        ariaLabel='oval-loading'
                                        secondaryColor="#808080"
                                        strokeWidth={2}
                                        strokeWidthSecondary={2} />
                                        ) : (
                                        'Опублікувати'
                                    )}
                                </button>
                            </div>
                        </div>
                        )}
                    </div>
                    
                </form>
                {formSubmitted && (
                    <p className={`${style.success}`}>
                        Проект успішно доданий!
                    </p>
                )}
                {formNotSubmitted && (
                    <p className={`${style.success} ${style.error}`}>
                        Помилка додавання проекту!
                    </p>
                )}
        </section>
    )
}