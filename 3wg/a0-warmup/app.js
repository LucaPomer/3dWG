
/*
 * This is app.js which is referenced directly from within
 * a <script> tag in index.html
 */

// 'use strict' means that some strange JavaScript things are forbidden
'use strict';


// this shall be the function that generates a new path object
var makePath = function(connector) {
    /* TODO */

    let connection=" ";
    if (connector){
        connection +=connector;
    }

    let pathWay="";
    let path = function (newPath) {
        if(pathWay==="" && newPath){
            pathWay = newPath;
        }
        else if(newPath){
            pathWay += connection + newPath;
            //console.log(pathWay);
        }
        return pathWay;
    };
   // console.log(path());
    return path;
};


// the main() function is called when the HTML document is loaded
var main = function() {

    /*--- first example ---*/

    var path1 = makePath();

    path1('A'); 
    path1('B');
    path1('C');

    var path2 = makePath('-->');
    path2('Berlin'); 
    path2('München'); 
    path2('Frankfurt');

    console.log('path 1 is ' + path1());
    console.log('path 2 is ' + path2());

    /*--- second example ---*/

    console.log('Hi.');
    
    // sets a timeout and calls the callback function
    // after the timeout. the callback delay is 0(!) milliseconds
    setTimeout(function callback() {
        console.log('Hmm?');
    }, 0);

    console.log('Bye.');
};
