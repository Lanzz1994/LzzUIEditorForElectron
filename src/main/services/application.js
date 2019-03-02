import { create, getPath } from './window';
import fs from 'fs';

export function init() {
  const win = create({ width: 1090, height: 720 });
  win.loadURL(getPath());

  // fs.rmdir("D:/Program/MyProgram/Github/LzzUIEditorForElectron/projects/ProjectTemplate",function(err,files){
  //   console.log(err,files);
  // });
  readDirSync('D:/Program/MyProgram/Github/LzzUIEditorForElectron/projects/ProjectTemplate');

}


function readDirSync(path){
	var pa = fs.readdirSync(path);
	pa.forEach(function(ele,index){
		var info = fs.statSync(path+"/"+ele)	
		if(info.isDirectory()){
			console.log("dir: "+ele)
			readDirSync(path+"/"+ele);
		}else{
			console.log("file: "+ele)
		}
  })
}