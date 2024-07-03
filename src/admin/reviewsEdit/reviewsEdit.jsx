import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./reviewsEdit.module.css";
import emptyAvatar from '../../img/emptyavatar.jpeg';

export const ReviewsEdit = () => {
    const [data, setData] = useState([]);
    const [editableStates, setEditableStates] = useState({});
    const [reviewTexts, setReviewTexts] = useState({});
    const [sortedFilter, setSortedFilter] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BE_HOST}/reviews`);
                const reviews = response.data;
                setData(reviews);
                setSortedFilter(reviews);
                const editableStatesInitial = {};
                const reviewTextsInitial = {};
                reviews.forEach(review => {
                    editableStatesInitial[review.id] = false;
                    reviewTextsInitial[review.id] = review.review;
                });
                setEditableStates(editableStatesInitial);
                setReviewTexts(reviewTextsInitial);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleEditButtonClick = (id) => {
        const newEditableStates = { ...editableStates, [id]: !editableStates[id] };
        setEditableStates(newEditableStates);

        if (editableStates[id]) {
            const updatedReview = { review: reviewTexts[id] };
            updateReview(id, updatedReview);
        }
    };

    const handleInputChange = (e, id) => {
        setReviewTexts({ ...reviewTexts, [id]: e.target.value });
    };

    const updateReview = async (id, updatedReview) => {
        try {
            await axios.put(`${process.env.REACT_APP_BE_HOST}/reviews/${id}`, updatedReview);
        } catch (error) {
            console.log("Error updating review:", error);
        }
    };

    const handlePublishButtonClick = async (id, currentPublish) => {
        const updatedPublish = !currentPublish;
        try {
            await axios.put(`${process.env.REACT_APP_BE_HOST}/reviews/${id}`, { publish: updatedPublish });
            setSortedFilter(sortedFilter.map(review => review.id === id ? { ...review, publish: updatedPublish } : review));
        } catch (error) {
            console.log("Error updating publish status:", error);
        }
    };

    const handleDeleteButtonClick = async (id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BE_HOST}/reviews/${id}`);
            setSortedFilter(sortedFilter.filter(review => review.id !== id));
        } catch (error) {
            console.log("Error deleting review:", error);
        }
    };

    const handleFilterButtonClick = (filter) => {
        setActiveFilter(filter);
        if (filter === "all") {
            setSortedFilter(data);
        } else {
            setSortedFilter(data.filter(review => review.publish === (filter === "published")));
        }
    };

    return (
        <section className={style.section__wrapper}>
            <h1 className={style.title}>Відгуки</h1>
            <div className={style.buttons__wrapper}>
                <button
                    className={`${style.sort__button} ${activeFilter === "all" ? style.active : ""}`}
                    onClick={() => handleFilterButtonClick("all")}
                >
                    Всi
                </button>
                <button
                    className={`${style.sort__button} ${activeFilter === "published" ? style.active : ""}`}
                    onClick={() => handleFilterButtonClick("published")}
                >
                    Опубліковані
                </button>
                <button
                    className={`${style.sort__button} ${activeFilter === "unpublished" ? style.active : ""}`}
                    onClick={() => handleFilterButtonClick("unpublished")}
                >
                    Не опубліковані
                </button>
            </div>
            <div className={style.reviews__wrapper}>
                {sortedFilter.length > 0 ? (
                    sortedFilter.map(review => (
                        <div className={style.review__card} key={review.id}>
                            <div className={style.card__container}>
                                <img src={emptyAvatar} alt="img" className={style.review__image} />
                                <div className={style.card__wrapper}>
                                    <h3 className={style.card__name}>{review.name}</h3>
                                    <div className={style.title__wrapper}>
                                        <textarea
                                            readOnly={!editableStates[review.id]}
                                            className={style.card__title}
                                            value={reviewTexts[review.id]}
                                            onChange={(e) => handleInputChange(e, review.id)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={style.edit__buttons}>
                                <button
                                    className={!review.publish ? style.review__button : style.review__button__red}
                                    onClick={() => handlePublishButtonClick(review.id, review.publish)}
                                >
                                    {review.publish ? 'Скасувати публікацію' : 'Опублікувати'}
                                </button>
                                <button
                                    className={editableStates[review.id] ? style.edit__button : style.edit__button__save}
                                    onClick={() => handleEditButtonClick(review.id)}
                                >
                                    {editableStates[review.id] ? 'Зберегти' : 'Редагувати'}
                                </button>
                                <button
                                    className={style.delete__button}
                                    onClick={() => handleDeleteButtonClick(review.id)}
                                >
                                    Видалити
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h2 className={style.error}>Немає відгуків</h2>
                )}
            </div>
        </section>
    );
}

