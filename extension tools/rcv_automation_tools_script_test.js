async function rcvFunctions() {

    const url = window.location.href;

///////////////////////////////////////////_________COPY FUNCTION__________////////////////////////////////////

    function copyFunction(content) {
        const el = document.createElement('textarea')
        el.value = content
        el.setAttribute('readonly', '')
        el.style.position = 'absolute'
        el.style.left = '-9999px'
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
    }

///////////////////////////////////////////_________GET INFO IN BEATS__________////////////////////////////////////

    if(url.indexOf('beats.int.ringcentral.com/failure') != -1) {

        const regexpButton = document.querySelector('#rc-tabs-0-tab-regex')
        regexpButton.click()

        try { 

            const regexpTrue = new Boolean(document.querySelector('textarea[placeholder="Failure Regexp"]').innerHTML == '')

            const title = 'FIXBROWSER[ENV]: '
            var titleCase = ''
            var finaleTitleCase = ''
            const errorMassage = ' '
            var descriptionCase = ''

            const parseRegex = /RCV-\d{1,9}/g
            const parseRegexBeatsID = /\d{9}/g
            const parseRegexCaseTitle = /\d{1,9}/g
            var arrText = ''

            const regexpContains = regexpTrue.valueOf() ? '.ReactTable' : 'ul.ant-list-items'
            const arrowRight = document.querySelectorAll('[aria-label="caret-right"]')

            if (!regexpTrue.valueOf()) {
                arrowRight.forEach(function(item) {
                    item.click()
                })
            }

            setTimeout(function() {

                try {

                    arrText = document.querySelector(regexpContains)
                    .textContent.replaceAll('\n', '')
                    .replaceAll(' ','')
                    .match(parseRegex)

                    document.querySelector('.rt-tr-group:nth-child(1) .rt-td:nth-child(2) a')

                    const errorMessageElement = document.querySelector('div:has(.ReactTable) > h4').textContent
                    const beatsReportIDElement = '' +
                    document.querySelector('.rt-tr-group:nth-child(1) .rt-td:nth-child(2) a')
                    .getAttribute('href').match(parseRegexBeatsID)

                    arrText.forEach(function(item) {
                        if(!titleCase.match(item)) {
                            titleCase += item.match(parseRegex) + ','
                        }
                    })

                    titleCase = titleCase.split(',')
                    titleCase = titleCase.filter(Boolean);

                    if (titleCase != null) {
                        const lastItem = titleCase[titleCase.length - 1]

                        titleCase.forEach(function(item) {
                            if(!descriptionCase.match(item)) {
                                if(item != lastItem) {
                                    finaleTitleCase += item.match(parseRegexCaseTitle) + ','
                                    descriptionCase += '[https://testit.ringcentral.com/test-cases/' + item + ']\n'
                                } else {
                                    finaleTitleCase += item.match(parseRegexCaseTitle) + ' - '
                                    descriptionCase += '[https://testit.ringcentral.com/test-cases/' + item + ']'
                                }
                            }
                        })
                    }

                    if ((finaleTitleCase.split(",").length - 1) > 7) finaleTitleCase = ''

                        var descriptionResult = 
                    '|Error message|' + errorMessageElement + '|\n' 
                    + '|Beats report|[https://beats.int.ringcentral.com/test/' + beatsReportIDElement + '#steps]|\n'
                    + '|Test case|' + descriptionCase + '|'

                    var titleError = errorMessageElement
                    .replaceAll(/java\.lang\.AssertionError: /g, '')
                    .replaceAll(/org\.openqa\.selenium\.(.+?): /g, '')
                    .replaceAll(/no such element: /g, '')
                    .replaceAll(/Expected condition failed: /g, '')

                    var result = title + finaleTitleCase + titleError + '\n\n' + descriptionResult

                    copyFunction(result)

                } catch {

                    window.alert('Beats report not formed...')

                }

            }, 100)

        } catch (e) {

            window.alert('Beats report not formed...')

        }

    }

    ///////////////////////////////////////////_________GET BEATS CASE LIST__________////////////////////////////////////

    if(url.indexOf('beats.int.ringcentral.com/testList') != -1) {

        try {

            var titleCase = ''
            var finaleTitleCase = ''
            var descriptionCase = ''

            const parseRegex = /RCV-\d{1,9}/g
            const parseRegexCaseTitle = /\d{1,9}/g

            const arrText = document.querySelector('.rt-tbody')
            .textContent.replaceAll('\n', '')
            .replaceAll(' ','')
            .match(parseRegex)

            arrText.forEach(function(item) {
                if(!titleCase.match(item)) {
                    titleCase += item.match(parseRegex) + ','
                }
            })

            titleCase = titleCase.split(',')
            titleCase = titleCase.filter(Boolean);

            if (titleCase != null) {
                const lastItem = titleCase[titleCase.length - 1]

                titleCase.forEach(function(item) {
                    if(item != lastItem) {
                        finaleTitleCase += item.match(parseRegexCaseTitle) + ','
                        descriptionCase += '[https://testit.ringcentral.com/test-cases/' + item + ']\n'
                    } else {
                        finaleTitleCase += item.match(parseRegexCaseTitle)
                        descriptionCase += '[https://testit.ringcentral.com/test-cases/' + item + ']'
                    }
                })
            } else {
                throw new Error('The beats case list is empty')
            }

            const result = finaleTitleCase + "\n\n" + descriptionCase

            copyFunction(result)

        } catch (e) {

            window.alert('Beats case list are not copied...')

        }
    }

///////////////////////////////////////////_________GET JIRA TICKETS RCV CASES__________////////////////////////////////////

    if(url.indexOf('jira.ringcentral.com/browse/RCV-') != -1) {

        try {

            var result = ''
            const parseRegex = /RCV-\d{3,6}/g

            const arrayText = document.querySelector('#description-val')
            .textContent.replaceAll('\n', '')
            .replaceAll(' ','')

            const arrText = arrayText.match(parseRegex)

            if (arrText != null) {
                const lastItem = arrText[arrText.length - 1]

                arrText.forEach(function(item) {
                    if(item != lastItem) {
                        result += item + ','
                    } else {
                        result += item
                    }
                })
            } else {
                throw new Error('Empty array');
            }

            copyFunction(result)

        } catch (e) {

            window.alert('Jira rcv tickets were not copied...')

        }

    }

///////////////////////////////////////////_________GET TEST IT STEPS__________////////////////////////////////////

    if(url.indexOf('testit.ringcentral.com/test-cases/') != -1) {

        try {

            caseNumber = document.querySelector("[data-cy=open-prev-page]");
            caseName = document.querySelector("[data-cy=name-editor]");
            steps = document.querySelectorAll("[data-cy=step]");
            results = document.querySelectorAll("[data-cy=step-expected-result]");

            caseNameCapitalize = caseName.innerText
            .replaceAll(/[\/\\()\'\".,:;>?<~`!@#$%^&*_\-+=№0-9]/g, " ")
            .split(" ")
            .map((word) => { 
                if (word[0] != undefined) {
                    return word[0].toUpperCase() + word.substring(1);
                }
            }).join(" ").replaceAll(" ", "")

            caseNameCapitalize = caseNameCapitalize.substring(0, 1).toLowerCase() + caseNameCapitalize.substring(1) 

            str = "";
            str += '@TmsLink("' + caseNumber.innerText + '")\n' +
            '@Test(description = "' + caseName.innerText.replaceAll('"', "'") + '", groups = {"' + caseNumber.innerText + '"})\n' +
            'public void ' + caseNameCapitalize + '() {\n\t';

            const lastResultsItem = results[results.length - 1]

            if (steps.length != 0) {

                for (let i = 0; i < steps.length; i++) {
                    str += "TestAgent.baseStep(\"" + (i + 1) + ". " + steps[i].innerText
                    .trim()
                    .replaceAll("\n", "\\n")
                    .replaceAll('"', "'")
                    .replaceAll(/\u00a0/g, " ")
                    .replaceAll('\\n\\n',', ') 
                    + "\", () -> {\n\n\t});\n\n\t";

                    if (!results[i].innerText == "" && results[i] != lastResultsItem) {
                        str += "TestAgent.baseStep(\"" + results[i].innerText
                        .trim()
                        .replaceAll("\n", "\\n")
                        .replaceAll('"', "'")
                        .replaceAll(/\u00a0/g, " ")
                        .replaceAll('\\n\\n',', ')
                        + "\", () -> {\n\n\t});\n\n\t";
                    } else {
                        str += "TestAgent.baseStep(\"" + results[i].innerText
                        .trim()
                        .replaceAll("\n", "\\n")
                        .replaceAll('"', "'")
                        .replaceAll(/\u00a0/g, " ")
                        .replaceAll('\\n\\n',', ') 
                        + "\", () -> {\n\n\t});\n";
                    }
                }

                str += "}";

            } else {
                throw new Error('The step list is empty')
            }

            copyFunction(str)

        } catch (e) {

            window.alert('TestIt steps are not copied...')

        }
    }

///////////////////////////////////////////_________AUTO GENERATE JIRA TICKET __________////////////////////////////////////

    if (url.indexOf('jira.ringcentral.com/secure/') != -1) {

        var browser = JSON.parse(localStorage.getItem('rcv_obj')).browser
        var isFix = JSON.parse(localStorage.getItem('rcv_obj')).fix
        var isSprintOn = JSON.parse(localStorage.getItem('rcv_obj')).sprint
        var autoCreate = JSON.parse(localStorage.getItem('rcv_obj')).createTask
        var env = JSON.parse(localStorage.getItem('rcv_obj')).enviroment
        var rcv_team = JSON.parse(localStorage.getItem('rcv_obj')).team
        var rcv_feature = JSON.parse(localStorage.getItem('rcv_obj')).feature
        // var rcv_epic = JSON.parse(localStorage.getItem('rcv_obj')).epic
        var case_count = JSON.parse(localStorage.getItem('rcv_obj')).count
        var rcv_version = JSON.parse(localStorage.getItem('rcv_obj')).version

        try {

            /** 
            * Uncomment for debugging
            */

            // console.log("Options:" + 
            //     "\n\nChrome / FireFox : " + browser +
            //     "\n\nFix/Case : " + isFix +
            //     "\n\nSprint : " + isSprintOn +  
            //     "\nEnvironment : " + env + 
            //     "\n\nTeam : " + rcv_team + 
            //     "\nFeature : " + rcv_feature + 
            //     // "\nEpic : " + rcv_epic +
            //     "\nCase count : " + case_count +
            //     "\nVersion : " + rcv_version
            //     )
            // console.log('fix : ' + isFix + '\n\nsprint : ' + isSprintOn + '\n\nкоманда : ' + rcv_team + '\n\nfeature : ' + rcv_feature + '\n\nepic: ' + rcv_epic)

            const beatsGenerateInfo = document.createElement('textarea')

            try {
                const text = await navigator.clipboard.readText()
                beatsGenerateInfo.innerHTML = text;
                // console.log('Text pasted correctly.');
            } catch (error) {
                // console.log('Failed to read clipboard. Using execCommand instead.');
                document.querySelector('textarea').focus();
                const result = document.execCommand('paste')
                // console.log('document.execCommand result: ', result);
            }

            beatsGenerateInfo.setAttribute('id', 'textContent')
            beatsGenerateInfo.style.position = 'absolute'
            beatsGenerateInfo.style.left = '100px'
            document.body.appendChild(beatsGenerateInfo)
            const textContent = document.querySelector('#textContent').textContent

            const descriptionContent = textContent.match(/\n([\|\[\]].*)/g)

            var TITLE_CONTENT = textContent.match(/FIX.*\n/g) + ''

            if (TITLE_CONTENT == 'null') document.body.removeChild(beatsGenerateInfo)

                const summary = document.querySelector('#summary')
            const description = document.querySelector('textarea#description')

            if (!isFix) {
                TITLE_CONTENT = TITLE_CONTENT.replace('FIX', 'Fix AT ')

                if (browser) {
                    if (env != '') {
                        TITLE_CONTENT = TITLE_CONTENT.replace('BROWSER', '[Firefox]')
                    } else {
                        TITLE_CONTENT = TITLE_CONTENT.replace('BROWSER', '[Firefox] ')
                    }

                } else {
                    TITLE_CONTENT = TITLE_CONTENT.replace('BROWSER', '')

                }

                if (env != '') {
                    TITLE_CONTENT = TITLE_CONTENT.replace('[ENV]', '[' + env + '] ')

                } else {
                    TITLE_CONTENT = TITLE_CONTENT.replace('[ENV]', '')

                }

                TITLE_CONTENT = TITLE_CONTENT.substr(0, 254)

                var DESCRIPTION_CONTENT = ''
                for(var i = 0; i < descriptionContent.length; i++) {
                    DESCRIPTION_CONTENT += descriptionContent[i].replace('\n', '') + '\n'
                }

                document.body.removeChild(beatsGenerateInfo)

                //Ввод в summery
                summary.blur()
                summary.setRangeText(TITLE_CONTENT)
                console.log('summary set');

                //Установка значения в IntegrationAUT
                if (rcv_team.indexOf('IntegrationsAUT') != -1) {
                    document.querySelector('option[value="31384"]').selected = true

                } else {
                    document.querySelector('option[value="31385"]').selected = true

                }


                var featureLowerCase = rcv_feature.toLowerCase
                //Установка значения в Non-functional
                let s = setInterval(function() {
                    if (document.querySelector('[id*="' + featureLowerCase + '"]')){
                        // если нашли останавливаем таймер и вызываем алерт
                        clearInterval(s);
                        document.querySelector('[id*="' + featureLowerCase + '"]').click()
                    }
                }, 100);


                document.querySelector('#customfield_24773-textarea')
                const rcvFeatureNonFunctional = document.querySelector('#customfield_24773-textarea')
                rcvFeatureNonFunctional.click()
                rcvFeatureNonFunctional.setRangeText(rcv_feature)
                rcvFeatureNonFunctional.click()
                rcvFeatureNonFunctional.ariaLabel = 'RCV Feature Required - ' + rcv_feature + '.'


                //Ввод значения в description
                description.scrollIntoView()
                description.setSelectionRange(0,1000,0)
                description.setRangeText(DESCRIPTION_CONTENT)

                if(isSprintOn) {
                //Установка актуального спринта
                    let n = setInterval(function() {
                        if (document.querySelector('li[id*="rcv-sprint"]')){
                            // если нашли останавливаем таймер и вызываем алерт
                            clearInterval(n);
                            document.querySelector('li[id*="rcv-sprint"]').click()
                        }
                    }, 100);

                    const sprint = document.querySelector('input#customfield_10652-field').click()
                }

                //Установка значения WebClient test fixes
                document.querySelector('[id=tab1] div:nth-child(16) div:nth-child(3)').remove()
                document.querySelector('[id=tab1] div:nth-child(16)').innerHTML = '<div id="js-customfield_11450-ss-container">' + 
                '<div class="aui-ss ajax-ss long-field aui-ss-select" id="customfield_11450-single-select" data-query="WebClient test fixes">' + 
                '<input autocomplete="off" role="combobox" aria-autocomplete="list" aria-expanded="false" class="text aui-ss-field ajs-dirty-warning-exempt" ' + 
                'id="customfield_11450-field" type="text" aria-live="polite" data-lpignore="true" aria-busy="false"><div class="ajs-layer-placeholder">' + 
                '<div class="ajs-layer box-shadow" aria-hidden="true" style="width: 496px; position: absolute; left: 271px; top: 1670.5px; display: none;">' + 
                '<div class="aui-list" id="customfield_11450-suggestions" tabindex="-1" role="listbox" style="display: block;">' + 
                '<div class="aui-list-scroll" tabindex="-1" role="presentation"><ul id="" class="aui-list-section" aria-label="">' + 
                '<li class="aui-list-item aui-list-item-li-webclient-test-fixes" role="option" id="webclient-test-fixes-306">' + 
                '<a class="aui-list-item-link ghx-epic-menu-header" role="presentation" href="#"><li><h5>Showing 1 of 1 matching epics</h5><label for="chkShowDoneEpic">' + 
                '<input type="checkbox" id="chkShowDoneEpic">Show done epics</label></li></a></li></ul><h5>Suggestions</h5>' + 
                '<ul id="suggestions" class="aui-list-section aui-last" aria-label="Suggestions">' + 
                '<li class="aui-list-item aui-list-item-li-webclient-test-fixes active" role="option" id="webclient-test-fixes-307">' + 
                '<a class="aui-list-item-link" role="presentation" href="#"><em>WebClient test fixes</em> - <span class="epic-menu-metadata">(RCV-26600)</span>' + 
                '</a></li></ul></div></div></div></div><span class="icon aui-ss-icon drop-menu noloading" tabindex="-1"></span>' + 
                '</div><select class="single-select long-field hidden js-epic-picker aui-ss-select" id="customfield_11450" name="customfield_11450" ' + 
                'data-container-class="long-field" data-project-key="RCV" aria-hidden="true" aria-labelledby="customfield_11450-single-select" multiple="multiple" style="display: none;">' + 
                '<option value="key:RCV-26600" selected="selected">WebClient test fixes</option></select></div>'

                let a = setInterval(function() {
                    if (document.querySelector('a.aui-list-item-link')){
                        // если нашли останавливаем таймер и вызываем алерт
                        clearInterval(a);
                        document.querySelector('a.aui-list-item-link').click()
                    }
                }, 100);

                // document.querySelector('#versions-multi-select textarea').setRangeText('23.1.30 RWC')
                document.querySelector('#versions-multi-select textarea').setRangeText(rcv_version)
                document.querySelector('#versions-multi-select span').click()

            } else {
                // TITLE_CONTENT = TITLE_CONTENT.replace('FIX BROWSER [ENV] ', 'Automate')
                // console.log('Automate');
                document.body.removeChild(beatsGenerateInfo)

                summary.setRangeText('Automate :')

                if (rcv_team.indexOf('IntegrationsAUT') != -1) {
                    document.querySelector('option[value="31384"]').selected = true

                } else {
                    document.querySelector('option[value="31385"]').selected = true

                }

                var featureLowerCase = rcv_feature.toLowerCase
                //Установка значения в Non-functional
                let s = setInterval(function() {
                    if (document.querySelector('[id*="' + featureLowerCase + '"]')){
                        // если нашли останавливаем таймер и вызываем алерт
                        clearInterval(s);
                        document.querySelector('[id*="' + featureLowerCase + '"]').click()
                    }
                }, 100);


                document.querySelector('#customfield_24773-textarea')
                const rcvFeatureNonFunctional = document.querySelector('#customfield_24773-textarea')
                rcvFeatureNonFunctional.click()
                rcvFeatureNonFunctional.setRangeText(rcv_feature)
                rcvFeatureNonFunctional.click()
                rcvFeatureNonFunctional.ariaLabel = 'RCV Feature Required - ' + rcv_feature + '.'

                description.scrollIntoView()
                description.setSelectionRange(0,1000,0)
                for (var i = 0; i < case_count; i++) {
                    description.setRangeText('https://testit.ringcentral.com/test-cases/RCV-XXX\n')
                }

                if(isSprintOn) {
                    //Установка актуального спринта
                    let n = setInterval(function() {
                        if (document.querySelector('li[id*="rcv-sprint"]')){
                            // если нашли останавливаем таймер и вызываем алерт
                            clearInterval(n);
                            document.querySelector('li[id*="rcv-sprint"]').click()
                        }
                    }, 100);

                    const sprint = document.querySelector('input#customfield_10652-field').click()
                }

                document.querySelector('[id=tab1] div:nth-child(16) div:nth-child(3)').remove()
                document.querySelector('[id=tab1] div:nth-child(16)').innerHTML = `<div id="js-customfield_11450-ss-container">
                <div class="aui-ss ajax-ss long-field aui-ss-select" id="customfield_11450-single-select" data-query="WebClient">
                <input autocomplete="off" role="combobox" aria-autocomplete="list" aria-expanded="false" class="text aui-ss-field ajs-dirty-warning-exempt" 
                id="customfield_11450-field" type="text" aria-live="polite" data-lpignore="true" aria-busy="false"><div class="ajs-layer-placeholder">
                <div class="ajs-layer box-shadow" aria-hidden="true" style="width: 496px; position: absolute; left: 570px; top: 1456.5px; display: none;">
                <div class="aui-list" id="customfield_11450-suggestions" tabindex="-1" role="listbox" style="display: block;">
                <div class="aui-list-scroll" tabindex="-1" role="presentation"><ul id="" class="aui-list-section" aria-label="">
                <li class="aui-list-item aui-list-item-li-webclient" role="option" id="webclient-102">
                <a class="aui-list-item-link ghx-epic-menu-header" role="presentation" href="#"><li><h5>Showing 6 of 6 matching epics</h5><label for="chkShowDoneEpic">
                <input type="checkbox" id="chkShowDoneEpic">Show done epics</label></li></a></li></ul><h5>Suggestions</h5>
                <ul id="suggestions" class="aui-list-section aui-last" aria-label="Suggestions">
                <li class="aui-list-item aui-list-item-li-rcv-webclient-automation-project" role="option" id="rcv-webclient-automation-project-103">
                <a class="aui-list-item-link" role="presentation" href="#">RCV <em>WebClient</em> Automation Project - <span class="epic-menu-metadata">(RCV-29683)</span>
                </a></li><li class="aui-list-item aui-list-item-li-webclient-auto-tests-environment-issues" role="option" id="webclient-auto-tests-environment-issues-104">
                <a class="aui-list-item-link" role="presentation" href="#">
                <em>WebClient</em> auto-tests environment issues - <span class="epic-menu-metadata">(RCV-27000)</span></a></li>
                <li class="aui-list-item aui-list-item-li-webclient-recover-disabled-tests" role="option" id="webclient-recover-disabled-tests-105">
                <a class="aui-list-item-link" role="presentation" href="#"><em>WebClient</em> recover disabled tests - <span class="epic-menu-metadata">(RCV-26698)</span>
                </a></li><li class="aui-list-item aui-list-item-li-webclient-remove-outdated-tests" role="option" id="webclient-remove-outdated-tests-106">
                <a class="aui-list-item-link" role="presentation" href="#"><em>WebClient</em> remove outdated tests - <span class="epic-menu-metadata">(RCV-58476)</span>
                </a></li><li class="aui-list-item aui-list-item-li-webclient-test-fixes" role="option" id="webclient-test-fixes-107">
                <a class="aui-list-item-link" role="presentation" href="#"><em>WebClient</em> test fixes - <span class="epic-menu-metadata">(RCV-26600)</span></a></li>
                <li class="aui-list-item aui-list-item-li-webclient-tests-automation active" role="option" id="webclient-tests-automation-108">
                <a class="aui-list-item-link" role="presentation" href="#"><em>WebClient</em> tests automation - <span class="epic-menu-metadata">(RCV-26937)</span>
                </a></li></ul></div></div></div></div><span class="icon aui-ss-icon drop-menu noloading" tabindex="-1"></span>
                </div><select class="single-select long-field hidden js-epic-picker aui-ss-select" id="customfield_11450" name="customfield_11450" 
                data-container-class="long-field" data-project-key="RCV" aria-hidden="true" aria-labelledby="customfield_11450-single-select" multiple="multiple" 
                style="display: none;"><option value="key:RCV-26937" title="undefined" selected="selected">WebClient tests automation</option></select></div>`
            }

        } catch (e){
            document.body.remove(beatsGenerateInfo)
            alert('Jira ticket not create...')
        }

        if (autoCreate) {
            setTimeout(function () {
                const createButton = document.querySelector('#issue-create-submit')
                createButton.scrollIntoViewIfNeeded()
                createButton.click()
            }, 100)
        }
    }
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: rcvFunctions
  });
});