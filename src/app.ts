import * as jQuery from 'jquery';
import * as CodeMirror from 'codemirror';

jQuery(document).ready(function() {
	CodeMirror(jQuery('pre')[0], {
		value: jQuery('pre').text(),
		mode: 'javascript'
	});
});
console.log('测试1');
