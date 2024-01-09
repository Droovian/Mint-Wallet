export const useGetUserInfo = () => {
    const { name, profilePic, userID, isAuth } =
      JSON.parse(localStorage.getItem("auth")) || {};
  
    return { name, profilePic, userID, isAuth };
  };