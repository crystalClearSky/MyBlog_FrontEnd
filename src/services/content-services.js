import axios from "axios";
export default class ContentService {
    constructor() {
        this.API_URL = "https://localhost:5101/api";
    }
    async getAllCards() {
        const result = await axios.get(`${this.API_URL}/content/`);
        console.log(result.data);
        //console.log('hello!!!');
        return result.data;
    }
    async addNewCard(card) {
        const result = await axios.post(`${this.API_URL}/content/`, card, {
            withCredentials: true,
        });
        return result.data;
    }
    async loginIn(login) {
        let usertType;
        if (login.usertype) {
            usertType = {
                admin: {
                    id: login.usertype,
                    name: login.name,
                },
            };
        }
        else {
            usertType = {
                user: {
                    currentIp: login.currentIp,
                },
            };
        }
        const result = await axios.post(`${this.API_URL}/content/user/set`, usertType, { withCredentials: true });
        const details = await axios.get(`${this.API_URL}/content/user/0/${login.currentIp}`);
        //console.log(details);
        return details.data;
    }
    async sendNewMessage(text, id) {
        const result = await axios.post(`${this.API_URL}/content/${id}/user/comment`, text, { withCredentials: true });
        return result.data;
    }
    async addNewUpVote(id) {
        const result = await axios.get(`${this.API_URL}/content/${id}/upvote`, { withCredentials: true });
    }
}
//# sourceMappingURL=content-services.js.map