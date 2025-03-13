const server_url = import.meta.env.VITE_SERVER_URL


export const serverUrlAPI = server_url;
export const serverUrl = server_url.replace("api/","");




export const getErrorMessage = (error) => {

  const {status} = error?.response;
  if(status === 401)
  {
    return "Unauthorized";
  }

  return error?.response?.data
    ? error?.response?.data?.message
    : "Something Went Wrong!";
};

export const ordersFilters = [
  {
    title: "Delivered",
    value: "delivered",
  },
  {
    title : "Out For Delivery",
    value :"out for delivery"
  },
  {
    title : "Prepared",
    value : "prepared"
  },
  {
    title : "Preparing",
    value : "preparing"
  },
  {
    title : "Pending",
    value : "pending"
  }
];
