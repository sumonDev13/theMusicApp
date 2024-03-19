import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";

const RecommendForYou = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const options = {
          method: "GET",
          url: "https://spotify174.p.rapidapi.com/",
          params: {
            trek: "Ko'zmunchog'im",
            limit: "10",
            count_code: "UZ",
            offset: "10",
          },
          headers: {
            "X-RapidAPI-Key":
              "4aa8a806a2msh4ffd54fb9aac423p1f54e1jsne9300f47ec3b",
            "X-RapidAPI-Host": "spotify174.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        const apiData = response.data;

        // Check if the response data is an array
        if (apiData.result && Array.isArray(apiData.result)) {
          console.log("API Response Data:", apiData.result); // Add this line
          const transformedData = apiData.result.map((song) => {
            // Transform the song object to match the expected structure
            return {
              title: song.name || "",
              subtitle: song.artist || "",
              images: { coverart: song.image || "" },
              artists: [{ adamid: "" }],
              key: song.link || "",
            };
          });
          setData(transformedData);
        } else {
          // Handle non-array response
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader title="Loading Songs around you..." />;

  if (error) return <Error message={error} />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Recommend For You
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendForYou;
