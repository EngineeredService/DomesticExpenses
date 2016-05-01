/**
 * 
 * @param {type} grunt
 * @returns {undefined}
 */

module.exports = function(grunt){
	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),

		watch:{
			options:{livereload:true},
			files:['public/**','routes/**'],
			tasks:[]
		},
  		express:{
  			all:{
  				options:{
  					port:3000,
  					hostname:'localhost',
  					bases:['./public'],
  					livereload:true	
  				}
  			}
  		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');	
	grunt.registerTask('server',['express','watch']);

	};

