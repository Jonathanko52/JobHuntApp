import React from 'react';


class Test extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: 'red'
      }
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({value:event.target.value})
    }
    
    render(){
        return(
            <input type = "text" style={{color:this.state.value}} 
            onChange={this.handleChange}>
            </input>
        )
    }
    
}
export default Test