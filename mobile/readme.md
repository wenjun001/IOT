# Bootstrap jQuery Mobile Theme

A jQuery Mobile theme based on Bootstrap.
You can find a demo at http://makinacorpus.github.io/jQuery-Mobile-Bootstrap-Theme/

This theme overrides the existing jQuery Mobile A - F swatches using
variable.less file from twitter bootstrap.

Jquery Mobile Theme 1.3.2 with Bootstrap 3.0.2 Variables.

This theme takes it's origin from
https://github.com/commadelimited/jQuery-Mobile-Bootstrap-Theme
but we have added several features to build it so you can reuse the tools behind:

* themeroller that generate the less file
* use grunt & bower to build the css

In it's way it's far easier to maintains.

# How to use ?

You can just grab the dist folder to get the theme based on bootstrap3.

If you want to make jQuery mobile theme fit your bootstrap theme, you can build it.

# How to build

We have created our own theme roller using python (themeroller.py script).
You can fill the data in `theme.json` file and the execute themeroller.

This update the file under less/swatches.less so you can build the css using
grunt. This assume you have already installed nodejs, grunt and bower.

* npm install
* bower install
* grunt

Then you can copy the results from the dist folder.

# Credits

* [Makina Corpus](http://www.makina-corpus)
* [Samuel MARTIN](https://github.com/samaradona)
* [Jean-Michel FRANCOIS](https://github.com/toutpt)

# Screenshot

[View the demo](http://makinacorpus.github.io/jQuery-Mobile-Bootstrap-Theme/)

![Swatches A - F](http://makinacorpus.github.io/jQuery-Mobile-Bootstrap-Theme/dist/images/ABCDEF.png)
