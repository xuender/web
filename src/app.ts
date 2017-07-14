import * as jQuery from 'jquery';
console.log('测试1');
console.log(jQuery('body'));

class A {
	s: string;
}

const a = new A();
a.s = 'ff';

console.log('sssf=+', a.s);
