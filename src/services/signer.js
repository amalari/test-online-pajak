import ApiService from "./index";

export default {
  query(params) {
    return ApiService.query("signers", {
      params: params,
    });
  },
  get(slug) {
    return ApiService.get("signers", slug);
  },
  create(params) {
    return ApiService.post("signers", { data: params });
  },
  update(slug, params) {
    return ApiService.update("signers", slug, { data: params });
  },
  destroy(slug) {
    return ApiService.delete(`signers/${slug}`);
  },
};
