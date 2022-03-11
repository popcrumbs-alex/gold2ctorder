import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useParams } from "@reach/router";
import { parse } from "querystring";
const HelmetWrapper = ({
  pageTitle,
  efScript,
}: {
  pageTitle: string;
  efScript: string;
}) => {
  const location: any = useLocation();

  const isFromOrderPage: boolean = location?.state?.fromOrderPage || false;

  const urlParams = parse(location.search);

  console.log("location", location, isFromOrderPage, urlParams);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("affiliate_obj", JSON.stringify(urlParams));
    }
  }, []);

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <script async={true} type="text/javascript">{`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '355361339685041');
`}</script>
      {isFromOrderPage && (
        <script async={true} type="text/javascript">{`!function (w, d, t) {
		  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
		
		  ttq.load('C09I65DOQ3DFKFN94SEG');
		  ttq.page();
		}(window, document, 'ttq');`}</script>
      )}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-1003840432"
      ></script>

      {isFromOrderPage && (
        <script>
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-1003840432')`}
        </script>
      )}
      <script
        async={true}
        src={`//loox.io/widget/loox.js?shop=luciana-rose-couture.myshopify.com`}
      ></script>
      <script src="https://www.poptrkr.com/scripts/sdk/everflow.js" />
      <script>{`
      if(EF !== 'undefined') if (!EF.getTransactionId(EF.urlParameter('oid')) || EF.urlParameter('_ef_transaction_id')) {
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
            console.log('Everflow: aff_sub element not found, relying on loop for transaction id: ' + transactionId)
        window.localStorage.setItem('ef_aff_id', transactionId)
    });
}
`}</script>
      <script async={true} type="text/javascript">
        {` (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:2788906,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
      </script>

      <script>{` window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-1003840432');  `}</script>

      <script>
        {`!function(e){if(!window.pintrk){window.pintrk = function () {
window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
      n=window.pintrk;n.queue=[],n.version="3.0";var
      t=document.createElement("script");t.async=!0,t.src=e;var
      r=document.getElementsByTagName("script")[0];
      r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
pintrk('load', '2613435595600', {em: '<user_email_address>'});
pintrk('page');`}
      </script>
    </Helmet>
  );
};

export default HelmetWrapper;
