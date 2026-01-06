export class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.height = 1;
    this.id = Math.random().toString(36).slice(2);
  }
}

export let root = null;
const delay = ms => new Promise(r => setTimeout(r, ms));

const h = n => (n ? n.height : 0);
const bf = n => (n ? h(n.left) - h(n.right) : 0);

const rightRotate = y => {
  const x = y.left;
  y.left = x.right;
  x.right = y;
  y.height = Math.max(h(y.left), h(y.right)) + 1;
  x.height = Math.max(h(x.left), h(x.right)) + 1;
  return x;
};

const leftRotate = x => {
  const y = x.right;
  x.right = y.left;
  y.left = x;
  x.height = Math.max(h(x.left), h(x.right)) + 1;
  y.height = Math.max(h(y.left), h(y.right)) + 1;
  return y;
};

/* INSERT */
export async function insertAnimated(val, draw, highlight) {
  async function insert(node) {
    if (!node) return new Node(val);
    highlight(node.id, "insert");
    await delay(500);

    if (val < node.val) node.left = await insert(node.left);
    else if (val > node.val) node.right = await insert(node.right);

    node.height = 1 + Math.max(h(node.left), h(node.right));
    const b = bf(node);

    if (b > 1 && val < node.left.val) return rightRotate(node);
    if (b < -1 && val > node.right.val) return leftRotate(node);
    if (b > 1 && val > node.left.val) {
      node.left = leftRotate(node.left);
      return rightRotate(node);
    }
    if (b < -1 && val < node.right.val) {
      node.right = rightRotate(node.right);
      return leftRotate(node);
    }
    return node;
  }
  root = await insert(root);
  draw();
}

/* SEARCH */
export async function searchAnimated(val, highlight) {
  let cur = root;
  while (cur) {
    highlight(cur.id, "search");
    await delay(600);
    if (cur.val === val) {
      highlight(cur.id, "found");
      return;
    }
    cur = val < cur.val ? cur.left : cur.right;
  }
  alert("Not Found");
}

/* DELETE */
export async function deleteAnimated(val, draw, highlight) {
  const min = n => (n.left ? min(n.left) : n);

  async function del(node) {
    if (!node) return null;
    highlight(node.id, "delete");
    await delay(500);

    if (val < node.val) node.left = await del(node.left);
    else if (val > node.val) node.right = await del(node.right);
    else {
      if (!node.left || !node.right) return node.left || node.right;
      const t = min(node.right);
      node.val = t.val;
      node.right = await del(node.right);
    }

    node.height = 1 + Math.max(h(node.left), h(node.right));
    const b = bf(node);

    if (b > 1 && bf(node.left) >= 0) return rightRotate(node);
    if (b > 1 && bf(node.left) < 0) {
      node.left = leftRotate(node.left);
      return rightRotate(node);
    }
    if (b < -1 && bf(node.right) <= 0) return leftRotate(node);
    if (b < -1 && bf(node.right) > 0) {
      node.right = rightRotate(node.right);
      return leftRotate(node);
    }
    return node;
  }
  root = await del(root);
  draw();
}
