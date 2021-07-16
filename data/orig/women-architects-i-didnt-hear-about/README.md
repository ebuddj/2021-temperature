# Some of the WOMEN ARCHITECTS AND DESIGNERS I didn't hear about at university

https://observablehq.com/@carmen-tm/women-architects-i-didnt-hear-about@1921

View this notebook in your browser by running a web server in this folder. For
example:

~~~sh
npx http-server
~~~

Or, use the [Observable Runtime](https://github.com/observablehq/runtime) to
import this module directly into your application. To npm install:

~~~sh
npm install @observablehq/runtime@4
npm install https://api.observablehq.com/@carmen-tm/women-architects-i-didnt-hear-about.tgz?v=3
~~~

Then, import your notebook and the runtime as:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "@carmen-tm/women-architects-i-didnt-hear-about";
~~~

To log the value of the cell named “foo”:

~~~js
const runtime = new Runtime();
const main = runtime.module(define);
main.value("foo").then(value => console.log(value));
~~~
