/*
      __  ____               __    _      
     /  |/  (_)________ _   / /   (_)_  __
    / /|_/ / / ___/ __ `/  / /   / / / / /
   / /  / / (__  ) /_/ /  / /___/ / /_/ / 
  /_/  /_/_/____/\__,_/  /_____/_/\__,_/  

*/

// ================以下是声明元素、全局变量的区域================
var canvas = document.getElementById('image');
var img = new Image;
var ctxt = canvas.getContext('2d');
var text = document.getElementById('text');
var reader = new FileReader();
var convertMethod = 0;

// ================检测是否支持 Canvas ================

if (!canvas.getContext) {
	mdui.alert("您的浏览器不支持 Canvas ！\n\r请升级浏览器，或是更换为 Google Chrome 浏览器。", "警告");

}

// ================以下是声明监听函数的位置================

img.onload = function () {
	canvas.width = img.width;
	canvas.height = img.height;

    ctxt.drawImage(img, 0, 0);

}

reader.onloadend = function (e) {
    var result = e.target.result;

    if (convertMethod == 0) {
    	if (result.substr(0, 10) == "data:image") {
        	img.src = result;
        
    	}
    } else if (convertMethod == 1) {
        text.value = result;
        
    } else {


    }
    mdui.snackbar("导入文件成功");
}

reader.onerror = function () {
	mdui.dialog("导入文件时出错！\n\r请检查文件或重新再试","警告");

}

function fileSelected() {
    var fileDir = document.getElementById("fileDir");
    
    document.getElementById('fileDirText').innerHTML = "当前选择的文件：" + fileDir.files[0].name;
    if (convertMethod == 0) {
    	reader.readAsDataURL(fileDir.files[0]);

    } else if (convertMethod == 1) {
    	reader.readAsText(fileDir.files[0]);

    } else {


    }
}

function changeMethod() {
	if (document.getElementById('img2string').checked) {
		convertMethod = 0;

	} else if (document.getElementById('string2img').checked) {
		convertMethod = 1;

	} else {
		convertMethod = -1;

	}
}

// ================以下是主程序================

function startConvert() {
	if (convertMethod == 0) {
		if (img.src) {
    		img2String();

    	} else {
    		mdui.alert("你还没有导入图片！","警告");
    		return;

    	}

    } else if (convertMethod == 1) {
    	if (text.value != "") {
    		string2Img();

    	} else {
    		mdui.alert("你还没有导入/输入文字！","警告");
    		return;

    	}
    } else {


    }
}

function img2String() {
    var data = ctxt.getImageData(0, 0, img.width, img.height).data;
    var textHex = "";
    var textCount = "";

    for (var i = 0, len = data.length; i < len; i += 4) {
        var red = data[i], green = data[i+1], blue = data[i+2];
        
        textHex = "0," + green + "," + red;
        textHex = rgb2Hex(textHex).substr(1, 8);

        textCount = textCount + hex2String(textHex);

        text.value = textCount;
    }

    mdui.confirm("转换操作完成！\n\r是否将转换出的内容复制到剪贴板？", "提示", function() {
		text.select();
		document.execCommand('copy');

		mdui.snackbar("复制内容操作已执行");

    });
}

function string2Img () {
	var string = text.value;
	var strings = new Array();
	var imgSize = 0;
	var strColor;

	strings = string.split("");
	imgSize = Math.ceil(Math.sqrt(strings.length));

	canvas.width = imgSize;
	canvas.height = imgSize;

	ctxt.fillStyle = "#FFFFFF";
	ctxt.lineWidth = "1px";
	ctxt.fillRect(0, 0, imgSize, imgSize);

	img.src = canvas.toDataURL('jpg');
	
	setTimeout(function() {
		var imgData = ctxt.getImageData(0, 0, imgSize, imgSize);
    	var pxData = imgData.data;
    	var count = 0;

    	for (var i = 0; i < pxData.length; i+=4) {
    		count++;

    		string = strings[count - 1];
    		var textHex = string ? string.charCodeAt(0).toString(16) : "";
    		strColor = hex2RGB(formaltHex(textHex));
    		textHex = rgb2Hex(strColor.blue + "," + strColor.green + "," + strColor.red);

    		ctxt.fillStyle = textHex;

    		pxData[i] = strColor.blue;
    		pxData[i + 1] = strColor.green;
			pxData[i + 2] = 255;
			pxData[i + 3] = 255;

    	}

		ctxt.putImageData(imgData, 0, 0);

		mdui.confirm("转换成图片完成！\n\r是否保存图片？", "提示", function(){
			mdui.snackbar("正在保存，请稍后...");

			imgData = canvas.toDataURL("png");
			imgData = imgData.replace("image/png", "image/jpg");

			var saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
			var date = new Date();
			saveLink.style.display = "none";
			saveLink.href = imgData;
			saveLink.download = "Text2Image_" + date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "_" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds() + ".jpg";
			saveLink.click();
			saveLink.remove();

		});

	}, 100);
}

// ================以下是声明工具函数的位置================

function rgb2Hex(rgb) {
	var regexp = /[0-9]{0,3}/g;
	var re = rgb.match(regexp);
	var hexColor = "#";
	var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

	for (var i = 0; i < re.length; i++) {
		var r = null, c = re[i], l = c;
		var hexAr = [];

		while (c > 16) {
			r = c % 16;
			c = (c / 16) >> 0;
			hexAr.push(hex[r]);
		}

		hexAr.push(hex[c]);

		if (l < 16 && l != "") {
			hexAr.push(0);
		}

		hexColor += hexAr.reverse().join('');
	}

	return hexColor;
}

function hex2RGB(hex) {
	var r = 0, g = 0, b = 0;

	if (hex.length == 4) {
		r = "0x" + hex[1] + hex[1];
		g = "0x" + hex[2] + hex[2];
		b = "0x" + hex[3] + hex[3];

	} else if (hex.length == 7) {
		r = "0x" + hex[1] + hex[2];
		g = "0x" + hex[3] + hex[4];
		b = "0x" + hex[5] + hex[6];

	}

	return {
		red: +r,
		green: +g,
		blue: +b
	};
}

function hex2String(data) {
	if(data == '') return '';
	data = data.split("\\u");

	var str ='';
	for (var i=0;i<data.length;i++) {
		str+=String.fromCharCode(parseInt(data[i],16).toString(10));

	}

	return str;
}

function formaltHex(hex) {
	var output = hex;
	for (var i = 0; i < 7 - hex.length; i++) {
		if (i == 6 - hex.length) {
			output = "#" + output;

		} else if (i == 5 - hex.length || i == 4 - hex.length) {
			output = "F" + output;

		} else {
			output = "0" + output;

		}
	}

	return output;
}