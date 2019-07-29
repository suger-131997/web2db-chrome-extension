import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import DB_tool_table from './DB_tool_table'
import DB_tool_input from './DB_tool_input'
import Box from '@material-ui/core/Box';
import { Rnd } from 'react-rnd';

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
    //const header_data:string[] =['Dessert (100g serving)', 'Calories','Fat(g)','Carbs(g)','Protein(g)']
    // const rows = [
    //   this.createData(header_data, ['Frozen yoghurt', '159', '6.0', '24', '4.0']),
    //   this.createData(header_data, ['Ice cream sandwich', '237', '9.0', '37', '4.3']),
    //   this.createData(header_data, ['Eclair', '262', '16.0', '24', '6.0']),
    //   this.createData(header_data, ['Cupcake', '305', '3.7', '67', '4.3']),
    //   this.createData(header_data, ['Gingerbread', '356', '16.0', '49', '3.9']),
    // ];
    return (
        // <Box flexDirection="row" className="db_header">
        //     <Grid container justify="center">
        //       <Grid item> 
        //         <DB_tool_table header_data={this.state.header_data} data={this.state.rows}/>
        //       </Grid>
        //       <Grid item>
        //         <DB_tool_input header_data={this.state.header_data} pushDatum={this.pushDatum}/>  
        //       </Grid>
        //     </Grid>
        // </Box>
        <div>
          <DB_tool_table header_data={this.props.header_data} data={this.props.rows}/>
          <Rnd default={{
            x: 0,
            y: 200,
            width: 800,
            height: 150,
          }}
        >
          <DB_tool_input 
            header_data={this.props.header_data} 
            pushDatum={this.props.pushDatum} 
            textValues={this.props.textValues} 
            textForcus={this.props.textForcus} 
            chengeForcus={this.props.chengeForcus}
            setText={this.props.setText}
            /> 
        </Rnd>
      </div>
    );
  }

  private createData(header_data:string[], data:string[]) {
    var datum:{ [key: string]: string; } = {};
    for (var i:number = 0; i < header_data.length; i++) {
      datum[header_data[i]]=data[i];
    }
    return datum;
  }
}

export default DB_tool_header;