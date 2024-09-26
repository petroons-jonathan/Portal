// Make the DIV element draggable:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var isMouseDown = false;
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

  if (document.getElementById("mydivheader")) {
    // if present, the header is where you move the DIV from:
    document.getElementById("mydivheader").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

    // set the cursor property to "wait" during the drag:
    document.getElementById("mydivheader").style.cursor = "url(assets/img/watch0.png), auto";

    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;

    // store the initial position relative to the element:
    pos1 = pos3 - elmnt.offsetLeft;
    pos2 = pos4 - elmnt.offsetTop;

    isMouseDown = true;

    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    if (!isMouseDown) return; // stop dragging if mouse button is not down
    e = e || window.event;
    e.preventDefault();

    // set the mouse cursor position to the initial click position:
    e.clientX = pos3;
    e.clientY = pos4;

    // calculate the new cursor position:
    pos3 = e.clientX;
    pos4 = e.clientY;

    // calculate the new element position:
    var newLeft = pos3 - pos1;
    var newTop = pos4 - pos2;

    // get the limiting container element:
    var limitingDiv = document.getElementById("limitingDiv");

    // set the maximum values for left and top positions:
    var maxLeft = limitingDiv.offsetWidth - elmnt.offsetWidth;
    var maxTop = limitingDiv.offsetHeight - elmnt.offsetHeight;

    // ensure the new position is within the boundaries:
    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    // set the element's new position:
    elmnt.style.left = newLeft + "px";
    elmnt.style.top = newTop + "px";
  }

  function closeDragElement() {
    // stop moving when the mouse button is released:
    isMouseDown = false;
    document.onmouseup = null;
    document.onmousemove = null;

    // set the cursor property to "default" after the drag:
    document.getElementById("mydivheader").style.cursor = "default";
  }
}
