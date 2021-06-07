
import axios from 'axios';

// /shorten
// af4e82debfe8148fe5c94eb6a803ddab4e1a8e6b
// af4e82debfe8148fe5c94eb6a803ddab4e1a8e6b

export const key = 'af4e82debfe8148fe5c94eb6a803ddab4e1a8e6b';

const api = axios.create({
    baseURL: 'https://api-ssl.bitly.com/v4',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
    }
});

export default api;