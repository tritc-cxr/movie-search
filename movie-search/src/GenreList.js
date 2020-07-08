import React, { useState } from "react";


export default function GenreList(props) {

    const { genres, filterClick, name } = props;
    const genreList = genres.map(e => {
        return <p
            key={e.id}
            onClick={() => filterClick(e.id, e.name)}
            className="dropdown-item"
        >
            {e.name}
        </p>
    })

    return (
        <div className="dropdown mt-4">
            <input className="btn btn-danger dropdown-toggle btn-lg"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                value={name}>
            </input>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {genreList}
            </div>
        </div>

    )
}