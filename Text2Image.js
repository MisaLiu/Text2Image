/**
	*     __  ____               __    _      
	*    /  |/  (_)________ _   / /   (_)_  __
	*   / /|_/ / / ___/ __ `/  / /   / / / / /
	*  / /  / / (__  ) /_/ /  / /___/ / /_/ / 
	* /_/  /_/_/____/\__,_/  /_____/_/\__,_/  
	*
	
	* @name        : Text2Image
	* @version     : 1.0
	* @description : Text2Image 图片文本互转 JavaScript 模块
	* @author      : MisaLiu
	* @since       : 2021-04-12 20:12:45
	
	* ***使用方法***
	* 声明对象 : `var t2i = new Text2Image()`
	* 编码    : `t2i.encode('我房间里有一些好康的', function(img) {Image.src = img});`
	* 解码    : `t2i.decode(Image, function(text) {alert(text)});`
	
	* 其中 :
	* t2i.encode(欲转换的文本内容, 回调函数(参数为转换出的图片的 Base64))
	* t2i.decode(欲转换的图片(传入 Image 元素), 回调函数(参数为转换出的文本内容))
	
	* 祝你用的愉快！
	* 有任何问题都可以去仓库提 Issue、提 Pr
	* 仓库地址：https://github.com/MisaLiu/Text2Image
**/

function Text2Image() {
	return {
		encode : function (text, callback) { // 定义 t2i.encode(text, callback) 方法
			// 创建 Canvas 元素
			var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
			var ctxt = canvas.getContext('2d');
			
			// 声明变量
			var strings = new Array();
			var imgSize = 0;
			var returnImg = null;
			
			// 传入的文本是否为空？如是，直接返回 Null
			if (text.length <= 0) {
				canvas.remove();
				
				if (callback) callback(returnImg);
				return returnImg;
				
			}
			
			// 让 Canvas 隐形
			canvas.style.display = 'none';
			
			// 给变量赋值
			strings = text.split('');
			imgSize = Math.ceil(Math.sqrt(strings.length));
			
			// 设置 Canvas 将要输出的图片大小
			canvas.width = imgSize;
			canvas.height = imgSize;
			
			// 让 Canvas 先糊一层蓝底
			ctxt.fillStyle = '#0000FF';
			ctxt.lineWidth = '1px';
			ctxt.fillRect(0, 0, imgSize, imgSize);
			
			// 准备工作完成，开始转换
			{
				// 获取当前 Canvas 内图像的各个像素 rgba 参数
				var imgData = ctxt.getImageData(0, 0, imgSize, imgSize);
				var pxData = imgData.data;
				
				// 定义一些工具变量
				var string = '';
				var textHex = '';
				var strColor;
				var n = 0;
				
				for (var i = 0; i < pxData.length; i += 4) {
					string = strings[n]; // 获取当前第 n 个字符
					
					if (string) { // 防报错，当前第 n 个字符是否为空？不为空则继续
						textHex = string.charCodeAt(0).toString(16); // 获取当前字符的 16 进制串
						
						// 给 16 进制字符串做格式化（按照 16 进制颜色值的格式）
						while (textHex.length < 6) {
							textHex = '0' + textHex;
							
						}
						
						// 将 16 进制转换为 rgb
						{
							var r = 0, g = 0, b = 0;
							
							r = "0x" + textHex[0] + textHex[1];
							g = "0x" + textHex[2] + textHex[3];
							b = "0x" + textHex[4] + textHex[5];
							
							strColor = {
								red: +r,
								green: +g,
								blue: +b
							}
						}
						
						// 修改在 Canvas 上对应的点
						pxData[i] = strColor.blue;
						pxData[i + 1] = strColor.green;
						pxData[i + 2] = 255;
						pxData[i + 3] = 255; // 这个是 Alpha 通道
					}
					
					n++;
				}
				
				// 将图输出到 Canvas 中
				ctxt.putImageData(imgData, 0, 0);
			}
			
			returnImg = canvas.toDataURL('png'); // 输出 Canvas 中的图片
			canvas.remove(); // 删除 Canvas 元素
			
			if (callback) callback(returnImg); // 如果有回调，则运行回调，并传入转换出的图片为参数
			return returnImg; // 直接返回图片的 Base64 数据
			
		},
		
		decode : function (img, callback) { // 定义 t2i.decode(Image, callback) 方法
			// 创建 Canvas 元素
			var canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
			var ctxt = canvas.getContext('2d');
			
			// 声明变量
			var imgSize = 0;
			var returnString = null;
			
			// 让 Canvas 隐形
			canvas.style.display = 'none';
			
			// 当传入的图片元素有加载图片时才继续进行
			if (img.src) {
				// 获取图片尺寸，并设置 Canvas 宽高
				imgSize = img.width;
				canvas.width = imgSize;
				canvas.height = imgSize;
				
				// 在 Canvas 上画出该图
				ctxt.drawImage(img, 0, 0);
				
				// 准备工作完成，开始转换为文字
				{
					// 获取当前 Canvas 中的所有像素点数据
					var pxData = ctxt.getImageData(0, 0, imgSize, imgSize).data;
					
					// 声明一些工具变量
					var textHex = '';
					var textCount = '';
					
					for (var i = 0; i < pxData.length; i += 4) {
						// 获取当前像素的 rgb 值
						var strColor = new Array();
						strColor[2] = pxData[i]; // R
						strColor[1] = pxData[i + 1]; // G
						strColor[0] = 0; // pxData[i + 2]; // B
						
						
							
						if (strColor[2] != 0) {
							
							// 将 rgb 值转换为对应的十六进制
							{
								let hexColor = '';
								let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
								
								for (let i = 0; i < 3; i++) {
									let r = null, c = strColor[i], l = c;
									let hexAr = [];
									
									while (c > 16) {
										r = c % 16;
										c = (c / 16) >> 0;
										hexAr.push(hex[c]);
									}
									
									hexAr.push(hex[r]);
									
									if (l < 16 && l != '') {
										hexAr.push(0);
									}
									
									if (hexAr.reverse().join('').length < 2) {
										hexColor += hexAr.reverse().join('') + '0';
									} else {
										hexColor += hexAr.reverse().join('');
									}
								}
								
								textHex = hexColor;
								
							}
							
							// 将十六进制转换为对应的字符
							textCount += String.fromCharCode(parseInt(textHex,16).toString(10));
						}
						
					}
					
					returnString = textCount; // 输出所有字符
				}
			}
			
			canvas.remove();
			
			if (callback) callback(returnString); // 如果有回调函数，则执行，并将转换出的文字作为参数传入
			return returnString; // 返回转换出的文字，null 为没有转换出
			
		}
	}
}
