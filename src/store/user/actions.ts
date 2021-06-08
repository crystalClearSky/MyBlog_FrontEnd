import Axios from "axios";
import { ActionTree } from "vuex";
import { RootState } from "../types";
import { UserState } from "./types";

export const actions: ActionTree<UserState, RootState> = {
    async loadAPIResult(): Promise<Array<object>> {
        const result = await Axios.get("http://ip-api.com/json?callback=?");
        console.log("In Current IP");
      result.data = result.data.replace(/[()?;]/gi, "");
      result.data = JSON.parse(result.data);
        
        return result.data;
    }
}