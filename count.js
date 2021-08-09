let baseVolume = [];

class FormSubmit extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            value: 1,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        let tables = []
        tables.push(<p key="instructions">Please fill out the sample name as well as the respective dilution factor and observed raw cell counts in the fields below. These are utilized to calculate the average counts as well as the amount of cells found per volume in milliliters. If fields are failing tp update, please press enter after entering a field value. Once finished, please click the "Submit Table(s)" button:</p>)
        for (let i = 0; i < this.state.value; i++){
            const tableId = "table-"+i
            tables.push(<CreateTable key={tableId} tableID={i}/>);
        }
            ReactDOM.render(<div>{tables}</div>, document.getElementById("count-table"));
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
            tableTitle: '',
            countOne: 0,
            countTwo: 0,
            countThree: 0,
            countFour: 0,
            avgCount: 0,
            dilFac: 0,
            cellVolume: 0,
        }

        this.handleDilution = this.handleDilution.bind(this);
        this.handleOne = this.handleOne.bind(this);
        this.handleTwo = this.handleTwo.bind(this);
        this.handleThree = this.handleThree.bind(this);
        this.handleFour = this.handleFour.bind(this);
        this.handleAverage = this.handleAverage.bind(this);
        this.handleVolume = this.handleVolume.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTitleSave = this.handleTitleSave.bind(this);
    }

    handleTitleChange(event){
        this.setState({tableTitle: event.target.value});
    }

    handleDilution(event){
        this.setState({dilFac: event.target.value});
    }

    handleOne(event){
        this.setState({countOne: event.target.value});
    }

    handleTwo(event){
        this.setState({countTwo: event.target.value});
    }

    handleThree(event){
        this.setState({countThree: event.target.value});
    }

    handleFour(event){
        this.setState({countFour: event.target.value});
    }

    handleAverage(event){
        const newAvg = Number(parseInt(this.state.countOne) + parseInt(this.state.countTwo) + parseInt(this.state.countThree) + parseInt(this.state.countFour))/4;
        const newVolume = Number.parseFloat(newAvg * this.state.dilFac * 10000).toExponential(2);
        this.setState({avgCount: newAvg,
        cellVolume: newVolume});
        event.preventDefault();
    }

    handleVolume(event){
        event.preventDefault();
    }

    handleTitleSave(event){
        event.preventDefault();
    }


    render(){
        let rows = [];
        for (let i = 0; i < 7; i++){
            const rowID = "row-"+i;
            let cells = [];
            for (let j = 0; j < 2; j++){
                const cellID = "cell-"+i+"-"+j;
                switch(j){
                    case 0:
                        switch(i){
                            case 0:
                                cells.push(<td key={cellID}>Dilution Factor</td>);
                                break;
                            case 1:
                                cells.push(<td key={cellID}>Count 1</td>)
                                break;
                            case 2:
                                cells.push(<td key={cellID}>Count 2</td>)
                                break;
                            case 3:
                                cells.push(<td key={cellID}>Count 3</td>)
                                break;
                            case 4:
                                cells.push(<td key={cellID}>Count 4</td>)
                                break;
                            case 5:
                                cells.push(<td key={cellID}>Average</td>)
                                break;
                            case 6:
                                cells.push(<td key={cellID}>Cell/mL</td>)
                                break;
                        }
                        break;
                    case 1:
                        switch(i){
                            case 0:
                                cells.push(<td key={cellID}>
                                    <form onSubmit={this.handleAverage  }>
                                        <input type="number" placeholder="0" min="0" value={this.state.dilFac} onChange={this.handleDilution}
                                        />
                                    </form>
                                </td>);
                                break;
                            case 1:
                                cells.push(<td key={cellID}>
                                    <form onSubmit={this.handleAverage}>
                                        <input type="number" placeholder="0" min="0" value={this.state.countOne} onChange={this.handleOne}
                                        />
                                    </form>
                                </td>);
                                break;
                            case 2:
                                cells.push(<td key={cellID}>
                                    <form onSubmit={this.handleAverage}>
                                        <input type="number" placeholder="0" min="0" value={this.state.countTwo} onChange = {this.handleTwo}
                                        />
                                    </form>
                                </td>);
                                break;
                            case 3:
                                cells.push(<td key={cellID}>
                                    <form onSubmit={this.handleAverage}>
                                        <input type="number" placeholder="0" min="0" value={this.state.countThree} onChange = {this.handleThree}
                                        />
                                    </form>
                                </td>);
                                break;
                            case 4:
                                cells.push(<td key={cellID}>
                                    <form onSubmit={this.handleAverage}>
                                        <input type="number" placeholder="0" min="0" value={this.state.countFour} onChange={this.handleFour}
                                        />
                                    </form>
                                </td>);
                                break;
                            case 5:
                                cells.push(<td key={cellID}>{this.state.avgCount}</td>);
                                break;
                            case 6:
                                cells.push(<td key={cellID}>{this.state.cellVolume}</td>)
                        }
                }
            }
            rows.push(<tr key={rowID}>{cells}</tr>);
        }

        const title = "Blank Table " + (this.props.tableID +1);
        let newTable = <div className="tableContainer">
            <div className="table"><table key = {this.props.tableID}>
            <thead>
                <tr>
                    <td colSpan="2">
                        <form onSubmit={this.handleTitleSave}>
                            <input type="text" placeholder={title} value = {this.state.tableTitle}  onChange = {this.handleTitleChange} />    
                        </form></td>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
        </div>
        </div>;

        return newTable;
    }
}


ReactDOM.render(
    <FormSubmit />, document.getElementById("cell-count")
);
