import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Rnd } from 'react-rnd';
import Box from '@material-ui/core/Box';
import common from '@material-ui/core/colors/common';


interface DB_tool_table_prop{
    header_data: string[];
    data: {[key: string]: string;}[];
}

class DB_tool_table extends React.Component<DB_tool_table_prop> {
  rnd: Rnd;

  componentDidMount(){
    this.rnd.updatePosition({x: 10, y: 70})
  }

  render(){
    const style: { [key: string]: string } = {
      position: "fixed",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "solid 1px #ddd",
      background: "#f0f0f0",
      zIndex: "2147483647"
    };
    return (
        <Rnd
          style={style} 
          ref={(rnd: Rnd) => { this.rnd = rnd} }
          default={{
              x: 0,
              y: 0,
              width: "800px",
              height: "200px",
            }} 
          >
          <Box component="div" width="100%" height="100%" overflow="auto" bgcolor="background.paper">
            <Table style={{tableLayout: "fixed"}}>
              <TableHead>
                <TableRow>
                  <TableCell style={{
                    backgroundColor: common.black,
                    color: common.white,
                    position: "sticky",
                    top: 0
                  }} >
                      {this.props.header_data[0]}
                  </TableCell>
                  {this.props.header_data.slice(1, this.props.header_data.length).map(colume => (
                      <TableCell align="right" style={{
                        backgroundColor: common.black,
                        color: common.white,
                        position: "sticky",
                        top: 0
                      }} >{colume}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.data.map(row => (
                  <TableRow key={row[this.props.header_data[0]]}>
                      <TableCell component="th" scope="row">
                          {row[this.props.header_data[0]]}
                      </TableCell>
                      {this.props.header_data.slice(1, this.props.header_data.length).map(colume => (
                          <TableCell align="right">{row[colume]}</TableCell>
                      ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Rnd>
      );
  }
}

export default DB_tool_table;