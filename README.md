# ColorTransform
webpack plugin for transform colors

Installation
------------
Install the plugin with npm:
```shell
$ npm i colortransform -D
```

Basic Usage
-----------

```javascript

const ColorTransform = require('colortransform');

new ColorTransform({
    // theme name
    navy: {
        originColor: ['#00aa64'],
        finalColor: ['#127fd2']
    }
})

```
