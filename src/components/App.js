import React, { Fragment } from "react";
import SearchBar from "./SearchBar";
import youtube from "../apis/youtube";
import VideoList from "./VideoList";
import VideoDetail from "./VideoDetail";

// const KEY = "AIzaSyBXAyimeyDQaq0xckMpjEG4NzYGJR_XTbg";
const KEY = "AIzaSyAmC2SKVwCcsDsg2M-OREp4dW9x8BCgGTg";

class App extends React.Component {
  //Na i marrim krejt qa na kthehen prej response edhe i qesim n state
  // Kur e fillojna niher ka mu kon empty, tani kur useri e lyp dicka kjo mushet
  state = {
    videos: [],
    selectedVideo: null,
  };

  componentDidMount() {
    this.onTermSubmit("recommended");
  }

  // 1.  termi vjen prej anej cka ti shenon cfardo fjale te vjen si parameter
  // 2. Ktu i merr prej youtube funksionit get ku si parameter q(query) qekjo
  //  q i caktohet n dokumentim, edhe qasaj ja pasojsh term dmth fjalen qe e shkrun n sarchbar
  onTermSubmit = async (term) => {
    const response = await youtube.get("/search", {
      params: {
        q: term,
        part: "snippet",
        maxResults: 5,
        type: "video",
        key: KEY,
      },
    });

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };
  render() {
    return (
      <Fragment>
        <div className="ui container">
          <SearchBar onFormSubmit={this.onTermSubmit} />
          <div className="ui grid">
            <div className="ui row">
              <div className="ten wide column">
                <VideoDetail video={this.state.selectedVideo} />
              </div>
              <div className="six wide column">
                <VideoList
                  videos={this.state.videos}
                  onVideoSelect={this.onVideoSelect}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
