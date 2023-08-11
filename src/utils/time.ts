let hour = new Date().getHours();
let greet = "";
if (hour < 9) {
  greet = "早上好"
} else if (hour < 12) {
  greet = "上午好"
} else if (hour == 12) {
  greet = "中午好"
} else if (hour < 16) {
  greet = "下午好"
} else if (hour < 18) {
  greet = "傍晚好"
} else {
  greet = "晚上好"
}

export default greet;
