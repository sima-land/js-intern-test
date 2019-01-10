import namespacedActions from "redux-namespaced-actions";

const NAMESPACE = "store/search";
const { createAction } = namespacedActions(NAMESPACE);

export const [textEdit] = ["textEdit"].map((type) => createAction(type));
