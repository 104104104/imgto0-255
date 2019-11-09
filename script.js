var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//画像表示

function draw(canvas, image, dctx) {
    console.log("draw");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    console.log(image.naturalWidth, image.naturalHeight);
    dctx.drawImage(image, 0, 0);
    console.log("load!");
    //callbackBinary(ctx);
}

//バイナリ化
//関数の変数
var abutton = document.getElementById("download");

abutton.onclick = function() {
    //sleep(1000);
    //console.log(ctx);
    var bi = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(canvas.width);
    //var array = [];
    var str = bi.data.join(',');
    console.log("aaa");
    //document.getElementById("outputspace").textContent = str;

    /*
    for (var i = 0; i < bi.data.length; i += 1) {
        array.push(bi.data[i]);
    }
    */
    //console.log("bi!");
    console.log(bi.data);
    //console.log("bi!");
    //console.log(array);

    //ファイルに書き出し
    //var str = array.join(',');
    //var str = bi.data.join(',');
    var blob = new Blob([str], {
        "type": "text/plain"
    });

    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, "test.txt");

        // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
        window.navigator.msSaveOrOpenBlob(blob, "test.txt");
    } else {
        document.getElementById("download").href = window.URL.createObjectURL(blob);
    }
    console.log("Bainary Finish!");
}

let imageOnDoc = document.getElementById("targetimg");
draw(canvas, imageOnDoc, ctx);
//window.addEventListener("load", draw(canvas, imageOnDoc, callbinary), true);


//abutton.onclick(ctx);
/*
function sleep(a) {
    var dt1 = new Date().getTime();
    var dt2 = new Date().getTime();
    while (dt2 < dt1 + a) {
        dt2 = new Date().getTime();
    }
    return;
}*/

//
//ファイル読み込み関連
//
var file = document.getElementById('file');
var uploadImgSrc;

function loadLocalImage(e) {
    // ファイル情報を取得
    var fileData = e.target.files[0];

    // 画像ファイル以外は処理を止める
    if (!fileData.type.match('image.*')) {
        alert('画像を選択してください');
        return;
    }

    // FileReaderオブジェクトを使ってファイル読み込み
    var reader = new FileReader();
    // ファイル読み込みに成功したときの処理
    reader.onload = function() {
            // Canvasの後ろに画像を表示する
            uploadImgSrc = reader.result;
            imageOnDoc.src = uploadImgSrc;
            imageOnDoc.onload = function() {
                draw(canvas, imageOnDoc, ctx);
            }
        }
        // ファイル読み込みを実行
    reader.readAsDataURL(fileData);
}

// ファイルが指定された時にloadLocalImage()を実行
file.addEventListener('change', loadLocalImage, false);

//
//ファイル読み込み関連ここまで
//