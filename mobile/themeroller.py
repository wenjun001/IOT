#!/usr/bin/env python
import json

LESS = """/*!
* jQuery Mobile 1.3.2
* Git HEAD hash: 528cf0e96940644ea644096bfeb913ed920ffaef <> Date: Fri Jul 19 2013 22:17:57 UTC
* http://jquerymobile.com
*
* Copyright 2010, 2013 jQuery Foundation, Inc. and other contributors
* Released under the MIT license.
* http://jquery.org/license
*
*/

/* Swatches */
"""

data = json.loads(open('theme.json').read())

_global = data.pop('global')

swatche_tpl = open('theme-swatch.css', 'r').read()
swatche_tpl = swatche_tpl.replace('%', 'POURCENT').replace('/*{', '%(')
swatche_tpl = swatche_tpl.replace('}*/', ')s')

for swatch in data.keys():
    swatch_info = data[swatch]
    swatch_info.update(_global)
    swatch_str = swatche_tpl % swatch_info
    LESS += swatch_str.replace('POURCENT', r'%').replace('-a', '-%s' % swatch)

structure_css_tpl = open('theme-structure.css', 'r').read()
structure_css_tpl = structure_css_tpl.replace('%', 'POURCENT').replace('/*{', '%(').replace('}*/', ')s')
structure_css = structure_css_tpl % _global
LESS += structure_css.replace('POURCENT', r'%')

# TODO: add an option to keep the comments.
# comments doesn't work well with less compiler

open('less/swatches.less', 'w').write(LESS)
