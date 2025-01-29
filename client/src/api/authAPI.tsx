import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin): Promise<string | null> => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    // ✅ Handle Non-200 Responses (e.g., 401 Unauthorized)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
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

    return token;
  } catch (error: unknown) {
    console.error("❌ Login error:", (error as Error).message);
    return null;
  }
};

export { login };
