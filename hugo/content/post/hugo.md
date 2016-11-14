+++

photosourcetext = ""
photosourcehref = ""
photosourcecolor = ""

author = "Jon Gomez"
menucolor = "white"

comments = true

date = "2016-11-15T12:04:47+01:00"
draft = false
image = "media/hugo/hugologo.png"
share = true
slug = "hugo"
tags = ["Hugo"]
title = "Github User Page with Hugo"
excerpt = "A simple way to set up a github page with Hugo"

header = ""
subheader = ""

textshadow = false

mathjax = false

+++

{{< br >}}
{{< /br >}}

This approach involves serving both the Hugo working directory and the final build files. Some pros and cons of doing this:

### Pros

* Easy setup and github flow (just the usual git add, commit, push. No need for .gitignores, branches, multiple repos, etc).
* Both your working directory and build files are uploaded in the same github repo (some tutorials only upload the final build files). 
* The working directory serves as a pseudo development branch: you can add posts, change posts, do whatever you want in the working directory. Then, if you git add, commit, push your website, users will __not__ see what you did in the working directory. Users will only see changes when you build your website with the "hugo" command.

### Cons

You're basically uploading the website twice. This can be problematic if you have really large websites.


## Step by step
### 1. Install Hugo. 

[How to install Hugo.](https://gohugo.io/overview/installing/)
Or, if you're on Linux: 

{{< highlight javascript >}}
sudo apt-get install hugo 
{{< /highlight >}}

### 2. Set up your github page

https://pages.github.com/ - They make it really easy. Great job, Github.

### 3. Create your working directory

Once you're inside the github page directory, create a new directory. Name it whatever you want. [Mine is called "hugo".](https://github.com/jongomez/jongomez.github.io) __This is your working directory.__ This is where you add themes, content, layouts, etc. 

### 4. Create your Hugo website

Do this inside your working directory. [Create a Hugo website in under 2 minutes.](https://www.youtube.com/watch?time_continue=62&v=w7Ft2ymGmfc)[ Pick your theme.](https://gohugo.io/themes/installing/) PROTIP: Don't be too picky. They all look great. 

### 5. Change your build path

Open up your Hugo config file (mine is called config.toml), and add the following line:

{{< highlight javascript >}}
publishdir = ".."
{{< /highlight >}}

### 6. Build and push to github

Once inside your working directory, run the command "hugo" - this builds the website. If you followed Step 5, the website will be built on the parent directory AKA your github page directory.

After the website is built, change directory to your parent directory (cd ..) and perform the usual git stuff:

{{< highlight javascript >}}
git add .
git commit -m "This is a message."
git push -u origin master
{{< /highlight >}}

### The end

Hopefully you made it. If you didn't, don't give up. Because...

{{< figure src="https://i.ytimg.com/vi/jTIFSBlHzR8/maxresdefault.jpg" >}}