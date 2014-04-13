gulp-hammerdown
===============

> Gulp plugin for using [hammerdown](https://github.com/tjchaplin/hammerdown) (A markdown to html generator) 

*Issues with the output should be reported on the hammerdown [issue tracker](https://github.com/tjchaplin/hammerdown/issues).*


## Install

```bash
$ npm install --save-dev gulp-hammerdown
```

## Usage

```js
var gulp = require('gulp');
var hammerdown = require('gulp-hammerdown');

gulp.task('documentation', function () {
	return gulp.src('./src/*.html')
		.pipe(hammerdown())
		.pipe(gulp.dest('./markdown/'));
});
```
## API

### hammerdown(options)

See the hammerdown [options](https://github.com/tjchaplin/hammerdown#options).

## License

[MIT](http://opensource.org/licenses/MIT) © [Tim Chaplin](https://github.com/tjchaplin)