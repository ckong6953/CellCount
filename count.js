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
        tables.push(<p className="input-instructions" key="instructions">Please fill out the sample name as well as the respective dilution factor and observed raw cell counts in the fields below. These are utilized to calculate the average counts as well as the amount of cells found per volume in milliliters. At this time, clicking any "submit" button will <strong><u>PERMANENTLY FIX</u></strong> values; therefore, if you need to make changes make a new table, or reset the page. Once finished, please click the "Submit Table" button:</p>)
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
              <input type="number" placeholder={this.state.value} min="1" onChange={this.handleChange} />
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
            canSubmit: true,
            isDone: false,
        }

        this.handleDilution = this.handleDilution.bind(this);
        this.handleOne = this.handleOne.bind(this);
        this.handleTwo = this.handleTwo.bind(this);
        this.handleThree = this.handleThree.bind(this);
        this.handleFour = this.handleFour.bind(this);
        this.handleAverage = this.handleAverage.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleTitleChange(event){
        this.setState({tableTitle: event.target.value});
    }

    handleDilution(event){
        this.setState({dilFac: event.target.value}, () => {this.handleAverage(event);});
    }

    handleOne(event){
        this.setState({countOne: event.target.value}, () => {this.handleAverage(event);});
        event.preventDefault();
    }

    handleTwo(event){

        this.setState({countTwo: event.target.value}, () => {this.handleAverage(event);});
        event.preventDefault();
    }

    handleThree(event){

        this.setState({countThree: event.target.value}, () => {this.handleAverage(event);});
        event.preventDefault();
    }

    handleFour(event){
        this.setState({countFour: event.target.value}, () => {this.handleAverage(event);});
        event.preventDefault();
    }

    handleAverage(event){
        const newAvg = Number(parseInt(this.state.countOne) + parseInt(this.state.countTwo) + parseInt(this.state.countThree) + parseInt(this.state.countFour))/4;
        const newVolume = parseFloat(newAvg * this.state.dilFac * 10000);
        this.setState(
            {avgCount: newAvg,
            cellVolume: newVolume,
            canSubmit: false,});
        event.preventDefault();
    }

    handleClick(event){
        this.setState({
            isDone: true,
            canSubmit: true,
        });
        const index = "desire-" + this.props.tableID;
        let countData = {
            dataTitle: this.state.tableTitle,
            rawVolume: this.state.cellVolume,
            indexNum: this.props.tableID,
        }
        ReactDOM.render(<CreateCount data={countData}/>,document.getElementById(index));
        event.preventDefault();
    }

    render(){
        let rows = [];
        for (let i = 0; i < 8; i++){
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
                            case 7:
                                cells.push(<td key={cellID} onClick = {this.handleClick} colSpan="2"><button type="button" disabled={this.state.canSubmit}>Submit Table</button></td>)
                        }
                        break;
                    case 1:
                        switch(i){
                            case 0:
                                cells.push(<td key={cellID}>
                                        <input type="number" placeholder={this.state.dilFac} disabled={this.state.isDone} min="0" onChange={this.handleDilution}
                                        />
                                </td>);
                                break;
                            case 1:
                                cells.push(<td key={cellID}>
                                        <input type="number" placeholder={this.state.countOne} min="0"  disabled={this.state.isDone} onChange={this.handleOne}
                                        />
                                </td>);
                                break;
                            case 2:
                                cells.push(<td key={cellID}>
                                        <input type="number" placeholder={this.state.countTwo} disabled={this.state.isDone} min="0" onChange = {this.handleTwo}
                                        />
                                </td>);
                                break;
                            case 3:
                                cells.push(<td key={cellID}>
                                        <input type="number" placeholder={this.state.countThree} disabled={this.state.isDone} min="0" onChange = {this.handleThree}
                                        />
                                </td>);
                                break;
                            case 4:
                                cells.push(<td key={cellID}>
                                        <input type="number" placeholder={this.state.countFour} disabled={this.state.isDone} min="0" onChange={this.handleFour}
                                        />
                                </td>);
                                break;
                            case 5:
                                cells.push(<td key={cellID}>{this.state.avgCount}</td>);
                                break;
                            case 6:
                                cells.push(<td key={cellID}>{this.state.cellVolume.toExponential(2)}</td>)
                        }
                }
            }
            rows.push(<tr key={rowID}>{cells}</tr>);
        }

        const title = "Blank Table " + (this.props.tableID +1);
        const tableIndex = "desire-" + this.props.tableID;
        const holdResults = "results-"+ this.props.tableID;
        let newTable = <div className="tableContainer">
            <div className="dataTable"><table className="inputTable"key = {this.props.tableID}>
            <thead>
                <tr>
                    <td colSpan="2">
                            <input type="text" className="tableTitle" placeholder={title} value = {this.state.tableTitle} disabled={this.state.isDone} onChange = {this.handleTitleChange} />    
                        </td>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
        <div className="results-container">
            <div id={tableIndex}>
            </div>
            <div id={holdResults}>

            </div>
        </div>   
        </div>
        </div>;

        return newTable;
    }
}


class CreateCount extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            title: props.data.dataTitle,
            cellVolume: props.data.rawVolume,
            desiredAmt: Number.parseFloat(0).toExponential(2), 
            resultsID: props.data.indexNum,
            isDone: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleDesire = this.handleDesire.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (nextProps.data.rawVolume !== prevState.cellVolume){
            return {cellVolume: nextProps.data.rawVolume}
        }
        else return null;
    }

    handleChange(event){
        this.setState({
            desiredAmt: event.target.value,
        });
    }


    handleDesire(event){
        this.setState({
            isDone: true,
        })
        let calculateData = {
            title: this.state.title,
            cellVolume: this.state.cellVolume,
            desiredAmt: this.state.desiredAmt,
            resultsID: this.state.resultsID,
        }
        const resultsTag = "results-" + this.state.resultsID
        ReactDOM.render(<CreateResults data={calculateData}/>, document.getElementById(resultsTag));
        event.preventDefault();
    }

    render(){
        return (
            <form onSubmit={this.handleDesire}>
              <label>
                Please enter the desired hmt for this sample:
                <input type="number" placeholder={this.state.desiredAmt} disabled={this.state.isDone} min="1" onChange={this.handleChange} />
              </label>
              <input type="submit" disabled={this.state.isDone} value="Submit" />
            </form>
          );
    }
}

class CreateResults extends React.Component {
    constructor (props){
        super(props);
        let totalCalc = (parseFloat(props.data.cellVolume)* 400)/parseFloat(props.data.desiredAmt);
        let addCalc = totalCalc - 400;
        this.state = {
            desiredAmt: props.data.desiredAmt,
            cellVolume: props.data.cellVolume,
            stockAmt: 400,
            totalAmt: totalCalc.toFixed(2),
            addAmt: addCalc.toFixed(2),
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        let totalCalc = (parseFloat(event.target.value)* parseFloat(this.state.cellVolume))/parseFloat(this.state.desiredAmt);
        let addCalc = totalCalc - parseFloat(event.target.value);
        this.setState(
            {stockAmt: event.target.value,
            totalAmt: totalCalc.toFixed(2),
            addAmt: addCalc.toFixed(2)});
    }

    render(){
        const tableHeader = "head-results-" + this.props.resultsID;
        const headerCol = "head-column-" + this.props.resultsID;
        const headerRow = "head-row-" + this.props.resultsID;
        const tableBody = "body-results-" + this.props.resultsID;
        const bodyTitle = "body-title-" + this.props.resultsID;
        const stockTitle = "stock-title-" + this.props.resultsID;
        const totalTitle = "total-title-" + this.props.resultsID;
        const addTitle = "add-title-" + this.props.resultsID;
        const bodyResults = "body-results-" + this.props.resultsID;
        const stockResults = "stock-results-" +this.props.resultsID;
        const totalResults = "total-results-" + this.props.resultsID;
        const addResults = "add-results-" + this.props.resultsID;

        return <table  className="results-table" key = {this.props.data.title}>
            <thead key ={tableHeader}>
                <tr key={headerCol}>
                    <td key={headerRow} colSpan="3">
                        Measurements for: {this.props.data.title}
                    </td>
                </tr>
            </thead>
            <tbody key={tableBody}>
                <tr key={bodyTitle}>
                    <td key={stockTitle}>
                        Stock Amount
                    </td>
                    <td key={totalTitle}>
                        Total Amount
                    </td>
                    <td key={addTitle}>
                        Amount of L-15 to be Added
                    </td>
                </tr>
                <tr key={bodyResults}>
                    <td key={stockResults}>
                        <input type="number" value={this.state.stockAmt} min="1" onChange={this.handleChange} />
                    </td>
                    <td key={totalResults}>
                        {this.state.totalAmt}
                    </td>
                    <td key={addResults}>
                        {this.state.addAmt}
                    </td>
                </tr>
            </tbody>
        </table>;
    }
}

ReactDOM.render(
    <FormSubmit />, document.getElementById("cell-count")
);
