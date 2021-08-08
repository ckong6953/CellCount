class FormSubmit extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            value: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        ReactDOM.render(<CreateTable amount={this.state.value} />, document.getElementById("count-table"))
        event.preventDefault();
    }


    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Please enter the amount of samples you have counted:
              <input type="number" placeholder="1" min="1" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
    }
}


class CreateTable extends React.Component {
    constructor (props){
        super (props);
        this.state = {
            countOne: 0,
            countTwo: 0,
            countThree: 0,
            countFour: 0,
            dilFac: 0,
            avgCount: 0,
        }

        this.handleDilution = this.handleDilution.bind(this);
        this.handleOneChange = this.handleOneChange.bind(this);
        this.handleTwoChange = this.handleTwoChange.bind(this);
        this.handleThreeChange = this.handleThreeChange.bind(this);
        this.handleFourChange = this.handleFourChange.bind(this);
    }

    handleDilution(event){
        this.setState({dilFac: event.target.value})
    }

    handleOneChange(event){
        this.setState({countOne: event.target.value})
    }

    handleTwoChange(event){
        this.setState({countTwo: event.target.value})
    }

    handleThreeChange(event){
        this.setState({countThree: event.target.value})
    }

    handleFourChange(event){
        this.setState({countFour: event.target.value});
    }
    
    render(){
        let tableList = [];
        let rows = []
        for (let i = 0; i < 6; i++){
            const rowID = "row-"+i;
            let cells = [];
            for (let j = 0; j < 2; j++){
                const cellID = "cell-" + i + "-" + j;
                switch (j){
                    case 0:
                        switch (i){
                            case 0:
                                cells.push(<td key={cellID}>Dilution Factor</td>);
                                break;
                            case 1:
                                cells.push(<td key={cellID}>Raw Count 1</td>);
                                break;
                            case 2:
                                cells.push(<td key={cellID}>Raw Count 2</td>);
                                break;
                            case 3:
                                cells.push(<td key={cellID}>Raw Count 3</td>);
                                break;
                            case 4:
                                cells.push(<td key={cellID}>Raw Count 4</td>);
                                break;
                            case 5:
                                cells.push(<td key={cellID}>Average</td>);
                        }
                        break;
                    case 1:
                        switch(i){
                        case 0:
                            cells.push(<td key={cellID}>
                                <form> <input type="number" placeholder="0" min="0" value={this.state.dilFac}
                                onChange={this.handleDilution}/> </form>
                                </td>);
                            break;
                        case 1:
                            cells.push(<td key={cellID}><input type="number" placeholder="0" min="0" value={this.state.countOne} onChange={this.handleOneChange}/></td>);
                            break;  
                        case 2:
                            cells.push(<td key={cellID}><input type="number" placeholder="0" min="0" value={this.state.countTwo} onChange={this.handleTwoChange}/></td>) ;
                            break;
                        case 3: 
                            cells.push(<td key={cellID}><input type="number" placeholder="0" min="0" value={this.state.countThree} onChange={this.handleThreeChange}/></td>)
                            break;
                        case 4: 
                            cells.push(<td key={cellID}><input type="number" placeholder="0" min="0" value={this.state.countFour} onChange={this.handleFourChange}/></td>)  
                            break;
                        case 5:
                            cells.push(<td key={cellID}>{this.state.avgCount}</td>)  
                        }      
                }
            }
            rows.push(<tr key={rowID}>{cells}</tr>);
        }

        for (let i = 0; i < this.props.amount; i++){
            const tableID = "table-" + i;
            const headerID = "tableHeader-" + i;
            tableList.push(<table key={tableID}>
                <thead key={headerID}><tr><td colSpan="2">Blank Table {i+1}</td></tr></thead>
                <tbody>{rows}</tbody>
                </table>);
        }
        return tableList;
    }
}


ReactDOM.render(
    <FormSubmit />, document.getElementById("cell-count")
);
