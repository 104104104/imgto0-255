var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//画像表示

function draw(canvas, image, dctx) {
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    dctx.drawImage(image, 0, 0);
}

//バイナリ化
//関数の変数
var abutton = document.getElementById("download");

abutton.onclick = function() {
    var bi = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var str = bi.data.join(',');

    //ファイルに書き出し
    var blob = new Blob([str], {
        "type": "text/plain"
    });

    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, "test.txt");
        window.navigator.msSaveOrOpenBlob(blob, "test.txt");
    } else {
        document.getElementById("download").href = window.URL.createObjectURL(blob);
    }
    console.log("Bainary Finish!");
}

let imageOnDoc = document.getElementById("targetimg");
draw(canvas, imageOnDoc, ctx);


//以下、MyPicARからの移植
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