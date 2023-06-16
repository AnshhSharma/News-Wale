import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import NewsContainer from './components/NewsContainer';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


export default class App extends Component {

  apiKey = process.env.REACT_APP_API_KEY_1;
  pageSize = 12;
  state = {
    progress: 0
  }
  
  setProgress = (progress) => {
    this.setState({
      progress: progress
    })
  }
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<NewsContainer setProgress={this.setProgress} apiKey = {this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/business" element={<NewsContainer setProgress={this.setProgress} apiKey = {this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<NewsContainer setProgress={this.setProgress} apiKey = {this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route exact path="/health" element={<NewsContainer setProgress={this.setProgress} apiKey = {this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health" />} />
            <Route exact path="/science" element={<NewsContainer setProgress={this.setProgress} apiKey = {this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science" />} />
            <Route exact path="/sports" element={<NewsContainer setProgress={this.setProgress} apiKey = {this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
            <Route exact path="/technology" element={<NewsContainer setProgress={this.setProgress} apiKey = {this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
