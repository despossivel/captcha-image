
import axios from 'axios';

const ENDPOINT = 'https://xr1zj3k69f.execute-api.us-east-1.amazonaws.com/dev/analyse';
const language = 'pt';

export const request = async (imageUrl) => {
    try {
        const { data } = await axios({
            method: 'get',
            url: `${ENDPOINT}?language=${language}&imageUrl=${imageUrl}`
        })
        const { items } = data;
        return items;
    } catch (error) {
        console.error(error)
    }
}