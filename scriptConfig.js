
//定义要编译的项目，compile， true 表示编译，false，不编译
var projects = [ //项目数组，放的是每一个要编译的项目，
  
  {
    id: 1, compile: true, name: "alipay", main: "./main.js",
    others: ["./main.js"]
  }

]

var config = {
  watch: "rerun", //watch模式的时候，是自动deploy（部署）、或 rerun（重新运行）、还是none（不操作），
  baseDir: "./work", //放置多个项目的工作目录，每一个项目独立文件夹，
  base64: false,
  projectPrefix: "", //项目编译后，项目目录的前缀，如配置为b_ 则demo项目编译后名称为b_demo ，当希望项目的源码和编译和的代码都保存在手中，就有必要配置这个
  advancedEngines: true,
  header: "header.txt",  //这个文件中放了你可以放一些声明、说明等注释内容
  base64RandomStrLength: 100,
  target: "node", // web || node
  projects: projects,
};

module.exports = config;
