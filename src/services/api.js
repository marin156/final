import callApi from "../utils/call-api";

export const getProducts = () => callApi(`/products/`, { method: "GET" });
export const updateItem = body => callApi(`/products/${body.id}`, { method: "PUT", body }); //updata db.json - put overwrita