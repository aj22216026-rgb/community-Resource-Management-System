export const formValidation = (name, value) => {

  if (value.trim() === "") {
    return `${name} is required`;
  }

//   if (name === "password" && value.length < 8) {
//     return "Password must be at least 8 characters";
//   }

  if (name === "email" && !value.includes("@")) {
    return "Invalid email format";
  }

  return "";
};