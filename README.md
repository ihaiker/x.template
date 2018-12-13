# x.template
gulp template plugins 一个优雅的模板


## Installation

```shell
$ npm install x.template --save
```

## Usage

```javascript
var gulp = require('gulp');
gulp.import = require('x.template');
```


## Example
In your `gulpfile.js`:
```
var gulp = require('gulp'),
xImport = require('x.import');

gulp.task('html', function () {
    gulp.src(['./src/**/*.html', '!./src/layouts/*.html'])
        .pipe(template({ "template":"./src/layouts/template.html"}, {"title": "An elegant template"}))
        .pipe(gulp.dest('build'));
});

```

In your `./src/layouts/template.html`
```html
<html>
<head>
    <title><%=title%></title>
    <%=header%>
</head>
<body>
    <div class="content">
    <%=body%>
    </div>

    <%=scripts%>
</body>
</html>
```

In your `*.html`

`There is no example here, just follow the usual way.`

## License
Apache License 2.0

## history
- v1.2.0
    in your `*.html` add `xargs` tag, This tag is used to set parameters
    ```html
    <xargs key="arg" value="atrValue"/>
    or
    <xargs key="arg">bodyValue</xargs>
    ```
- v1.1.0

  in your `*.html` `body` tag add `template` tag 
  ```html
   <xtemplate src="layout/modal.html" title="the value of param named title">
      the body
   </xtemplate>
  ```
  
  `layouts/modal.html`
  ```html
     <div class="modal">
      <div class="title"><%=title%></div>   
      <div class="content">
      <%=body%>
      </div>
    </div>
  ```
  
  write html
  ```html
    <div class="modal">
      <div class="title">the value of param named title</div>   
      <div class="content">
      the body
      </div>
    </div>
  ```