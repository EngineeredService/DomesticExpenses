/**
 * 
 * @param {type} grunt
 * @returns {undefined}
 */

module.exports = function(grunt){
        
	grunt.initConfig({
            
            shell: {
                mongodb: {
                    command: 'mongod --dbpath ./data/db',
            options: {
            async: true,
            stdout: false,
            stderr: true,
            failOnError: true,
            execOptions: {
                cwd: '.'
                 }
                }
               }
              },
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

