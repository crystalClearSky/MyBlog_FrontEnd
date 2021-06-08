import { GetterTree } from "vuex";
import { RootState } from "../types";
import { UserState } from "./types";

export const getters: GetterTree<UserState, RootState> = {
    getuserInfo(state): string {
        return `Username: ${state.username} - email: ${state.email}`;
    },
    getUsername(state): boolean {
        return state.isLiving;
    },
    getIpData(state): any {
        return
    }
}