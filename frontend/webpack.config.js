var path = require('path');
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var fs = require('fs');

// Create and entry dict
var entries = {}

console.log(path.join(__dirname, 'src', 'js'))

// JSX entrypoints
var folder_pool = [
	path.join(__dirname, 'src', 'js'),
]
// folder_pool = [ '/home/eduardo/coding/projects/bet-app/frontend/src' ]

for (var i = folder_pool.length - 1; i >= 0; i--) {
	var current_folder = folder_pool[i];
	
	// List all the files in the current folder
	var files = fs.readdirSync(path.join(current_folder));
	// files = [ 'components', 'pages', 'index.js', App.js', redux_folder ]

	// Append all the keys to the dict
	for (var j= files.length - 1; j >= 0; j--) {
		var file = files[j];

		if(file.includes('.js')){
			entries[file] = path.join(current_folder, file);
		} else {
			let inside_files = fs.readdirSync(path.join(current_folder, file));
			for (let j= inside_files.length - 1; j >= 0; j--) {
				let inside_file = inside_files[j];
				entries[inside_file] = path.join(path.join(current_folder, file), inside_file);
			}
		}
	}
}

// entries = {
//   'global_reducer.js': '/home/eduardo/coding/projects/bet-app/frontend/src/js/redux_folder/global_reducer.js',
//   'Settings.js': '/home/eduardo/coding/projects/bet-app/frontend/src/js/pages/Settings.js',
//   'SearchPolls.js': '/home/eduardo/coding/projects/bet-app/frontend/src/js/pages/SearchPolls.js',
//   'Poll.js': '/home/eduardo/coding/projects/bet-app/frontend/src/js/pages/Poll.js',
//   'NewPoll.js': '/home/eduardo/coding/projects/bet-app/frontend/src/js/pages/NewPoll.js',
//   'MyPolls.js': '/home/eduardo/coding/projects/bet-app/frontend/src/js/pages/MyPolls.js',
//   'Main.js': '/home/eduardo/coding/projects/bet-app/frontend/src/js/pages/Main.js',
//   'Login.js': '/home/eduardo/coding/projects/bet-app/frontend/src/js/pages/Login.js',
//   'BetPage.js': '/home/eduardo/coding/projects/bet-app/frontend/src/js/pages/BetPage.js',
//   'index.js': '/home/eduardo/coding/projects/bet-app/frontend/src/js/index.js',
//   'Logout.js': '/home/eduardo/coding/projects/bet-app/frontend/src/js/components/Logout.js',
//   'Header.js': '/home/eduardo/coding/projects/bet-app/frontend/src/js/components/Header.js',
//   'App.js': '/home/eduardo/coding/projects/bet-app/frontend/src/js/App.js'
// }

// Get current path
let current_path = path.join(__dirname, '')
// Remove 'frontend' text from the path
let application_path = current_path.replace('frontend', '')
console.log('Application path:', application_path);

module.exports = {
	entry: entries,  
	output: {
		path: path.join(application_path, 'static'),
		filename: (pathData) => {
			let extension = pathData.chunk.name.split('.').pop();
			let name = pathData.chunk.name.replace('.' + extension, '');
            let output_extension = 'js'; // Default output extension

			if (extension === 'js') {
				// eslint-disable-next-line
				output_extension = 'js'
			}
			if (extension === 'css') {
				// eslint-disable-next-line
				output_extension = 'css'
			}
			if (extension === 'tsx') {
				// eslint-disable-next-line
				output_extension = 'tsx'
			}

			return name + '_bundle.' + output_extension
		}
	},  
	plugins: [
		new BundleTracker({
			path: __dirname,
			filename: 'webpack-stats.json'
		})
	],
    module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
			{
                test: /\.(png|jpe?g|gif|webp)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            }
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.css'],
		alias: {
            styles: path.resolve(__dirname, "src/styles/"),
            images: path.resolve(__dirname, "src/img/"),

		}
	},
}