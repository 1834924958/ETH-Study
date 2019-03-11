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
    // //在原有的合约上进行获取
    // let g = await Ches.at('0x5093a361e9D31dc601664164a7c27C475C5eFD5d');
    // let h = await g.greets();
    // let i = await g.setGreeting('您好，世界！');
    // let k = await g.greets();
    console.log("合约地址:",a.address);
    console.log("获取原数据:",c);
    console.log("获取新数据:",f);
    // console.log("获取原来的合约地址:",g.address);
    // console.log("获取原来的合约值:",h);
    // console.log("更改原来合约的值，并且显示出来:",k);
    // console.log("02合约地址:",Contract_Ches.address);
    });
    it('Check whether the contract has been issued successfully', async () => {
      console.log("测试合约的操作:");
    }); 
});