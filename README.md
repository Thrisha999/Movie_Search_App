# Movie Search App

## 📌 Overview
The **Movie Search App** is a React Native application that allows users to search for movies using the **OMDb API**. Users can view movie details, ratings, and posters, and optionally save their favorite movies.

## 🚀 Features
- 🔍 **Search for Movies** using the search bar.
- 🖼 **Display Movie List** with title and poster.
- 🎬 **Movie Details Screen** (poster, title, year, genre, and IMDb rating).
- ⭐ **Save Favorite Movies** using AsyncStorage.
- 🔄 **Load More Movies** when scrolling down.

## 🛠 Tech Stack
- **React Native** (Frontend UI)
- **React Navigation** (Screen Navigation)
- **Fetch / Axios** (API Calls)
- **AsyncStorage** (Local Storage for Favorites)
- **OMDb API** (Movie Data Source)
- **React Native Paper / NativeBase** (Optional UI Components)

## 📥 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/movie-search-app.git
cd movie-search-app
```

### 2️⃣ Install Dependencies
```sh
npm install  # or yarn install
```

### 3️⃣ Get OMDb API Key
- Visit [OMDb API](https://www.omdbapi.com/)
- Sign up for a free API key
- Add your API key in `config.js` file:

```js
export const API_KEY = 'your_api_key_here';
```

### 4️⃣ Run the App
#### For Android:
```sh
npx react-native run-android
```
#### For iOS:
```sh
npx pod-install
npx react-native run-ios
```

## 📜 Folder Structure
```
MovieSearchApp/
│-- src/
│   │-- components/
│   │   ├── MovieItem.js
│   │-- screens/
│   │   ├── HomeScreen.js
│   │   ├── MovieDetailsScreen.js
│   │-- utils/
│   │   ├── api.js
│-- App.js
│-- package.json
```

## 💡 Future Improvements
- 🔹 Implement a **dark mode**.
- 🔹 Add **user authentication** to save favorites across devices.
- 🔹 Integrate **TMDb API** for more detailed movie data.

## 📜 License
This project is licensed under the **MIT License**.

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## 📧 Contact
For any queries, feel free to reach out at **thrisaileswariakepati@gmail.com**.

