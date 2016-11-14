+++

photosourcetext = ""
photosourcehref = ""
photosourcecolor = ""

author = "Jon Gomez"
menucolor = "white"

comments = true

date = "2016-10-14T12:04:47+01:00"
draft = false
image = "media/inceptionjs/inception.png"
share = true
slug = "inceptionjs"
tags = ["JavaScript"]
title = "inception.js"
excerpt = "Websites within websites."

header = "inception.js"
subheader = "Websites within websites"

textshadow = true

js = ["inceptionjs/inception.js", "inceptionjs/inceptionjs_post.js"]
mathjax = false

+++

{{< br >}}
{{< /br >}}

You can do a lot of crazy stuff with JavaScript. But can you re-render a website inside an iframe inside that same website? You know, something like this:

{{< figure src="/media/inceptionjs/example1.jpg" link="http://www.pxleyes.com/photoshop-picture/4db84f8644924/droste-effect-laptop.html" >}}
{{< pclass class="legend" >}}
Something like this, but with the current website inside the laptop. <a href="http://www.pxleyes.com/photoshop-picture/4db84f8644924/droste-effect-laptop.html">Photo Source.</a>
{{< /pclass >}}

Don't know why I thought of this, but the idea started to grow on me. I knew it could be done. I knew it would look trippy. So I decided to bring the idea to life.

*"What is the most resilient parasite? Bacteria? A virus? An intestinal worm? An idea. Resilient... highly contagious. Once an idea has taken hold of the brain it's almost impossible to eradicate. An idea that is fully formed - fully understood - that sticks; right in there somewhere."* **- Cobb** *(Leonardo DiCaprio in Inception)*

Found out there's a name for this kind of effect - [Droste effect.](https://en.wikipedia.org/wiki/Droste_effect)

{{< figure src="/media/inceptionjs/Droste.jpg" >}}
{{< pclass class="legend" >}}
The Droste Effect.
{{< /pclass >}}

How would one create such an effect using JavaScript? My first approach was to take a screenshot of the current website, and just put it on display inside the mockup photo. I tried out a few libraries that take screenshots of the current page [(like this one)](https://github.com/niklasvh/feedback.js), but I could never get them to work 100%. 

My next approach was to insert iframes inside the mockup photos. This turned out to be more feasible, and after working on this approach for a while I decided to turn it into a small JavaScript library - inception.js. Here's a quick demo:

### Basic example

Lets say we have a container div, and want to insert the current page inside it. Using inception.js, all we need to do is:

{{< highlight javascript >}}inception1 = new Inception({
  parentElementId: "iframeContainer1", 
  levels: 3
})
{{< /highlight >}}

And the result is:

<div id="iframeContainer1" style="height:400px; border-style: solid; border-width: 8px;"></div>

{{< br >}}
{{< /br >}}

[Check it out on Codepen.](https://codepen.io/jonGomez/full/xROgqO/)

That's it. The number of nested iframes is set by the 'levels' parameter.

Okay I lied. The code I used was little bit different. If you manage to scroll down inside those iframes, you'll see there are no disqus comments at the end of the iframes. I didn't include them because I always get nasty errors when using disqus stuff. I didn't want those errors to occur again inside the iframes, so I removed all the disqus stuff from the iframes. To do this, I added a class called *"disqus_stuff"* to all the disqus script elements, and added *'classesToRemove: "disqus_stuff"'* to the Inception constructor call.

{{< highlight javascript >}}inception1 = new Inception({
  parentElementId: "iframeContainer1", 
  levels: 4, 
  classesToRemove: "disqus_stuff"
})
{{< /highlight >}}

But that's a pretty bare bones example. To recreate the droste effect in a mockup photo, we need a mockup photo, and some way to insert our iframes on top of that photo. 

<div><img id="img1" src="/media/inceptionjs/2.jpg" style="width: 100%"></div>
{{< pclass class="legend" >}}Mockup photo downloaded from <a href="http://magicmockups.com/">Magic Mockups</a>{{< /pclass >}}

The code to recreate this example is

{{< highlight javascript >}}inception2 = new Inception({
  imageId: "img1", 
  levels: 2, 

  width: "60%",
  height: "56%",
  top: "25%",
  left: "10%",
  rotate: "5deg",

  classesToRemove: "disqus_stuff",
  matchWidthElementId: "img1",
  leftAlignWith: "img1"
}
{{< /highlight >}}

[Check it out on Codepen.](https://codepen.io/jonGomez/full/xRgRQa)

The only difficult part here is getting the width, height, top, left and rotate values for things to work (i.e. positioning the iframes inside the mockup image). [But don't worry, I got you covered. I made a codepen where you can get all the necessary values to set everything up.](http://codepen.io/jonGomez/full/YGOdPE/)

What if the screen on the mockup image is tilted in a weird way? Or the screen is not directly facing forward? [Franklin Ta has already solved that problem for us.](http://franklinta.com/2014/09/08/computing-css-matrix3d-transforms/) He used matrix3d transforms to place anything inside such screens.

Theoretically, you could always use a matrix3d to place anything on top of mockup images (instead of specifying width, rotation, etc...), but I'd reccomend against using matrix3d's if you can. Code will look cleaner, it's easier to set up correctly, and in my experience, the browser has a hard time computing matrix3d transforms.

Here's and example with matrix3d:
<div id="great-grandparent"><img id="img2" src="/media/inceptionjs/3.jpg"></div>
{{< pclass class="legend" >}}Mockup photo downloaded from <a href="http://magicmockups.com/">Magic Mockups</a>{{< /pclass >}}

Code:

{{< highlight javascript >}}inception3 = new Inception({
  imageId: "img2", 
  levels: 1, 

  matrix3d: "matrix3d(0.326055, ...)",
  imageWidth: "960px",
  imageHeight: "640px",

  classesToRemove: ["disqus_stuff", "nav"],
  matchWidthElementId: "img2",
  leftAlignWith: "img2",
}
{{< /highlight >}}

[Codepen.](https://codepen.io/jonGomez/full/WoRRep/)

Again, the hard part here is getting the correct matrix3d values for your mockup image. [I've forked Franklin Ta's codepen and modified it slightly to facilitate usage with mockup images.](http://codepen.io/jonGomez/full/yaRgjG)

Finally, I'd like to say that getting this to run on every page can be a real challenge. Certain things will not work. For example, 3D translations may screw up the z-index of some elements, and certain elements inside the iframes will not render (on Chrome, Firefox works fine?). Not only that, I haven't done anything to optimize the code. It's a mess. Seriously. If you open Chrome's dev console and run an audit you'll see what I mean.

Looks pretty tight though. [More on Github.](https://github.com/jongomez/inception.js)