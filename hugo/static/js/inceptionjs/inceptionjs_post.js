

// Remove blackfriday's <div>.
//document.getElementById("greatgrandparent").outerHTML = document.getElementById("greatgrandparent").innerHTML;



inception = new Inception({
  iframeContainerId: "iframeContainer1", 
  levels: 3, 
  classesToRemove: "disqus_stuff",
  leftAlignWith: "iframeContainer1"

  //trackResize: false,
  //setZIndex: false,
  //HTMLOverflow: "auto" 
})



/*
inception.onload = function() {
  inception2 = new Inception({
    imageId: "img1", 
    matchWidthElementId: "img1",
    levels: 2, 
    userHTML: inception.HTMLCode,

    leftAlignWith: "img1",

    backgroundColor: "",
    width: "60%",
    height: "56%",
    top: "25%",
    left: "10%",
    rotate: "5deg",

    classToRemove: "disqus_stuff",
    //setZIndex: false,
    //HTMLOverflow: "auto" 
  })

  inception2.onload = function() {
    lastIframeScreen = this.iframes[1].contentDocument.getElementById(this.iframeContainerId)
    // Hugo cannot get the image base path in this JS file. Grab it from the image element.
    imgSource = document.getElementById(this.imageId).src;
    imgSourceSplit = imgSource.split("/");
    imgSourceSplit[imgSourceSplit.length - 1] = "inception.png"

    lastIframeScreen.style.backgroundImage = 'url("' + imgSourceSplit.join("/")+ '")';
    lastIframeScreen.style.backgroundSize = "cover";
  }


  inception3 = new Inception({
    imageId: "img2", 
    matchWidthElementId: "img2",
    levels: 1, 
    userHTML: inception.HTMLCode,

    //matrix3d: "matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1)",
    matrix3d: "matrix3d(0.326055, -0.0175387, 0, 2.16792e-05, 0.0175239, 0.355945, 0, -0.000308109, 0, 0, 1, 0, 276.989, 171.989, 0, 1)",
    imageWidth: "960px",
    imageHeight: "640px",

    horizontalCenter: true,

    backgroundColor: "white",
    classesToRemove: ["disqus_stuff", "nav"],
    setZIndex: false,
    HTMLOverflow: "auto" 
  })

  inception3.onload = function() {
    lastIframeScreen = this.iframes[0].contentDocument.getElementById(this.iframeContainerId)
    // Hugo cannot get the image base path in this JS file. Grab it from the image element.
    imgSource = document.getElementById(this.imageId).src;
    imgSourceSplit = imgSource.split("/");
    imgSourceSplit[imgSourceSplit.length - 1] = "yodawg.png"
    
    lastIframeScreen.style.backgroundImage = 'url("' + imgSourceSplit.join("/")+ '")';
    lastIframeScreen.style.backgroundSize = "cover";
  }
}

*/



inception2 = new Inception({
  imageId: "img1", 
  levels: 2, 
    scrollOffset: 100,
  //userHTML: inception.HTMLCode,

  matchWidthElementId: "img1",
  leftAlignWith: "img1",

  width: "60%",
  height: "56%",
  top: "25%",
  left: "10%",
  rotate: "5deg",

  classesToRemove: "disqus_stuff",
  //setZIndex: false,
  //HTMLOverflow: "auto" 
})

inception2.onload = function() {
  // Can't make Hugo get the image base path in this JS file. Grab it from the image element.
  imgSource = document.getElementById(this.imageId).src;
  imgSourceSplit = imgSource.split("/");
  imgSourceSplit[imgSourceSplit.length - 1] = "squint.jpg"

  lastIframeScreen = this.iframes[1].contentDocument.getElementById(this.iframeContainerId)
  lastIframeScreen.style.backgroundColor = "#252d3a"
  lastIframeScreen.innerHTML = "<div style='width: 100%;" +
  "height: 100%; background-image: url(" + imgSourceSplit.join("/") + ");" +
  "background-size: cover; background-position: center; opacity: 0.65'>"
}



inception3 = new Inception({
  imageId: "img2", 
  matchWidthElementId: "img2",
  levels: 1, 
  leftAlignWith: "img2",
  scrollOffset: 300,

  //matrix3d: "matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1)",
  matrix3d: "matrix3d(0.326055, -0.0175387, 0, 2.16792e-05, 0.0175239, 0.355945, 0, -0.000308109, 0, 0, 1, 0, 276.989, 171.989, 0, 1)",
  imageWidth: "960px",
  imageHeight: "640px",

  //backgroundColor: "white",
  classesToRemove: ["disqus_stuff", "nav"],
  //setZIndex: false,
  //HTMLOverflow: "auto" 
})

inception3.onload = function() {
  // Can't make Hugo get the image base path in this JS file. Grab it from the image element.
  imgSource = document.getElementById(this.imageId).src;
  imgSourceSplit = imgSource.split("/");
  imgSourceSplit[imgSourceSplit.length - 1] = "yodawg.png"

  lastIframeScreen = this.iframes[0].contentDocument.getElementById(this.iframeContainerId)  
  lastIframeScreen.style.backgroundColor = "#748997"
  lastIframeScreen.innerHTML = "<div style='width: 100%;" +
  "height: 100%; background-image: url(" + imgSourceSplit.join("/") + ");" +
  "background-size: cover; background-position: center; opacity: 0.8'>"
}

