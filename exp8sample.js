let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let status = 0; //edge detection
//window.devicePixelRatio=1; //Blury Text
//ctx.fillRect(0, 0, canvas.width, canvas.height);
window.devicePixelRatio = 2; //Clear Text
//(CSS pixels).
//Display width
let width = 1200;
let height = 600;
canvas.style.width = width + "px";
canvas.style.height = height + "px";
// set background colour to black
let scale = window.devicePixelRatio;
canvas.width = Math.floor(width * scale);
canvas.height = Math.floor(height * scale);
ctx.fillRect(0, 0, canvas.width, canvas.height);
//CSS pixels for coordinate systems
ctx.scale(scale, scale);
ctx.font = "10px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
let x = width / 2;
let y = height / 2;
let topleft_rect_x = document.getElementById("cnt-top-left-x").value;
let topleft_rect_y = document.getElementById("cnt-top-left-y").value;
let bottomright_rect_x = document.getElementById("cnt-bottom-right-x").value;
let bottomright_rect_y = document.getElementById("cnt-bottom-right-y").value;
let topleft_ln_x = document.getElementById("ln-top-left-x").value;
let topleft_ln_y = document.getElementById("ln-top-left-y").value;
let bottomright_ln_x = document.getElementById("ln-bottom-right-x").value;
let bottomright_ln_y = document.getElementById("ln-bottom-right-y").value;
let next_button = document.getElementById("next_button");
let submit_button = document.getElementById("submit");
let previous_button = document.getElementById("prev_button");
let text = document.getElementById("text");
let intersection_x, intersection_y;
let first_point = 5; // 1001 // TBRL  0101
let second_point = 10; // 0110 // 1010 0110
let current_point = first_point;
let inside = 0; // 0000
let left_side = 1; // 0001
let right_side = 2; // 0010
let bottom_side = 4; // 0100p
let top_side = 8; // 1000
let is_dark = 0;
let if_completed = 0;
let first_point_status = 0;
let no_of_iterations = 0,
  transition_iteration = 0;
function grid() {
  ctx.fillStyle = "red";
  ctx.font = "18px serif";
  ctx.fillText(
    "(" + topleft_rect_x + "," + topleft_rect_y + ")",
    topleft_rect_x - 30,
    topleft_rect_y - 10
  );
  ctx.fillStyle = "red";
  ctx.font = "18px serif";
  ctx.fillText(
    "(" + topleft_rect_x + "," + bottomright_rect_y + ")",
    topleft_rect_x - 30,
    bottomright_rect_y - 10
  );
  ctx.fillStyle = "red";
  ctx.font = "18px serif";
  ctx.fillText(
    "(" + bottomright_rect_x + "," + topleft_rect_y + ")",
    bottomright_rect_x - 30,
    topleft_rect_y - 10
  );
  ctx.fillStyle = "red";
  ctx.font = "18px serif";
  ctx.fillText(
    "(" + bottomright_rect_x + "," + bottomright_rect_y + ")",
    bottomright_rect_x - 30,
    bottomright_rect_y - 10
  );
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, height);
  // make line thicker
  ctx.lineWidth = 3;
  ctx.strokeStyle = "yellow";
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(topleft_rect_x, 0);
  ctx.lineTo(topleft_rect_x, height);
  // make line thicker
  ctx.lineWidth = 3;
  ctx.strokeStyle = "yellow";
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(bottomright_rect_x, 0);
  ctx.lineTo(bottomright_rect_x, height);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "yellow";
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(width, 0);
  // make line thicker
  ctx.lineWidth = 3;
  ctx.strokeStyle = "yellow";
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, topleft_rect_y);
  ctx.lineTo(width, topleft_rect_y);
  // make line thicker
  ctx.lineWidth = 3;
  ctx.strokeStyle = "yellow";
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, bottomright_rect_y);
  ctx.lineTo(width, bottomright_rect_y);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "yellow";
  ctx.stroke();
}
// take user input
function line(colour) {
  ctx.beginPath();
  //ctx.fillRect(bottomright_ln_x,bottomright_ln_x,bottomright_ln_y,bottomright_ln_y);
  ctx.fillStyle = "red";
  ctx.font = "18px serif";
  ctx.fillText(
    "(" + topleft_ln_x + "," + topleft_ln_y + ")",
    topleft_ln_x,
    topleft_ln_y - 10
  );
  ctx.fillStyle = "red";
  ctx.font = "18px serif";
  ctx.fillText(
    "(" + bottomright_ln_x + "," + bottomright_ln_y + ")",
    bottomright_ln_x,
    bottomright_ln_y - 10
  );
  ctx.moveTo(topleft_ln_x, topleft_ln_y);
  ctx.lineTo(bottomright_ln_x, bottomright_ln_y);
  // make line thicker
  ctx.lineWidth = 3;
  ctx.strokeStyle = colour;
  ctx.stroke();
}
function main() {
  grid();
  line("white");
}
function check() {
  console.log(current_point, top_side, current_point & top_side);
  if (current_point == 0 && first_point_status == 1) {
    ctx.beginPath();
    //ctx.setLineDash([5, 6]); //dashed line
    ctx.moveTo(topleft_rect_x, topleft_rect_y);
    ctx.lineTo(topleft_rect_x, bottomright_rect_y);
    // make line thicker
    ctx.lineWidth = 3;
    ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(bottomright_rect_x, topleft_rect_y);
    ctx.lineTo(bottomright_rect_x, bottomright_rect_y);
    // make line thicker
    ctx.lineWidth = 3;
    ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(topleft_rect_x, topleft_rect_y);
    ctx.lineTo(bottomright_rect_x, topleft_rect_y);
    // make line thicker
    ctx.lineWidth = 3;
    ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(topleft_rect_x, bottomright_rect_y);
    ctx.lineTo(bottomright_rect_x, bottomright_rect_y);
    // make line thicker
    ctx.lineWidth = 3;
    ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(topleft_ln_x, topleft_ln_y);
    ctx.lineTo(bottomleft_ln_x, bottomright_ln_y);
    // make line thicker
    ctx.lineWidth = 3;
    ctx.strokeStyle = "green";
    ctx.stroke();
  }
  if (current_point == 0) {
    current_point = second_point;
    first_point_status = 1;
    transition_iteration = no_of_iterations;
  }

  console.log(status);
  if (current_point == 0 && second_point == 0) {
    alert("The line is clipped");
  }
  if (status == 0) {
    if (is_dark == 0) {
      // text.innerHTML =
      //"Clipping through left edge";
      console.log("dark");
      ctx.beginPath();
      //ctx.setLineDash([5, 6]); //dashed line
      ctx.moveTo(topleft_rect_x, topleft_rect_y);
      ctx.lineTo(topleft_rect_x, bottomright_rect_y);
      // make line thicker
      ctx.lineWidth = 3;
      ctx.strokeStyle = "violet";
      ctx.stroke();
      is_dark = 1;
    } else {
      if ((left_side & current_point) != 0) {
        intersection();
        if_completed++;
      }
      ctx.beginPath();
      //ctx.setLineDash([5, 6]); //dashed line
      console.log(topleft_rect_x, bottomright_rect_y);
      ctx.moveTo(topleft_rect_x, topleft_rect_y);
      ctx.lineTo(topleft_rect_x, bottomright_rect_y);
      // make line thicker
      ctx.lineWidth = 3;
      ctx.strokeStyle = "yellow";
      ctx.stroke();
      status = 1;
      is_dark = 0;
    }
  } else if (status == 1) {
    if (is_dark == 0) {
      console.log("dark");
      ctx.beginPath();
      //ctx.setLineDash([5, 6]); //dashed line
      ctx.moveTo(bottomright_rect_x, topleft_rect_y);
      ctx.lineTo(bottomright_rect_x, bottomright_rect_y);
      // make line thicker
      ctx.lineWidth = 3;
      ctx.strokeStyle = "violet";
      ctx.stroke();
      is_dark = 1;
    } else {
      if ((right_side & current_point) != 0) {
        if_completed++;
        intersection();
      }
      ctx.beginPath();
      //ctx.setLineDash([5, 6]); //dashed line
      ctx.moveTo(bottomright_rect_x, topleft_rect_y);
      ctx.lineTo(bottomright_rect_x, bottomright_rect_y);
      // make line thicker
      ctx.lineWidth = 3;
      ctx.strokeStyle = "yellow";
      ctx.stroke();
      status = 2;
      is_dark = 0;
    }
  } else if (status == 2) {
    if (is_dark == 0) {
      console.log("dark");
      ctx.beginPath();
      //ctx.setLineDash([5, 6]); //dashed line
      ctx.moveTo(topleft_rect_x, bottomright_rect_y);
      ctx.lineTo(bottomright_rect_x, bottomright_rect_y);
      // make line thicker
      ctx.lineWidth = 3;
      ctx.strokeStyle = "violet";
      ctx.stroke();
      is_dark = 1;
    } else {
      console.log(bottom_side, current_point);
      if ((bottom_side & current_point) != 0) {
        if_completed++;
        intersection();
      }
      ctx.beginPath();
      //ctx.setLineDash([5, 6]); //dashed line
      ctx.moveTo(topleft_rect_x, bottomright_rect_y);
      ctx.lineTo(bottomright_rect_x, bottomright_rect_y);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "yellow";
      ctx.stroke();
      status = 3;
      is_dark = 0;
    }
  } else if (status == 3) {
    console.log(top_side);
    console.log(current_point);
    if (is_dark == 0) {
      console.log("dark");
      ctx.beginPath();
      //ctx.setLineDash([5, 6]); //dashed line
      ctx.moveTo(topleft_rect_x, topleft_rect_y);
      ctx.lineTo(bottomright_rect_x, topleft_rect_y);
      // make line thicker
      ctx.lineWidth = 3;
      ctx.strokeStyle = "violet";
      ctx.stroke();
      is_dark = 1;
    } else {
      if ((top_side & current_point) != 0) {
        if_completed++;
        console.log(top_side);
        intersection();
      }
      ctx.beginPath();
      //ctx.setLineDash([5, 6]); //dashed line
      ctx.moveTo(topleft_rect_x, topleft_rect_y);
      ctx.lineTo(bottomright_rect_x, topleft_rect_y);
      // make line thicker
      ctx.lineWidth = 3;
      ctx.strokeStyle = "yellow";
      ctx.stroke();
      status = 0;
      is_dark = 0;
    }
  }
}

function intersection() {
  // find the intersection of point with the line edges
  if (status == 0) {
    let slope =
      (bottomright_ln_y - topleft_ln_y) / (bottomright_ln_x - topleft_ln_x);
    let y_intercept = topleft_ln_y - slope * topleft_ln_x;
    intersection_y = slope * topleft_rect_x + y_intercept;
    intersection_x = topleft_rect_x;
    // (intersection_x,intersection_y) represents the point of intersection
    ctx.beginPath();
    //ctx.setLineDash([5, 6]); //dashed line
    if (first_point_status == 0) {
      ctx.moveTo(topleft_ln_x, topleft_ln_y);
    } else {
      ctx.moveTo(bottomright_ln_x, bottomright_ln_y);
    }
    ctx.lineTo(intersection_x, intersection_y);
    // make line thicker
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#606060";
    ctx.stroke();
    current_point = current_point & (15 - left_side); // 1001 & (1110) = (1000)
  } else if (status == 1) {
    let slope =
      (bottomright_ln_y - topleft_ln_y) / (bottomright_ln_x - topleft_ln_x);
    let y_intercept = topleft_ln_y - slope * topleft_ln_x;
    intersection_y = slope * bottomright_rect_x + y_intercept;
    intersection_x = bottomright_rect_x;
    // (intersection_x,intersection_y) represents the point of intersection
    ctx.beginPath();
    // ctx.setLineDash([5, 6]); //dashed line
    //ctx.moveTo(topleft_ln_x, topleft_ln_y);
    if (first_point_status == 0) {
      ctx.moveTo(topleft_ln_x, topleft_ln_y);
    } else {
      ctx.moveTo(bottomright_ln_x, bottomright_ln_y);
    }
    ctx.lineTo(intersection_x, intersection_y);
    // make line thicker
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#606060";
    ctx.stroke();
    current_point = current_point & (15 - right_side);
  } else if (status == 2) {
    let slope =
      (bottomright_ln_y - topleft_ln_y) / (bottomright_ln_x - topleft_ln_x);
    let y_intercept = topleft_ln_y - slope * topleft_ln_x;
    intersection_x = (bottomright_rect_y - y_intercept) / slope;
    intersection_y = bottomright_rect_y;
    // (intersection_x,intersection_y) represents the point of intersection
    ctx.beginPath();
    //  ctx.setLineDash([5, 6]); //dashed line
    //ctx.moveTo(topleft_ln_x, topleft_ln_y);
    if (first_point_status == 0) {
      ctx.moveTo(topleft_ln_x, topleft_ln_y);
    } else {
      ctx.moveTo(bottomright_ln_x, bottomright_ln_y);
    }
    ctx.lineTo(intersection_x, intersection_y);
    // make line thicker
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#606060";
    ctx.stroke();
    current_point = current_point & (15 - bottom_side);
  } else if (status == 3) {
    let slope =
      (bottomright_ln_y - topleft_ln_y) / (bottomright_ln_x - topleft_ln_x);
    let y_intercept = topleft_ln_y - slope * topleft_ln_x;
    intersection_x = (topleft_rect_y - y_intercept) / slope;
    intersection_y = topleft_rect_y;
    // (intersection_x,intersection_y) represents the point of intersection
    ctx.beginPath();
    // ctx.setLineDash([5, 6]); //dashed line
    // ctx.moveTo(topleft_ln_x, topleft_ln_y);
    if (first_point_status == 0) {
      ctx.moveTo(topleft_ln_x, topleft_ln_y);
    } else {
      ctx.moveTo(bottomright_ln_x, bottomright_ln_y);
    }
    ctx.lineTo(intersection_x, intersection_y);
    // make line thicker
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#606060";
    ctx.stroke();
    console.log(current_point);
    current_point = current_point & (15 - top_side); // 1111 - 1000 = 0111 & 1000 = 0000
    console.log("Hello");
    console.log(current_point);
  }
}

main();

next_button.addEventListener("click", () => {
  ctx.save();
  no_of_iterations++;
  check();
});
previous_button.addEventListener("click", () => {
  no_of_iterations--;
  // print the image data stored in canvas
  ctx.restore();
});
submit_button.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  topleft_rect_x = document.getElementById("cnt-top-left-x").value;
  topleft_rect_y = document.getElementById("cnt-top-left-y").value;
  bottomright_rect_x = document.getElementById("cnt-bottom-right-x").value;
  bottomright_rect_y = document.getElementById("cnt-bottom-right-y").value;
  topleft_ln_x = document.getElementById("ln-top-left-x").value;
  topleft_ln_y = document.getElementById("ln-top-left-y").value;
  bottomright_ln_x = document.getElementById("ln-bottom-right-x").value;
  bottomright_ln_y = document.getElementById("ln-bottom-right-y").value;
  //TBRL
  first_point = 0;
  second_point = 0;
  // first_point = change_firstpoint();
  // second_point = change_secondpoint();
  // console.log(first_point);
  if (topleft_ln_x - topleft_rect_x < 0) {
    first_point = first_point + Math.pow(2, 0);
  }
  if (topleft_ln_x - bottomright_rect_x > 0) {
    first_point = first_point + Math.pow(2, 1);
  }
  if (topleft_ln_y - bottomright_rect_y > 0) {
    first_point = first_point + Math.pow(2, 2);
  }
  if (topleft_ln_y - topleft_rect_y < 0) {
    first_point = first_point + Math.pow(2, 3);
  }

  if (bottomright_ln_x - topleft_rect_x < 0) {
    second_point = second_point + Math.pow(2, 0);
  }
  if (bottomright_ln_x - bottomright_rect_x > 0) {
    second_point = second_point + Math.pow(2, 1);
  }
  if (bottomright_ln_y - bottomright_rect_y > 0) {
    second_point = second_point + Math.pow(2, 2);
  }
  if (bottomright_ln_y - topleft_rect_y < 0) {
    second_point = second_point + Math.pow(2, 3);
  }

  if (first_point_status == 0) {
    current_point = first_point;
  } else {
    current_point = second_point;
  }
  console.log(first_point);
  console.log(second_point);

  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fill();
  grid();
  line("white");
});

//check();
//intersection();

//ctx.fillStyle = "yellow";
