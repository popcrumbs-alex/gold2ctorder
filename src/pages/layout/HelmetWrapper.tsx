import React from "react";
import { Helmet } from "react-helmet";

const HelmetWrapper = ({
  pageTitle,
  efScript,
}: {
  pageTitle: string;
  efScript: string;
}) => {
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <script
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '355361339685041');
fbq('track', 'Purchase');`,
        }}
      ></script>

      <iframe
        src="https://m.clickbooth.com/l/con?cbiframe=1&oid=79117&cbtid={transaction_id}"
        scrolling="no"
        frameBorder="0"
        width="1"
        height="1"
      ></iframe>
      <iframe
        src="https://cvrdomain.com/l/con?cbiframe=1&oid=79115&cbtid={transaction_id}"
        scrolling="no"
        frameBorder="0"
        width="1"
        height="1"
      ></iframe>

      <script
        dangerouslySetInnerHTML={{
          __html: `!function (w, d, t) {
		  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
		
		  ttq.load('C09I65DOQ3DFKFN94SEG');
		  ttq.page();
		}(window, document, 'ttq');`,
        }}
      ></script>

      <script src="https://www.poptrkr.com/scripts/sdk/everflow.js"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `if (!EF.getTransactionId(EF.urlParameter('oid')) || EF.urlParameter('_ef_transaction_id')) {
    EF.click({
        offer_id: EF.urlParameter('oid'),
        affiliate_id: EF.urlParameter('affid'),
        transaction_id: EF.urlParameter('_ef_transaction_id'),
        sub1: EF.urlParameter('sub1'),
        sub2: EF.urlParameter('sub2'),
        sub3: EF.urlParameter('sub3'),
        sub4: EF.urlParameter('sub4'),
        sub5: EF.urlParameter('sub5'),
        uid: EF.urlParameter('uid'),
		source_id: EF.urlParameter('source_id'),
		creative_id: EF.urlParameter('creative_id'),
    }).then(function(transactionId) {
        if (document.getElementById("cf_contact_affiliate_aff_sub")) {
            document.getElementById('cf_contact_affiliate_aff_sub').value = transactionId
            console.log('Everflow: filled aff_sub with transaction id: ' + transactionId)
        } else {
            console.log('Everflow: aff_sub element not found, relying on loop for transaction id: ' + transactionId)
        }
    });
}
var __checkExist = setInterval(function() {
  if (document.getElementById("cf_contact_affiliate_aff_sub")) {
    var currentAffsub = document.getElementById("cf_contact_affiliate_aff_sub").value;
    var storedTransactionId = EF.getAdvertiserTransactionId(5);
console.log(storedTransactionId, currentAffsub, storedTransactionId)
    if(currentAffsub === 'undefined' || currentAffsub === '' && storedTransactionId) {
        console.log('Everflow: updating aff_sub with persisted transaction id: ' + storedTransactionId)
        clearInterval(__checkExist);
        document.getElementById('cf_contact_affiliate_aff_sub').value = storedTransactionId
    }
  }
}, 200);`,
        }}
      ></script>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: efScript,
        }}
      ></script>

      <script
        async
        src="//loox.io/widget/loox.js?shop=luciana-rose-couture.myshopify.com"
      ></script>
    </Helmet>
  );
};

export default HelmetWrapper;
