//index.js
//获取应用实例
const app = getApp()
var exportData = require("../../data/gua-data.js");

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    src: '../resources/logo.png',
    details: exportData.details,
    xianTian8Gua: exportData.xianTian8Gua
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onload事件');
  },
  //form submission
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    var number1 = parseInt(e.detail.value.input1);
    var number2 = parseInt(e.detail.value.input2);
    var number3 = parseInt(e.detail.value.input3);
    var Upper = this.data.xianTian8Gua.find(
      result => parseInt(result.id) === (number2%8 === 0?8:number2%8)
    );
    var Downer = this.data.xianTian8Gua.find(
      result => parseInt(result.id) === (number1%8 === 0?8:number1%8)
    );
    var result = this.data.details.find(
      detail => detail.id === Upper.key+ Downer.key
    );
      console.log("Upper is" + Upper.name);
      console.log("Downer is" + Downer.name);
      console.log("result is" + result.name);

      wx.navigateTo({
        url: '../gua/gua',
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDataFromOpenedPage: function(data) {
            console.log(data)
          }
        },
        success: function(res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
        }
      })

  },
  formReset: function () {
    console.log('form发生了reset事件')
  }
})
