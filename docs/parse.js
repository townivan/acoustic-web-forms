// show hidden fields:
// [...document.querySelectorAll('input.hideme, label.hideme')].map(el => el.classList.remove('hideme'));
function togglehide(){
    let allhideme = [...document.querySelectorAll('input.hideme, label.hideme')];
    let allhidemeX = [...document.querySelectorAll('input.hidemeX, label.hidemeX')];
    if (allhideme.length > 0){
        allhideme.map(el => {
            el.classList.remove('hideme');
            el.classList.add('hidemeX');
        });
        return 'hideme elements made visible'
    }
    if (allhidemeX.length > 0){
        allhidemeX.map(el => {
            el.classList.remove('hidemeX');
            el.classList.add('hideme');
        });
        return 'hidemeX elements made hidden'
    }
}

function parseTa(){
    let inputCode = document.getElementById('taSource').value;
    // console.log(inputCode)
    
    let tempDom = document.getElementById('tempDom');
    // console.log(tempDom)
    tempDom.innerHTML = inputCode;

    // now we parse that new DOM to extract the elements that we want.
    // building transformed versions of each.

    const transformedDom = document.getElementById('transformedDom');

    let formEl = tempDom.querySelector('form');
    var formElClone = formEl.cloneNode(true);
    formElClone.classList.add('ux_unum_form');
    // console.log('formElClone:', formElClone);
    transformedDom.innerHTML = formElClone.outerHTML;

    let newForm = document.querySelector('#transformedDom form');
    // newForm.innerHTML = `<div class="error-summary hideme" id="ux_unum_form_errorSummary"></div>`;

    // get all orig input fields
    let newInputFieldsCode = '';
    let orig_InputFields = [...tempDom.querySelectorAll('select, input[type=text], input[type=submit]')];
    let beginHiddenFields = false;
    // console.log('orig_InputFields:', orig_InputFields);
    orig_InputFields.map(el => {
        let elClone = el.cloneNode(true);
        if( elClone.getAttribute('type') === 'submit') {
            elClone.classList.remove('defaultText', 'buttonStyle');
            elClone.classList.add('submit');
            elClone.id = 'ux_unum_form_submit-btn';
            beginHiddenFields = true; // hides fields after the submit button
            elClone.setAttribute("type", "button");
        }
        else{
            // let's try to hide certain ones even if they are before the submit button...
            let isCloneSpecial = false;
            if (elClone.getAttribute('name').toLowerCase() === 'thankyoupageurl'){
                isCloneSpecial = true;
            }
            if (elClone.getAttribute('name').toLowerCase() === 'website'){
                isCloneSpecial = true;
            }
            if (elClone.getAttribute('name').toLowerCase() === 'campaign name'){
                isCloneSpecial = true;
            }
            if (elClone.getAttribute('name').toLowerCase() === 'lead source'){
                isCloneSpecial = true;
            }
            if (elClone.getAttribute('name').toLowerCase() === 'gaclientid'){
                isCloneSpecial = true;
            }
            if (elClone.getAttribute('name').toLowerCase() === 'referrer'){
                isCloneSpecial = true;
            }
            if (elClone.getAttribute('name').toLowerCase() === 'landingpageurl'){
                isCloneSpecial = true;
            }
            if (elClone.getAttribute('name').toLowerCase() === 'utm_campaign'){
                isCloneSpecial = true;
            }
            if (elClone.getAttribute('name').toLowerCase() === 'utm_content'){
                isCloneSpecial = true;
            }
            if (elClone.getAttribute('name').toLowerCase() === 'utm_medium'){
                isCloneSpecial = true;
            }
            if (elClone.getAttribute('name').toLowerCase() === 'utm_source'){
                isCloneSpecial = true;
            }
            if (elClone.getAttribute('name').toLowerCase() === 'utm_term'){
                isCloneSpecial = true;
            }



            elClone.removeAttribute('style');
            elClone.classList.remove('selectInput', 'defaultText', 'textInput');
            elClone.classList.add('formVal');
            if (beginHiddenFields || isCloneSpecial){
                elClone.classList.add('hideme');
            }
            elClone.setAttribute('data-desc', `${el.getAttribute('label')}`);
            if (!isCloneSpecial){
                elClone.required = true;
            }
            
            if (beginHiddenFields || isCloneSpecial){
                newInputFieldsCode += `<label for="${el.id}" class="ux_unum_form-label hideme">${el.getAttribute('label')}:</label>`;
            }
            else{
                newInputFieldsCode += `<label for="${el.id}" class="ux_unum_form-label"><span class="ux_unum_form-required">*</span> ${el.getAttribute('label')}:</label>`;
            }
        }
        newInputFieldsCode += elClone.outerHTML;
    })

    let topCode = `<div class="error-summary hideme" id="ux_unum_form_errorSummary"></div>`;
    let bottomCode = `<input type="hidden" name="formSourceName" value="StandardForm">
    <!-- DO NOT REMOVE HIDDEN FIELD sp_exp -->
    <input type="hidden" name="sp_exp" value="yes">
    <input type="hidden" id="ThankYouPageUrlBase">`; // create ThankYouPageUrlBase field
    newForm.innerHTML =  topCode + newInputFieldsCode + bottomCode;

    // put it into the destination textarea
    const transformedDom2 = document.getElementById('transformedDom');
    const taDestination = document.getElementById('taDestination');
    taDestination.value = transformedDom2.innerHTML;

}

document.onkeyup = function(e) {
    
    if (e.shiftKey && e.which == 65) { // shift + a
        document.getElementById('taSource').value = formACodeExample;
    } else if (e.shiftKey && e.which == 68) { // shift + d
        document.getElementById('taSource').value = dynamicFormCodeExample;
    } 
  };

const formACodeExample = `<form method="post" action="https://www.enrollunum.com/ivanforma/form1" pageId="9171397" siteId="281008" parentPageId="9171395" ><table cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN2"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">FirstName</div></div><input type="text" name="FirstName" id="control_COLUMN2" label="FirstName" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN3"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">LastName</div></div><input type="text" name="LastName" id="control_COLUMN3" label="LastName" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_EMAIL"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">Email<span class="required">*</span></div></div><input type="text" name="Email" id="control_EMAIL" label="Email" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN1"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">FavoriteColor</div></div><select name="FavoriteColor" id="control_COLUMN1" label="FavoriteColor" class="selectInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"><option value="" SELECTED >Select one</option><option value="Red">Red</option><option value="Green">Green</option><option value="Blue">Blue</option><option value="Other">Other</option></select></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN4"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">Notes</div></div><input type="text" name="Notes" id="control_COLUMN4" label="Notes" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN5"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">ThankYouPageUrl</div></div><input type="text" name="ThankYouPageUrl" id="control_COLUMN5" label="ThankYouPageUrl" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN6"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">GaClientId</div></div><input type="text" name="GaClientId" id="control_COLUMN6" label="GaClientId" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN7"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">Referrer</div></div><input type="text" name="Referrer" id="control_COLUMN7" label="Referrer" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN8"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">LandingPageUrl</div></div><input type="text" name="LandingPageUrl" id="control_COLUMN8" label="LandingPageUrl" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN9"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">website</div></div><input type="text" name="website" id="control_COLUMN9" label="website" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN10"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">Campaign Name</div></div><input type="text" name="Campaign Name" id="control_COLUMN10" label="Campaign Name" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN11"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">Lead Source</div></div><input type="text" name="Lead Source" id="control_COLUMN11" label="Lead Source" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN12"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">utm_campaign</div></div><input type="text" name="utm_campaign" id="control_COLUMN12" label="utm_campaign" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN13"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">utm_content</div></div><input type="text" name="utm_content" id="control_COLUMN13" label="utm_content" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN14"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">utm_medium</div></div><input type="text" name="utm_medium" id="control_COLUMN14" label="utm_medium" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN15"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">utm_source</div></div><input type="text" name="utm_source" id="control_COLUMN15" label="utm_source" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN16"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">utm_term</div></div><input type="text" name="utm_term" id="control_COLUMN16" label="utm_term" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td id="errorMessageContainerId" class="formErrorMessages" style="display: none;"></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;"><table cellspacing="0" cellpadding="0" border="0"><tr><td style="padding-right: 10px;"><input type="submit" class="defaultText buttonStyle" value="Submit"></td></tr></table></div></td></tr><input type="hidden" name="formSourceName" value="StandardForm"><!-- DO NOT REMOVE HIDDEN FIELD sp_exp --><input type="hidden" name="sp_exp" value="yes"></table></form>`;

const dynamicFormCodeExample = `<form method="post" action="http://www.enrollunum.com/ivanformdynamic/form1" pageId="9176038" siteId="281228" parentPageId="9176036" ><table cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN1"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">WhatDescribesYou</div></div><select name="WhatDescribesYou" id="control_COLUMN1" label="WhatDescribesYou" class="selectInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"><option value="">Select one</option><option value="Make a selection" SELECTED >Make a selection</option><option value="Individual">Individual</option><option value="Employer">Employer</option><option value="Broker">Broker</option></select></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN2"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">FirstName</div></div><input type="text" name="FirstName" id="control_COLUMN2" label="FirstName" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN3"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">LastName</div></div><input type="text" name="LastName" id="control_COLUMN3" label="LastName" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_EMAIL"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">Email</div></div><input type="text" name="Email" id="control_EMAIL" label="Email" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN5"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">Phone</div></div><input type="text" name="Phone" id="control_COLUMN5" label="Phone" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN7"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">Role</div></div><select name="Role" id="control_COLUMN7" label="Role" class="selectInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"><option value="" SELECTED >Select one</option><option value="Executive">Executive</option><option value="Head of Human Resources">Head of Human Resources</option><option value="Plan Administrator">Plan Administrator</option><option value="Benefits Coordinator">Benefits Coordinator</option><option value="HR Manager">HR Manager</option><option value="Business Owner">Business Owner</option><option value="Broker">Broker</option><option value="Other">Other</option></select></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN8"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">CompanySize</div></div><select name="CompanySize" id="control_COLUMN8" label="CompanySize" class="selectInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"><option value="" SELECTED >Select one</option><option value="2 - 249">2 - 249</option><option value="250 - 499">250 - 499</option><option value="500 - 999">500 - 999</option><option value="1,000 - 1,999">1,000 - 1,999</option><option value="2,000 or more">2,000 or more</option></select></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN6"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">BusinessName</div></div><input type="text" name="BusinessName" id="control_COLUMN6" label="BusinessName" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td id="errorMessageContainerId" class="formErrorMessages" style="display: none;"></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;"><table cellspacing="0" cellpadding="0" border="0"><tr><td style="padding-right: 10px;"><input type="submit" class="defaultText buttonStyle" value="Submit"></td></tr></table></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN4"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">ThankYouPageUrl</div></div><input type="text" name="ThankYouPageUrl" id="control_COLUMN4" label="ThankYouPageUrl" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN10"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">LandingPageUrl</div></div><input type="text" name="LandingPageUrl" id="control_COLUMN10" label="LandingPageUrl" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN9"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">GoogleAnalyticsClientId</div></div><input type="text" name="GoogleAnalyticsClientId" id="control_COLUMN9" label="GoogleAnalyticsClientId" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN12"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">LeadSource</div></div><input type="text" name="LeadSource" id="control_COLUMN12" label="LeadSource" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN11"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">ReferralUrl</div></div><input type="text" name="ReferralUrl" id="control_COLUMN11" label="ReferralUrl" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN19"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">CampaignName</div></div><input type="text" name="CampaignName" id="control_COLUMN19" label="CampaignName" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN18"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">Website</div></div><input type="text" name="Website" id="control_COLUMN18" label="Website" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN13"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">utm_campaign</div></div><input type="text" name="utm_campaign" id="control_COLUMN13" label="utm_campaign" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN16"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">utm_content</div></div><input type="text" name="utm_content" id="control_COLUMN16" label="utm_content" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN15"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">utm_medium</div></div><input type="text" name="utm_medium" id="control_COLUMN15" label="utm_medium" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN14"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">utm_source</div></div><input type="text" name="utm_source" id="control_COLUMN14" label="utm_source" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><tr><td style="padding: 5px 0px 0px 5px;"><div style="position: relative; overflow: hidden; width:300px;" id="container_COLUMN17"><div style="width: 294px; overflow: hidden; "><div class="fieldLabel" style="width: 294px; margin: 5px 3px; ">utm_term</div></div><input type="text" name="utm_term" id="control_COLUMN17" label="utm_term" class="textInput defaultText" style="margin: 0 3px 5px 3px; height: 20px; width: 294px;"></div></td></tr><input type="hidden" name="formSourceName" value="StandardForm"><!-- DO NOT REMOVE HIDDEN FIELD sp_exp --><input type="hidden" name="sp_exp" value="yes"></table></form>`;