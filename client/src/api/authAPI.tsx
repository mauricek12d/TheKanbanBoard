import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    
    // Parse the Response
    const data = await response.json();

       // Extract the token from the response
       const token = data.token;
       if (!token) {
         throw new Error("Authentication failed: No token received");
       }
   
       // Store the token in localStorage for future authenticated requests
       localStorage.setItem("token", token);
   
       // Return the token
       return token;
     } catch (error: unknown) {
       console.error("Login error:", (error as Error).message);
       return null;
     }
   };



export { login };