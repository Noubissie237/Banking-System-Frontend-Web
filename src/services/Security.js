import { jwtDecode } from "jwt-decode";

const getAdminId = (token) => {
    try {
      const decodedToken = jwtDecode(token); 
      return [decodedToken.id, decodedToken.nom]; 
    } catch (error) {
      console.error("Erreur lors de la décodification du token", error);
      return null;
    }
};
  


export default getAdminId;