var isSet = function (e) {
  return typeof e !== "undefined";
};
var forAll = function (obj, cb) {
  return typeof cb === "function"
    ? obj.forAll(cb)
    : typeof obj === "object"
    ? function (e) {
        obj.forAll(e);
      }
    : undefined;
};
Object.prototype.forAll = function (cb) {
  var self = this,
    key,
    keys = Object.keys(self),
    len = keys.length;
  if (keys.forEach)
    keys.forEach(function (key) {
      cb(self[key], key);
    });
  else for (var i = len; i--; ) cb(self[keys[i]], keys[i]);
};
Array.prototype.uniq = function () {
  obj = {};
  out = [];
  this.forAll(function (e) {
    obj[e] = 0;
  });
  return Object.keys(obj);
};
if (!isSet(Object.jq)) {
  Object.prototype.jq = function (query) {
    return typeof query == "string" ? this.querySelector(query) : undefined;
  };
  var jq = function (obj, query) {
    var res;
    return isSet(query) && (res = obj.jq(query))
      ? res
      : typeof obj == "string"
      ? document.querySelector(obj)
      : undefined;
  };
}
if (!isSet(Object.jqa)) {
  Object.prototype.jqa = function (query) {
    return typeof query == "string" ? this.querySelectorAll(query) : undefined;
  };
  var jqa = function (obj, query) {
    var res;
    return isSet(query) && (res = obj.jqa(query))
      ? res
      : typeof obj == "string"
      ? document.querySelectorAll(obj)
      : undefined;
  };
}
var jEvent = function (ele, e, func, useCapture) {
  if (arguments.length == 4) {
    if (ele.removeEventListener) ele.removeEventListener(e, func, useCapture);
    else if (ele.detachEvent) ele.detachEvent("on" + e, func, useCapture);
    else ele["on" + e] = "";
  } else {
    if (ele.addEventListener) ele.addEventListener(e, func);
    else if (ele.attachEvent) ele.document.attachEvent("on" + e, func);
    else ele["on" + e] = ele["e" + e + func];
  }
};

var insertHTML = function (ele, html) {
  ele.insertAdjacentHTML("beforebegin", html);
};
var XHR = function (url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onreadystatechange = function () {
    return this.readyState == 4 &&
      (this.status == 0 ||
        (this.status >= 200 && this.status < 300) ||
        this.status == 304 ||
        this.status == 1223)
      ? callback(request)
      : null;
  };
  request.send(null);
};
var include = function (url, cssElements, cssDest, disableScripts) {
  var appendScripts = function (cssDest, source) {
    if (!isSet(disableScripts) || !disableScripts) {
      forAll(source)(function (tag) {
        var el = document.createElement("script");
        el.innerHTML = tag.innerHTML;
        forAll(tag.attributes)(function (att) {
          el.setAttribute(att.name, att.value);
        });
        cssDest.appendChild(el);
        tag.parentNode && tag.parentNode.removeChild(tag);
      });
    }
  };
  var doInclude = function (req) {
    var _doc = document.implementation.createHTMLDocument("_doc");
    _doc.documentElement.innerHTML = req.responseText;

    if (!isSet(cssElements) || cssElements == "")
      var content = _doc.jqa("body > *");
    else content = _doc.jqa(cssElements);

    var scripts = jqa("script");
    var myScript = scripts[scripts.length - 1];
    var headScripts = _doc.jqa("head > script");
    appendScripts(jq("head"), headScripts);
    var bodyScripts = _doc.jqa("body > script");

    if (isSet(cssDest)) {
      var destElements = jqa(cssDest);

      if (isSet(destElements)) {
        forAll(destElements)(function (destNode) {
          forAll(content)(function (node) {
            var clonedNode = node.cloneNode();
            clonedNode.innerHTML = node.innerHTML;
            if (clonedNode.tagName == "SCRIPT") {
              appendScripts(destNode, [clonedNode]);
            } else destNode.appendChild(clonedNode);
            clonedNode = null;
          });
        });
      } else
        console.error(
          "include(url,cssElements,cssDest): dest " + dest + " not found!"
        );
    } else {
      forAll(content)(function (node) {
        myScript.parentNode.insertBefore(node, myScript);
      });
      appendScripts(myScript.parentNode, bodyScripts);
    }
    ret = null;
    _doc = null;
  };
  XHR(url, doInclude);
};


function openSlideMenu(){
  document.getElementById('menu').style.marginLeft = '255px';
  document.getElementById('content').style.marginLeft = '0';
}
function closeSlideMenu(){
  document.getElementById('menu').style.marginLeft = '0';
  document.getElementById('content').style.marginLeft = '0';
}



window.addEventListener ('load', function(){
    var node = this;
     setTimeout(function() {
        const loader = document.querySelector('.loader');
        loader.className += ' hidden';
        console.log(loader);
      }, 2000);
});



function closepopup() {
  document.getElementById("popup").style.display = "none";
}



function readMoreLess() {
  var dots = document.getElementById('dots');
  var moreText = document.getElementById('more');
  var btnText = document.getElementById('myBtn');

  if (dots.style.display === 'none') {
    dots.style.display = 'inline';
    btnText.innerHTML = 'Read More';
    moreText.style.display = 'none';
  } else {
    dots.style.display = 'none';
    btnText.innerHTML = 'Read Less';
    moreText.style.display = 'inline';
  }
}

function readMoreLess2() {
  var dots = document.getElementById('dots2');
  var moreText = document.getElementById('more2');
  var btnText = document.getElementById('myBtn2');

  if (dots.style.display === 'none') {
    dots.style.display = 'inline';
    btnText.innerHTML = 'Read More';
    moreText.style.display = 'none';
  } else {
    dots.style.display = 'none';
    btnText.innerHTML = 'Read Less';
    moreText.style.display = 'inline';
  }
}



