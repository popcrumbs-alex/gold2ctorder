<hr />
<h1>Reusable Sales Funnel Guide</h1>

<strong>Startup:</strong>

<ol>
<li>Clone this repo :)</li>
<li>In current dir: Run npm install</li>
<li> Move to server dir: Run npm install</li>
</ol>

<hr />

<p><strong>Server Guide</strong></p>
<ul>
<li>Configure new DB either in MongoDB or whatever you wish to use<br /> DB Url is within the .env file and needs to be reconfigured per store</li>
<li>Change shopify api keys depending upon the private app and store</li>
<li>Change the payment gateway api keys depending upon app and store<br/>
<strong>Current Gateways Include: Paypal and NMI
</strong>
</li>
<li>All API endpoints are unopinionated and can be reused for different funnels. There are no product specifc variables within server</li>
</ul>

<ol>
<li>The order process API works as follows: Order details are passed through the createOrder resolver. <br /> Order gets created in database with a status of "pending" it is not until the order has been closed will it be created in shopify.</li>
<li>The user can either get to the thankyou page for the order to be closed and a transaction to be captured</li>
<li>Or, the cron job will look for pending orders and a timeframe, and if the order was created after that time frame. Close it out and capture a transaction.</li>
</ol>

<hr>

<p><strong>Client Guide</strong></p>

<ol>
<li>Configure gatsby-plugin.json for plugins with specific parameters, ie: the Google Analytics Plugin</li>
<li>Redux wrapper is provided in gatsby config already. Not necessary to change any configuration.</li>
<li>Configure apollo client for correct server url, within the gatsby-plugin-apollo directory</li>
<li>All Product data is located within the <strong>product</strong> directory: update this file for store and product specific data changes, ie: Bump & OTO products</li>
<li>Landing pages are located and should be created within the landers directory under the <strong>pages</strong> directory</li>
<li>Images will need to be updated, as they are located in a directory labeled images, which is used to provide static rendering for best optimization & performance.</li>
<li>HelmetWrapper component, located in the <strong>reusable</strong> directory is where all header pixels are located and updated.</li>
<li>BodyTags Component handles all tags that have to be in the body.</li>
</ol>
