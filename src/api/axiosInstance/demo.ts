import axios from 'axios'
import { Constants } from '../../constants/config'

const authAxios = axios.create({
    baseURL: `${Constants.BASE_URL}`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export default authAxios



