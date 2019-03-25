import { API_URL } from './constants';
import axios from 'axios';

export const listProjectNames = async () => {
    try {
        let res = await axios.get(`${API_URL}/project-names`); 
        return res.data;
    } catch(e) {
        console.log(e);
    }
}