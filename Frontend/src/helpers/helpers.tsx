import { postUser } from "../services/services.service";

export const handleUserLogin = async (decoded: any) => {
  const payload: any = {};
  payload["email"] = decoded.email;
  payload["isEmailVerified"] = decoded.email_verified;
  const data = await postUser(payload);
  if (Boolean(data) && data.isEmailVerified && Boolean(data.token.length)) {
    localStorage.setItem("userInfo", JSON.stringify(data));
    return true;
  }
  return false;
};

export const generateReponse = async (prompt: string) => {
  console.log(import.meta.env.REACT_APP_VITE_REACT_APP_OPENAI_API_KEYs);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_OPENAI_API_KEYs}`,
    },
    body: JSON.stringify({ prompt }),
  };

  const response = await fetch(
    "https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions",
    requestOptions
  );
  const data = await response.json();
  const generatedResponse = data?.choices[0]?.text;
  return generatedResponse;
};
