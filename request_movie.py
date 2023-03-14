import requests
import random

# Replace YOUR_API_KEY with your own API key
API_KEY = "1143208288f7e1b7e0a1509068ead4d7"

# Get a random page number between 1 and 100 (inclusive)
page = random.randint(1, 100)

# Make the API request
url = f"https://api.themoviedb.org/3/discover/movie?api_key={API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page={page}&vote_count.gte=1000"
response = requests.get(url)

# Get a list of 20 random movie titles from the response
movies = random.sample(response.json()["results"], k=20)
titles = [movie["title"] for movie in movies]

# Print the movie titles
for title in titles:
    print(title)
