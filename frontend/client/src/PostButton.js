import React from 'react';
import Button from '@material-ui/core/Button';

class PostButton extends React.Component {

    state = {
      isAboutVisible: false,
    }
  
    render() {
     return (
      <div className="Nav">
        <div className="Button-Container">
        <div className="Nav-Text About-Button">
          <h2 onClick={() => this.setState({ isAboutVisible: true }) }>About</h2>
        </div>
        </div>
        { this.state.isAboutVisible ? <Button /> : null }
      </div>
      );
     }
  }

  export default PostButton;
