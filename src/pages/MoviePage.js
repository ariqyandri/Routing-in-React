import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./pages.css";

export default function MoviePage() {
  const params = useParams();
  const [details, setdetails] = useState([]);
  useEffect(() => {
    async function movieDetails() {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${params.imdbID}&apikey=73ea4744`
      );
      setdetails(response.data);
      console.log("I ran useEffect");
    }
    movieDetails();
  }, [params.imdbID]);

  console.log("data", details.data);

  const returnButton = localStorage.getItem("searchText");
  console.log("this is the", returnButton);

  return (
    <div className="center">
      <div className="rowMoviePage mt-4">
        <div>
          <img src={details.Poster} alt={details.Title} />
        </div>
        <div className="info">
          <h1>{details.Title}</h1>
          <h3>{details.Genre}</h3>
          <p>{details.Plot}</p>
        </div>
      </div>
      <div>
        <Link to={`/discover/${returnButton}`}>
          <button style={{ float: "left" }} className="mt-3 mb-4">
            Back
          </button>
        </Link>
        <Link to={`/discover/:searchText`}>
          <button style={{ float: "left" }} className="mt-3 mb-4">
            Search New Movie
          </button>
        </Link>
      </div>
    </div>
  );
}
