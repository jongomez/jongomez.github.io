+++

photosourcetext = ""
photosourcehref = ""
photosourcecolor = ""

author = "Jon Gomez"
menucolor = "white"

comments = true

date = "2020-10-15T12:04:47+01:00"
draft = false
image = "media/ragdolls/Vita.png"
share = true
slug = "ragdolls"
tags = ["JavaScript"]
title = "ragdoll.js"
excerpt = "Ragdolls for the web"

header = "ragdoll.js"
subheader = "Ragdolls for the web"

textshadow = true

js = [""]
mathjax = false

+++

{{< br >}}
{{< /br >}}

In this post I'll talk about some of the lessons I learned while making [ragdoll.js](https://github.com/jongomez/ragdoll.js). But, before going any further, here's an example of the lib in action:

<iframe src="https://playground.babylonjs.com/#40AH5S" style="width: 100%; height: 550px;"></iframe>

{{< br >}}
{{< /br >}}

{{< br >}}
{{< /br >}}

#### Joints aren't really that complicated

When I first looked at the [BabylonJS Joints page](https://doc.babylonjs.com/how_to/joints), I got a bit scared. Some of the joints received arguments like 

- mainAxis: Vector3; the first axis.
- connectedAxis: Vector3; the second axis.
- mainPivot: Vector3; the pivot point for the main body.
- connectedPivot: Vector3; the pivot point for the connected body, the negative of the connected body's position.

I mean... I guess I understand some words. [They have a great page explaining how to use these axes and points.](https://doc.babylonjs.com/how_to/joint_pivots). This helped. But still, they have aproximately 10 examples in that page... and that's only for the HingeJoint. There is a total of 8 joints in BabylonJS, I believe, and the same joint can behave differently according to the physics engine we're using. This was a lot to take in, and at the time made a bit weary about using joints. Looking back though, there was no reason to be weary at all. The main things to remember are:

- The main pivot point is where the "joint" happens, i.e. the main rotation point.
- The connected pivot point defines how far away the child mesh is from the main pivot point. It's kinda like a rotation radius.
- The mainAxis is usually equal to the connectedAxis, and defines how to the rotation happens: along the X, Y or Z axis. 
- Both of the main pivots and axes are defined in the parent mesh's local coordinate system. 
- I've used the terms "parent mesh" and "child mesh" here. The parent mesh is the mesh with the impostor where .addJoint is called, for example: parentMesh.physicsImpostor.addJoint(childMesh.physicsImpostor, joint). I've also seen them refered to as "connected body/mesh" and "main body/mesh", respectively. 

#### Don't be afraid to look at the BabylonJS source code

The BabylonJS main file has aproximately 150,000 lines of code. The code has a lot of mathematical operations that are a bit hard to read, stuff like quaternion operations, crazy matrix multiplications and so on. However, the code also has a lot functions that are fairly easy to understand, and can provide great insights on what BabylonJS is doing behind the scenes.

I used to have some issues navigating the source code. For example, if I wanted to find the bone's getWorldMatrix() function, I would search for 'getWorldMatrix'. This returns 100+ search results. What I do now is: when looking for a function, I'll search for: 'functionName ='. That ' =' at the end makes all the difference. Searching for 'getWorldMatrix =' yields only 7 results, making it much easier to find the function I'm looking for.

#### Bones' local axes

For some reason, I thought the bone's local Y axis was always aligned with the bone direction (from head to tail... let's call this the bone's natural direction). In all armatures. However, when I started configuring [the Dude model](https://playground.babylonjs.com/#WMJTNK), I noticed the bone's natural direction was aligned with the X axis, instead of the Y. Okay, so I thought every bone's natural directions were aligned with either the X, Y or Z axis, depending on the armature. This was a wrong assumption as well, because once I started configuring [the Dummy model](https://playground.babylonjs.com/#PVKQM1), I saw that the bone's local axes were fixed, no matter the bone's natural direction. So the lesson here was make no assumptions about the bone's local axis. They vary from armature to armature... and possibly from bone to bone, in the same armature. 

#### Add/subtract rotations with quaternions

I've gotten some serious headaches dealing with 3D rotations. Having said that, I found these two operations to be lifesavers:

- Rotation addition by multiplying quaternions.

- Rotation subtraction by multiplying by the quaternion inverse.

I also found that working with quaternions, always in the world space, helped a lot. BabylonJS does this in some functions like syncImpostorWithBone.

#### Default joints and limits

When I started working on ragdolls, [I found this playground with joints limits.](https://www.babylonjs-playground.com/#8PQK71#2) They're using a PointToPointJoint with a min and max limit. I thought "well, OimoJS seems to have PointToPointJoints, and these joints support limits". Clearly, they're working well on that playground. I believed this for like a week... until I looked at the BabylonJS source code, and found out that OimoJS does not have point to point joints. How can this be? The physics engine doesn't have these joints, and everything is working smoothly on the playground? Turns out, when an OimoJS joint doesn't exist, BabylonJS defaults to using the HingeJoint. And that is in fact the joint we're seeing on the playground. Which is one of the few joints that support limits (for OimoJS).

Joint limits are super important. They make configuring ragdolls much much easier. It's a shame they only exist for some joints/physics engines.

#### Some ideas that didn't work

One of the ideas I had was: create a parent mesh in each of the bone's origin point (let's call it origin mesh), and create a joint between that mesh and the collider mesh that controlled the bone. Do this for every bone. In other words, a bone would act like an isolated system, containing only a joint between the origin mesh and the collider mesh. The final result was... weird. Mainly because there was no joints between bones. Meaning, if I applied an impulse to the foot, it would stay in the foot. In real life, this impulse would propagate throught the legs, torso, and possibly through the head if strong enough.  

Another idea that didn't work was using BallAndSocket joints, but restricting the "twist" rotation of the collider meshes. We don't want bones to twist 360 degrees, that would look painful. I tried to make this "twist" restriction, but couldn't get it to work. Altough I think if I tried a bit harder I could probably make this work... probably.

And that's about it. I learned a bunch of other stuff, but these were the most memorable lessons.