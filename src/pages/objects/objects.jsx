import React, { useState, useEffect } from "react";
import style from './objects.module.css';
import Select from 'react-select';
import axios from "axios";
import { ProductCard } from "../../components/ui/product__card/product__card";
import { Contacts } from "../../components/blocks/contacts/contacts";
import { WhyWe } from "../../components/blocks/whyWe/whyWe";
import Map from "../../components/blocks/map/map";
import { BookIcon } from "../../icons/book";
import { Close } from "../../icons/close";
import { Shevron } from "./shevron";

export const Objects = () => {
    const [type, setType] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currency, setCurrency] = useState('');
    const [sortBy, setSortBy] = useState("default");
    const [originalData, setOriginalData] = useState([]);
    const [visibleCards, setVisibleCards] = useState(9);
    const [openFilters, setOpenFilters] = useState(false);

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minRooms, setMinRooms] = useState('');
    const [maxRooms, setMaxRooms] = useState('');
    const [minArea, setMinArea] = useState('');
    const [maxArea, setMaxArea] = useState('');
    const [district, setDistrict] = useState('');
    const [roomsCount, setRoomsCount] = useState('');
    const [buildingTypeCount, setBuildingTypeCount] = useState('');
    const [sortedFilter, setSortedFilter] = useState([])
    const [typeSelectValue, setTypeSelectValue] = useState();
    const [state1, setState1] = useState('');
    const [minFloor, setMinFloor] = useState('');
    const [maxFloor, setMaxFloor] = useState('');


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

    useEffect(()=> {
        axios.get(`${process.env.REACT_APP_BE_HOST}/products`)
            .then(response => {
                const products = response.data;
                setData(products);
                setOriginalData([...products]);
                setFilteredData([...products]);

            const savedFilters = JSON.parse(localStorage.getItem("filters"));

            if (savedFilters) {
                // Устанавливаем сохраненные фильтры в состояние компонента
                setMinPrice(savedFilters.minPrice || "");
                setMaxPrice(savedFilters.maxPrice || "");
                setMinRooms(savedFilters.minRooms || "");
                setMaxRooms(savedFilters.maxRooms || "");
                setMinArea(savedFilters.minArea || "");
                setMaxArea(savedFilters.maxArea || "");
                setDistrict(savedFilters.district || []);
                setBuildingTypeCount(savedFilters.buildingTypeCount || []);
                setSortBy(savedFilters.sortBy || "default");
                setState1(savedFilters.state1 || "");
                setType(savedFilters.type || "");
                setMinFloor(savedFilters.minFloor || "");
                setMaxFloor(savedFilters.maxFloor || "");
                setTypeSelectValue(savedFilters.typeSelectValue || "");

                // Применяем фильтры
                filterAndSortProducts();
            }
            })
            .catch(error => {
                console.error('ошибка');
            });
    },[]);

    const typeOptions = [
        {value: 'sell', label: 'Продаж'},
        {value: 'rent', label: 'Оренда'},
    ];

    const stateOptions = [
        { value: 'З ремонтом', label: 'З ремонтом' },
        { value: 'Без ремонту', label: 'Без ремонту' },
    ];

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
        {value: 'Земля', label: 'Земля'},
    ];


    const filterAndSortProducts = () => {
        let filteredProducts = [...data];

        if(type !== '') {
            filteredProducts = filteredProducts.filter(product => product.type === type);
        }
        if(state1 !== '') {
            filteredProducts = filteredProducts.filter(product => product.state === state1.value);
        }
        if (minPrice !== '') {
            filteredProducts = filteredProducts.filter(product => parseFloat(product.price) >= parseFloat(minPrice));
        }
        if (maxPrice !== '') {
            filteredProducts = filteredProducts.filter(product => parseFloat(product.price) <= parseFloat(maxPrice));
        }
        if (minRooms !== '') {
            filteredProducts = filteredProducts.filter(product => parseFloat(product.rooms) >= parseFloat(minRooms));
        }
        if (maxRooms !== '') {
            filteredProducts = filteredProducts.filter(product => parseFloat(product.rooms) <= parseFloat(maxRooms));
        }
        if (minArea !== '') {
            filteredProducts = filteredProducts.filter(product => parseFloat(product.area.split('/')[0], 10) >= parseFloat(minArea));
        }
        if (maxArea !== '') {
            filteredProducts = filteredProducts.filter(product => parseFloat(product.area.split('/')[0], 10) <= parseFloat(maxArea));
        }
        if (minFloor !== '') {
            filteredProducts = filteredProducts.filter(product => parseFloat(product.flor.split('/')[0], 10) >= parseFloat(minFloor));
        }
        if (maxFloor !== '') {
            filteredProducts = filteredProducts.filter(product => parseFloat(product.flor.split('/')[0], 10) <= parseFloat(maxFloor));
        }
        if (district && district.length > 0) {
            filteredProducts = filteredProducts.filter(product => district.some(d => d.value === product.district));
        }
        if (buildingTypeCount && buildingTypeCount.length > 0) {
            filteredProducts = filteredProducts.filter(product => buildingTypeCount.some(d => d.value === product.isHouse));
        }

        setFilteredData(filteredProducts);
        setSortedFilter(filteredProducts);
        setOriginalData(filteredProducts);
    };

    const sortProducts = (order) => {
        let sortedProducts;
    
        if (order === "default") {
            setSortBy("default");
            return;
        } else {
            sortedProducts = [...filteredData].sort((a, b) => {
                if (order === "lowToHigh") {
                    // Сортировка по возрастанию цены
                    return parseFloat(a.price) - parseFloat(b.price);
                } else if (order === "highToLow") {
                    return parseFloat(b.price) - parseFloat(a.price);
                }
            });
        }
    
        setFilteredData(sortedProducts);
        setSortBy(order);
    };

    const resetSort = () => {
        setFilteredData([...filteredData]);
        setSortBy("default");
    };

    const handleSearch = () => {
        filterAndSortProducts();
      };

    const handleClearSearch = ()  => {
        setFilteredData(data);
        setSortBy("default");
        setType("");
        setTypeSelectValue(null);
        setDistrict([]);
        setBuildingTypeCount([]);
        setMinRooms("");
        setMaxRooms("");
        setMaxPrice("");
        setMinPrice("");
        setMinArea("");
        setMaxArea("");
        setState1("");
        setMaxFloor("");
        setMinFloor("");
    }

    useEffect(() => {
        filterAndSortProducts();
    }, [minPrice, maxPrice, district, type, buildingTypeCount, sortBy, maxRooms, minRooms, minArea, maxArea, state1, minFloor, maxFloor]);

    useEffect(() => {
        const filtersToSave = {
            minPrice,
            maxPrice,
            minRooms,
            maxRooms,
            minArea,
            maxArea,
            district,
            type,
            buildingTypeCount,
            minFloor,
            maxFloor,
            state1,
            sortBy,
            typeSelectValue
        };
    
        localStorage.setItem("filters", JSON.stringify(filtersToSave));
    }, [minPrice, maxPrice, district, type, buildingTypeCount, sortBy, maxRooms, minRooms, minArea, maxArea, state1, minFloor, maxFloor, typeSelectValue]);
    
    return (
        <section className={`${style.objects} ${style.container}`}>
            <div className={style.objects__wrapper}>
                <div className={style.object__wrapper}>
                    <h1 className={style.objects__title}>{type === "rent" ? 'Оренда' : type === "sell" ? 'Продаж' : "Всi оголошення"}</h1>
                    <p className={style.object__count}>Знайдено {filteredData.length} оголошень</p>
                    <div className={`${style.filters__wrapper} ${style.filters__wrapper__mobile}`}>
                        <div className={style.select__wrapper}>
                        <label className={`${style.label} ${style.label__hidden}`}>Тип операції</label>
                            <Select
                                classNamePrefix='custom-select'
                                className={style.custom__width}
                                placeholder= 'Виберіть тип операції'
                                options={typeOptions}
                                value={typeSelectValue}
                                onChange={(selectedOption) => {
                                    setType(selectedOption.value);
                                    setTypeSelectValue(selectedOption);
                                }}
                            />
                        </div>
                        <button className={`${style.filter__button} ${style.mobile__filter__button__hidden}`} onClick={handleOpenFilters}><span>Фільтри</span></button>
                        <div className={`${style.select__wrapper} ${style.select__wrapper__hidden}`}>
                            <label className={style.label}>Район</label>
                            <Select 
                                isMulti
                                classNamePrefix='custom-select'
                                className={style.custom__width2}
                                style={{ width: '100%' }}
                                placeholder= 'Виберіть район'
                                options={regionTypes}
                                value={district}
                                onChange={(selectedOption) => setDistrict(selectedOption)}
                            />
                        </div>
                    </div>

                    <div className={style.content__wrapper}>
                        <div className={`${style.filters__wrapper} ${style.filers__wrapper__hidden}`}>
                            <div className={style.filters__wrapper1}>

                           
                            <div className={style.select__wrapper}>
                            <label className={style.label}>Тип нерохомості</label>
                                <Select
                                    isMulti
                                    classNamePrefix='custom-select'
                                    className={`${style.custom__width4} ${style.custom__owerflow}`}
                                    placeholder= 'Всі типи'
                                    options={buildingType}
                                    value={buildingTypeCount}
                                    onChange={(selectedOption) => setBuildingTypeCount(selectedOption)}
                                />
                            </div>
                            <div className={style.select__wrapper}>
                                <label className={style.label}>{`Кiмнати вiд:`}</label>
                                    <input className={style.price__input} type="number" style={{width: '115px', height:'55px', background: 'white', borderRadius:'4px'}} placeholder="Вiд" value={minRooms} onChange={(e) => setMinRooms(e.target.value)}/>
                            </div>

                            <div className={style.select__wrapper}>
                                <label className={style.label}>{`Кiмнати до:`}</label>
                                    <input className={style.price__input} type="number" style={{width: '116px', height:'55px', background: 'white', borderRadius:'4px'}} placeholder="До" value={maxRooms}  onChange={(e) => setMaxRooms(e.target.value)}/>
                            </div>

                            <div className={style.select__wrapper}>
                                <label className={style.label}>{`Ціна вiд:`}</label>
                                    <input className={style.price__input} type="number" style={{width: '116px', height:'55px', background: 'white', borderRadius:'4px'}} placeholder="Вiд" value={minPrice} onChange={(e) => setMinPrice(e.target.value)}/>
                            </div>

                            <div className={style.select__wrapper}>
                                <label className={style.label}>{`Ціна до:`}</label>
                                    <input className={style.price__input} type="number" style={{width: '120px', height:'55px', background: 'white', borderRadius:'4px'}} placeholder="До" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)}/>
                            </div>


                            <div className={style.select__wrapper}>
                                <label className={style.label}>{`Площа вiд:`}</label>
                                    <input className={style.price__input} type="number" style={{width: '120px', height:'55px', background: 'white', borderRadius:'4px'}} placeholder="Вiд" value={minArea} onChange={(e) => setMinArea(e.target.value)}/>
                            </div>

                            <div className={style.select__wrapper}>
                                <label className={style.label}>{`Площа до:`}</label>
                                    <input className={style.price__input} type="number" style={{width: '120px', height:'55px', background: 'white', borderRadius:'4px'}} placeholder="До" value={maxArea} onChange={(e) => setMaxArea(e.target.value)}/>
                            </div>
                            <button className={`${style.filter__button} ${style.background}`} onClick={handleClearSearch}>Очистити все</button>
                            </div> 
                        </div>
                        <div className={style.filter__button__wrapper}>
                            <button className={`${style.filter__button} ${style.filter__button__hidden}`} onClick={handleOpenFilters}><span>Фільтри</span></button>
                        </div>
                        <div className={style.search__buttons__wrapper}>
                            <button className={`${style.filter__button} ${style.background} ${style.filter__button__hidden}`} onClick={handleClearSearch}>Очистити все</button>
                            <button className={`${style.filter__button} ${style.background2}`}><span>Знайти</span></button>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            <div className={style.sort__wrapper}>
                <div className={style.first__wrapper}>
                    <div className={style.sort__title}>Сортування</div>
                    <button className={`${style.sort__button} ${sortBy === "default" ? style.active : ""}`} onClick={resetSort}>Звичайне</button>
                    <button className={`${style.sort__button} ${sortBy === "lowToHigh" ? style.active : ""}`} onClick={() => sortProducts("lowToHigh")}>Від  дешевих до дорогих</button>
                    <button className={`${style.sort__button} ${sortBy === "highToLow" ? style.active : ""}`} onClick={() => sortProducts("highToLow")}>Від дорогих до дешевих </button>
                </div>
                <button className={style.map__button}>На карті<BookIcon /></button>
            </div>
            <div>
                <div className={style.products__wrapper}>
                    {filteredData.slice(0, visibleCards).map(product => (
                        <ProductCard product={product} key={product.id}/>
                    ))}    
                </div>
                <div className={style.products__button}>
                    {visibleCards < filteredData.length && filteredData.length > 9 && (
                        <button className={style.another__button} onClick={handleShowMore}><p>Показати більше</p></button>
                    )}  
                </div>
                
            </div>
            <Contacts />
            <WhyWe />
            <Map />
            {openFilters && (
                <div className={style.more__filters}>
                    <div className={style.more__filters__wrapper}>
                        <div className={style.more__filters__header}>
                            <div className={style.more__filters__header__wrapper}>
                                <button onClick={handleCloseFilters} className={style.more__filters__header__button}><Shevron/></button>
                                <h4 className={style.more__filters__header__label}>Фільтри</h4>
                            </div>  
                        </div>
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
                                        value={typeSelectValue}
                                        onChange={(selectedOption) => {
                                            setType(selectedOption.value);
                                            setTypeSelectValue(selectedOption);
                                        }}
                                      
                                    />

                                <label className={`${style.label} ${style.label2}`}>{`Район`}</label>
                                    <Select 
                                        isMulti
                                        classNamePrefix='custom-select'
                                        className={style.custom__width11}
                                        placeholder= 'Виберіть район'
                                        options={regionTypes}
                                        value={district}
                                        onChange={(selectedOption) => setDistrict(selectedOption)}
                                  
                                    />
                                </div>
                                <div className={style.filters__inputs}>
                                    <label className={`${style.label} ${style.label2}`}>{`Тип  нерухомості`}</label>
                                        <Select 
                                            classNamePrefix='custom-select'
                                            className={style.custom__width11}
                                            placeholder= 'Всі типи'
                                            options={buildingType}
                                            value={buildingTypeCount}
                                            onChange={(selectedOption) => setBuildingTypeCount(selectedOption)}
                                     
                                        />

                                    <label className={`${style.label} ${style.label2}`}>{`Стан`}</label>
                                        <Select 
                                            classNamePrefix='custom-select'
                                            className={style.custom__width11}
                                            placeholder= 'Всі стани'
                                            options={stateOptions}
                                            value={state1}
                                            onChange={(selectedOption) => setState1(selectedOption)}
                                           
                                        />
                                </div>
                            </div>
                            <div className={style.filters__more__prices}>
                                <div className={style.filters__more__price}>
                                    <label className={style.label3} htmlFor="">Поверх:</label>
                                    <div className={style.filters__input__wrapper}>
                                        <input type="number" className={style.more__filters__inputs} placeholder="вiд" value={minFloor} onChange={(e) => setMinFloor(e.target.value)}/>
                                        <input type="number" className={style.more__filters__inputs} placeholder="до" value={maxFloor} onChange={(e) => setMaxFloor(e.target.value)}/>
                                    </div>
                                    
                                </div>

                                <div className={style.filters__more__price}>
                                    <label className={style.label3} htmlFor="">Кількість кімнат:</label>
                                    <div className={style.filters__input__wrapper}>
                                        <input type="number" className={style.more__filters__inputs} placeholder="вiд" value={minRooms} onChange={(e) => setMinRooms(e.target.value)}/>
                                        <input type="number" className={style.more__filters__inputs} placeholder="до" value={maxRooms}  onChange={(e) => setMaxRooms(e.target.value)}/>
                                    </div>
                                    
                                </div>

                                <div className={style.filters__more__price}>
                                    <label className={style.label3} htmlFor="">Площа:</label>
                                    <div className={style.filters__input__wrapper}>
                                        <input type="number" className={style.more__filters__inputs}  placeholder="вiд" value={minArea} onChange={(e) => setMinArea(e.target.value)}/>
                                        <input type="number" className={style.more__filters__inputs}  placeholder="до" value={maxArea} onChange={(e) => setMaxArea(e.target.value)}/>
                                    </div>
                                    
                                </div>

                                <div className={style.filters__more__price}>
                                    <label className={style.label3} htmlFor="">Ціна:</label>
                                    <div className={style.filters__input__wrapper}>
                                        <input type="number" className={style.more__filters__inputs}  placeholder="вiд"/>
                                        <input type="number" className={style.more__filters__inputs}  placeholder="до"/>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className={style.filters__buttons}>
                                <button type="button" className={style.filters__button1} onClick={handleClearSearch}>Скинути</button>
                                <button type="button" className={style.filters__button2} onClick={handleCloseFilters}>Шукати</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}