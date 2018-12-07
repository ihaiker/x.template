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