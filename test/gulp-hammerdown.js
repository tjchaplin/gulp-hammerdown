var File = require('vinyl');
var assert = require('assert');
var gulpHammerdown = require('../index');
var concat = require('concat-stream');
var Readable = require('stream').Readable;

describe("Given we are using gulp-hammerdown",function(){
	describe("When generating markdown",function(){
		describe("When using a Stream",function(){
			var file = new File({
				path : 'any.html',
				contents : stringToStream('<h1>Any Header</h1>')
			});

			it("should generate expected markdown",function(done){
				var hammerdownStream = gulpHammerdown();
				hammerdownStream.write(file);
				assert(file.isStream());

				hammerdownStream.once('data',function(file){
					file.contents.pipe(concat(function(data){
						assert(data.toString() == '# Any Header');
						done();
					}));
				});
			});
			it("should rename path to markdown type",function(done){
					var hammerdownStream = gulpHammerdown();
					hammerdownStream.write(file);

					hammerdownStream.once('data',function(file){
						assert.equal(file.relative,'any.md');
						done();
					});
				});
		});
		describe("When using a Buffer",function(){
			var file = new File({
				path : 'any.html',
				contents : new Buffer('<h1>Any Header</h1>')
			});

			it("should generate expected markdown",function(done){
				var hammerdownStream = gulpHammerdown();
				hammerdownStream.write(file);

				hammerdownStream.once('data',function(file){
					assert(file.contents.toString() == '# Any Header');
					done();
				});
			});
			it("should rename path to markdown type",function(done){
					var hammerdownStream = gulpHammerdown();
					hammerdownStream.write(file);

					hammerdownStream.once('data',function(file){
						assert.equal(file.relative,'any.md');
						done();
					});
				});
		});
	});
});

function stringToStream(string){
    var rs = new Readable();
    rs.push(string);
    rs.push(null);
    
    return rs;
}