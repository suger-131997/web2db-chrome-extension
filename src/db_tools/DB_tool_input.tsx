import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { number } from 'prop-types';
import common from '@material-ui/core/colors/common';

interface DB_tool_input_prop{
    header_data: string[];
    pushDatum: (datum:{[key: string]: string;}) => void;
    textValues: {[key: string]: string;};
    textForcus: string;
    chengeForcus: (target:string) => void;
    setText: (nextTextValues:{[key: string]: string;}) => void;
}

interface DB_tool_input_state{
}

class DB_tool_input extends React.Component<DB_tool_input_prop, DB_tool_input_state> {
    private textInputs: {[key: string]: HTMLInputElement;};

    constructor(props:DB_tool_input_prop) {
        super(props);
        this.changeText = this.changeText.bind(this)
        this.onClickDBInputBtn = this.onClickDBInputBtn.bind(this)
        this.refocus = this.refocus.bind(this)
        this.setFocus = this.setFocus.bind(this)
        this.nextFocus = this.nextFocus.bind(this)
        this.keyPressAction = this.keyPressAction.bind(this)
        this.textInputs = {};
    }

    componentDidMount() {
        const elem = this.textInputs[this.props.textForcus];
        if(elem){
            setTimeout(function(){
                elem.focus();
            },0);
        }
    }

    render(){
        return (
            <Box component="div" width="100%" height="100%" overflow="auto" bgcolor="background.paper">
                <Table className='table'>
                    <TableHead>
                    <TableRow>
                        <TableCell style={{
                            backgroundColor: common.black,
                            color: common.white
                        }}>
                            {this.props.header_data[0]}
                        </TableCell>
                        {this.props.header_data.slice(1, this.props.header_data.length).map(colume => (
                            <TableCell align="right" 
                                style={{
                                backgroundColor: common.black,
                                color: common.white
                            }}>{colume}</TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={"TextField"}>
                            {this.props.header_data.map(colume => (
                                <TableCell align="right">
                                    <TextField  inputRef={(input: HTMLInputElement) => { this.textInputs[colume] = input } } 
                                    id={colume} type="text" value={this.props.textValues[colume]} 
                                        onChange={this.changeText} 
                                        onBlur={() => {
                                            this.refocus()
                                        }}
                                        onClick={
                                            this.setFocus
                                        }
                                        onKeyDown={(e:any) => this.keyPressAction(e)}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
                <div  className='input_btn'>
                        <Button variant="contained" color="secondary" onClick={this.onClickDBInputBtn}>登録</Button>
                </div>
            </Box>
        );
    }

    private setFocus(e:any){
        this.props.chengeForcus(e.target.id)
        const elem = this.textInputs[e.target.id];
        setTimeout(function(){
            elem.focus();
        },0);
    }

    private keyPressAction(e:any){
        // console.log(e.key)
        if (e.key === 'c' && e.ctrlKey) {         
            this.props.setText({"":"true"})
        }else if (e.key === 'z' && e.ctrlKey) {
            this.onClickDBInputBtn()
        }else if (e.key === 'Tab' || (e.key === 'x' && e.ctrlKey)) {
            this.nextFocus()
        }
    }

    private nextFocus(){
        var next = 0;
        for(var i = 0; i < this.props.header_data.length; i++){
            if (this.props.header_data[i] === this.props.textForcus){
                next = i + 1;
            }
        }
        if(next === this.props.header_data.length){
            next = 0;
        }
        this.props.chengeForcus(this.props.header_data[next])
        const elem = this.textInputs[this.props.header_data[next]];
        setTimeout(function(){
            elem.focus();
        },0);
    }

    private refocus(){
        // console.log(this.props.textForcus)
        const elem = this.textInputs[this.props.textForcus];
        setTimeout(function(){
            elem.focus();
        },0);
    }

    private onClickDBInputBtn(){
        this.props.pushDatum(JSON.parse(JSON.stringify(this.props.textValues)))
        var textValues:{[key: string]: string;} = this.props.textValues;
        for(var i=0; i < this.props.header_data.length; i++){
            textValues[this.props.header_data[i]] = ""
        }
        this.props.setText(textValues);
    }
    private changeText(e:any) {
        var textValues = this.props.textValues;
        textValues[e.target.id] = e.target.value
        this.props.setText(textValues);
    }
}

export default DB_tool_input;