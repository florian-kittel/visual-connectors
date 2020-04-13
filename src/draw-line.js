function drawLine() {
  var elms = document.getElementsByClassName("element");
  var elm1 = elms[0];
  var elm2 = elms[1];

  var startTop = elm1.offsetTop + (elm1.offsetHeight / 2);
  var startLeft = elm1.offsetLeft + (elm1.offsetWidth);

  var endTop = elm2.offsetTop + (elm1.offsetHeight / 2);
  var endLeft = elm2.offsetLeft;

  var c = document.getElementById("myCanvas");
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(startLeft, startTop);
  ctx.lineTo(startLeft + (endLeft - startLeft) / 2, startTop);
  ctx.lineTo(startLeft + (endLeft - startLeft) / 2, endTop);
  ctx.lineTo(endLeft, endTop);
  ctx.stroke();

}

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV: 
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = calcVal(elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = calcVal(elmnt.offsetLeft - pos1) + "px";
    drawLine();
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function calcVal(val) {
    // console.log(Math.round(val / 20) * 20);
    return Math.round(val / 20) * 20;
  }
}


drawLine();

dragElement(document.getElementById("dragger"));
dragElement(document.getElementById("dragger2"));
