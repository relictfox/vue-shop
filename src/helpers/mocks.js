const productList = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt minus eaque quaerat placeat odio deleniti sequi ullam illum doloremque enim. Tenetur doloremque nulla ex obcaecati eum pariatur laboriosam inventore suscipit.',
    image: 'https://klike.net/uploads/posts/2019-05/1556708032_1.jpg',
    price: 1000
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt minus eaque quaerat placeat odio deleniti sequi ullam illum doloremque enim. Tenetur doloremque nulla ex obcaecati eum pariatur laboriosam inventore suscipit.',
    image: 'https://klike.net/uploads/posts/2019-05/1556708032_1.jpg',
    price: 1100
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt minus eaque quaerat placeat odio deleniti sequi ullam illum doloremque enim. Tenetur doloremque nulla ex obcaecati eum pariatur laboriosam inventore suscipit.',
    image: 'https://klike.net/uploads/posts/2019-05/1556708032_1.jpg',
    price: 1200
  },
  {
    id: 4,
    name: 'Product 4',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt minus eaque quaerat placeat odio deleniti sequi ullam illum doloremque enim. Tenetur doloremque nulla ex obcaecati eum pariatur laboriosam inventore suscipit.',
    image: 'https://klike.net/uploads/posts/2019-05/1556708032_1.jpg',
    price: 1300
  },
];

function getProductList() {
  return new Promise((resolve) => {
    setTimeout(() => { resolve(productList); }, 2500);
  });
}

export { getProductList };