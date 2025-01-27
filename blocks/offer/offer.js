/* eslint-disable no-underscore-dangle */
export default async function decorate(block) {
  const aempublishurl = 'https://publish-p137825-e1511252.adobeaemcloud.com';
  const aemauthorurl = 'https://author-p137825-e1511252.adobeaemcloud.com';
  const persistedquery = '/graphql/execute.json/frescopa/OfferByPath';
  const offerpath = block.querySelector(':scope div:nth-child(1) > div a').innerHTML.trim();
  const variationname = block.querySelector(':scope div:nth-child(2) > div').innerHTML.trim();

  const url = window.location && window.location.origin && window.location.origin.includes('author')
    ? `${aemauthorurl}${persistedquery};path=${offerpath};variation=${variationname};ts=${Math.random() * 1000}`
    : `${aempublishurl}${persistedquery};path=${offerpath};variation=${variationname};ts=${Math.random() * 1000}`;
  const options = { credentials: 'include' };

  const cfReq = await fetch(url, options)
    .then((response) => response.json())
    .then((contentfragment) => {
      let offer = '';
      if (contentfragment.data) {
        offer = contentfragment.data.offerByPath.item;
      }
      return offer;
    });

  const itemId = `urn:aemconnection:${offerpath}/jcr:content/data/master`;

  block.innerHTML = `
  <div class='offer-content' data-aue-resource=${itemId} data-aue-type="reference" data-aue-filter="cf">
    <div class='offer-background'> 
        <img data-aue-prop="image" data-aue-type="image" src='${cfReq.heroImage._publishUrl}' alt='Nice image'>
    </div>
    <div class='offer-foreground'>
      <div class='message'>
        <h3 data-aue-prop="headline" data-aue-type="text" class='pretitle'>${cfReq.headline}</h3>
        <p data-aue-prop="detail" data-aue-type="richtext" class='detail'>${cfReq.detail.plaintext}</p>
      </div>
      <div class='cta'><a href="#" title="Take Our Coffee Quiz" class="button secondary">${cfReq.callToAction}</a></div>
    </div>
  </div>
`;
}
