# Zoodora (Express.js)

A dynamic platform for buying and selling pet products, built with Express.js.

## 🚀 Features:

- User-friendly interface for browsing and listing pet products.
- Secure authentication and user management.
- Responsive and modern design.
- Open-source and customizable.
- Code explanations.

## 🛠 Installation:

### **Server Setup:**
1. Navigate to the server directory:

    ```bash
    cd src
    ```
2. Install the server dependencies:

    ```bash
    npm install
    ```

### Set Up Environment Variables:

Since this project utilizes cookies for authentication, you need to create a `.env` file to store sensitive information, such as the `JWT_SECRET`.

1. Create a `.env` file in the root directory of the server (if it doesn't already exist).

2. Add the following environment variable to the `.env` file:

    ```env
    JWT_SECRET=your_secret_key_here
    ```

   Replace `your_secret_key_here` with a strong, secure secret key used for signing JWT tokens.

3. Ensure that the server is able to read environment variables by using the `dotenv` package (which should already be included in the server dependencies).

### **MongoDB Setup:**

1. Make sure you have MongoDB installed and running locally, or set up a free cluster via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. If using a local MongoDB server, the default connection URI is:

    ```bash
    mongodb://localhost:27017/Zoodora
    ```

3. Create a database named `Zoodora` and define your collections as needed (e.g., `users`, `products`).

## 🏃 Running:

### **Server:**

1. Open a terminal and navigate to the `server` directory:

    ```bash
    cd src
    ```

2. Start the server by running the following command:

    ```bash
    npm run dev
    ```

   The server should now be running at `http://localhost:3000`.

## 🐾 Usage:
1. Open the app in your browser at `http://localhost:3000`.
2. Register or log in to access full features.
3. List your pet product for sale or browse available listings.
4. Search to find the perfect pet product.

## 🤝 Contributing:
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch (feature-new).
3. Commit your changes.
4. Push the branch and open a pull request.

## 📜 License:
This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact:
For any inquiries, feel free to reach out at bozhidarivanov24@gmail.com or open an issue.
