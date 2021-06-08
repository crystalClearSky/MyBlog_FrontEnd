import { MutationTree } from "vuex";
import { UserState } from "./types";

export enum UserMutations {
  SET_LIVING = "SET_LIVING",
}

export const mutations: MutationTree<UserState> = {
         [UserMutations.SET_LIVING](state, payload: boolean) {
           state.isLiving = payload;
         },
       };