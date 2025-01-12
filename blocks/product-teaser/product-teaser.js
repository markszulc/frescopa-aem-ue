import { readBlockConfig } from '../../scripts/aem.js';
import { performCatalogServiceQuery, renderPrice, mapProductAcdl } from '../../scripts/commerce.js';

const productTeaserQuery = `query productTeaser($sku: String!) {
  products(skus: [$sku]) {
    sku
    name
}`;


function renderPlaceholder(sku, block) {
  block.textContent = '';
  block.appendChild(document.createRange().createContextualFragment(`
    <div class="image">
      <div class="placeholder"></div>
    </div>
    <div class="details">
      <h1>${sku}</h1>
      <div class="price"></div>
      </div>
  `));
}

function renderProduct(product, block) {

  console.log('renderProduct');
  const {
    name, urlKey, sku, price, priceRange, addToCartAllowed, __typename,
  } = product;

  block.textContent = '';
  const fragment = document.createRange().createContextualFragment(`
    <div class="image">
    </div>
    <div class="details">
      <h1>Product: ${name}</h1>
    </div>
  `);

  block.appendChild(fragment);
}

export default async function decorate(block) {
  console.log('decorate product teaser');
  const props = [...block.children];
  const sku = props[0].textContent.trim();
  console.log(`sku: ${sku}`);

  renderPlaceholder(sku, block);

   const { products } = await performCatalogServiceQuery(productTeaserQuery, {
      sku: [sku],
    });
    // if (!products || !products.length > 0 || !products[0].sku) {
    //   console.error('Product not found');
    //   return;
    // }
    //const [product] = products;
    //console.log('product: ${product}');
    //renderProduct(product, block);
}