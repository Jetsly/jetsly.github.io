 /**
  * toBlob导出
  */
 function toBlobPolyfill () {
   var CanvasPrototype = window.HTMLCanvasElement && window.HTMLCanvasElement.prototype
   CanvasPrototype.toBlob = CanvasPrototype.toBlob || ((callback, type, quality) => {
     if (CanvasPrototype.mozGetAsFile) {
       callback(this.mozGetAsFile('blob', type))
     } else if (CanvasPrototype.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(type)) {
       callback(this.msToBlob())
     } else {
       alert('not support dataURLtoBlob')
     }
   })
 }
 toBlobPolyfill()
