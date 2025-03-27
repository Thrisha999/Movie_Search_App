"use client"

import { useState, useEffect } from "react"
import { Search, Film, Heart, Star, ChevronRight, Bookmark, BookmarkCheck } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  release_date: string
  overview: string
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [movies, setMovies] = useState<Movie[]>([])
  const [favorites, setFavorites] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("discover")

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem("movieFavorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem("movieFavorites", JSON.stringify(favorites))
  }, [favorites])

  // Popular movies for the discover tab
  useEffect(() => {
    if (activeTab === "discover") {
      fetchPopularMovies()
    }
  }, [activeTab])

  const fetchPopularMovies = async () => {
    setLoading(true)
    try {
      // This is a mock function with real movie poster paths
      const mockPopularMovies = [
        {
          id: 1,
          title: "Inception",
          poster_path: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
          vote_average: 8.8,
          release_date: "2010-07-16",
          overview:
            "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        },
        {
          id: 2,
          title: "The Shawshank Redemption",
          poster_path: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
          vote_average: 9.3,
          release_date: "1994-09-23",
          overview:
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        },
        {
          id: 3,
          title: "The Dark Knight",
          poster_path: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
          vote_average: 9.0,
          release_date: "2008-07-18",
          overview:
            "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        },
        {
          id: 4,
          title: "Pulp Fiction",
          poster_path: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
          vote_average: 8.9,
          release_date: "1994-10-14",
          overview:
            "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        },
        {
          id: 5,
          title: "The Lord of the Rings: The Fellowship of the Ring",
          poster_path: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
          vote_average: 8.8,
          release_date: "2001-12-19",
          overview:
            "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
        },
        {
          id: 6,
          title: "Forrest Gump",
          poster_path: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
          vote_average: 8.8,
          release_date: "1994-07-06",
          overview:
            "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
        },
      ]
      setMovies(mockPopularMovies)
    } catch (error) {
      console.error("Error fetching popular movies:", error)
    } finally {
      setLoading(false)
    }
  }

  const searchMovies = async () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      // Generate search results with movie-like poster images
      // In a real app, you would call an API with the search query

      // For demonstration, let's use some popular movies as search results
      // but modify their titles to include the search query
      const mockSearchResults = [
        {
          id: 7,
          title: `${searchQuery}: The Beginning`,
          poster_path: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", // Avatar
          vote_average: 7.5,
          release_date: "2022-01-01",
          overview: `A movie about ${searchQuery} with exciting plot twists and character development.`,
        },
        {
          id: 8,
          title: `The ${searchQuery} Adventure`,
          poster_path: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", // Avengers
          vote_average: 8.2,
          release_date: "2021-05-15",
          overview: `An adventure film featuring ${searchQuery} in a thrilling journey across unknown territories.`,
        },
        {
          id: 9,
          title: `Return of ${searchQuery}`,
          poster_path: "https://image.tmdb.org/t/p/w500/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg", // Star Wars
          vote_average: 6.9,
          release_date: "2023-03-10",
          overview: `The long-awaited sequel about ${searchQuery} and the challenges they face in a new world.`,
        },
      ]
      setMovies(mockSearchResults)
      setActiveTab("search")
    } catch (error) {
      console.error("Error searching movies:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (movie: Movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id))
    } else {
      setFavorites([...favorites, movie])
    }
  }

  const isFavorite = (movieId: number) => {
    return favorites.some((fav) => fav.id === movieId)
  }

  function renderMovieGrid(moviesToRender: Movie[], isLoading: boolean) {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden animate-pulse bg-gray-800 border-gray-700">
              <div className="h-[450px] bg-gray-700" />
              <CardContent className="p-4">
                <div className="h-6 bg-gray-700 rounded mb-2" />
                <div className="h-4 bg-gray-700 rounded w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moviesToRender.map((movie) => (
          <Card
            key={movie.id}
            className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-gray-800 border-gray-700 group"
          >
            <div className="relative h-[450px] overflow-hidden">
              {/* Loading indicator */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-gray-500 z-0">
                <span className="loading"></span>
              </div>

              {/* Movie poster image */}
              <img
                src={movie.poster_path || "/placeholder.svg"}
                alt={`${movie.title} poster`}
                className="w-full h-full object-cover z-10 relative transition-all duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = `/placeholder.svg?height=450&width=300&text=${encodeURIComponent(movie.title)}`
                }}
              />

              {/* Favorite button */}
              <div className="absolute top-3 right-3 z-20">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 ${
                    isFavorite(movie.id) ? "text-pink-500" : "text-white"
                  }`}
                  onClick={() => toggleFavorite(movie)}
                >
                  {isFavorite(movie.id) ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
                </Button>
              </div>

              {/* Rating badge */}
              <div className="absolute bottom-3 left-3 z-20">
                <Badge className="bg-yellow-500 text-black font-bold flex items-center gap-1 px-2 py-1">
                  <Star className="h-3 w-3 fill-current" />
                  {movie.vote_average.toFixed(1)}
                </Badge>
              </div>

              {/* Hover overlay with movie details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 z-10">
                <h3 className="text-white font-bold text-xl mb-2">{movie.title}</h3>
                <p className="text-gray-300 text-sm line-clamp-3">{movie.overview}</p>
              </div>
            </div>

            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg font-bold line-clamp-1 text-gray-100">{movie.title}</CardTitle>
              <p className="text-sm text-gray-400">{new Date(movie.release_date).getFullYear()}</p>
            </CardHeader>

            <CardContent className="p-4 pt-0">
              <p className="text-sm text-gray-400 line-clamp-2">{movie.overview}</p>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-gray-700 hover:bg-gray-700 group-hover:bg-purple-700 group-hover:border-purple-700 group-hover:text-white transition-all duration-300"
              >
                View Details <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
            Movie Explorer
          </h1>
          <p className="text-gray-400 max-w-md mx-auto">
            Discover amazing films, save your favorites, and find your next movie night pick
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchMovies()}
                className="pl-10 pr-4 py-6 rounded-full shadow-md bg-gray-800 border-gray-700 text-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            </div>
          </div>
          <Button
            onClick={searchMovies}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full py-6 px-8 shadow-md"
          >
            Search
          </Button>
        </div>

        <Tabs defaultValue="discover" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 rounded-full bg-gray-800 p-1">
            <TabsTrigger
              value="discover"
              className="rounded-full data-[state=active]:bg-gray-700 data-[state=active]:text-purple-400 data-[state=active]:shadow-sm"
            >
              <Film className="mr-2 h-4 w-4" />
              Discover
            </TabsTrigger>
            <TabsTrigger
              value="search"
              className="rounded-full data-[state=active]:bg-gray-700 data-[state=active]:text-purple-400 data-[state=active]:shadow-sm"
            >
              <Search className="mr-2 h-4 w-4" />
              Search Results
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="rounded-full data-[state=active]:bg-gray-700 data-[state=active]:text-purple-400 data-[state=active]:shadow-sm"
            >
              <Heart className="mr-2 h-4 w-4" />
              Favorites ({favorites.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-200 flex items-center">
              <Film className="mr-2" /> Popular Movies
            </h2>
            {renderMovieGrid(movies, loading)}
          </TabsContent>

          <TabsContent value="search" className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-200 flex items-center">
              <Search className="mr-2" /> Search Results
            </h2>
            {movies.length > 0 ? (
              renderMovieGrid(movies, loading)
            ) : (
              <div className="text-center py-16 bg-gray-800 rounded-lg shadow-sm">
                <Search className="mx-auto h-16 w-16 text-gray-600 mb-4" />
                <p className="text-gray-400">Search for movies to see results here</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-200 flex items-center">
              <Heart className="mr-2" /> Your Favorites
            </h2>
            {favorites.length > 0 ? (
              renderMovieGrid(favorites, false)
            ) : (
              <div className="text-center py-16 bg-gray-800 rounded-lg shadow-sm">
                <Heart className="mx-auto h-16 w-16 text-gray-600 mb-4" />
                <p className="text-gray-400">You haven't added any favorites yet</p>
                <Button
                  variant="outline"
                  className="mt-4 border-gray-600 text-gray-300 hover:bg-gray-700"
                  onClick={() => setActiveTab("discover")}
                >
                  Discover Movies
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

