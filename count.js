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
    }

    render(){
        let tableStatement = [];
        tableStatement.push(<p>Please fill the following tables with the name, raw cell counts, and dilution factor:</p>)
        for (let i = 1; i <= this.props.amount; i++ ){
            const tableID = "table-" + i;
            const tableHeader = "header-" + i;
            const rowHeader = "rowHeader-" + i;
            const tableTitle = "title-" + i;
            const tableBody = "body-" + i;
            const oneCount = "count-1-" + i;
            const twoCount = "count-2-" + i;
            const threeCount = "count-3-" + i;
            const fourCount = "count-4-" + i;

            tableStatement.push(
                <h1 key={tableID}>yuh</h1>
            );
        }
        return tableStatement;
    }
}


ReactDOM.render(
    <FormSubmit />, document.getElementById("cell-count")
);

// Testing if the rebase and working from the Mac works