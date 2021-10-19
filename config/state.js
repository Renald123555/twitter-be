const moment = require("moment")

const user = [{
    id: 1,
    password: "barcelona",
    username: "Christiano",
    email: "CR@gmail.com",
    name: "Christiano ROnaldo",
    phone: "083726583",
    dob: "08-11-1999"
},
{
    id: 2,
    password: "98765",
    username: "messi",
    email: "LM@gmail.com",
    name: "Lionel MEssi",
    phone: "083726583",
    dob: "08-11-1999"
},
]

const post = [{
    id: 1,
    user_id: 1,
    image: '',
    text: '1st post',
    created_at: "2021-10-18 19:00:00",
    reply_id: null,
    likes: 0,
    retweet: 0,
    status: 1,
    updated_at: 1,
    category: "Entertainment",
    isAds: true,
    isCommercial: true,
    dateInput: "2021-10-19"
},
{
    id: 2,
    user_id: 2,
    image: '',
    text: '2nd post',
    created_at: "2021-10-19 11:00:00",
    reply_id: null,
    likes: 3,
    retweet: 2,
    status: 1,
    updated_at: 1,
    category: "News",
    isAds: false,
    isCommercial: true,
    dateInput: "2021-10-19"

},
{
    id: 3,
    user_id: 1,
    image: 'first.png',
    text: 'hello post',
    created_at: "2021-10-19 12:00:00",
    reply_id: null,
    likes: 30,
    retweet: 20,
    status: 1,
    updated_at: 1,
    category: "Entertainment",
    isAds: true,
    isCommercial: false,
    dateInput: "2021-10-19"
},
{
    id: 4,
    user_id: 2,
    image: '',
    text: 'hello friend',
    created_at: "2021-10-19 16:00:00",
    reply_id: null,
    likes: 10,
    retweet: 90,
    status: 1,
    updated_at: 1,
    category: "Entertainment",
    isAds: true,
    isCommercial: false,
    dateInput: "2021-10-19"
},
{
    id: 5,
    user_id: 1,
    image: 'first.png',
    text: 'my first tweet',
    created_at: "2021-10-19 18:00:00",
    reply_id: null,
    likes: 300,
    retweet: 70,
    status: 1,
    updated_at: 1,
    category: "News",
    isAds: true,
    isCommercial: false,
    dateInput: "2021-10-19"
},

]

module.exports = {
    user,
    post
}