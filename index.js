var gutil = require('gulp-util');
var through = require('through2');
var concat = require('concat-stream');
var hammerdown = require('hammerdown');

module.exports = function gulpHammerdown(options){
	'use strict';

	return through.obj(function (file, enc, cb) {
		var self = this;

		if (file.isNull()) {
			this.push(file);
			return cb();
		}

		var hammerDownStream = hammerdown(options);
		hammerDownStream.on('error',function(error){
			self.emit('error', new gutil.PluginError('gulp-hammerdown', error));
		});

		if (file.isStream()) {
			file.contents = file.contents.pipe(hammerDownStream);
			return onComplete(self,file,cb);
		}

		if(file.isBuffer()){
			hammerDownStream.parse(file.contents).pipe(concat(function(data){
				file.contents = new Buffer(data.toString());
				return onComplete(self,file,cb);
			}));
		}
	}); 
};

var onComplete = function(stream,file,done){
	file.path = gutil.replaceExtension(file.path,'.md');
	stream.push(file);
	return done();
};