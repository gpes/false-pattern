import { API_URL } from './constants';
import axios from 'axios';

export const listDetectionByProject = async (projectName) => {
    try {
        let res = await axios.get(`${API_URL}/detection/${projectName}`);
        return res.data;
    } catch(e) {
        console.log(e.message);
    }
}