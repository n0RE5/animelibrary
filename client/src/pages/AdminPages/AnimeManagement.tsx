import React, { useState } from 'react';
import { createAnimeList, insertAnimeListItem, getAnimeFromList, removeAnimeListItem } from '../../http/animeAPI';
import classes from '../styles/AdministratorPage.module.scss'


const AddAnimeList: React.FC = () => {

    const [animeListId, setAnimeListId] = useState<number>(0)
    const [animeListName, setAnimeListName] = useState<string>('')
    const [animeItemId, setAnimeItemId] = useState<number>(0)
    const [message, setMessage] = useState<string>('Здесь вы увидите статус запроса')

    const addList = async () => {
        try {
            const res = await createAnimeList(animeListName)
            setMessage(`Вы создали список с ID: ${res.data.id} и NAME: ${animeListName}`)
        } catch(e: any) {
            setMessage(e.response?.data?.message)
        }
    }

    const add = async () => {
        try {
            if(!animeListId || !animeItemId || animeListId === 0 || animeItemId === 0) {
                return setMessage("Не указан Идентификатор [ID] Списка или Идентификатор [ID] Аниме")
            }
            const res = await insertAnimeListItem(animeListId, animeItemId)
            setMessage(`Вы добавили Аниме с ID ${res.data.animeitemId} в Список #${res.data.animelistId}`)
        } catch (e: any) {
            return setMessage(e.response?.data?.message)
        }
    }

    const get = async () => {
        try {
            const res = await getAnimeFromList(animeListId)
        } catch (e: any) {
            setMessage(e.response?.data?.message)
        }
    }

    const remove = async () => {
        try {
            if(!animeItemId || animeItemId === 0) {
                return setMessage("Не указан Идентификатор [ID] Аниме")
            }
            const res = await removeAnimeListItem(animeItemId)
            setMessage("Вы удалили аниме из списка")
        } catch (e: any) {
            setMessage(e.response?.data?.message)
        }
    }

    return (
        <div className={classes.AP_body}>
            <div className={classes.media_info}>
                <div className={classes.media_info_title}>Менеджер списков</div>
                <div className={classes.media_info_description}>Здесь вы можете создавать новые списки а так же добавлять в них аниме</div>
                <div className={classes.yellowBox}>
                    {message}
                </div>
                <hr className={classes.hr} />
            </div>
            <div className={classes.AP_anime_input}>
            <div className={classes.settings_flex}>
                        <span>ANIMELIST_NAME</span>
                        <input className={classes.input} value={animeListName} onChange={((e: any) => setAnimeListName(e.target.value))} type="text" /> 
                    </div>
                    <div className={classes.settings_flex}>
                        <span>ANIMELIST_ID</span>
                        <input className={classes.input} value={animeListId} onChange={((e: any) => setAnimeListId(e.target.value))} type="text" /> 
                    </div>
                    <div className={classes.settings_flex}>
                        <span>ANIMEITEM_ID</span>
                        <input className={classes.input} value={animeItemId} onChange={((e: any) => setAnimeItemId(e.target.value))} type="text" />
                    </div>
                    <button className={classes.add_button} onClick={addList}>Создать новый список</button>
                    <button className={classes.add_button} onClick={add}>Добавить аниме в список</button>
                    <button className={classes.add_button} onClick={get}>Получить аниме из списка (консоль)</button>
                    <button className={classes.add_button} onClick={remove}>Удалить аниме из списка (ID в базе данных)</button>  
            </div>
        </div>
    );
};

export default AddAnimeList;