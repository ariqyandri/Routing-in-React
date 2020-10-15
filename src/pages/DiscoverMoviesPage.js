import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "./pages.css";

export default function DiscoverMoviesPage() {
  const history = useHistory();
  const params = useParams();

  const [searchText, set_searchText] = useState("");
  const [result, set_result] = useState({
    status: `idle`,
    data: [`initiating page`],
  });

  const navigateToSearch = async () => {
    const routeParam = encodeURIComponent(searchText);
    history.push(`/discover/${routeParam}`);
    localStorage.setItem("searchText", routeParam);
  };

  const clearSearchBar = () => {
    set_searchText([]);
  };

  useEffect(() => {
    async function returnPage() {
      const routeParam = encodeURIComponent(params.searchText);
      if (params.searchText === `:searchText`) {
        set_searchText(decodeURIComponent(localStorage.getItem("searchText")));
        return set_result({ status: `idle`, data: [`initiating page`] });
      } else {
        const response = await axios.get(
          `http://www.omdbapi.com/?s=${routeParam}&apikey=73ea4744`
        );
        console.log("I ran Else", response.data.Search);
        set_result({ status: `Done`, data: response.data.Search });
        set_searchText(decodeURIComponent(localStorage.getItem("searchText")));
      }
    }
    returnPage();
  }, [params.searchText]);

  console.log("I ran Result", result.data);
  console.log(`WHAT IS THE RESULT`, result.data);

  return (
    <div className="mt-2 mb-2">
      <h3>Discover some movies!</h3>
      <p>
        <input
          placeholder="Movie Name"
          value={searchText}
          onChange={(e) => set_searchText(e.target.value)}
        />
        <button onClick={navigateToSearch}>Search</button>
        <button onClick={clearSearchBar}>Clear</button>
      </p>
      {result.data === undefined ? (
        <h4>Not Found</h4>
      ) : (
        result.data.map((data) => {
          return (
            <div className="mb-4 mt-4">
              <Link to={`/movies/${data.imdbID}`}>
                <h1 className="titleColor">{data.Title}</h1>
              </Link>
              <Link to={`/movies/${data.imdbID}`}>
                <img className="imgHover" src={data.Poster} alt={data.Title} />
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
}

// export default function DiscoverMoviesPage() {
//   const history = useHistory();
//   const params = useParams();
//   console.log(`params is`, params.searchText);

//   const [searchText, set_searchText] = useState("");
//   const [result, set_result] = useState([]);

//   useEffect(() => {
//     async function returnPage() {
//       const routeParam = encodeURIComponent(params.searchText);
//       const response = await axios.get(
//         `http://www.omdbapi.com/?s=${routeParam}&apikey=73ea4744`
//         );
//         console.log("I ran useEffect");
//         if (response.data.Search === undefined) {
//           set_result(["Not Found"]);
//           console.log(`not found`, response.data.search);
//         } else {
//           set_result(response.data.Search);
//         }
//       }
//       returnPage();
//     }, [params.searchText]);

//     const navigateToSearch = async () => {
//       const routeParam = encodeURIComponent(searchText);
//       history.push(`/discover/${routeParam}`);
//       localStorage.setItem("searchText", routeParam);
//     };

//   return (
//     <div className="mt-2 mb-2">
//       <h3>Discover some movies!</h3>
//       <p>
//         <input
//           placeholder="Movie Name"
//           value={searchText}
//           onChange={(e) => set_searchText(e.target.value)}
//         />
//         <button onClick={navigateToSearch}>Search</button>
//       </p>
//       {result === ["Not Found"] ? (
//         <h4>{result}</h4>
//       ) : (
//         result.map((data) => {
//           return (
//             <div className="mb-4 mt-4">
//               <Link to={`/movies/${data.imdbID}`}>
//                 <h1 className="titleColor">{data.Title}</h1>
//               </Link>
//               <Link to={`/movies/${data.imdbID}`}>
//                 <img className="imgHover" src={data.Poster} alt={data.Title} />
//               </Link>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// }

// SEARCH EXACT FUNCTION
// const searchExact = async () => {
//   localStorage.setItem("Title", searchText);
//   const queryParam = encodeURIComponent(searchText);
//   const response = await axios.get(
//     `http://www.omdbapi.com/?t=${queryParam}&apikey=73ea4744`
//   );
//   set_result([response.data]);
// };
// <button onClick={searchExact}>Exact</button>
