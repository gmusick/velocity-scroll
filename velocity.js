var list;
var containerHeight, listHeight, start;
var listTop = 0;
var mouseDownTime;
var interval;

function init() {
  var container = document.querySelector(".container");
  containerHeight = container.offsetHeight;

  list = document.querySelector(".list");
  listHeight = list.offsetHeight;

  list.addEventListener("mousedown", function(e) {
    clearInterval(interval);

    listTop = parseFloat(list.style.top) || 0;

    start = { x: e.x, y: e.y };
    mouseDownTime = new Date();

    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);
  });
}

function mouseMove(e) {
  var current = { x: e.x, y: e.y };
  var top = listTop + (current.y - start.y);

  if (top > 0) {
    list.style.top = "0px";
  } else if (top < containerHeight - listHeight) {
    list.style.top = (containerHeight - listHeight) + "px";
  } else {
    list.style.top = top + "px";
  }
}

function mouseUp(e) {
  document.removeEventListener("mousemove", mouseMove);
  document.removeEventListener("mouseup", mouseUp);

  var sixtyFPSInterval = 16;

  var distance = e.y - start.y;
  var velocity = distance / (new Date() - mouseDownTime);

  if (Math.abs(velocity) > 0.1) {
    interval = setInterval(function() {
      var normalized = sixtyFPSInterval * velocity;
      scrollWithVelocity(normalized);

      if (velocity < 0) {
        velocity += 0.01;
        if (velocity > 0) {
          clearInterval(interval);
        }
      } else {
        velocity -= 0.01;
        if (velocity < 0) {
          clearInterval(interval);
        }
      }
    }, sixtyFPSInterval);
  } else {
    listTop = parseInt(list.style.top, 10);
  }
}

function scrollWithVelocity(velocity) {
  var top = (parseFloat(list.style.top) + velocity);

  if (top > 0) {
    list.style.top = "0px";
    clearInterval(interval);
  } else if (top < containerHeight - listHeight) {
    list.style.top = (containerHeight - listHeight) + "px";
    clearInterval(interval);
  } else {
    list.style.top = top + "px";
  }
}
