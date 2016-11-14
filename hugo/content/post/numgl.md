+++

photosourcetext = ""
photosourcehref = ""
photosourcecolor = ""

author = "Jon Gomez"
menucolor = "white"
comments = true
date = "2015-01-21T12:08:47+01:00"
draft = false
image = "media/numgl/3D.jpg"
share = true
slug = "numgl"
tags = ["WebGL", "JavaScript"]
title = "Introducing NumGL"
excerpt = "Introducing NumGL - A WebGL library for fast image/video processing."

header = "Introducing NumGL"
subheader = "A WebGL library for fast image/video processing"

mathjax = true

+++

{{< br >}}
{{< /br >}}

(2 minute read) 

**If you're looking for general-purpose computing with WebGL (specifically BLAS stuff) check out the amazing [weblas](https://github.com/waylonflinn/weblas) library. This post is a bit old, and at the time using WebGL for general-purpose computing seemed like a painful dirty hack.**

WebGL for general-purpose computing sounded like a good idea at first.
Simply send data to the GPU as textures and perform the calculations there.
Browsers can handle it, and very few people seemed to be doing this.

Turns out people weren't doing this for several reasons, the main one being: weak support for float texture values. There's an extension called *oes_texture_float*, which helps a lot, [but it's still a bit clumsy.](http://stackoverflow.com/questions/17476632/webgl-extension-support-across-browsers)

So if you're not using *oes_texture_float* and want to to send float data to the shaders, the data has to be RGBA-encoded into a texture (on the JavaScript side), sent to the WebGL side and once there, decoded back into floats. Ouch. 
Not to mention reading back the float results on the JS side, [which can also be painful.](http://stackoverflow.com/questions/17981163/webgl-read-pixels-from-floating-point-render-target)

[Here's an overview of 2 methods that do all of the above.](https://lab.concord.org/experiments/webgl-gpgpu/webgl.html) Some issues are: performance bottlenecks, additional JavaScript and GLSL code, and errors associated with the float / RGBA conversions.

What about image processing and computer vision? The images / video frames can be processed by WebGL as regular textures, no need for float / RGBA conversions. It seemed like a better idea, and there were already a couple of cool projects using this approach (eg: webcam toy and glfx.js). 

So I decided to do something along those lines and started working on NumGL - a WebGL image / video processing library. Here's a couple of things you can do with it.

### Greyscaling

![Greyscale Image](/media/numgl/grey.png)

The NumGL code for this effect is:

{{< highlight javascript >}}// "image" is the <img> tag ID.
var imageId = numgl.store_picture("image");

numgl.show_canvas(imageId)
numgl.grey(imageId);
numgl.do_it();
{{< /highlight >}}

To apply this or any of the following effects on video / webcam, simply change the *store_picture()* function to *store_video()* and *store_webcam()*, respectively. Fiddle around with this code here:

* [grey pic](http://jsfiddle.net/jongomez/q3n5gj7u/)
* [grey video](http://jsfiddle.net/sputro0e/)
* [grey webcam](https://jsfiddle.net/wm4gr6co/1/)

### Convolution kernel

![Convolution Kernel](/media/numgl/conv.png)

Apply a convolution kernel to an image, video or webcam. The code is identical to the above example, just replace the numgl.grey() call with

{{< highlight javascript >}}// Apply convolution kernel to the stored image.
numgl.convolution(imageId, [-1,-1,-1,0,0,0,1,1,1]);
{{< /highlight >}}

where the array [-1,-1,-1,0,0,0,1,1,1] corresponds to the following kernel

{{< mj >}}$$\begin{bmatrix}-1 & -1 & -1\\0 & 0 & 0\\1 & 1 & 1\end{bmatrix}$${{< /mj >}}

JS Fiddle with it: 

* [pic](http://jsfiddle.net/jongomez/6pgbwkff/)
* [video](http://jsfiddle.net/m1gbshz6/)
* [webcam](https://jsfiddle.net/rsn9cdkb/1/)

### Thresholding

![Thresholding](/media/numgl/thresh.png)

The function call is

{{< highlight javascript >}}// Threshold the stored image.
numgl.threshold(imageId, 80);
{{< /highlight >}}

where 80 is the threshold value.
JS Fiddles:

* [pic](http://jsfiddle.net/jongomez/eap27rhq/)
* [video](http://jsfiddle.net/wuLcef2y/)
* [webcam](https://jsfiddle.net/w8f7z6eu/)

#### TL;DR
WebGL does image processing and computer vision stuff with ease and speed.
NumGL is a WebGL image / video processing library. [Fork me on Github. Also check it out for additional docs and examples.](https://github.com/jongomez/numgl)





