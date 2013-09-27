xPanel
======
xPanel is waypoint shortcut used to create paralax effect while scrolling panels.

## Examples

Here are a few examples:

- [Settings](http://rawgithub.com/drygiel/xPanel/master/examples/settings.html)
- [Colorful](http://rawgithub.com/drygiel/xPanel/master/examples/colorful.html)
- [White](http://rawgithub.com/drygiel/xPanel/master/examples/white.html)

## Installation

1. Include the [waypoints](http://imakewebthings.com/jquery-waypoints/) plugin.
2. Include the CSS stylesheet at the end of **HEAD** element:
```html
<link rel="stylesheet" href="/path/to/xpanel.css" />
```                
3. Include the shortcut script at the end of **BODY** element:                
	```html
	<script src="/path/to/waypoints-xpanel.min.js"></script>
	```

## Usage
         
The most basic usage looks like this:

```js
$('.container-of-panels').waypoint('xpanel');
```
              
It means that xPanel schortcut will be applied to all instances of .container-of-panels class. 
Element with this class is trated as container for panels so it must contain some child elements to notice any effect.

## How it works
It adds additional class 'xpanel' to the container and 'scroll-down' & 'scroll-down' depending on scroll directin at the time. Additionaly depending on your shortcut settings adds classes like 'shadow', 'dim' and 'reverse' too. 
While scrolling child pannels gets class 'in' when panel is incoming into viewport and 'out' when it's outcoming. 
Thats all what JS do. Rest of fun is made by CSS.

## What you can do

After applying the schortcut you can:

-	Destroy it:
	```js                     
	$('.container-of-panels').waypoint('xpanel', 'destroy');
	```
                    
-	Manually refresh it:    
	```js
	$('.container-of-panels').waypoint('xpanel', 'refresh');
	```
                    
-	Change options of it:
	```js             
	$('.container-of-panels').waypoint('xpanel', {
		minHeightScale: 1.05,
		fixJumpyScrolling: true,
		reverse: false,
		shadow: true,
		dim: false,
		whenScrollDown: true,
		whenScrollUp: true,
	});
	```

## Options
-	**minHeightScale**
	Minimum height of panel in relation to viewport. 1 means 100% of viewport, 1.5 means 150% of viewport and so on.

-	**fixJumpyScrolling**
	Scrolling using mousewheel is not smooth in all browsers thus if you want avoid situation when incoming panels jumps into view leave this this option set to true.

-	**reverse**
	By default incoming panels appears in viewport below the outcvoming ones. If you want to apear them above, set it to true.

-	**shadow**
	Adds shadow to the panels.

-	**dim**
	Makes outoming panels darker.

-	**whenScrollDown**
	Enables plugin when scrolling down.

-	**whenScrollUp**
	Enables plugin when scrolling up.


If you to temporary disable shortcut set both opctions whenScrollDown & whenScrollUp to false.
