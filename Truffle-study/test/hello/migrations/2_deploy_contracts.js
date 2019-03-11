Ches = artifacts.require('./Ches.sol');
//定义变量赋值
var data = 'Hello';
module.exports = function (deployer){
    deployer.deploy(Ches,data);
};