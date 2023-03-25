import React, { useState } from 'react';
import CustomSelect from '../../components/UI/CustomSelect/CustomSelect';
import { createAnime } from '../../http/animeAPI';
import classes from '../styles/AdministratorPage.module.scss'
import { optionsAnimeTypes, optionsAnimeYears } from '../../utils/Options';

const AddAnime: React.FC = () => {
    const [message, setMessage] = useState<string>('Здесь вы увидите статус запроса')
    const [pageName, setPageName] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [jpTitle, setJPTitle] = useState<string>('')
    const [japaneseTitle, setJapaneseTitle] = useState<string>('')
    const [img, setImg] = useState<string>('')
    const [gallery_1, setGallery_1] = useState<string>('')
    const [gallery_2, setGallery_2] = useState<string>('')
    const [gallery_3, setGallery_3] = useState<string>('')
    const [gallery_4, setGallery_4] = useState<string>('')
    const [video, setVideo] = useState<string>('')
    const [year, setYear] = useState<string>('')
    const [type, setType] = useState<string>('')
    const [genres, setGenres] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [episodes, setEpisodes] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [studio, setStudio] = useState<string>('')
    const [MPAA, setMPAA] = useState<string>('')
    const [limits, setLimits] = useState<string>('')
    const [length, setLength] = useState<string>('')
    const [voiceover, setVoiceover] = useState<string>('')
    
    const selectFile = (e, func) => {
        func(e.target.files[0])
    }

    const addAnime = async (e) => {
        try {
            e.preventDefault()

            const stats = [
                {stat_name: "Тип", stat_value: type, stat_htmlTag: "", stat_link: ""},
                {stat_name: "Эпизоды", stat_value: episodes, stat_htmlTag: "", stat_link: ""},
                {stat_name: "Статус", stat_value: status, stat_htmlTag: "", stat_link: ""},
                {stat_name: "Жанр", stat_value: genres, stat_htmlTag: "", stat_link: ""},
                {stat_name: "Выпуск", stat_value: date, stat_htmlTag: "", stat_link: ""},
                {stat_name: "Студия", stat_value: studio, stat_htmlTag: "", stat_link: ""},
                {stat_name: "Рейтинг MPAA", stat_value: MPAA, stat_htmlTag: "", stat_link: ""},
                {stat_name: "Возрастные ограничения", stat_value: limits, stat_htmlTag: "", stat_link: ""},
                {stat_name: "Длительность эпизода", stat_value: length, stat_htmlTag: "", stat_link: ""},
                {stat_name: "Озвучка", stat_value: voiceover, stat_htmlTag: "", stat_link: ""}
            ]

            const formData = new FormData()
            formData.append('page_name', pageName)
            formData.append('title', title)
            formData.append('japanese_title', japaneseTitle)
            formData.append('japan_title', jpTitle)
            formData.append('img', img)
            formData.append('status', status)
            formData.append('year', year)
            formData.append('type', type)
            formData.append('genres', genres)
            formData.append('description', description)
            formData.append('gallery_1', gallery_1)
            formData.append('gallery_2', gallery_2)
            formData.append('gallery_3', gallery_3)
            formData.append('gallery_4', gallery_4)
            formData.append('video', video)
            formData.append('stats', JSON.stringify(stats))
            const res = await createAnime(formData)
            setMessage("*** Успешно")
        } catch(e: any) {
            setMessage("-!- " + e.response?.data?.message)
        }
    }
    return ( 
    <div className={classes.AP_body}>
        <div className={classes.media_info}>
            <div className={classes.media_info_title}>Добавить аниме</div>
            <div className={classes.media_info_description}>Здесь вы можете добавить аниме в глобальный список</div>
            <div className={classes.yellowBox}>
                {message}
            </div>
            <hr className={classes.hr} />
        </div>
        <div className={classes.AP_anime_input}>
            <form>
                <div className={classes.settings_flex}>
                    <span>PAGE_NAME</span>
                    <input className={classes.input} value={pageName} onChange={(e) => setPageName(e.target.value)} type="text" required />
                </div>
                <div className={classes.settings_flex}>
                    <span>TITLE</span>
                    <input className={classes.input} value={title} onChange={(e) => setTitle(e.target.value)}  type="text" required />
                </div>
                <div className={classes.settings_flex}>
                    <span>JAPAN TITLE</span>
                    <input className={classes.input} value={jpTitle} onChange={(e) => setJPTitle(e.target.value)} type="text" required />
                </div>
                <div className={classes.settings_flex}>
                    <span>JAPANESE TITLE</span>
                    <input className={classes.input} value={japaneseTitle} onChange={(e) => setJapaneseTitle(e.target.value)} type="text" required />
                </div>
                <div className={classes.settings_flex}>
                    <span>STATUS</span>
                    <input className={classes.input} value={status} onChange={(e) => setStatus(e.target.value)} type="text" required />
                </div>
                <div className={classes.settings_flex}>
                    <span>YEAR</span>
                    <div className={classes.long}>
                        <CustomSelect output={year} setOutput={setYear} technicalName='selectYear' placeholder='Выберите год' optionArray={optionsAnimeYears} />
                    </div>
                </div>
                <div className={classes.settings_flex}>
                    <span>TYPE</span>
                    <div className={classes.long}>
                        <CustomSelect output={type} setOutput={setType} technicalName='selectType' placeholder='Выберите тип' optionArray={optionsAnimeTypes} />
                    </div>
                </div>
                <div className={classes.settings_flex}>
                    <span>DESCRTIPTION</span>
                    <input className={classes.input} value={description} onChange={(e) => setDescription(e.target.value)} type="text" required />
                </div>
                <div className={classes.settings_flex}>
                    <span>GENRES</span>
                    <input className={classes.input} value={genres} onChange={(e) => setGenres(e.target.value)} type="text" required />
                </div>
                <div className={classes.settings_flex}>
                    <span>VIDEO</span>
                    <input onChange={(e) => selectFile(e, setVideo)} type="file" required />
                </div>
                <div className={classes.settings_flex}>
                    <span>IMG</span>
                    <input onChange={(e) => selectFile(e, setImg)} type="file" required />
                </div>
                <div className={classes.settings_flex}>
                    <span>GALLERY 1</span>
                    <input onChange={(e) => selectFile(e, setGallery_1)} type="file" required />
                </div>
                <div className={classes.settings_flex}>
                    <span>GALLERY 2</span>
                    <input onChange={(e) => selectFile(e, setGallery_2)} type="file" required />
                </div>
                <div className={classes.settings_flex}>
                    <span>GALLERY 3</span>
                    <input onChange={(e) => selectFile(e, setGallery_3)} type="file" required />
                </div>
                <div className={classes.settings_flex}>
                    <span>GALLERY 4</span>
                    <input onChange={(e) => selectFile(e, setGallery_4)} type="file" required />
                </div>
                <hr className={classes.hr} />
                <div className={classes.settings_flex}>
                    <span>Эпизоды</span>
                    <input className={classes.input} value={episodes} onChange={(e) => setEpisodes(e.target.value)} type="text" required />
                </div>
                <div className={classes.settings_flex}>
                    <span>Выпуск</span>
                    <input className={classes.input} value={date} onChange={(e) => setDate(e.target.value)} type="text" required />
                </div>
                <div className={classes.settings_flex}>
                    <span>Студия</span>
                    <input className={classes.input} value={studio} onChange={(e) => setStudio(e.target.value)} type="text" required />
                </div>
                <div className={classes.settings_flex}>
                    <span>Рейтинг MPAA</span>
                    <input className={classes.input} value={MPAA} onChange={(e) => setMPAA(e.target.value)} type="text" required />
                </div>
                <div className={classes.settings_flex}>
                    <span>Возрастные ограничения</span>
                    <input className={classes.input} value={limits} onChange={(e) => setLimits(e.target.value)} type="text" required />
                </div>
                <div className={classes.settings_flex}>
                    <span>Длительность</span>
                    <input className={classes.input} value={length} onChange={(e) => setLength(e.target.value)} type="text" required />
                </div>
                <div className={classes.settings_flex}>
                    <span>Озвучка</span>
                    <input className={classes.input} value={voiceover} onChange={(e) => setVoiceover(e.target.value)} type="text" required />
                </div>
                <hr className={classes.hr} />
                <button className={classes.add_button} onClick={(e) => addAnime(e)}>Добавить Аниме</button>
            </form>
        </div>
    </div>
    )
}

export default AddAnime;