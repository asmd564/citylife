import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { useParams, useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import ProjectMap from '../../components/ProjectMap/ProjectMap';
import Select from 'react-select';
import { Oval } from 'react-loader-spinner';
import axios from 'axios';
import style from './editProject.module.css';

const EditProject = ({ user }) => {
  const navigate = useNavigate()
  const { projectId } = useParams(); // Получаем projectId из URL
  const [projectData, setProjectData] = useState(null);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    buildingtype: '',
    top: '',
    currency: '',
    waterheating: '',
    heating: '',
    buildingOption: '',
    lat: '',
    lng: '',
    district: '',
    adress: '',
    isHouse: '',
    user_id: '',
    imgUrls: '',
    images: [],




    // ...
  });

    const [type, setType] = useState('');
    const [userId, setUserId] = useState('');
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
    const [district, setDistrict] = useState('');
    const [imgUrls, setImgUrls] = useState('');


    useEffect(() => {
        const fetchProject = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_BE_HOST}/products/${projectId}`);
            const usersResponse = await axios.get(`${process.env.REACT_APP_BE_HOST}/users`);

            setProjectData(response.data); // Загрузка данных проекта для редактирования
            setFormData(response.data);
            setUsers(usersResponse.data);
            setImages(response.data.imgUrls);
            setImgUrls(response.data.imgUrls) // Установка изображений для предварительного просмотра
          } catch (error) {
            console.error('Ошибка при получении данных проекта:', error);
          }
        };
      
        fetchProject();
      }, [projectId]);

      const removeImage = (indexToRemove) => {
        const updatedImages = images.filter((_, index) => index !== indexToRemove);
        setImages(updatedImages);
        setFormData({ ...formData, imgUrls: updatedImages.map(img => img.src) });
      };
      
      const onDrop = useCallback((acceptedFiles) => {
        const newImages = acceptedFiles.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...newImages]);
        setImgUrls((prevImgUrls) => [...prevImgUrls, ...newImages]);
    }, []);
    
    const handleDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const updatedImages = Array.from(images);
        const [reorderedItem] = updatedImages.splice(result.source.index, 1);
        updatedImages.splice(result.destination.index, 0, reorderedItem);
        setImages(updatedImages);
        setImgUrls(updatedImages);
    };
    
    const { getRootProps: dropzoneGetRootProps, getInputProps: dropzoneGetInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: true,
    });
    
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: true,
    });
    

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const response =  await axios.put(`${process.env.REACT_APP_BE_HOST}/products/${projectId}`, {
                ...formData,
                imgUrls: imgUrls,
            });
            console.log('Проект успешно обновлен!', images);
            setHidden(false);
            setIsLoading(false);
            navigate(`/admin/dashboard/${user.id}/my-products`);
            console.log(response);
        } catch (error) {
            console.error('Ошибка при обновлении проекта:', error);
            setIsLoading(false);
        }
    };

  const userIdOptions = users.map(item => ({
    value: item.id,
    label: `${item.name} ${item.surname}`,
  }));

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
    { value: 'Гараж', label: 'Гараж'},
  ]

  const regionTypes = [
    {
        label: 'Райони',
        options: [
          { value: 'Центр', label: 'Центр' },
          { value: 'Івасюка-Надрічна', label: 'Івасюка-Надрічна' },
          { value: 'Пасічна', label: 'Пасічна' },
          { value: 'Позитрон-Каскад', label: 'Позитрон-Каскад' },
          { value: 'Коновальця-Чорновола', label: 'Коновальця-Чорновола' },
          { value: 'Бам', label: 'Бам' },
          { value: 'Незалежності–Тисменицька', label: 'Незалежності–Тисменицька' },
          { value: 'Набережна–Княгинин', label: 'Набережна–Княгинин' },
        ],
      },
      {
        label: 'Передмістя',
        options: [
          { value: 'Вовчинець', label: 'Вовчинець' },
          { value: 'Крихівці', label: 'Крихівці' },
          { value: 'Драгомирчани', label: 'Драгомирчани' },
          { value: 'Опришівці', label: 'Опришівці' },
          { value: 'Угорники', label: 'Угорники' },
          { value: 'Микитинці', label: 'Микитинці' },
          { value: 'Підлужжя', label: 'Підлужжя' },
          { value: 'Підпечери', label: 'Підпечери' },
          { value: 'Угринів', label: 'Угринів' },
          { value: 'Клузів', label: 'Клузів' },
          { value: 'Ямниця', label: 'Ямниця' },
          { value: 'Чукалівка', label: 'Чукалівка' },
          { value: 'Хриплин', label: 'Хриплин' },
          { value: 'Черніїв', label: 'Черніїв' },
        ],
      },
      {
        label: 'Райони області',
        options: [
          { value: 'Тисменицький', label: 'Тисменицький' },
          { value: 'Івано-Франківський', label: 'Івано-Франківський' },
          { value: 'Калуський', label: 'Калуський' },
          { value: 'Коломийський', label: 'Коломийський' },
          { value: 'Косівський', label: 'Косівський' },
          { value: 'Надвірнянський', label: 'Надвірнянський' },
          { value: 'Верховинський', label: 'Верховинський' },
        ],
      },
];


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
  
    const handleTypeChange = (selectedOption) => {
        setType(selectedOption.value);
        setFormData((prevFormData) => ({ ...prevFormData, type: selectedOption.value }));
    };

    const handleUserChange = (selectedOption) => {
        setUserId(selectedOption.value);
        setFormData((prevFormData) => ({ ...prevFormData, user_id: selectedOption.value }));
    };

    const handleTop = (selectedOption) => {
        setTop(selectedOption.value);
        setFormData((prevFormData) => ({ ...prevFormData, top: selectedOption.value }));
    };

    const handleBuildingOptionChange = (selectedOption) => {
        setBuildingOption(selectedOption.value);
        setFormData((prevFormData) => ({ ...prevFormData, isHouse: selectedOption.value }));
    };

    const handleStateOption = (selectedOption) => {
        setStateOption(selectedOption.value);
        setFormData((prevFormData) => ({ ...prevFormData, state: selectedOption.value }));
    };
    const handleDistrictChange = (selectedOption) => {
        setDistrict(selectedOption.value);
        setFormData((prevFormData) => ({ ...prevFormData, district: selectedOption.value }));
    }

    const handleBuildingType = (selectedOption) => {
        setBuildingType(selectedOption.value);
        setFormData((prevFormData) => ({ ...prevFormData, buildingtype: selectedOption.value }));
    };

    const handleHeatingType = (selectedOption) => {
        setHeating(selectedOption.value);
        setFormData((prevFormData) => ({ ...prevFormData, heating: selectedOption.value }));
    };

    const handleWaterHeatingType = (selectedOption) => {
        setWaterheating(selectedOption.value);
        setFormData((prevFormData) => ({ ...prevFormData, waterheating: selectedOption.value }));
    };

    const handleCurrencyType = (selectedOption) => {
        setCurrency(selectedOption.value);
        setFormData((prevFormData) => ({ ...prevFormData, currency: selectedOption.value }));
    };


const handleLatChange = (e) => {
    setLat(formData.lat);
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
            // setImages([]);

    }
  }


return (
    <section className={style.add} >
        <h1 className={style.title}>Редагувати обʼєкт</h1>
            <form action="" className={`${style.form} container`} onSubmit={handleFormSubmit} ref={formRef}>
            <h2 className={style.form__title}>Опис обʼєкта</h2>
                <div className={style.form__wrapper}>
                    <div className={style.first__input__wrapper}>
                        <label htmlFor="name" className={style.labelWithMargin}>Заголовок</label>
                        <input className={style.input} type="text" id="name" name="name" placeholder='Повний заголовок для сторінки обʼєкта' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}/>
                        <div className={style.inputs__group__wrapper}>
                            <div className={style.group__wrapper}>
                            <div className={style.custom__select__wrapper}>
                                <label htmlFor="district" className={style.labelWithMargin}>Район</label>
                                <Select
                                    classNamePrefix='custom-select'
                                    placeholder= 'Район'
                                    options={regionTypes}
                                    value={regionTypes.reduce((acc, group) => [...acc, ...group.options], []).find(option => option.value === formData.district)}
                                    onChange={handleDistrictChange}   
                                />
                            </div>
                                <label htmlFor="adress" className={style.labelWithMargin}>Вулиця</label>
                                <input className={style.input} type="text" name="adress" id="adress" placeholder="Адреса i номер будинку" value={formData.adress} onChange={(e) => setFormData({ ...formData, adress: e.target.value })}/>
                            </div>
                            <div className={style.group__wrapper}>
                                <label htmlFor="lat" className={style.labelWithMargin}>Широта</label>
                                <input className={style.input} type="text" name="lat" id="lat" placeholder="Широта" value={formData.lat} onChange={(e) => setFormData({ ...formData, lat: e.target.value })}/>

                                <label htmlFor="lng" className={style.labelWithMargin}>Долгота</label>
                                <input className={style.input} type="text" name="lng" id="lng" placeholder="Долгота" value={formData.lng} onChange={(e) => setFormData({ ...formData, lng: e.target.value })}/>
                            </div>  
                        </div>
                        <div>
                            <ProjectMap lat={mapLat} lng={mapLng}/>
                        </div>
                       

                        <label htmlFor="description" className={style.labelWithMargin}>Опис обʼєкта</label>
                            <textarea type="text" name="description" id="description" placeholder="Напишіть детальний опис" className={style.textarea} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}/>
                    </div>
                    <div className={style.form__wrapper2}>
                    <div className={style.custom__select__wrapper1}>
                            <label htmlFor="city" className={style.labelWithMargin}>Місто</label>
                            <input className={style.input} type="text" name="city" id="city" placeholder="Подайте місто" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}/>
                         </div>
                        <div className={style.custom__select__wrapper}>
                            <label htmlFor="type" className={style.labelWithMargin}>Тип операції</label>
                            <Select
                                classNamePrefix='custom-select'
                                placeholder= 'Виберіть тип операції'
                                options={typeOptions}
                                value={typeOptions.find(option => option.value === formData.type)} 
                                onChange={handleTypeChange}
                                
                            />
                        </div>

                        <div className={style.custom__select__wrapper}>
                            <label htmlFor="isHouse" className={style.labelWithMargin}>Тип нерухомості</label>
                            <Select
                                classNamePrefix='custom-select'
                                placeholder= 'Виберіть тип нерухомості'
                                options={buildingTypeOptions}
                                value={buildingTypeOptions.find(option => option.value === formData.isHouse)} 
                                onChange={handleBuildingOptionChange}
                                 
                            />
                        </div>
                        <div className={style.custom__select__wrapper1}>
                            <label htmlFor="rooms" className={style.labelWithMargin}>Кількість кімнат</label>
                            <input className={style.input} type="text" name="rooms" id="rooms" placeholder="Напишіть к-ість кімнат" value={formData.rooms} onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}/>
                         </div>
                         <div className={style.custom__select__wrapper1}>
                            <label htmlFor="area" className={style.labelWithMargin}>Площа, м²</label>
                            <input className={style.input} type="text" name="area" id="area" placeholder="Загальна/житлова/пл. кухнi" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })}/>
                         </div>

                         <div className={style.custom__select__wrapper1}>
                            <label htmlFor="flor" className={style.labelWithMargin}>Поверх</label>
                            <input className={style.input} type="text" name="flor" id="flor" placeholder="Поверх/Кiлькiсть поверхiв" value={formData.flor} onChange={(e) => setFormData({ ...formData, flor: e.target.value })}/>
                         </div>
                         <div className={style.custom__select__wrapper}>
                            <label htmlFor="state" className={style.labelWithMargin}>Стан</label>
                            <Select
                                classNamePrefix='custom-select'
                                placeholder= 'Виберіть стан нерухомості'
                                options={stateOptions}
                                onChange={handleStateOption}
                                value={stateOptions.find(option => option.value === formData.state)}  
                            />
                        </div>

                        <div className={style.custom__select__wrapper}>
                            <label htmlFor="buildingtype" className={style.labelWithMargin}>Тип будинку</label>
                            <Select
                                classNamePrefix='custom-select'
                                placeholder= 'Виберіть тип нерухомості'
                                options={buildingOptions}
                                onChange={handleBuildingType}
                                value={buildingOptions.find(option => option.value === formData.buildingtype)}   
                            />
                        </div>
                        <div className={style.custom__select__wrapper}>
                            <label htmlFor="heating" className={style.labelWithMargin}>Опалення</label>
                            <Select
                                classNamePrefix='custom-select'
                                placeholder= 'Виберіть тип опалення'
                                options={typeOfHeating}
                                onChange={handleHeatingType}
                                value={typeOfHeating.find(option => option.value === formData.heating)}  
                            />
                        </div>
                        <div className={style.custom__select__wrapper}>
                            <label htmlFor="waterheating" className={style.labelWithMargin}>Підігрів води</label>
                            <Select
                                classNamePrefix='custom-select'
                                placeholder= 'Виберіть підігрів води'
                                options={typeOfWaterHeating}
                                onChange={handleWaterHeatingType}
                                value={typeOfWaterHeating.find(option => option.value === formData.waterheating)}   
                            />
                        </div>

                        <div className={style.custom__select__wrapper1}>
                            <label htmlFor="price" className={style.labelWithMargin}>Ціна</label>
                            <input className={style.input} type="text" name="price" id="price" placeholder="Ціна" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}/>
                         </div>
                         <div className={style.custom__select__wrapper}>
                            <label htmlFor="top" className={style.labelWithMargin}>Топ</label>
                            <Select
                                classNamePrefix='custom-select'
                                placeholder= 'В топ?'
                                options={topOptions}
                                onChange={handleTop}
                                value={topOptions.find(option => option.value === String(formData.top))}  
                            />
                        </div>
                         <div className={style.custom__select__wrapper}>
                            <label htmlFor="currency" className={style.labelWithMargin}>Валюта</label>
                            <Select
                                classNamePrefix='custom-select'
                                placeholder= 'Виберіть валюту'
                                options={typeCurrency}
                                onChange={handleCurrencyType}
                                value={typeCurrency.find(option => option.value === formData.currency)}  
                            />
                        </div>
                        <div className={style.custom__select__wrapper}>
                            <label htmlFor="userId" className={style.labelWithMargin}>Передати проект</label>
                            <Select
                                classNamePrefix='custom-select'
                                placeholder= 'Виберіть користовача'
                                options={userIdOptions}
                                onChange={handleUserChange}
                                value={userIdOptions.find(option => option.value === formData.user_id)}  
                            />
                        </div>
                </div>
                </div>

                <div>
                <div >
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="uniqueDroppableId">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className={style.image__preview__container}>
                        {images.map((image, index) => (
                            <div ><Draggable key={index} draggableId={String(index)} index={index} >
                                
                            {(provided) => (
                                <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={style.image__preview}
                                >
                                <button onClick={() => removeImage(index)} className={style.img__btn} type='button'>Видалити</button>
                                <img src={image} alt={`image-${index}`} />
                                </div>
                            )}
                            </Draggable>
                            </div>
                        ))}
                        {provided.placeholder}
                        <div className={style.dropzone} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Перетягніть свої фото сюди або натиснути <span>Завантажити</span></p>
                        </div>
                        </div>
                    )}
                    </Droppable>
                </DragDropContext>
                </div>





                    </div>
                <div className={style.button__wrapper}>
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
                <p className={style.success}>
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

export default EditProject;