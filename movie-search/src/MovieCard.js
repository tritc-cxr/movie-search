import React from "react";

export default function MovieCard(props) {
    const { movie, genres } = props;

    const genre = movie.genre_ids.map(e => {
        const index = genres.findIndex(elm => elm.id === e);
        if (index !== -1) {
            const name = genres[index].name;
            return name;
        }
    });

    const label = genre.map(e => {
        return (
            <span key={e} className="card--genre">{e}</span>
        )
    })

    return (
        <div className="card">
            <img
                className="card--image"
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}` : "https://unityfresh.com/images/image-not-available.png"}
                alt={movie.title + "post"}
            />
            <div className="card--content">
                <h3 className="card--title">{movie.title}</h3>
                <p><b>RELEASE DATE:</b> {movie.release_date}</p>
                <p><b>RATING:</b> {movie.vote_average}</p>
                <p><b>GENRE: </b>{label}</p>
                <p className="card--desc">{movie.overview}</p>
            </div>
        </div>
    )
}