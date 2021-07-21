import SignerService from "../services/signer";
import {
  FETCH_SIGNERS,
  FETCH_SIGNER,
  CREATE_SIGNER,
  DELETE_SIGNER,
  UPDATE_SIGNER,
} from "./actions.type";
import {
  FETCH_START,
  SET_SIGNERS,
  SET_SIGNER,
  FETCH_END,
} from "./mutations.type";

const state = {
  signers: [],
  signer: null,
  isLoading: true,
};

const getters = {
  signers(state) {
    return state.signers;
  },
  signer(state) {
    return state.signer;
  },
  isLoading(state) {
    return state.isLoading;
  },
};

const actions = {
  async [FETCH_SIGNERS]({ commit }) {
    commit(FETCH_START);
    const { data } = await SignerService.query();
    commit(SET_SIGNERS, data);
    return data;
  },
  async [CREATE_SIGNER](context, payload) {
    await SignerService.create(payload);
    context.dispatch(FETCH_SIGNERS);
  },
  async [UPDATE_SIGNER](context, payload) {
    const { id, ...values } = payload;
    await SignerService.update(id, values);
    context.dispatch(FETCH_SIGNERS);
  },
  async [DELETE_SIGNER](context, payload) {
    await SignerService.destroy(payload);
    context.dispatch(FETCH_SIGNERS);
  },
  async [FETCH_SIGNER](context, payload) {
    const { data } = await SignerService.get(payload);
    context.commit(SET_SIGNER, data);
  },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [SET_SIGNERS](state, { data }) {
    state.signers = data;
  },
  [SET_SIGNER](state, { data }) {
    state.signer = data;
  },
  [FETCH_END](state) {
    state.isLoading = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
