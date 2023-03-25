import React from 'react';
import { Link } from 'react-router-dom';
import {AnimeStatsI } from '../types/Global';
import classes from './styles/StatsRenderer.module.scss'

interface StatsRendererProps {
    animeStats: AnimeStatsI[]
}

const StatsRenderer: React.FC<StatsRendererProps> = ({animeStats}) => {
    return (
        <>
            {animeStats.map((stats, index) => {
                return <div key={index} className={classes.StatsRenderer_flex}>
                            <div className={classes.StatsRenderer_left}>{stats.stat_name}</div>
                            <div className={classes.StatsRenderer_right}>
                            {stats.stat_htmlTag === "link" 
                                ? <Link to={stats.stat_link}>{stats.stat_value}</Link> 
                                : stats.stat_value
                            }
                            </div>
                        </div>
                }) 
            }
        </>
    );
};

export default StatsRenderer;