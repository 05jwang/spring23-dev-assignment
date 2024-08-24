// Regex tester

export const regex = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    id: /^[0-9a-fA-F]{24}$/,
    name: /^[a-zA-Z]{2,}$/,
    phone: /^[0-9]{10}$/,
    url: /^(http|https):\/\/[^ "]+$/,
    date: /^\d{4}-\d{2}-\d{2}$/,
    time: /^\d{2}:\d{2}$/,
    number: /^[0-9]+$/,
    alphaNumeric: /^[a-zA-Z0-9]+$/
};