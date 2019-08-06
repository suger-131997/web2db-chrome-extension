import * as React from 'react';
import DB_tool_table from './DB_tool_table'
import DB_tool_input from './DB_tool_input'

interface IDBToolHeaderProps {
  header_data:string[];
  textValues: {[key: string]: string;};
  textForcus: string;
  chengeForcus: (target:string) => void;
  setText: (nextTextValues:{[key: string]: string;}) => void;
  rows: {[key: string]: string;}[];
  pushDatum: (datum:{[key: string]: string;}) => void;
}
interface IDBToolHeaderState {
}

class DB_tool_header extends React.Component<IDBToolHeaderProps, IDBToolHeaderState>{

  constructor(props:IDBToolHeaderProps) {
    super(props);
  }


  render(){
    const style: { [key: string]: string } = {
      position: "fixed"
    };
    return (
      <div>
        <DB_tool_table header_data={this.props.header_data} data={this.props.rows}/>
        <DB_tool_input 
          header_data={this.props.header_data} 
          pushDatum={this.props.pushDatum} 
          textValues={this.props.textValues} 
          textForcus={this.props.textForcus} 
          chengeForcus={this.props.chengeForcus}
          setText={this.props.setText}
          /> 
      </div>
    );
  }
}

export default DB_tool_header;