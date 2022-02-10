import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useEffect } from "react";
import { useState } from "react";

const BodyTracking = styled.div``;

const BodyWrapper = ({ efScript }: { efScript: string }) => {
  const [loadTracker, setTrackerVis] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTrackerVis(true);
    }
  }, []);

  return (
    loadTracker && (
      <BodyTracking>
        {/* <script async src="https://www.poptrkr.com/scripts/sdk/everflow.js" />
        <script type="text/javascript">
          {`
        if(EF !== 'undefined) if (!EF.getTransactionId(EF.urlParameter('oid')) || EF.urlParameter('_ef_transaction_id')) {
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
}, 200);`}
        </script>
        <script type="text/javascript">{efScript}</script> */}
      </BodyTracking>
    )
  );
};

BodyWrapper.propTypes = {};

export default BodyWrapper;
