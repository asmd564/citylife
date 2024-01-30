import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import ProjectMap from '../../components/ProjectMap/ProjectMap';
import Select from 'react-select';
import { Oval } from 'react-loader-spinner';
import axios from 'axios';
import style from './editProject.module.css';

const EditProject = () => {
  const { projectId } = useParams(); // Получаем projectId из URL
  const [projectData, setProjectData] = useState(null);
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
    imgUrls: [],
    district: '',
    adress: '',
    isHouse: '',



    // ...
  });

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

    useEffect(() => {
        const fetchProject = async () => {
          try {
            const response = await axios.get(`http://46.41.141.5:3001/products/${projectId}`);
            console.log(response.data);
            setProjectData(response.data); // Загрузка данных проекта для редактирования
            setFormData(response.data); // Используем данные для установки начальных значений формы
            setImages(response.data.imgUrls); // Установка изображений для предварительного просмотра
          } catch (error) {
            console.error('Ошибка при получении данных проекта:', error);
          }
        };
      
        fetchProject();
      }, [projectId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://46.41.141.5:3001/products/${projectId}`, formData);
      // Обработка успешного обновления проекта
      console.log('Проект успешно обновлен!');
    } catch (error) {
      console.error('Ошибка при обновлении проекта:', error);
    }
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

  const removeImage = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
    setFormData({ ...formData, imgUrls: updatedImages.map(img => img.src) });
  };
  
  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => URL.createObjectURL(file));

    setImages((prevImages) => [...prevImages, ...newImages]); // Обновление изображений
    setFormData((prevFormData) => ({
      ...prevFormData,
      imgUrls: [...prevFormData.imgUrls, ...newImages],
    })); // Обновление formData.imgUrls
  }, []);

  // Обработчик окончания перетаскивания
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const updatedImages = Array.from(images);
    const [reorderedItem] = updatedImages.splice(result.source.index, 1);
    updatedImages.splice(result.destination.index, 0, reorderedItem);

    setImages(updatedImages); // Обновление изображений
    setFormData((prevFormData) => ({
      ...prevFormData,
      imgUrls: updatedImages,
    })); // Обновление formData.imgUrls
  };

const { getRootProps: dropzoneGetRootProps, getInputProps: dropzoneGetInputProps } = useDropzone({
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
            setImages([]);

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
                        <input type="text" id="name" name="name" placeholder='Повний заголовок для сторінки обʼєкта' value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}/>
                        <div className={style.inputs__group__wrapper}>
                            <div className={style.group__wrapper}>
                                <label htmlFor="district" className={style.labelWithMargin}>Район</label>
                                <input type="text" name="district" id="district" placeholder="Напишіть район" value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })}/>

                                <label htmlFor="adress" className={style.labelWithMargin}>Вулиця</label>
                                <input type="text" name="adress" id="adress" placeholder="Адреса i номер будинку" value={formData.adress} onChange={(e) => setFormData({ ...formData, adress: e.target.value })}/>
                            </div>
                            <div className={style.group__wrapper}>
                                <label htmlFor="lat" className={style.labelWithMargin}>Широта</label>
                                <input type="text" name="lat" id="lat" placeholder="Широта" value={formData.lat} onChange={(e) => setFormData({ ...formData, lat: e.target.value })}/>

                                <label htmlFor="lng" className={style.labelWithMargin}>Долгота</label>
                                <input type="text" name="lng" id="lng" placeholder="Долгота" value={formData.lng} onChange={(e) => setFormData({ ...formData, lng: e.target.value })}/>
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
                            <input type="text" name="city" id="city" placeholder="Подайте місто" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}/>
                         </div>
                        <div className={style.custom__select__wrapper}>
                            <label htmlFor="type" className={style.labelWithMargin}>Тип операції</label>
                            <Select
                                classNamePrefix='custom-select'
                                placeholder= 'Виберіть тип операції'
                                options={typeOptions}
                                onChange={handleTypeChange}
                                value={typeOptions.find(option => option.value === formData.type)}
                                
                            />
                        </div>

                        <div className={style.custom__select__wrapper}>
                            <label htmlFor="isHouse" className={style.labelWithMargin}>Тип нерухомості</label>
                            <Select
                                classNamePrefix='custom-select'
                                placeholder= 'Виберіть тип нерухомості'
                                options={buildingTypeOptions}
                                onChange={handleBuildingOptionChange}
                                value={buildingTypeOptions.find(option => option.value === formData.isHouse)}   
                            />
                        </div>
                        <div className={style.custom__select__wrapper1}>
                            <label htmlFor="rooms" className={style.labelWithMargin}>Кількість кімнат</label>
                            <input type="text" name="rooms" id="rooms" placeholder="Напишіть к-ість кімнат" value={formData.rooms} onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}/>
                         </div>
                         <div className={style.custom__select__wrapper1}>
                            <label htmlFor="area" className={style.labelWithMargin}>Площа, м²</label>
                            <input type="text" name="area" id="area" placeholder="Загальна/житлова/пл. кухнi" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })}/>
                         </div>

                         <div className={style.custom__select__wrapper1}>
                            <label htmlFor="flor" className={style.labelWithMargin}>Поверх</label>
                            <input type="text" name="flor" id="flor" placeholder="Поверх/Кiлькiсть поверхiв" value={formData.flor} onChange={(e) => setFormData({ ...formData, flor: e.target.value })}/>
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
                            <input type="text" name="price" id="price" placeholder="Ціна" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })}/>
                         </div>
                         <div className={style.custom__select__wrapper}>
                            <label htmlFor="top" className={style.labelWithMargin}>Топ</label>
                            <Select
                                classNamePrefix='custom-select'
                                placeholder= 'В топ?'
                                options={topOptions}
                                onChange={handleTop}
                                value={topOptions.find(option => option.value == formData.top)}   
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
                </div>
                </div>

                <div>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="uniqueDroppableId">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                        {images.map((image, index) => (
                            <Draggable key={index} draggableId={String(index)} index={index}>
                            {(provided) => (
                                <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                >
                                <img src={image} alt={`image-${index}`} />
                                </div>
                            )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        </div>
                    )}
                    </Droppable>
                </DragDropContext>





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