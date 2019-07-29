import * as React from 'react';
import DB_tool_header from './DB_tool_header'
import { CssBaseline } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

interface IDBAppProps extends WithStyles<typeof styles> {
  header_data:string[];
  url:string; 
}
interface IDBAppState {
  textValues: {[key: string]: string;};
  textForcus: string; 
  header_data:string[];
  url:string; 
  rows: {[key: string]: string;}[];
  anchorEl: Element | ((element: Element) => Element) | null | undefined;
  open: boolean,
  page:string
}


const styles = (theme:Theme) => ({
  toolbar: theme.mixins.toolbar,
  appbar_root: {
    flexGrow: 1,
  },
  appbar_menuButton: {
    marginRight: theme.spacing(2),
  },
  appbar_title: {
    flexGrow: 1,
  },
})

class App extends React.Component<IDBAppProps, IDBAppState>{

  constructor(props:IDBAppProps) {
    super(props);
    var textValues:{[key: string]: string;} = {};
    for(var i=0; i < props.header_data.length; i++){
        textValues[props.header_data[i]] = ""
    }
    this.state = {
      textValues:textValues,
      textForcus:this.props.header_data[0],
      header_data:props.header_data,
      url:props.url,
      rows:[],
      open: false,
      anchorEl: null,
      page:"index"
    };
    this.chengeForcus = this.chengeForcus.bind(this);
    this.setText = this.setText.bind(this);
    this.pushDatum = this.pushDatum.bind(this);
    this.createCSV = this.createCSV.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.moveMain = this.moveMain.bind(this);
    this.removeMain = this.removeMain.bind(this);
    this.moveUrlChange = this.moveUrlChange.bind(this);
    this.removeOnlyMain = this.removeOnlyMain.bind(this);
    this.alertUse = this.alertUse.bind(this);
  }

  chengeForcus(target:string){
    this.setState({
      textForcus: target
    });
  }

  pushDatum(datum:{[key: string]: string;}){
    const rows = this.state.rows;
    rows.push(datum);
    this.setState({
      rows:rows
    });
  }

  handleClick = (event:any) => { // 引数追加
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ open: false, anchorEl: null }); // 追加
    this.alertUse()
  };

  alertUse(){
    alert ( "Ctrl+c : データ追加\nTab or Ctrl+x : 次のカラムへ\nCtrl+v : テーブル挿入" );
  }

  moveUrlChange = () => {
    this.setState({ open: false, anchorEl: null, page:"urlChange" }); // 追加
  };

  moveMain(head:string, url:string){
    var ary = head.split(',');
    var textValues:{[key: string]: string;} = {};
    for(var i=0; i < ary.length; i++){
        textValues[ary[i]] = ""
    }
    this.setState({
      textValues:textValues,
      textForcus:ary[0],
      header_data:ary,
      url:url,
      rows:[],
      page:"main"
    })
    alert ( "Ctrl+c : データ追加\nTab or Ctrl+x : 次のカラムへ\nCtrl+v : テーブル挿入" );
  }

  removeMain(url:string){
    var textValues:{[key: string]: string;} = {};
    for(var i=0; i < this.state.header_data.length; i++){
        textValues[this.state.header_data[i]] = ""
    }
    this.setState({
      textValues:textValues,
      textForcus:this.state.header_data[0],
      url:url,
      page:"main"
    })
  }

  removeOnlyMain(){
    this.setState({
      page:"main"
    })
  }

  private setText(nextTextValues: {[key: string]: string;}) {
    if(nextTextValues[""]){
      // if(this.db_iframe){
      //   var textValues = this.state.textValues;
      //   var sel = this.db_iframe.selectText();
      //   if (sel != null){
      //     textValues[this.state.textForcus] =  textValues[this.state.textForcus] + sel;
      //     this.setState({textValues: textValues});
      //   }
      // }
      return;
    }
    this.setState({textValues: nextTextValues});
  }

  render(){
    const classes = this.props.classes;
    var menuItems:string[] = ["使い方表示"];
    var menufuncs:Array<() => void> = [this.handleClose];
    var partial = <div/>;
    menuItems = ["使い方表示","URL変更"];
    menufuncs = [this.handleClose,this.moveUrlChange]
    partial = <div>
                <DB_tool_header 
                  header_data={this.state.header_data} 
                  textValues={this.state.textValues} 
                  textForcus={this.state.textForcus} 
                  chengeForcus={this.chengeForcus}
                  setText={this.setText}
                  rows={this.state.rows}
                  pushDatum={this.pushDatum}
                  />
              </div>;
    return (
      <div>
        <div className={classes.appbar_root}>
          <CssBaseline />
          {/* <Login /> は削除 */}
          {/* <Navbar /> は削除 */}
          <AppBar>
            <Toolbar>
            <IconButton edge="start" className={classes.appbar_menuButton} color="inherit" aria-label="Menu" onClick={this.handleClick}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu"
              open={Boolean(this.state.anchorEl)} // 追加
              anchorEl={this.state.anchorEl} // 追加
              onClose={this.handleClose}
        >
              {menuItems.map((item, index) => (
                <MenuItem key={item} onClick={menufuncs[index]}>
                  {item}
                </MenuItem>
              ))}
            </Menu>
            <Typography variant="h6" className={classes.appbar_title}>
              Web2DB
            </Typography>
            <a id="download" href="#" download="data.csv">
              <IconButton onClick={this.handleDownload} aria-label="Delete">
                <ArrowDownwardIcon fontSize="large"/>
              </IconButton>
            </a>
            </Toolbar>
          </AppBar>
          <div className={classes.toolbar} />  {/* #1 */}
        </div>
        {partial}
      </div>
    );
  }
  private createCSV(){
    var content = "";
    // console.log(this.state.header_data)
    // console.log(this.state.rows)
    for(var i = 0; i < this.state.header_data.length; i++){
      content +=  this.state.header_data[i] + ',';
    }
    content += "\n"
    for(var j = 0; j < this.state.rows.length; j++){
      for(var i = 0; i < this.state.header_data.length; i++){
        if(this.state.rows[j][this.state.header_data[i]]){
          content +=  this.state.rows[j][this.state.header_data[i]] + ',';
        }
      }
      content += "\n"
    }
    return content;
  }

  private handleDownload() {
    var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    var content:string = this.createCSV();
    var blob = new Blob([ bom, content ], { "type" : "text/plain" });

    if (window.navigator.msSaveBlob) { 
        window.navigator.msSaveBlob(blob, "data.csv"); 

        // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
        window.navigator.msSaveOrOpenBlob(blob, "data.csv"); 
    } else {
      var a = document.getElementById("download") as HTMLAnchorElement
      if(a){
        a.href = window.URL.createObjectURL(blob);
      }
    }
  }
}

export default withStyles(styles)(App);
