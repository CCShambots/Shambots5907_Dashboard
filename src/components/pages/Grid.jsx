import React, { Component } from 'react';
import './Grid.css';


function GridEntry(props) {

    return (
        <div
            className={`entry ${props.entry}`}
            onClick={() => props.handleClick(props.rowIndex, props.colIndex)}
        ></div>
    )
}

class Grid extends Component {
    constructor(props) {
        super(props);
        let grid = Array(9);

        for(let i = 0; i<grid.length; i++) {
            grid[i] = Array(3).fill("");
        }

        this.state = {
            grid: grid
        };
    }

    handleClick = (rowIndex, colIndex) => {

        const newGrid = [...this.state.grid];
        if (newGrid[colIndex][rowIndex] === "") {
            if (colIndex === 1 || colIndex === 4 || colIndex === 7) {
                newGrid[colIndex][rowIndex] = "cube";
            } else {
                newGrid[colIndex][rowIndex] = "cone";
            }
        } else {
            newGrid[colIndex][rowIndex] = "";
        }
        this.setState({grid: newGrid});
    };

    render() {
        return (
            <div className="grid">
                {this.state.grid.map((row, colIndex) => (
                    <div className="row" key={colIndex}>
                        {row.map((entry, rowIndex) => (
                            <GridEntry
                                entry={entry}
                                rowIndex={rowIndex}
                                colIndex={colIndex}
                                handleClick={this.handleClick}
                                key={rowIndex.toString() + colIndex.toString()}
                            />
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

export default Grid;
