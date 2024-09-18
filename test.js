let scale = 2; //放大倍数
let showZoomArea = false; // 判斷放大鏡要不要出現

let target = document.getElementById('image');
target.addEventListener('mousemove', zoomImgMouseMove, false);
target.addEventListener('mouseenter', zoomImgMouseEnter, false);
target.addEventListener('mouseleave', zoomImgMouseleave, false);

// 放大顯示區域
let zoomArea = document.getElementById('showBox');
// 設置放大背景圖
zoomArea.style.backgroundImage = 'url(' + target.getAttribute('src') + ')';


// 圖片加載至背景
let targetRect = target.getBoundingClientRect();
let targetWidth = targetRect.width;
let targetHeight = targetRect.height;
zoomArea.style.backgroundSize = (targetWidth * scale) + 'px ' + (targetHeight * scale) + 'px';

let zoomRect = zoomArea.getBoundingClientRect();
let widthHalf = zoomRect.width / 2;
let heightHalf = zoomRect.height / 2;

let offsetX = 0;
let offsetY = 0;
// 在移動時，偵測滑鼠位置    
function zoomImgMouseMove(e) {
    offsetX = e.offsetX;
    offsetY = e.offsetY;
}

// 偵測放大鏡要不要顯示
function zoomImgMouseEnter() {
    showZoomArea = true;
}
function zoomImgMouseleave() {
    showZoomArea = false;
}

setInterval(function () {
    // 更新放大鏡圖片位置 
    // - (滑鼠座標X * 放大倍數 - 背景圖的寬度) + -(滑鼠座標Y * 放大倍數 - 背景圖的高度)
    zoomArea.style.backgroundPosition = -(offsetX * scale - widthHalf) + 'px ' + (-(offsetY * scale - heightHalf)) + 'px';

    // 放大镜位置
    if ((offsetX + zoomRect.width) > window.innerWidth) {
        zoomArea.style.left = (offsetX - zoomRect.width) + 'px';
    } else {
        zoomArea.style.left = offsetX + 'px';
    }

    if ((offsetY + zoomRect.height) > window.innerHeight) {
        zoomArea.style.top = (offsetY - zoomRect.height) + 'px';
    } else {
        zoomArea.style.top = offsetY + 'px';
    }

    setZoomArea();
}, 100)

function setZoomArea() {
    if (showZoomArea)
        zoomArea.style.transform = 'scale(1)';
    else
        zoomArea.style.transform = 'scale(0)';
}

setZoomArea();
