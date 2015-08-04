var COLOR_CODING = "RGB";
//var COLOR_CODING = "BRG";
//var COLOR_CODING = "GRB"; // chinese
var DEBUG_COLOR_LEVEL = true;

var FONT_START_CHAR = 33;
var FONT_END_CHAR = 127;

var FONT_CHAR_WIDTH = 10;
var FONT_CHAR_HEIGHT = 16;

var globalImgData;
var globalShifterData;

$("document").ready(function() {
  $("#uploadBitmap").change(function(event) {
    var img = new Image;
    img.onload = function() {
      var canvas = document.getElementById('canvasActiveBitmap');

      var w = img.width;
      var h = img.height;
      $("#frameWidth")[0].value = w;
      $("#frameHeight")[0].value = h;
      canvas.width = w;
      canvas.height = h;

      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      var imgData = ctx.getImageData(0,0,w,h);
      CreateScaledCanvas(imgData, document.getElementById('canvasScaledBitmap'), 6);

      $('#bitmapFileName')[0].value = createFileName(event.target.files[0].name, "magicBitmap");
    }

    if ( event.target.files[0].type === 'image/gif' ) {
      load_gif(img, function() {
        var canvasx = sup1.get_canvas().getContext('2d');
        var frame_len = sup1.get_length();

        var w = img.width;
        var h = img.height;

        $("#nrOfFrames")[0].value = frame_len;
        $("#frameWidth")[0].value = w;
        $("#frameHeight")[0].value = h;
        canvas.width = w*frame_len;
        canvas.height = h;

        var ctx = canvas.getContext('2d');

        for (var i=0;i<frame_len;i++)
        {
          canvasx.clearRect (0 , 0 , w , h );
          sup1.move_relative(1);
          var frameData = canvasx.getImageData(0,0,w,h);
          ctx.putImageData(frameData, i*w, 0);
        }

        var imgData = ctx.getImageData(0,0,w*frame_len,h);
        CreateScaledCanvas(imgData, document.getElementById('canvasScaledBitmap'), 6);

        $('#bitmapFileName')[0].value = createFileName(event.target.files[0].name, "magicBitmap");
      });
    }
    img.src = URL.createObjectURL(event.target.files[0]);
  });

  $("#uploadFont").change(function(event) {
    CreateFontFromFile(event.target.files[0]);
  });
});

function SaveBitmap()
{
  var bitPerPixel = parseInt($("#bitmapBitPerPixel")[0].value);
  var frameWidth = parseInt($("#frameWidth")[0].value);
  var frameHeight = parseInt($("#frameHeight")[0].value);
  var frames = parseInt($("#nrOfFrames")[0].value);
  var delayMs = parseInt($("#frameDelayMs")[0].value);

  var canvas = document.getElementById('canvasActiveBitmap');
  var ctx = canvas.getContext('2d');
  var imgData = ctx.getImageData(0,0,frameWidth*frames,frameHeight);

  var shifterFileData = CreateMagicShifterFile(imgData, "bitmap", bitPerPixel, frameWidth, frameHeight, frames, 0, delayMs);
  var fileName = $('#bitmapFileName')[0].value;

  SaveToFile(fileName, shifterFileData);
}

function SaveFont()
{
  var bitPerPixel = parseInt($("#fontBitPerPixel")[0].value);
  var invert = $("#fontInvert")[0].value == "invert" ? 1 : 0;
  var fontWidth = parseInt($("#fontWidth")[0].value);
  var fontHeight = parseInt($("#fontHeight")[0].value);

  var fontStartChar = parseInt($("#fontStartChar")[0].value);
  var fontEndChar = parseInt($("#fontEndChar")[0].value);
  var frames = 1 + fontEndChar - fontStartChar;

  var canvas = document.getElementById('canvasActiveFont');
  var ctx = canvas.getContext('2d')
  var imgData = ctx.getImageData(0,0,fontWidth*frames,fontHeight);

  var shifterFileData = CreateMagicShifterFile(imgData, "font", bitPerPixel, fontWidth, fontHeight, frames, fontStartChar, 0, invert);
  var fileName = $('#fontFileName')[0].value;

  SaveToFile(fileName, shifterFileData)
}

function createFileName(name, extension)
{
  name = name.replace(" ","").replace(".","_");
  if (extension)
    name += "." + extension;
  return name;
}

function SaveToFile(fileName, shifterFileData)
{
  if (shifterFileData)
  {
    var dataView = new DataView(shifterFileData.buffer);
    var blob = new Blob([dataView], {type: "application/octet-stream"});
    saveAs(blob, fileName);
  }
  else
  {
    alert("SaveToFile: shifterFileData empty");
    return;
  }
}

function CreateFontFromFile(file)
{
  var fontWidth = parseInt($("#fontWidth")[0].value);
  var fontHeight = parseInt($("#fontHeight")[0].value);
  var fontStartChar = parseInt($("#fontStartChar")[0].value);
  var fontEndChar = parseInt($("#fontEndChar")[0].value);

  var img = new Image;
  img.onload = function() {
    var canvas = document.getElementById('canvasImportFont');

    var w = img.width;
    var h = img.height;
    canvas.width = w;
    canvas.height = h;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    var imgData = ctx.getImageData(0,0,w,h);
    //CreateScaledCanvas(imgData, document.getElementById('canvasScaledBitmap'), 6);

    CreateFont(function(canvasTarget, startChar, endChar, fontWidth, fontHeight) {  ExtractPixelFont(canvas, canvasTarget, startChar, endChar, fontWidth, fontHeight); }, fontStartChar, fontEndChar, fontWidth, fontHeight);

    //$('#bitmapFileName')[0].value = createFileName(file.name, "magicBitmap");
  }
  img.src = URL.createObjectURL(file);
}

function CreateFontFromCss()
{
  var fontWidth = parseInt($("#fontWidth")[0].value);
  var fontHeight = parseInt($("#fontHeight")[0].value);
  var fontStartChar = parseInt($("#fontStartChar")[0].value);
  var fontEndChar = parseInt($("#fontEndChar")[0].value);
  var fontCss = $("#fontCSS")[0].value;

  CreateFont(function(canvas, startChar, endChar, fontWidth, fontHeight) { RenderHTMLFont(fontCss, canvas, startChar, endChar, fontWidth, fontHeight); }, fontStartChar, fontEndChar, fontWidth, fontHeight);
}

function CreateFont(fontRenderer, startChar, endChar, fontWidth, fontHeight)
{
  var bufferSize =  fontWidth * (1 + endChar - startChar);
  var canvas = document.getElementById('canvasActiveFont');
  canvas.width = bufferSize;
  canvas.height = fontHeight

  fontRenderer(canvas, startChar, endChar, fontWidth, fontHeight);

  var ctx = canvas.getContext('2d');
  var imgData = ctx.getImageData(0,0,canvas.width, canvas.height);
  //globalShifterData = Make24BitFont(imgData, startChar, endChar, fontWidth, fontHeight);

  var canvasOut = document.getElementById('canvasScaledFont');
  CreateScaledCanvas(imgData, canvasOut, 4);
  globalImgData = imgData;
}

function RenderHTMLFont(font, canvas, startChar, endChar, fontWidth, fontHeight)
{
  var ctx = canvas.getContext('2d');
  //ctx.font = '16px Calibri';
  //ctx.font = "20px Arial";
  //ctx.font = '21px VT323';
  ctx.font = '18px Courier';
  if (font)
    ctx.font = font;
  ctx.fillStyle = '#FFFFFF';
  // todo find smallest bounding rectangle for font
  var baseLine = 12;
  var offset = 0;

  for (var asciiCode = startChar; asciiCode <= endChar; asciiCode++)
  {
    var s = String.fromCharCode(asciiCode);
    ctx.fillText(s, offset, baseLine);
    offset += fontWidth;
  }
  $('#fontFileName')[0].value = createFileName("Font" + ctx.font, "magicFont");
}

function ExtractPixelFont(sourceCanvas, canvas, startChar, endChar, fontWidth, fontHeight)
{
  var srcCtx = sourceCanvas.getContext('2d');
  var ctx = canvas.getContext('2d');
  var offset = 0;
  for (var asciiCode = startChar; asciiCode <= endChar; asciiCode++)
  {
    var startX = (asciiCode%16)*fontWidth;
    var startY = Math.floor(asciiCode/16)*fontHeight;

    var charImgData = srcCtx.getImageData(startX,startY,fontWidth, fontHeight);

    ctx.putImageData(charImgData, offset, 0);
    offset += fontWidth;
  }
  $('#fontFileName')[0].value = createFileName("ExtractedFont" + fontWidth + "x" + fontHeight, "magicFont");
}

function CreateScaledCanvas(imgData, canvas, scale)
{
  var width = imgData.width;
  var height = imgData.height;
  var sWidth = scale * width;
  var sHeight = scale * height;

  canvas.width = sWidth;
  canvas.height = sHeight;

  var ctx = canvas.getContext('2d');
  var scaledImageData = ctx.createImageData(sWidth, sHeight);

  for (x = 0; x < width; x++)
  {
    for (y = 0; y < height; y++)
    {
      var idx = 4*(y *width + x);
      var r, g, b, a;

      r = imgData.data[idx];
      g = imgData.data[idx+1];
      b = imgData.data[idx+2];
      a = imgData.data[idx+3];

      for (xx = 0; xx < scale-1; xx++)
      {
        for (yy = 0; yy < scale-1; yy++)
        {
          var targetIdx = 4*((y*scale+yy)*sWidth + (x*scale+xx));
          scaledImageData.data[targetIdx] = r;
          scaledImageData.data[targetIdx+1] = g;
          scaledImageData.data[targetIdx+2] = b;
          scaledImageData.data[targetIdx+3] = a;
        }
      }
    }
  }
  ctx.putImageData(scaledImageData, 0, 0);
}

function CreateMagicShifterFile(imgData, subType, bitPerPixel, frameWidth, frameHeight, frames, firstChar, delayMs, invert)
{
  var x, y;
  var w = imgData.width;
  var h = imgData.height;

  if (subType != "font" && subType != "bitmap")
  {
    alert("CreateMagicShifterAnimation: nunknown subType: " + subType);
    return;
  }
  if (bitPerPixel != 1 && bitPerPixel != 8 && bitPerPixel != 24)
  {
    alert("CreateMagicShifterAnimation: nunknown bitPerPixel: " + bitPerPixel);
    return;
  }
  if (frames < 1 || frames > 256)
  {
    alert("CreateMagicShifterAnimation: number of frames must range from 1 to 256, given: " + frames);
    return;
  }
  if (h < 1 || h > 16)
  {
    alert("CreateMagicShifterAnimation: abort, height must range from 1 to 16");
    return;
  }
  if (h < frameHeight)
  {
    alert("CreateMagicShifterAnimation: abort, height " + h + " too small for frameHeight: " + frameHeight + " does not match imgData height: " + h);
    return;
  }
  var expectedWidth = frames * frameWidth;
  if (w < expectedWidth)
  {
    alert("Make24BitFont: abort, width " + w + " too small for frameWidth*characters = " + frameWidth + "*" + frames + "=" + expectedWidth);
    return;
  }

  var headerSize = 16;
  // TODO: calculate this based on bitperPixel padded to whole bytes for frames
  var shifterFileSize = CalcBufferSize(bitPerPixel, w, h) + headerSize;//3*h*w + headerSize;
  var shifterFileData = new Uint8Array(shifterFileSize);

  // write header
  shifterFileData[0] = 0x23;
  shifterFileData[1] = (shifterFileSize & 0xFF0000) >> 16;
  shifterFileData[2] = (shifterFileSize & 0xFF00) >> 8;
  shifterFileData[3] = (shifterFileSize & 0xFF) >> 0;

  shifterFileData[4] = bitPerPixel;
  shifterFileData[5] = (frames-1); // 0 for static images larger for animations and fonts
  shifterFileData[6] = frameWidth;
  shifterFileData[7] = frameHeight;

  shifterFileData[8] = subType == "font" ? 0xF0 : subType == "bitmap" ? 0xBA : 0x00;
  shifterFileData[9] = firstChar; // >= 1 for fonts/ 0 for animations
  shifterFileData[10] = (delayMs & 0xFF00) >> 8; // 0 for fonts
  shifterFileData[11] = (delayMs & 0xFF) >> 0;

  for (var idx = 12; idx < headerSize; idx++) {
    shifterFileData[idx] = 0xFF;
  }

  // write image data
  if (bitPerPixel == 24)
  {
    writeGenericPixels(imgData, w, h, function(x, y, c) { SetPixel24Bit(shifterFileData, headerSize, w, h, x, y, c); },
      function(r,g,b) { return Code24Bit(r,g,b,invert); });
  }
  else if (bitPerPixel == 8)
  {
    writeGenericPixels(imgData, w, h, function(x, y, c) { SetPixel8Bit(shifterFileData, headerSize, w, h, x, y, c); }, Code8Bit);
  }
  else if (bitPerPixel == 1)
  {
    writeGenericPixels(imgData, w, h,
      function(x, y, c) { SetPixel1Bit(shifterFileData, headerSize, w, h, x, y, c); },
      function(r,g,b) { return Code1Bit(r,g,b,invert); });
  }

  return shifterFileData;
}

function writeGenericPixels(imgData, w, h, setFn, calcFn)
{
  if (w > imgData.width)
  {
    alert("writeGenericPixels: shifterPixel width larger than imgData: " + w);
    return;
  }
  if (h > imgData.height)
  {
    alert("writeGenericPixels: shifterPixel height larger than imgData: " + w);
    return;
  }

  for (var x = 0; x < w; x++)
  {
    for (var y = 0; y < h; y++)
    {
      var idx = 4*(y * imgData.width + x);
      var r, g, b, a;

      r = imgData.data[idx];
      g = imgData.data[idx+1];
      b = imgData.data[idx+2];
      a = imgData.data[idx+3];
      if (a != 255)
      {
        r = Math.round(a*r/255.0);
        g = Math.round(a*g/255.0);
        b = Math.round(a*b/255.0);
      }

      //setRGB24(shifterPixel, offset, w, h, x, y, r, g, b);
      setFn(x, y, calcFn(r, g, b));
    }
  }
}


// imgData must be larger or same size as shifterpixel w/h
function writeRGB24Pixels(imgData, shifterPixel, offset, w, h)
{
  writeGenericPixels(imgData, w, h, function(x, y, c) { SetPixel24Bit(shifterPixel, offset, w, h, x, y, c); }, Code24Bit);
}

function CalcBufferSize(bitPerPixel, w, h)
{
  if (bitPerPixel == 24)
  {
    return w*h*3;
  }
  if (bitPerPixel == 8)
  {
    return w*h;
  }
  else if (bitPerPixel == 1)
  {
    if ((w*h) % 8)
    {
      alert("CalcBufferSize: Ugly 1bit BufferSize: " + (w*h/8));
      return Math.ceil(w*h/8);
    }
    return w*h/8;
  }
  else
  {
    alert("CalcBufferSize: Unknown bitPerPixel Value: " + (w*h/8));
  }
}


function Code24Bit(rr, gg, bb, invert)
{
  var r, g, b;
  if (COLOR_CODING == "BRG")
  {
    r = bb;
    g = rr;
    b = gg;
  }
  if (COLOR_CODING == "GRB")
  {
    r = gg;
    g = rr;
    b = bb;
  }
  else if (COLOR_CODING == "BGR")
  {
    r = bb;
    g = gg;
    b = rr;
  }
  else // assume "RGB"
  {
    r = rr;
    g = gg;
    b = bb;
  }
  if (invert)
    return [255-r, 255-g, 255-b];
  return [r, g, b];
}

function Code8Bit(r, g, b, invert)
{
  var byte = Math.round((r+g+b)/3);
  if (invert) byte = 255-byte;
  return byte;
}

function Code1Bit(r, g, b, invert, threshold)
{
  if (!threshold) threshold = 127;
  var bit = (r+g+b)/3 > threshold;
  if (invert) bit = !bit;
  return bit;
}

function SetPixel24Bit(LEDS_VALUES, offset, w, h, x, y, color)
{
  var byteIndex = offset + 3*(y + h * x);
  LEDS_VALUES[byteIndex++] = color[0];
  LEDS_VALUES[byteIndex++] = color[1];
  LEDS_VALUES[byteIndex++] = color[2];
}

function SetPixel8Bit(LEDS_VALUES, offset, w, h, x, y, color)
{
  var byteIndex = offset + (y + h * x);
  LEDS_VALUES[byteIndex] = color;
}

function SetPixel1Bit(LEDS_VALUES, offset, w, h, x, y, color)
{
  var bitOffset = (y + h * x);
  var byteOffset = bitOffset >> 3;
  var byteIndex = offset + byteOffset;
  var bitMask = 1 << (bitOffset%8);

  if (color)
  {
    LEDS_VALUES[byteIndex] |= bitMask;
  }
  else
  {
    LEDS_VALUES[byteIndex] &= ~bitMask;
  }
}

function load_gif(image,callback)
{
  var sup1 = new SuperGif({ gif: image} ); //document.getElementById('uploaded_gif') } );
  sup1.load(callback);
}
