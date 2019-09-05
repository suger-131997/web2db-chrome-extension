import * as React from 'react';
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

interface IDBAppbarProps extends WithStyles<typeof styles> {
  handleDownload: () => void;
}
interface IDBAppbarState {
  anchorEl: Element | ((element: Element) => Element) | null | undefined;
  open: boolean;
}


const styles = (theme:Theme) => ({
  toolbar: theme.mixins.toolbar,
  appbar_root: {
    flexGrow: 1
  },
  appbar_menuButton: {
    marginRight: theme.spacing(2),
  },
  appbar_title: {
    flexGrow: 1
  },
})

class DB_tool_appbar extends React.Component<IDBAppbarProps, IDBAppbarState>{

  constructor(props:IDBAppbarProps) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null
    };
    this.alertUse = this.alertUse.bind(this);
  }

  handleClick = (event:any) => { // 引数追加
    this.setState({ open: true, anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ open: false, anchorEl: null }); // 追加
  };

  alertUse = () => {
    this.setState({ open: false, anchorEl: null }); // 追加
    alert ( "Ctrl+c : データ追加\nTab or Ctrl+x : 次のカラムへ\nCtrl+v : テーブル挿入" );
  };


  render(){
    const classes = this.props.classes;
    var menuItems:string[] = ["使い方表示"];
    var menufuncs:Array<() => void> = [this.alertUse];
    //<div className={classes.toolbar} />  {/* #1 */}
    return (
        <div className={classes.appbar_root}>
          <CssBaseline />
          <AppBar position="sticky">
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
            <Typography variant="h6" className={classes.appbar_title} color="inherit" style={{backgroundColor: "#D3D3D300", color: 'white'}} >
              Web2DB
            </Typography>
            <a id="download" href="#" download="data.csv">
              <IconButton onClick={this.props.handleDownload} aria-label="Delete">
                <ArrowDownwardIcon fontSize="large"/>
              </IconButton>
            </a>
            </Toolbar>
          </AppBar>
        </div>
    );
  }
}

export default withStyles(styles)(DB_tool_appbar);
