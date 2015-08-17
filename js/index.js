var canvas = $("#canvas")[0],
// W = innerWidth,
// H = innerHeight,
W = document.body.clientWidth,
H = document.documentElement.clientHeight,
ctx = canvas.getContext("2d"),
colorMap = [],
items = [];
canvas.width = W;
canvas.height = H;


canvas.addEventListener('dragover', handleDragOver, false);
canvas.addEventListener('drop', handleFileSelect, false);


// Check enable File API
if (window.File && window.FileReader && window.FileList && window.Blob) {
  console.log("The File APIs fully supported in this browser.");
} else {
  alert('The File APIs are not fully supported in this browser.');
}

// Drag event
function handleDragOver(e) {
  e.stopPropagation();
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Drop event
function handleFileSelect(e) {
  e.stopPropagation();
  e.preventDefault();

  var files = e.dataTransfer.files; // FileList object.

  // files is a FileList of File objects. List some properties.
  var output = [];
  for (var i = 0, f; f = files[i]; i++) {

    if (!f.type.match('image.*')) {
      continue;
    }

    var _w = 0,
    _h = 0;

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        // Get Images Path
        var imagePath = e.target.result;

        // [TEST] print image
        var image = new Image();
        image.src = imagePath;
        image.addEventListener('load', function() {
          var temp = document.createElement('canvas');
          var context = temp.getContext('2d');
          _w = image.width;
          _h = image.height;
          canvas.width = _w;
          canvas.height = _h;
          ctx.drawImage(image, 0, 0, _w, _h);

          // TEST
          ctx.fillStyle = "rgb(255, 99, 99)";
          ctx.fillRect(0, 0, _w/2, _h/2);
          ctx.fillStyle = "rgb(99, 255, 99)";
          ctx.fillRect(_w/2, _h/2, _w/2, _h/2);
        }, createMosaic(image, imagePath));

      }
    })(f);

    // Read in the image file as a data URL.
    reader.readAsDataURL(f);
  }
}

// TODO: This imagePath(argument) is delete
function createMosaic(image, imagePath) {
  // console.log("start create mosaic from " + image);

// TODO: "earch" mosaic image create after main image lord complete

    // Make to temporary canvas for Image to get data
    var temp = document.createElement('canvas');
    var context = temp.getContext('2d');
    _w = image.width;
    _h = image.height;
    temp.width = _w;
    temp.height = _h;

    context.drawImage(image, 0, 0, _w, _h);

    var src = context.getImageData(0,0,_w,_h);

    for (var i = 0; i < _h * 4; i += 200) {
      for (var j = 0; j < _w * 4; j += 200) {


        if (j % 200 == 0 && i % 200 == 0) {

          // get Color data
          // Mozaic convert 1px -> 10px
          var colors = [];
          for (var i2 = 0; i2 < i + 200; i2 += 4) {
            for (var j2 = 0; j2 < j + 200; j2 += 4) {
              var index = i2 * _w + j2;

              // TODO: ?? What's?
              if (index > src.data.length) {
                break;
              }
              // if(parseInt(src.data[index + 3]) !== 0) {
                var key = parseInt(src.data[index])+  ', ' + parseInt(src.data[index + 1]) + ', ' + parseInt(src.data[index + 2]);

                // console.log("color:"+key);

                if (key in colors) colors[key]++;
                else colors[key] = 1;
              // }
            }
            if (index > src.data.length) {
              break;
            }
          }
          var color = '';
          var dominant = 0;
          for (var key in colors) {
            // console.log("key:"+key + ", color:" + colors[key]);
            if (dominant < colors[key] && colors[key] !== '0, 0, 0' && colors[key] !== '255, 255, 255') color = key;
          }
          console.log("dominant color : " + color);

// TODO: This if block is not in
          // if(color !== '0, 0, 0') {
            colorMap.push(color);
            // console.log("start create MOZAIC");
            var item = new MozaicItem(ctx, j / 4, i / 4, 50, 50, imagePath, color);
            items.push(item);
            // TODO: today start hear and success -> delete
            ctx.fillStyle = "rgb(23, 23, 230)";
            // ctx.fillStyle = "rgb(" + item.color + ")";
            ctx.fillRect(item.x, item.y, item.width, item.height);

            // TEST mosaic image
            // var img = new Image();
            // TODO: This image's path is changed neary color image path
            // img.src = imagePath;
            // img.addEventListener('load', function() {
            //   ctx.drawImage(image, j / 4, i / 4, 50, 50);
            // }, false);
          // }
        }
      }
    }
    console.log(colorMap);

}

// Rendering mozaic
function render() {
  ctx.clearRect(0,0,W,H);
  items.forEach(function(e){ e.render(); });
}
