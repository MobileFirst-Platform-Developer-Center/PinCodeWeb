/**
* Copyright 2016 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

require.config({
	'paths': {
		'ibmmfpfanalytics': 'node_modules/ibm-mfp-web-sdk/lib/analytics/ibmmfpfanalytics',
		'mfp': 'node_modules/ibm-mfp-web-sdk/ibmmfpf'
	}
});

require(['ibmmfpfanalytics', 'mfp'], function(wlanalytics, WL) {
    var wlInitOptions = {
        mfpContextRoot : '/mfp', // "mfp" is the default context root in the MobileFirst Development Kit
        applicationId : 'com.sample.pincodeweb'
    };

    WL.Client.init(wlInitOptions).then (
        function() {
            document.getElementById("getBalance").addEventListener('click', getBalance);
            PinCodeChallengeHandler();
    });
    
    function getBalance() {
        var resourceRequest = new WLResourceRequest("/adapters/ResourceAdapter/balance",WLResourceRequest.GET);

        resourceRequest.send().then(
            function(response) {
                var jsonObj = JSON.parse(response.responseText);
                WL.Logger.debug("resourceRequest.send success: "+ response.responseText);
                document.getElementById("balanceLabel").innerHTML = JSON.stringify(jsonObj);
            },
            function(response) {
                var jsonObj = JSON.parse(response.responseText);
                WL.Logger.debug(response.responseText);
                document.getElementById("balanceLabel").innerHTML = JSON.stringify(jsonObj);
            }
        );
    }
});
