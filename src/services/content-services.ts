import ICreateContent from "@/types/CreateContent";
import ILogin from "@/types/Login";
import IWriteComment from "@/types/WriteComment";
import axios from "axios";
import { IContent, Comment, Tag, Flag } from "../types/Content";
import IAvatar from "@/types/Avatar";
import ICurrentIP from "@/types/CurrentIP";
import IUnregisteredGuest from "@/types/UnregisteredGuest";
import IAnon from "@/types/Anon";
import IGuest from "@/types/Guest";
import IOptions from "@/types/Options";
import ICreateAvatar from "@/types/createAvatar";
import INewIp from "@/types/NewIp";
import IContect from "@/types/Contact";
import IForFlagging from "@/types/ForFlagging";
import IFlagBasic from "@/types/FlagBasic";
import IJustIp from "@/types/justIP";
import IFruits from "@/types/Fruits";


export default class ContentService {
  API_URL = process.env.VUE_APP_API_URL;
  IP_URL = process.env.VUE_APP_IP_URL;
  finalAnon!: IAnon;
  finalUnregistedGuest!: IUnregisteredGuest;
  finalGuest!: IGuest;
  options!: IOptions;
  avatar!: IAvatar;

  reasons = [
    "Abusive",
    "Offensive",
    "Illegal",
    "Concerning",
    "Threatening",
    "Spam",
    "other",
  ];

  flag!: Flag;
  flagged: IFlagBasic = {
    reasonText: "",
  };

  public async flagComment(flaggedItem: IForFlagging) {
    this.flagged.reasonText = flaggedItem.reason;
    console.log(this.flagged);
    const result = await axios.post(
      `${this.API_URL}/content/${flaggedItem.contentId}/user/comment/${flaggedItem.commentId}/flag`,
      this.flagged,
      { withCredentials: true }
    );
    console.log("Flag - " + result.data);
    return result;
  }

  public async getAllCards(
    q: string,
    limit = 5,
    skipBy = 1,
    postType = -1,
    avatarId = -1,
    typeSearch = ""
  ): Promise<IContent[]> {
    const result = await axios.get(
      `${this.API_URL}/content/search?q=${q}&limit=${limit}&skipBy=${skipBy}&postType=${postType}&avatarId=${avatarId}&typeSearch=${typeSearch}`
    );
    console.log("pageSize - " + limit + " pageNumber - " + skipBy);
    console.log(result.data + " - ALL Cards");
    //console.log('hello!!!');
    return Promise.resolve(result.data);
  }

  public async getCardById(id: number): Promise<IContent> {
    const result = await axios.get(`${this.API_URL}/content/${id}/`);
    return Promise.resolve(result.data);
  }

  public async addNewCard(card: ICreateContent) {
    const result = await axios.post(`${this.API_URL}/content/`, card, {
      withCredentials: true,
    });
    return result;
  }

  public async updateCard(card: ICreateContent, id: number) {
    console.log("Updating card!!");
    console.log(id + " " + card);
    const result = await axios.put(`${this.API_URL}/content/${id}/`, card, {
      withCredentials: true,
    });
    return result;
  }

  public async getComments(): Promise<Comment[]> {
    const result = await axios.get(`${this.API_URL}/comments`);
    console.log(result.data + " - ALL Comments");
    return result.data;
  }

  public async getCommentsByCard(
    contentId: number,
    pageSize = 4,
    pageNumber = 1
  ): Promise<Comment[]> {
    const result = await axios.get(
      `${this.API_URL}/comments/${contentId}?commentPageSize=${pageSize}&commentPageNumber=${pageNumber}`
    );
    console.log("Card Comments - " + result.data);
    return result.data;
  }

  reslt = false;
  public async checkSession(): Promise<boolean> {
    console.log("IN CHECKING SESSION!!!");
    const result = await axios
      .get(`${this.API_URL}/content/user/sessionstate`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.status);
        this.reslt = res.status === 200;
        return this.reslt;
      })
      .catch((err) => {
        console.log(err);
        this.reslt = false;
      });
    return this.reslt;
  }

  ipDetails: any;
  public async getCurrentUserIP(): Promise<INewIp> {
    if (!this.ipDetails) {
      this.ipDetails = await axios.get(`http://ip-api.com/json?callback=?`);
      console.log("In Current IP");
      this.ipDetails.data = this.ipDetails.data.replace(/[()?;]/gi, "");
      this.ipDetails.data = JSON.parse(this.ipDetails.data);
    }
    console.log(this.ipDetails.data);
    return this.ipDetails.data;
  }

  public async getRemainingFruits(): Promise<IFruits[]> {
    const result = await axios.get(`${this.API_URL}/content/user/fruits`, {
      withCredentials: true,
    });
    console.log("results from fruit - " + result.data);
    return result.data;
  }

  guestIP!: INewIp;
  public async addCurrentUnregisteredUser() {
    console.log("In add Unregistered guest.");
    if (!this.guestIP) this.guestIP = await this.getCurrentUserIP();

    this.finalUnregistedGuest = {
      ipAddress: this.guestIP.query,
      region: this.guestIP.regionName,
      country: this.guestIP.country,
    };
    const result = await axios.post(
      `${this.API_URL}`,
      this.finalUnregistedGuest,
      {
        withCredentials: true,
      }
    );
    console.log("Final Unregistered guest - " + this.finalUnregistedGuest);
    console.log("engable guest? -" + this.finalUnregistedGuest.enableGuest);
    return this.finalUnregistedGuest;
  }

  public async getandAddAnon(): Promise<IAnon> {
    if (this.finalAnon && !this.finalUnregistedGuest) {
      console.log("In add and register new anon");
      const anon = await axios.get(`${this.API_URL}/anon`, {
        withCredentials: true,
      });
      this.finalAnon = anon.data;
      console.log("Fist seen: " + this.finalAnon.firstSeen);
      return this.finalAnon;
    }
    if (!this.finalUnregistedGuest) {
      console.log("In the wrong place.");
      const anon = await axios.get(`${this.API_URL}/anon`, {
        withCredentials: true,
      });
      this.finalAnon = anon.data;
      return this.finalAnon;
    }
    return this.finalAnon;
  }

  public async createAndAddGuest(): Promise<IGuest> {
    if (this.finalUnregistedGuest && !this.avatar) {
      console.log(this.finalUnregistedGuest);
      const result = await axios.post(
        `${this.API_URL}/content/guest`,
        this.finalUnregistedGuest,
        {
          withCredentials: true,
        }
      );
      this.finalGuest = result.data;
      console.log("Guest!! - " + this.finalGuest.country);
      return this.finalGuest;
    }
    console.log("No Data for guest was created!!");
    console.log("Avatar in create guest - " + this.avatar);
    return this.finalGuest;
  }
  guests!: IGuest[];
  lastGuest!: IGuest;
  public async getGuestById(id = -1, ip = ""): Promise<IGuest> {
    const result = await axios.get(
      `${this.API_URL}/content/guest?id=${id}&ip=${ip}`
    );
    console.log("Guest --- Id - " + result.data[1]);
    this.guests = result.data;
    this.lastGuest = this.guests.filter((x) =>
      ip != "" ? x.ipAddress == ip : id != -1 ? x.id == id : x
    )[0];
    console.log("Guest by Id - " + this.lastGuest.ipAddress);
    return this.lastGuest;
  }

  public async enableThisGuest(
    uguest: IUnregisteredGuest
  ): Promise<IUnregisteredGuest> {
    const result = await axios.put(`${this.API_URL}/enableguest`, uguest, {
      withCredentials: true,
    });
    this.finalUnregistedGuest = result.data;
    console.log(
      "Result from enable guest - " + this.finalUnregistedGuest.enableGuest
    );
    return this.finalUnregistedGuest;
  }

  public async logOutGuest() {
    const result = await axios.get(
      `${this.API_URL}/content/guest/logoutguest`,
      { withCredentials: true }
    );
    console.log("Result from Guest log out" + result.data);
  }

  public async enableOption(option: IOptions): Promise<IOptions> {
    const result = await axios.post(
      `${this.API_URL}/content/enableoption`,
      option,
      { withCredentials: true }
    );
    console.log(result.data);
    return result.data;
  }

  public async getOptionByIp(ip = ""): Promise<IOptions> {
    const result = await axios.get(
      `${this.API_URL}/content/optionbyip?IpAddress=${ip}`
    );
    if (result.status > 200) {
      console.log(`Unable to retrieve options by with ip ${ip}`);
    }
    console.log("Result from getOptionByIp -" + result.data);
    return result.data;
  }

  public async getOptions(): Promise<IOptions> {
    const result = await axios.get(`${this.API_URL}/content/enableoption`, {
      withCredentials: true,
    });
    this.options = result.data;
    console.log("GEt Options" + this.options);

    return this.options;
  }

  public async editOption(editedOption: IOptions) {
    const result = await axios.put(
      `${this.API_URL}/content/editoption`,
      editedOption,
      {
        withCredentials: true,
      }
    );
    console.log("Result from edit option" + result.data);
    return result.data;
  }

  public async createNewAvatar(createAvatar: ICreateAvatar): Promise<IAvatar> {
    const result = await axios.post(
      `${this.API_URL}/content/user/`,
      createAvatar,
      { withCredentials: true }
    );
    console.log("result from CREATEAVATAR" + result.data);
    this.avatar = result.data;
    return result.data;
  }

  public async getThisAvatar(): Promise<IAvatar> {
    const result = await axios.get(`${this.API_URL}/content/user`, {
      withCredentials: true,
    });
    console.log(result.data + " - ONE Users");
    return result.data;
  }

  public async getAllAvatars(): Promise<IAvatar[]> {
    const result = await axios.get(`${this.API_URL}/content/user/all/`);
    console.log(result.data + " - ALL Users");
    return result.data;
  }

  public async getAllTags(tagQuery = "", pageLimit = 5): Promise<Tag[]> {
    const result = await axios.get(
      `${this.API_URL}/content/tags?pageLimit=${pageLimit}&tagQuery=${tagQuery}`
    );
    console.log(result.data + " - ALL Tags");
    return result.data;
  }

  public async sendEmail(message: IContect) {
    const result = await axios.post(`${this.API_URL}/contact`, message);
    console.log("Result from sendMessage - " + result.data);
    return result;
  }
  public resetGuestSession() {
    setTimeout(async () => {
      const ip: IJustIp = {
        iPAddress: this.guestIP.query,
      };
      console.log("guets - " + ip.iPAddress);

      if (!this.guestIP) this.guestIP = await this.getCurrentUserIP();
      await axios.post(`${this.API_URL}/content/guest/set`, ip, {
        withCredentials: true,
      });
    }, 100);
  }

  public async loginIn(login: ILogin) {
    let usertType;
    if (login.usertype) {
      usertType = {
        admin: {
          id: login.usertype,
          name: login.name,
        },
      };
      console.log(usertType);
    } else {
      usertType = {
        user: {
          currentIp: login.currentIp,
        },
      };
    }
    const result = await axios.post(
      `${this.API_URL}/content/user/set`,
      usertType,
      { withCredentials: true }
    );

    const details = await axios.get(
      `${this.API_URL}/content/user/0/${login.currentIp}`
    );

    //console.log(details.status);
    if (result.status === 200) {
      return result.data;
    }
    return details.data;
  }

  public async signUserOut() {
    const result = await axios.get(`${this.API_URL}/content/user/logout`, {
      withCredentials: true,
    });
    return result.data;
  }

  public async sendNewMessage(text: IWriteComment, id: number) {
    const result = await axios.post(
      `${this.API_URL}/content/${id}/user/comment`,
      text,
      { withCredentials: true }
    );
    return result.data;
  }

  public async sendReplyMessage(
    text: IWriteComment,
    id: number,
    commentId: number
  ) {
    const result = await axios.post(
      `${this.API_URL}/content/${id}/user/comment/${commentId}`,
      text,
      { withCredentials: true }
    );
    console.log("Result from REPLY - " + result.data);
    return result.data;
  }

  public async updateMessage(
    text: IWriteComment,
    id?: number,
    commentId?: number
  ) {
    const result = await axios.put(
      `${this.API_URL}/content/${id}/user/comment/${commentId}`,
      text,
      { withCredentials: true }
    );
    return result.status;
  }

  public async addNewUpVote(id: number) {
    const result = await axios.get(`${this.API_URL}/content/${id}/upvote`, {
      withCredentials: true,
    });
  }

  public async GetCount(avatarId = 0, contentId = 0) {
    const result = await axios.get(
      `${this.API_URL}/comments/comment_count?avatarId=${avatarId}&contentId=${contentId}`,
      {
        withCredentials: true,
      }
    );
    console.log("Count result - " + result.data);
    return result.data;
  }

  public async addLiketoComment(id: number, contentId: number) {
    const result = await axios.get(
      `${this.API_URL}/content/${contentId}/user/comment/${id}/like`,
      { withCredentials: true }
    );
    return result.status;
  }

  public async addView(id: number) {
    const result = await axios.get(`${this.API_URL}/content/${id}/view`, {
      withCredentials: true,
    });
    console.log("Result from view - " + result.data);
    return result;
  }

  public async deleteThisComment(contentId: number, id: number) {
    const result = await axios.delete(
      `${this.API_URL}/content/${contentId}/user/comment/${id}`,
      { withCredentials: true }
    );
    return result.status;
  }

  public async deleteCard(id: number) {
    const result = await axios.delete(`${this.API_URL}/content/${id}`, {
      withCredentials: true,
    });
    return result.status;
  }
}
