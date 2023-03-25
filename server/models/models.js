const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const user = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"}
})

const user_watchlist = sequelize.define('user_watchlist', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const user_watchlist_anime = sequelize.define('user_watchlist_anime', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const animelist = sequelize.define('animelist', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

const animelist_anime = sequelize.define('animelist_anime', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const animeitem = sequelize.define('animeitem', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    page_name: {type: DataTypes.STRING, unique: true, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    japanese_title: {type: DataTypes.STRING, allowNull: false},
    japan_title: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
    gallery_1: {type: DataTypes.STRING, allowNull: false},
    gallery_2: {type: DataTypes.STRING, allowNull: false},
    gallery_3: {type: DataTypes.STRING, allowNull: false},
    gallery_4: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false},
    video: {type: DataTypes.STRING, allowNull: false},
    year: {type: DataTypes.STRING},
    type: {type: DataTypes.STRING, allowNull: false},
    rating: {type: DataTypes.FLOAT, defaultValue: 0},
    genres: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING}
})

const animeitem_stats = sequelize.define('animeitem_stats', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    stat_name: {type: DataTypes.STRING, allowNull: false},
    stat_value: {type: DataTypes.STRING, allowNull: false},
    stat_htmlTag: {type: DataTypes.STRING},
    stat_link: {type: DataTypes.STRING},
})

const rating = sequelize.define("rating", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false}
})

user.hasOne(user_watchlist)
user_watchlist.belongsTo(user)

user.hasMany(rating)
rating.belongsTo(user)

user_watchlist.hasMany(user_watchlist_anime)
user_watchlist_anime.belongsTo(user_watchlist)

animelist.hasMany(animelist_anime)
animelist_anime.belongsTo(animelist)

animeitem.hasMany(rating)
rating.belongsTo(animeitem)

animeitem.hasMany(user_watchlist_anime)
user_watchlist_anime.belongsTo(animeitem)

animeitem.hasMany(animelist_anime)
animelist_anime.belongsTo(animeitem)

animeitem.hasMany(animeitem_stats, {as: "stats"})
animeitem_stats.belongsTo(animeitem)

module.exports = {
    user, 
    user_watchlist, 
    user_watchlist_anime,
    animelist,
    animelist_anime,
    animeitem,
    animeitem_stats,
    rating
}