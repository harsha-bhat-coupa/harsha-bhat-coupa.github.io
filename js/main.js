function renderPDF(url, canvasContainer, options) {
    var options = options || { scale: 1 };
        
    function renderPage(page) {
      
      page.getTextContent().then( function(textContent){
        console.log(textContent);
        
      });
        var viewport = page.getViewport(options.scale);
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        canvasContainer.appendChild(canvas);
        
        page.render(renderContext);
    }
    
    function renderPages(pdfDoc) {
        for(var num = 1; num <= pdfDoc.numPages; num++)
            pdfDoc.getPage(num).then(renderPage);
    }
    PDFJS.disableWorker = true;
    PDFJS.getDocument(url).then(renderPages);
} 

function renderPDFThumbnails(url, canvasContainer, options) {
    var options = options || { scale: 0.3 };
        
    function renderPage(page) {
      
        var viewport = page.getViewport(options.scale);
        var canvas = document.createElement('canvas');
        
        var ctx = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        beautifyThumbnails(canvas);
        canvasContainer.appendChild(canvas);
        
        page.render(renderContext);
    }
    
    function renderPages(pdfDoc) {
        for(var num = 1; num <= 10; num++)
            pdfDoc.getPage(num).then(renderPage);
    }
    PDFJS.disableWorker = true;
    PDFJS.getDocument(url).then(renderPages);
}   

function beautifyThumbnails(canvas){
  
  canvas.id="thumb"
}

function loadPDF(){
  renderPDF('../small.pdf', document.getElementById('page'));
}

function loadPDFThumbnails(){
  renderPDFThumbnails('../100pages.pdf', document.getElementById('page'));
}