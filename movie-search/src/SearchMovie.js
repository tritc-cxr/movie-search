import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import GenreList from "./GenreList";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";


export default function SearchMovie() {

    const [query, setQuery] = useState("");

    const [movies, setMovies] = useState(null);

    const [loading, setLoading] = useState(false);

    const [firstMovieList, setFirstMovieList] = useState([]);

    const [genres, setGenres] = useState([]);

    const [name, setName] = useState("Select Genres");

    const getGenres = async (e) => {
        try {
            const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=c1e39c6d24cd93db77884da50f5e2650&language=en-US");
            const data = await response.json();
            setGenres(data.genres);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getGenres()
    }, [])

    const searchMovies = async (e) => {
        e.preventDefault();

        setLoading(true);
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_APKEY}&language=en-US&query=${query}&page=1&include_adult=false`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (response.status === 200) {
                setLoading(false);
            }
            setMovies(data.results);
            setFirstMovieList(data.results);
        }
        catch (error) {
            console.log(error);
        }

    }

    function filterClick(category, name) {
        const filterResult = firstMovieList.filter(elm => elm.genre_ids.includes(category));
        setMovies(filterResult);
        setName(name);
    }

    function sortByPopular(e) {
        if (e) {
            const movie = e.sort((a, b) => b.popularity - a.popularity);
            setMovies([...movie]);
        }

    }

    function sortByRating(e) {
        if (e) {
            const movie = e.sort((a, b) => b.vote_average - a.vote_average);
            setMovies([...movie]);
        }

    }

    const override = css`
        display: block;
        margin: 0 auto;
        border-color: black;
        `;

    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query"></label>
                <input
                    className="input"
                    placeholder="i.e Now you see me"
                    name="query"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    className="button"
                    type="submit">
                    Search
            </button>
            </form>
            <div className="d-flex justify-content-end align-items-center">
                <GenreList
                    genres={genres}
                    filterClick={filterClick}
                    name={name}
                />
            </div>

            <div className="mt-4 d-flex justify-content-end align-items-center flex-row">
                <button onClick={() => sortByPopular(movies)} className="btn btn-outline-warning btn-lg mr-2">Sort by popular</button>
                <button onClick={() => sortByRating(movies)} className="btn btn-outline-warning btn-lg ml-2">Sort by rating</button>
            </div>

            <div className="card-list">
                {
                    movies && movies.length !== 0 ?
                        movies.map(movie =>
                            <MovieCard
                                movie={movie}
                                key={movie.id}
                                genres={genres} />) :
                        (!loading && query !== "" && !firstMovieList ?
                            <div>
                                <ClipLoader
                                    css={override}
                                    size={50}
                                    color={"#123abc"}
                                />
                            </div> : <p style={{ color: "red", fontSize: "4rem", textAlign: "center" }}> Not found...</p>
                        )}
            </div>
        </>
    )
}