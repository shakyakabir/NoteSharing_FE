// const getEmail = localStorage.getItem("email");

const getEmail =
  typeof window !== "undefined" ? localStorage.getItem("email") : null;
const Config = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  defaultEmail: getEmail,
};

export default Config;
