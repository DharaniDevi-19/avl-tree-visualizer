import {
  insertAnimated,
  searchAnimated,
  deleteAnimated,
  root
} from "./avl.js";

const svg = document.getElementById("tree");

document.getElementById("insertBtn").onclick = async () => {
  const v = Number(value.value);
  if (!isNaN(v)) await insertAnimated(v, draw, highlight);
};

document.getElementById("searchBtn").onclick = async () => {
  const v = Number(value.value);
  if (!isNaN(v)) await searchAnimated(v, highlight);
};

document.getElementById("deleteBtn").onclick = async () => {
  const v = Number(value.value);
  if (!isNaN(v)) await deleteAnimated(v, draw, highlight);
};

/* ===== DRAW TREE ===== */

function draw() {
  svg.innerHTML = "";
  drawNode(root, 600, 40, 260);
}

function drawNode(node, x, y, gap) {
  if (!node) return;

  if (node.left) drawLine(x, y, x - gap, y + 80);
  if (node.right) drawLine(x, y, x + gap, y + 80);

  drawCircle(node, x, y);

  drawNode(node.left, x - gap, y + 80, gap / 1.6);
  drawNode(node.right, x + gap, y + 80, gap / 1.6);
}

function drawCircle(node, x, y) {
  const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  c.setAttribute("cx", x);
  c.setAttribute("cy", y);
  c.setAttribute("r", 18);
  c.setAttribute("id", node.id);

  const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
  t.setAttribute("x", x);
  t.setAttribute("y", y + 5);
  t.setAttribute("text-anchor", "middle");
  t.textContent = node.val;

  svg.append(c, t);
}

function drawLine(x1, y1, x2, y2) {
  const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
  l.setAttribute("x1", x1);
  l.setAttribute("y1", y1);
  l.setAttribute("x2", x2);
  l.setAttribute("y2", y2);
  svg.appendChild(l);
}

/* ===== HIGHLIGHT ===== */

function highlight(id, cls) {
  const node = document.getElementById(id);
  if (node) {
    node.classList.add(cls);
    setTimeout(() => node.classList.remove(cls), 700);
  }
}
