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
            beginHiddenFields = true;
        }
        else{
            elClone.removeAttribute('style');
            elClone.classList.remove('selectInput', 'defaultText', 'textInput');
            elClone.classList.add('formVal');
            if (beginHiddenFields){
                elClone.classList.add('hideme');
            }
            elClone.setAttribute('data-desc', `${el.getAttribute('label')}`);
            elClone.required = true;
            if (beginHiddenFields){
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
    <!-- DO NOT REMOVE HIDDEN FIELD sp_exp --><input type="hidden" name="sp_exp" value="yes">`;
    newForm.innerHTML =  topCode + newInputFieldsCode + bottomCode;

    // put it into the destination textarea
    const transformedDom2 = document.getElementById('transformedDom');
    const taDestination = document.getElementById('taDestination');
    taDestination.value = transformedDom2.innerHTML;

}