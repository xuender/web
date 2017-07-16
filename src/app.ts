import * as $ from 'jquery';
import * as hljs from 'highlight.js';
$(document).ready(function() {
	$('pre code').each(function(i, block) {
		hljs.highlightBlock(block);
	});
});
console.log('测试1');
