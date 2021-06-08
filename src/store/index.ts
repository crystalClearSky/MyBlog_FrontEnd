import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { user } from '@/store/user'
import { getters } from "@/store/user/getters"
import { mutations } from "@/store/user/mutations"
import { actions } from "@/store/user/actions"

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        helloMessage: "Hello form Me",
    },
    modules: {
        user,
        getters,
        mutations,
        actions
    }
}

export default new Vuex.Store<RootState>(store)