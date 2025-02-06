import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin): Promise<string | null> => {
  try {
    const response = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`❌ API Error ${response.status}: ${errorText}`);
    }

    // ✅ Parse JSON Response
    const data = await response.json();
    console.log("🔍 Login Response Data:", data); // Debugging log

    // ✅ Extract Token
    const token = data.token;
    if (!token) {
      throw new Error("Authentication failed: No token received");
    }

    // ✅ Store Token Securely in Local Storage
    localStorage.setItem("id_token", token);

    window.location.href = "http.//localhost:3001/api/tickets"; // Redirect to Tickets page

    return token;
  } catch (error: unknown) {
    console.error("❌ Login error:", (error as Error).message);
    alert("Login failed. Please check your credentials and try again.");
    return null;
  }
};

// ✅ Helper Function to Get Token
 const getToken = (): string | null => {
  return localStorage.getItem("id_token");
};

// ✅ Helper Function to Check If User is Logged In
const isAuthenticated = (): boolean => {
  const token = getToken();
  return !!token; // Returns true if token exists, false otherwise
};

// ✅ Helper Function to Logout
const logout = (): void => {
  localStorage.removeItem("id_token");
};

export { login, getToken, isAuthenticated, logout };
