import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import SearchMovie from "./SearchMovie";

class Main extends React.Component {
    render() {
        return (
            <div className="container">
                <h1 className="title">Movie search - V1</h1>
                <SearchMovie />
            </div>
        )
    }
}

export default Main
ReactDOM.render(<Main />, document.getElementById("root"))