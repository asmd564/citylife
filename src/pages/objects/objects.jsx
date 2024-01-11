import React, { useState, useEffect } from "react";
import style from './objects.module.css';
import Select from 'react-select';
import axios from "axios";
import { ProductCard } from "../../components/ui/product__card/product__card";
import { Link } from "react-router-dom";
import { Contacts } from "../../components/blocks/contacts/contacts";
import { WhyWe } from "../../components/blocks/whyWe/whyWe";
import Map from "../../components/blocks/map/map";
import { BookIcon } from "../../icons/book";
import { useLocation } from "react-router-dom";
import { Close } from "../../icons/close";

export const Objects = () => {
    const [type, setType] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState(data);
    const [active, setActive] = useState('')
    const location = useLocation();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currency, setCurrency] = useState('');
    const [sortBy, setSortBy] = useState("");
    const [originalData, setOriginalData] = useState([]);
    const [visibleCards, setVisibleCards] = useState(9);
    const [openFilters, setOpenFilters] = useState(false);

    const [selectedRegions, setSelectedRegions] = useState([]);
    const [selectedBuildingTypes, setSelectedBuildingTypes] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });

    const handleOpenFilters = () => {
        setOpenFilters(true);
        document.body.style.overflow = 'hidden';
    }

    const handleCloseFilters = () => {
        setOpenFilters(false);
        document.body.style.overflow = 'unset';
    }

    const handleShowMore = () => {
        setVisibleCards(prevCount => prevCount + 9);
      };

    useEffect(() => {
        window.scrollTo(0,0);
    },[])

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const category = searchParams.get("category");
    
        setSelectedCategory(category);
      }, [location.search]);

    useEffect(()=> {
        axios.get('http://46.41.141.5:3001/products')
            .then(response => {
                const products = response.data;
                setData(products);
                setOriginalData([...products])
            })
            .catch(error => {
                console.error('ошибка');
            });
    },[]);


    const typeOptions = [
        {value: 'sell', label: 'Продаж'},
        {value: 'rent', label: 'Оренда'},
    ];

    const regionTypes = [
        {
            label: 'Райони',
            options: [
              { value: 'all', label: 'Всі райони' },
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
              { value: 'all', label: 'Всі передмістя' },
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
            label: 'Передмістя',
            options: [
              { value: 'all', label: 'Всі райони області' },
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

    const roomsType =[
        {value: '1', label: '1'},
        {value: '2', label: '2'},
        {value: '3', label: '3'},
        {value: '4', label: '4'},
        {value: '5', label: '5+'},
    ];

    const buildingType =[
        {value: 'Квартира', label: 'Квартира'},
        {value: 'Будинок', label: 'Будинок'},
        {value: 'Комерційна нерухомість', label: 'Комерційна нерухомість'},
        {value: 'Дача', label: 'Дача'},
    ];




    const handleOptionChange = (selectedOption) => {
        setType(selectedOption.value);
        if(type === 'sell') {
            setCurrency('$');
        } 
        if(type === 'rent') {
            setCurrency('UAH');
        }
    };

    const sortProducts = (order) => {
        let sortedProducts;
    
        if (order === "default") {
            // Сбросить сортировку, например, отобразить в том порядке, в котором они были получены с сервера
            setSortBy("default");
            return;
        } else {
            // В противном случае сортируем по указанному типу
            sortedProducts = [...data].sort((a, b) => {
                if (order === "lowToHigh") {
                    // Сортировка по возрастанию цены
                    return parseFloat(a.price) - parseFloat(b.price);
                } else if (order === "highToLow") {
                    // Сортировка по убыванию цены
                    return parseFloat(b.price) - parseFloat(a.price);
                }
                // Другие возможности сортировки
                // ...
            });
        }
    
        setData(sortedProducts);
        setSortBy(order);
    };

    const resetSort = () => {
        setData([...originalData]); // Сброс сортировки к начальным данным
        setSortBy("");
    };

    const filterData = () => {
        let filteredResult = originalData.filter(item => {
            // Проверка для каждого поля на совпадение
            if (
                (type && item.type !== type)
                // Добавьте другие поля для фильтрации, если они есть
            ) {
                return false;
            }
            
            return true;
        });

        setData(filteredResult);
    };

    useEffect(() => {
        // Пересчет данных при изменении выбранных опций
        filterData();
    }, [type]);

    const handleOperationChange = selectedOption => {
        setType(selectedOption.value);
    };
    

    
    const handlePriceRangeChange = event => {
        const { name, value } = event.target;
        setPriceRange(prevState => ({ ...prevState, [name]: value }));
    };
    
    

    return (
        <section className={style.objects}>
            <div className={style.objects__wrapper}>
                <div className={style.object__wrapper}>
                    <h1 className={style.objects__title}>{type === "rent" ? 'Оренда' : 'Продаж'}</h1>
                    <p className={style.object__count}>Знайдено {data.length} оголошень</p>
                    <div className={style.filters__wrapper}>
                        <div className={style.select__wrapper}>
                        <label className={style.label}>Тип операції</label>
                            <Select
                                classNamePrefix='custom-select'
                                className={style.custom__width}
                                placeholder= 'Виберіть тип операції'
                                options={typeOptions}
                                onChange={handleOperationChange}   
                            />
                        </div>
                        <div className={style.select__wrapper}>
                            <label className={style.label}>Район</label>
                            <Select 
                                isMulti
                                classNamePrefix='custom-select'
                                className={style.custom__width2}
                                placeholder= 'Виберіть район'
                                options={regionTypes}
                                onChange={handleOptionChange}   
                            />
                        </div>
                    </div>

                    <div className={style.content__wrapper}>
                        <div className={style.filters__wrapper}>
                            <div className={style.select__wrapper}>
                            <label className={style.label}>Тип нерохомості</label>
                                <Select
                                    isMulti
                                    classNamePrefix='custom-select-1'
                                    className={`${style.custom__width4} ${style.custom__owerflow}`}
                                    menuPortalTarget={document.body}
                                    placeholder= 'Всі типи'
                                    options={buildingType}
                                    onChange={handleOptionChange} 
                                />
                            </div>
                            <div className={style.select__wrapper}>
                                <label className={style.label}>Кількість кімнат</label>
                                <Select 
                                    classNamePrefix='custom-select'
                                    className={style.custom__width3}
                                    placeholder= 'Всі оголошення'
                                    options={roomsType}
                                    onChange={handleOptionChange}   
                                />
                            </div>

                            <div className={style.select__wrapper}>
                                <label className={style.label}>{`Ціна, ${currency}`}</label>
                                <Select 
                                    classNamePrefix='custom-select'
                                    className={style.custom__width3}
                                    placeholder= 'Всі оголошення'
                                    onChange={handleOptionChange}   
                                />
                            </div>
                            <button className={style.filter__button} onClick={handleOpenFilters}><span>Більше фільтрів</span></button>
                            <button className={`${style.filter__button} ${style.background}`}>Очистити все</button>
                            
                        </div>
                        <button className={`${style.filter__button} ${style.background2}`}><span>Знайти</span></button>
                    </div>
                </div>
            </div>
            <div className={style.sort__wrapper}>
                <div className={style.first__wrapper}>
                    <div className={style.sort__title}>Сортування</div>
                    <button className={`${style.sort__button} ${sortBy === "" ? style.active : ""}`} onClick={resetSort}>Звичайне</button>
                    <button className={`${style.sort__button} ${sortBy === "lowToHigh" ? style.active : ""}`} onClick={() => sortProducts("lowToHigh")}>Від  дешевих до дорогих</button>
                    <button className={`${style.sort__button} ${sortBy === "highToLow" ? style.active : ""}`} onClick={() => sortProducts("highToLow")}>Від дорогих до дешевих </button>
                </div>
                <button className={style.map__button}>На карті<BookIcon /></button>
            </div>
            <div className={style.products__wrapper}>
                {data.slice(0, visibleCards).map(product => (
                    <ProductCard product={product}/>
                ))}
                 {visibleCards < data.length && data.length > 9 && (
                        <button className={style.another__button} onClick={handleShowMore}><p>Показати більше</p></button>
                    )}      
            </div>
            <Contacts />
            <WhyWe />
            <Map />
            {openFilters && (
                <div className={style.more__filters}>
                    <div className={style.more__filters__wrapper}>
                        <button type="button" className={style.more__filters__button} onClick={handleCloseFilters}><Close /></button>
                        <div className={style.filters__wrapper__modal}>
                            <h2 className={style.filters__title}>Розширений фільтр</h2>
                            <div className={style.filtes__inputs__wrapper}>
                                <div className={style.filters__inputs}>
                                <label className={`${style.label} ${style.label2}`}>{`Тип  операції`}</label>
                                    <Select 
                                        classNamePrefix='custom-select'
                                        className={style.custom__width11}
                                        placeholder= 'Тип  операції'
                                        options={typeOptions}
                                        onChange={handleOptionChange}   
                                    />

                                <label className={`${style.label} ${style.label2}`}>{`Район`}</label>
                                    <Select 
                                        classNamePrefix='custom-select'
                                        className={style.custom__width11}
                                        placeholder= 'Всі оголошення'
                                        options={typeOptions}
                                        onChange={handleOptionChange}   
                                    />
                                </div>
                                <div className={style.filters__inputs}>
                                    <label className={`${style.label} ${style.label2}`}>{`Тип  нерухомості`}</label>
                                        <Select 
                                            classNamePrefix='custom-select'
                                            className={style.custom__width11}
                                            placeholder= 'Всі оголошення'
                                            options={typeOptions}
                                            onChange={handleOptionChange}   
                                        />

                                    <label className={`${style.label} ${style.label2}`}>{`Стан`}</label>
                                        <Select 
                                            classNamePrefix='custom-select'
                                            className={style.custom__width11}
                                            placeholder= 'Всі оголошення'
                                            options={typeOptions}
                                            onChange={handleOptionChange}   
                                        />
                                </div>
                            </div>
                            <div className={style.filters__more__prices}>
                                <div className={style.filters__more__price}>
                                    <label htmlFor="">Поверх:</label>
                                    <div className={style.filters__input__wrapper}>
                                        <input type="text" style={{width: '138px', height:'50px', background: 'white', borderRadius:'4px'}} placeholder="вiд"/>
                                        <input type="text" style={{width: '138px', height:'50px', background: 'white', borderRadius:'4px'}} placeholder="до"/>
                                    </div>
                                    
                                </div>

                                <div className={style.filters__more__price}>
                                    <label htmlFor="">Кількість кімнат:</label>
                                    <div className={style.filters__input__wrapper}>
                                        <input type="text" style={{width: '138px', height:'50px', background: 'white', borderRadius:'4px'}} placeholder="вiд"/>
                                        <input type="text" style={{width: '138px', height:'50px', background: 'white', borderRadius:'4px'}} placeholder="до"/>
                                    </div>
                                    
                                </div>

                                <div className={style.filters__more__price}>
                                    <label htmlFor="">Площа:</label>
                                    <div className={style.filters__input__wrapper}>
                                        <input type="text" style={{width: '138px', height:'50px', background: 'white', borderRadius:'4px'}} placeholder="вiд"/>
                                        <input type="text" style={{width: '138px', height:'50px', background: 'white', borderRadius:'4px'}} placeholder="до"/>
                                    </div>
                                    
                                </div>

                                <div className={style.filters__more__price}>
                                    <label htmlFor="">Ціна, грн:</label>
                                    <div className={style.filters__input__wrapper}>
                                        <input type="text" style={{width: '138px', height:'50px', background: 'white', borderRadius:'4px'}} placeholder="вiд"/>
                                        <input type="text" style={{width: '138px', height:'50px', background: 'white', borderRadius:'4px'}} placeholder="до"/>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}