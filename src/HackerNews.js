import React, { Component } from 'react'
import axios from 'axios';
import TimeAgo from 'react-timeago';
import { Chart } from 'react-charts';
import { useTable, usePagination } from 'react-table'

class HackerNews extends Component {

    constructor(){
        super();
        this.state = {
            hackernews: [],
            data: [
                {
                  label: 'Vote Count',
                  data: [[0, 0]]
                }
            ],
            axes: [
                { primary: true, type: 'linear', position: 'bottom' },
                { type: 'linear', position: 'left' }
            ]
        }
        this.updateNewsInList = this.updateNewsInList.bind(this);
    }

    componentDidMount() {
        this.getNewsList();
    }

    render() {
        return (
        <div className="main row mt-1 justify-content-center">
            <div className="col-12 flex-wrap align-content-start">
                <table className="table table-sm table-striped">
                    <thead className="d-none d-sm-table-header-group">
                        <tr>
                            <th scope="col" width="90">Comments</th>
                            <th align="center" className="text-center" scope="col" width="55">Vote Count</th>
                            <th scope="col" width="66">UpVote</th>
                            <th scope="col">News Details</th>
                        </tr>
                    </thead>
                    <tbody className="d-block d-sm-table-header-group">
                    {
                        this.state.hackernews.map((hackernews, index) => (
                            <tr className="d-flex flex-wrap d-sm-table-row" key={hackernews.id}>
                                <td align="center" className="mobile-100">
                                    <span className="d-sm-none">Comments: </span>{hackernews.comments}
                                </td>
                                <td align="center" className="mobile-100">
                                    <span className="d-sm-none">Vote Count: </span>{hackernews.points}
                                </td>
                                <td align="center" className="mobile-100">
                                    <span className="d-sm-none">UpVote: </span><i className="fa fa-sort-asc upvote" onClick={(event) => this.updateNewsInList(event, hackernews)} aria-hidden="true"></i>
                                </td>
                                <td className="mobile-100">
                                    <span className="d-sm-none">News Details: </span>
                                    <strong>{hackernews.title}</strong> <span className="small"><span className="grey">({hackernews.url}) by </span>{hackernews.author} &nbsp; 
                                    <span className="grey"><TimeAgo date= {hackernews.created_at} /></span></span>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <div className="col-10"
                style={{
                    height: '300px'
                }}
            >
                <Chart data={this.state.data} axes={this.state.axes} tooltip />
            </div>
        </div>
        );
    }

    getNewsList() {
        var self = this;
        var newsURL = "http://localhost:3200/hackernews";
        axios.get(newsURL)
        .then(function (response) {
            // debugger;
            const responseData = response.data;
            let newArray = [];
            responseData.forEach(item => {
                newArray.push([item.id, item.points])
            });
            console.log(newArray);
            self.setState({ 
                hackernews: response.data,
                data: [
                    {
                      label: 'Vote Count',
                      data: newArray
                    }
                ]
            })
            console.log(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    updateNewsInList(event, hackernews) {
        debugger
        var self = this;
        var usersURL = "http://localhost:3200/hackernews/" + hackernews.id;
        // debugger
        var updateCount = {
            "created_at": hackernews.created_at,
            "author": hackernews.author,
            "title": hackernews.title,
            "url": hackernews.url,
            "text": hackernews.text,
            "points": hackernews.points + 1,
            "comments": hackernews.comments
        }
        axios.put(usersURL, updateCount)
        .then(function (response) {
            console.log(response);
            const elementsIndex = self.state.hackernews.findIndex(element => element.id === hackernews.id);
            let newArray = [...self.state.hackernews];
            newArray[elementsIndex] = {...newArray[elementsIndex], count: self.state.hackernews.points + 1}
            self.setState({
                hackernews: newArray
            })
            self.getNewsList();
        })
        .catch(function (error) {
            console.error(error);
        })
        console.log("Item Updated");
    }
}
 
export default HackerNews;