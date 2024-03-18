import { useState, useEffect } from "react";

const Hero = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          "https://v1.nocodeapi.com/sumondev13/spotify/lYJqvkUlfRzBMHYl/browse/new?perPage=20"
        );
        const data = await response.json();
        const { albums } = data;
        console.log('data',data)
        setSongs(albums.items);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, []);

  return (
    <div className="hero">
      <h2 className="text-2xl font-bold mb-4">New Releases</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {songs.map((song) => (
          <div key={song.id} className="bg-gray-200 p-4 rounded-lg">
            <img
              src={song.images[0].url}
              alt={song.name}
              className="w-full h-48 object-cover rounded-lg mb-2"
            />
            <h3 className="text-lg font-semibold">{song.name}</h3>
            <p className="text-gray-600">
              {song.artists.map((artist) => artist.name).join(", ")}
            </p>
            <audio src={song.preview_url} controls className="w-100"></audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
