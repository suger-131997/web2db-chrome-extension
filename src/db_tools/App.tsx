import * as React from 'react';
import DB_tool_header from './DB_tool_header'
import DB_tool_appbar from './DB_tool_appbar'

interface IDBAppProps {
  header_data:string[];
  init_rows:{[key: string]: string;}[];
  addFunction:(row:{[key: string]: string;}) => void; 
  setHeaderFunction:(header_data:string[]) => void; 
}
interface IDBAppState {
  textValues: {[key: string]: string;};
  textForcus: string | null; 
  header_data:string[];
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
    var textForcus:string|null = null;
    if(props.header_data.length != 0){
      textForcus = props.header_data[0]
    }

    this.state = {
      textValues:textValues,
      textForcus:textForcus,
      header_data:props.header_data,
      rows:this.props.init_rows,
      open: false,
      anchorEl: null,
      page:"index"
    };
    this.chengeForcus = this.chengeForcus.bind(this);
    this.setText = this.setText.bind(this);
    this.pushDatum = this.pushDatum.bind(this);
    this.createCSV = this.createCSV.bind(this);
    this.keyPressAction = this.keyPressAction.bind(this);
    this.copyText = this.copyText.bind(this)
    this.handleDownload = this.handleDownload.bind(this);
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
    this.props.addFunction(datum);
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

  
  private setText(nextTextValues: {[key: string]: string;}) {
    this.setState({textValues: nextTextValues});
  }

  private copyText(){
    var textValues = this.state.textValues;
    var sel = document.getSelection().toString();
    if (sel != null){
      if(typeof textValues[this.state.textForcus] === 'undefined'){
        textValues[this.state.textForcus] = sel;
      }else{
        textValues[this.state.textForcus] = textValues[this.state.textForcus] + sel;
      }
      this.setState({textValues: textValues});
    }
  }
  
  private keyPressAction(e:any){
    // console.log(e.key)
    if (e.key === 'c' && e.ctrlKey) {         
        this.copyText();
    }else if (e.key === 'z' && e.ctrlKey) {
        this.pushDatum(JSON.parse(JSON.stringify(this.state.textValues)))
        var textValues:{[key: string]: string;} = this.state.textValues;
        for(var i=0; i < this.state.header_data.length; i++){
            textValues[this.state.header_data[i]] = ""
        }
        this.setText(textValues);
    }else if (e.key === 'Tab' || (e.key === 'x' && e.ctrlKey)) {
      var next = 0;
        for(var i = 0; i < this.state.header_data.length; i++){
            if (this.state.header_data[i] === this.state.textForcus){
                next = i + 1;
            }
        }
        if(next === this.state.header_data.length){
            next = 0;
        }
        this.chengeForcus(this.state.header_data[next])
    }
  }


  componentDidMount() {
      document.addEventListener('keydown', this.keyPressAction);
  }

  setHeader(str:string) {
    var pattern = /^([^,]+,)*[^,]+$/;
    // console.log(str)
    // console.log(pattern.test(str))
    if(!pattern.test(str)){
      return [];
    }
    // console.log("---------")
    // console.log(str)
    var header_data = str.split(',')
    // console.log(header_data)
    for(var i = 0; i < header_data.length; i++){
      for(var j= i+1; j < header_data.length; j++){
          if(header_data[i] === header_data[j]){
              return [];
          }
      }
    }

    // console.log(header_data)

    this.props.setHeaderFunction(header_data)

    this.setState({
      textForcus:header_data[0],
      header_data:header_data
    });
    // console.log(this.state.header_data)

    return header_data
  }

  render(){
    var _header_data = this.state.header_data
    while (_header_data.length == 0) {
        var str = window.prompt('カラム名を入力してください\n例) 名前,攻撃力,防御力');
        // console.log(str)
        if(str != null){
          _header_data = this.setHeader(str);
        }
    }
    
    return (
      <div>
        <DB_tool_appbar handleDownload={this.handleDownload}/>
        <DB_tool_header 
                  header_data={_header_data} 
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
          content +=  "\"" + this.state.rows[j][this.state.header_data[i]] + '\",';
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
