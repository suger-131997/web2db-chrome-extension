import * as React from 'react';
import DB_tool_header from './DB_tool_header'
import DB_tool_appbar from './DB_tool_appbar'

interface IDBAppProps {
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
    return (
      <div>
        <DB_tool_appbar handleDownload={this.handleDownload}/>
        <DB_tool_header 
                  header_data={this.state.header_data} 
                  textValues={this.state.textValues} 
                  textForcus={this.state.textForcus} 
                  chengeForcus={this.chengeForcus}
                  setText={this.setText}
                  rows={this.state.rows}
                  pushDatum={this.pushDatum}
                  />
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

export default App;
