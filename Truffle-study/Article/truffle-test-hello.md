>本篇文章只是简单的介绍和在Truffle框架使用js进行测试合约，适合小白，目前只是提供个Demo示例，具体的可以根据不同的项目场景来进行变更，不足之处，请指出，这边做些调整。

###一：简介
####1.1 Truffle简介
使用以太坊虚拟机（EVM）的区块链的世界级开发环境，测试框架和资产管道，旨在使开发人员的生活更轻松。有了Truffle，你会得到：

*   内置智能合约编译，链接，部署和二进制管理。
*   快速开发的自动合同测试。
*   可编写脚本的可扩展部署和迁移框架。
*   用于部署到任意数量的公共和专用网络的网络管理。
*   使用[ERC190](https://github.com/ethereum/EIPs/issues/190)标准，使用EthPM和NPM进行包装管理。
*   交互式控制台，用于直接合同通
*   可配置的构建管道，支持紧密集成。
*   在Truffle环境中执行脚本的外部脚本运行器。
`Truffle是针对基于以太坊的Solidity语言的一套开发框架。本身基于Javascript。`
####1.2 Mocha简介
Mocha是一个在[Node.js](https://nodejs.org/)和浏览器上运行的功能丰富的JavaScript测试框架，使异步测试*变得简单*而*有趣*。Mocha测试以串行方式运行，允许灵活准确的报告，同时将未捕获的异常映射到正确的测试用例。在[GitHub](https://github.com/mochajs/mocha)上[托管](https://github.com/mochajs/mocha)。
###二:测试
####2.1创建文件夹，进入该文件夹下，初始化Truffle
![image.png](https://upload-images.jianshu.io/upload_images/14624293-29d18158e450390f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
若是没有安装Truffle环境的，请先安装Truffle
安装命令:`npm install -g truffle`
我本人是在`Ubuntu`环境下进行测试的.
####2.2编译合约
在编译合约之前，先放入合约文件
````
pragma solidity ^0.5.0;

contract Ches
{
    string greeting;
    
    constructor (string memory _greeting) public 
    {
        greeting = _greeting;
    } 

    function greets () public view  returns (string memory){
        return greeting;
    }
    function setGreeting (string memory  _newgreeting) public 
    {
        greeting = _newgreeting;
    }
}
````
![image.png](https://upload-images.jianshu.io/upload_images/14624293-8f59759eeac4fc12.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
执行编译操作
编译命令:truffle compile
执行结果
![image.png](https://upload-images.jianshu.io/upload_images/14624293-01e9369f37a5aa91.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
####2.3迁移合约
在迁移之前先对文件进行配置，在migrations文件夹下新建2_deploy_contracts.js文件，文件内容如下
````
var Ches = artifacts.require('./Ches.sol');
//定义变量赋值
var data = 'Hello';
module.exports = function (deployer){
	deployer.deploy(Ches,data);
};

````
在本项目中的根目录中打开truffle-config.js，执行修改配置
![image.png](https://upload-images.jianshu.io/upload_images/14624293-bd358698e9b855ad.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
修改好之后保存，执行命令
迁移命令:`truffle migrate`
执行结果:`迁移成功`
![image.png](https://upload-images.jianshu.io/upload_images/14624293-a97712ad7fe3c60e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### 2.4执行测试
在本项目的跟目录中的test文件中新建ches.js文件，文件内容如下
````
//执行定义变量来表示不同的合约
const Ches  = artifacts.require('Ches.sol');
//执行变量，便于进行更改
const var_a = 'hello';
const var_b = 'Hello World';
//执行定义合约中的其他操作
contract('Ches',accounts => {
	before(async () => {
	//构建合约(可以设置两种方式)
	//01
	let a = await Ches.deployed(var_a);
	//02
	//let Contract_Ches       = await Ches.new(var_a);
	let c = await a.greets();
	let d = await a.setGreeting(var_b);
	let f = await a.greets();
	//在原有的合约上进行获取
	let g = await Ches.at('0xdd7b7Ba15Ab91621311C71728b411A5D8adF89C7');
	let h = await g.greets();
	let i = await g.setGreeting('您好，世界！');
	let k = await g.greets();
	console.log("合约地址:",a.address);
	console.log("获取原数据:",c);
	console.log("获取新数据:",f);
	console.log("获取原来的合约地址:",g.address);
	console.log("获取原来的合约值:",h);
	console.log("更改原来合约的值，并且显示出来:",k);
	//console.log("02合约地址:",Contract_Ches.address);
	});
 	it('Check whether the contract has been issued successfully', async () => {
      console.log("测试合约的操作:");
    }); 
});
测试命令:truffle test
````
执行结果:`成功`
![image.png](https://upload-images.jianshu.io/upload_images/14624293-6d77b2590a0d0444.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

备注:
目前测试是可以的，本篇文章只是提供一个简单的demo实例，可以根据不同的项目需求来进行在不同的合约项目中写测试脚本，`本篇文章适合小白`，**不足之处，请指出，这边进行调整，相互学习，共同进步**

###三:参考文献
[Truffle官方文档](https://truffleframework.com/docs/truffle/overview)
[MoCha官方文档](https://mochajs.org/)
[现代 Javascript 教程](https://zh.javascript.info/async-await)










