var style_extension = document.createElement('style');
style_extension.innerHTML = `
#block ::-webkit-scrollbar {
	width: 0;
}

.content {
	position: fixed;
	top: 150px;
	left: 10px;
}

#block .input {
	width: auto;
	position: relative;
	text-align: center;
}

#block input {
	font-size: 14px;
	height: 35px;
	width: 90%;
	outline: none;
	border: none;
	color: black;
	text-align: center;
	box-shadow: 0px 4px 16px 0px rgba(0,0,0,0.2);
}

#block datalist {
	position: absolute;
	background-color: white;
	font-family: "Century Gothic",Verdana,sans-serif;
	width: 90%;
	margin-left: 5%;
	max-height: 20rem;
	overflow-y: overlay;
	box-shadow: 0px 4px 16px 0px rgba(0,0,0,0.2);
	border-radius: 0 0 5px 5px;
	border: none;
}

#block input:hover, datalist{
	z-index: 6;
}

#block option {
	background-color: white;
	padding: 4px;
	color: black;
	margin-bottom: 1px;
	cursor: pointer;
	white-space: inherit;
}

#block option:hover,  #block .active {
	box-shadow: 0px 4px 16px 0px rgba(0,0,0,0.2);
	background-color: #40e551;
	transition: .3s;
}

#block label, option {
	position: relative;
	font-size: 14px;
	text-align: center;
	overflow: auto;
}

#block .selectize-control {
	margin-left: auto;
	margin-right: auto;
}

#block .content_block {
	width: 250px;
	height: auto;
	display: none;
	box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}

#block .preference {
	display: flex;
	justify-content: space-between;
	margin: 0.5rem;
	vertical-align: middle;
	padding: auto;
}

#block #vertical {
	margin: auto;
	margin-left: 5px;
	margin-right: 0;
}

#block input[type="checkbox"] {
	position: relative;
	width: 40px;
	height: 20px;
	-webkit-appearance: none;
	outline: none;
	background: #c6c6c6;
	border-radius: 20px;
	transition: .4s;
	box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);
}

#block input:checked[type="checkbox"] {
	background: #40e551;
}

#block input[type="checkbox"]:before {
	content: '';
	position: absolute;
	width: 20px;
	height: 20px;
	border-radius: 10px;
	top: 0;
	left: 0;
	background: #fff;
	transition: .3s;
	transform:  scale(1.1);
	box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
}

#block input:checked[type="checkbox"]:before {
	left: 20px;
}

#block input[type="checkbox"] #led {
	background-color: red;
}

#block #button {
	width: 95%;
	height: 30px;
	font-size: 15px;
	-webkit-appearance: none;
	outline: none;
	background-color: #ff8800;
	transition: .2s;
	border-color: #E2e2e2;
	border-radius: 5px;
	border: none;
	margin-bottom: 10px;
	color: white;
	text-align: center;
	text-decoration: none;
	display: inline-block;
}

#block #button:active {
	background-color: #3e8e41;
	box-shadow: 0 5px #666;
	transform: translateY(2px);
}

#block #button:hover {
      background-color: #4CAF40; /* Green */
	box-shadow: 0 8px 8px 0 rgba(0,0,0,0.24), 0 0px 20px 0 rgba(0,0,0,0.19);
}

@keyframes pulsing {
	0% {transform: scale(0.9, 0.9)}
	25% {transform: scale(0.8, 0.8)}
	50% {transform: scale(1.0, 1.0)}
	75% {transform: scale(0.7, 0.7)}
	100% {transform: scale(0.9, 0.9)}
}`

document.querySelector('head').appendChild(style_extension)

var div = document.createElement('div')
div.setAttribute('class','content')
div.innerHTML = `
<div id="block">
<img id="logo" src="https://yt3.googleusercontent.com/c4SUb04a-NLiq1zCurYTF21rgPvKmNMSLat94VaqROjEdtMRMuLRXdSublBVpAslYCPYW-fRTyo=s900-c-k-c0x00ffffff-no-rj">
<div class="content_block">
<img id="title_logo" src="https://logos-download.com/wp-content/uploads/2020/07/RingCentral_Logo-700x111.png">
<br>
<div class="preference" id="task">
<label id="vertical"> Fix / Automate </label>
<input type="checkbox" id="fix_case">
</div>
<div class="preference" id="browsers">
<label id="vertical"> Chrome / FireFox </label>
<input type="checkbox" id="browser">
</div>
<div class="preference">
<label id="vertical">Set actual sprint </label>
<input type="checkbox" id="check_sprint">
</div>
<div class="input">
<div id="box_env">
<br>
<label for="RCV env">Choose a environment:</label>
<br>
<input autocomplete="off" role="combobox" list="" id="input_env" name="rcv_env" placeholder="Select environment" align="">
<datalist id="data_env">
<option value="">-- Empty --</option>
<option value="vi11">vi11</option>
<option value="vi10">vi10</option>
<option value="vi7">vi7</option>
<option value="dev">dev</option>
</datalist>
</div>
<div id="box_team">
<br>
<label for="RCV team">Choose a team:</label>
<br>
<input autocomplete="off" role="combobox" list="" id="input_rcv_team" name="rcv_team" placeholder="Select team">
<datalist id="data_rcv_team">
<option value="IntegrationsAUT">IntegrationsAUT</option>
<option value="AutomationMera">AutomationMera</option>
</datalist>
<br>
</div>
<div id="block_feature">
<br>
<label for="RCV Feature">Choose a RCV Feature:</label>
<br>
<input autocomplete="off" role="combobox" list="" id="input_feature" name="rcv_team" placeholder="Select team">
<datalist id="data_feature">
<option value="A11y">A11y</option>
<option value="AdaptiveDesign">AdaptiveDesign</option>
<option value="Analytics">Analytics</option>
<option value="Authorization">Authorization</option>
<option value="Auto-follow">Auto-follow</option>
<option value="Avatars">Avatars</option>
<option value="Branding and Partners">Branding and Partners</option>
<option value="BreakoutRooms">BreakoutRooms</option>
<option value="BridgeSecuritySettings">BridgeSecuritySettings</option>
<option value="Browser-OSversions">Browser-OSversions</option>
<option value="BrowserPermissions">BrowserPermissions</option>
<option value="Calendars">Calendars</option>
<option value="Chat">Chat</option>
<option value="ClosedCaption/LiveTranscript">ClosedCaption/LiveTranscript</option>
<option value="CollaborativeNotes">CollaborativeNotes</option>
<option value="Data residency and privacy">Data residency and privacy</option>
<option value="E2EE meetings">E2EE meetings</option>
<option value="Email notifications">Email notifications</option>
<option value="Entry-ExitTones">Entry-ExitTones</option>
<option value="ExternalClientsSupport">ExternalClientsSupport</option>
<option value="High Availability (HA)">High Availability (HA)</option>
<option value="Improve my video in low light">Improve my video in low light</option>
<option value="In-meeting : Layouts / Gallery_SortingFiltering">In-meeting : Layouts / Gallery_SortingFiltering</option>
<option value="InMeetingBasicSettings">InMeetingBasicSettings</option>
<option value="InMeetingInvitation">InMeetingInvitation</option>
<option value="InMeetingJoinFlow">InMeetingJoinFlow</option>
<option value="InstantMeeting">InstantMeeting</option>
<option value="JoinAudio">JoinAudio</option>
<option value="JoinBeforeHost">JoinBeforeHost</option>
<option value="JoinFlow">JoinFlow</option>
<option value="JoinMeeting">JoinMeeting</option>
<option value="JoinShareScreen">JoinShareScreen</option>
<option value="Limits">Limits</option>
<option value="ListOfParticipants">ListOfParticipants</option>
<option value="Localization and internationalization">Localization and internationalization</option>
<option value="ManageDevices">ManageDevices</option>
<option value="Media Processing">Media Processing</option>
<option value="MeetingPasswords">MeetingPasswords</option>
<option value="ModeratorControls">ModeratorControls</option>
<option value="Multiple devices">Multiple devices</option>
<option value="NetworkQualityIndicator">NetworkQualityIndicator</option>
<option value="Non-Functional">Non-Functional</option>
<option value="Persistent Annotations">Persistent Annotations</option>
<option value="PersonalMeetingID">PersonalMeetingID</option>
<option value="PersonalMeetingName">PersonalMeetingName</option>
<option value="Presentation mode">Presentation mode</option>
<option value="PSTN_CallMe">PSTN_CallMe</option>
<option value="PSTN_CallOut">PSTN_CallOut</option>
<option value="PSTN_DialIn">PSTN_DialIn</option>
<option value="Reactions">Reactions</option>
<option value="Recents">Recents</option>
<option value="Recordings">Recordings</option>
<option value="Remote Desktop Control">Remote Desktop Control</option>
<option value="Schedule_OnBehalf">Schedule_OnBehalf</option>
<option value="Scheduling">Scheduling</option>
<option value="ScreenSharing_annotations (old)">ScreenSharing_annotations (old)</option>
<option value="ScreenSharing_presenter">ScreenSharing_presenter</option>
<option value="ScreenSharing_viewer">ScreenSharing_viewer</option>
<option value="SelfControls">SelfControls</option>
<option value="SendFeedback">SendFeedback</option>
<option value="SessionSecuritySettings">SessionSecuritySettings</option>
<option value="Summaries/Keywords">Summaries/Keywords</option>
<option value="SystemPermissions">SystemPermissions</option>
<option value="TempModerator">TempModerator</option>
<option value="TerminatedPage">TerminatedPage</option>
<option value="TestAudio">TestAudio</option><option value="Touch up my skin">Touch up my skin</option>
<option value="Virtual Background (VBG)">Virtual Background (VBG)</option>
<option value="VoiceActivityIndicator">VoiceActivityIndicator</option>
<option value="WaitingRoom">WaitingRoom</option>
<option value="Whiteboard">Whiteboard</option>
</datalist>
<br>
</div>
<div id="block_version">
<br>
<label for="Affect_version">Choose a Affect version:</label>
<br>
<input autocomplete="off" role="combobox" list="" id="input_version" name="version" placeholder="Select Affect version">
<datalist id="data_version">
</datalist>
</div>
<div id="block_case_count">
<br>
<label for="case count">Set case count:</label>
<br>
<input autocomplete="off" role="combobox" id="input_case_count" name="version" placeholder="Set case count">
<datalist id="data_version">
</datalist>
</div>
</div>
<br>
<br>
<button id="button">save</button>
<br>
</div>
</div>
`

// <br>
// <label for="Epic Link">Choose a Epic Link:</label>
// <br>
// <input autocomplete="off" role="combobox" list="" id="input_epic" name="epic" placeholder="Select team" align="">
// <datalist id="data_epic">
// <option value="RCV WebClient Automation Project - (RCV-29683)">RCV WebClient Automation Project</option>
// <option value="WebClient auto-tests environment issues - (RCV-27000)">WebClient auto-tests environment issues</option>
// <option value="WebClient recover disabled tests - (RCV-26698)">WebClient recover disabled tests</option>
// <option value="WebClient remove outdated tests - (RCV-58476)">WebClient remove outdated tests</option>
// <option value="WebClient test fixes - (RCV-26600)">WebClient test fixes</option>
// <option value="WebClient tests automation - (RCV-26937)">WebClient tests automation</option>
// </datalist>
// <br>

// document.querySelector('#announcement-banner').appendChild(div)
document.querySelector('body').appendChild(div)

let fix_case, browsers, env, team, rcv_feature, epic, affectVersion, on_sprint, button, rcv_value, selectCheckTeam, selectCheckRcvFeature, selectCheckEpicLink, inputCaseCount, logo_size, releasedVersion, unreleasedVersion

browsers = document.querySelector('#browser')
fix_case = document.querySelector("#fix_case")
env = document.querySelector("#input_env")
on_sprint = document.querySelector("#check_sprint")
selectCheckTeam = document.querySelector('#input_rcv_team')
selectCheckRcvFeature = document.querySelector('#input_feature')
// selectCheckEpicLink = document.querySelector('#input_epic')
inputCaseCount = document.querySelector('#input_case_count')
affectVersion = document.querySelector('#input_version')

button = document.querySelector("#button");

rcv_value = JSON.parse(localStorage.getItem("rcv_obj"))

browsers.checked = rcv_value != null ? rcv_value.browser : ''
fix_case.checked = rcv_value != null ? rcv_value.fix : ''
env.value = rcv_value != null ? rcv_value.enviroment : ''
on_sprint.checked = rcv_value != null ? rcv_value.sprint : ''
selectCheckTeam.value = rcv_value != null ? rcv_value.team : ''
selectCheckRcvFeature.value = rcv_value != null ? rcv_value.feature : ''
// selectCheckEpicLink.value = rcv_value != null ? rcv_value.epic : ''
inputCaseCount.value = rcv_value != null ? rcv_value.count : ''
affectVersion.value = rcv_value != null ? rcv_value.version : ''

button.addEventListener("click", function() {
	var rcv_obj = {
		browser : browser.checked,
		fix : fix_case.checked,
		sprint : on_sprint.checked,
		enviroment : env.value,
		team : selectCheckTeam.value,
		feature : selectCheckRcvFeature.value,
		// epic : selectCheckEpicLink.value,
		count : inputCaseCount.value,
		version : affectVersion.value,
	}

	localStorage.setItem("rcv_obj", JSON.stringify(rcv_obj))

	rcv_value = JSON.parse(localStorage.getItem("rcv_obj"))


	/** 
	 * Uncomment for debugging
	 */
	// console.log("Save options:" + 
	// 	"\n\nBrowser : " + rcv_value.browser + 
	// 	"\nFix/Case : " + rcv_value.fix + 
	// 	"\nSprint : " + rcv_value.sprint +
	// 	"\nEnvironment : " + rcv_value.env + 
	// 	"\nTeam : " + rcv_value.team + 
	// 	"\nFeature : " + rcv_value.feature + 
	// 	// "\nEpic : " + rcv_value.epic +
	// 	"\nCase count : " + rcv_value.count + 
	// 	"\nAffect version : " + rcv_value.version
	// 	)

	releasedVersion.forEach(function(item) {
		document.querySelector('optgroup[label="Released Versions"]').appendChild(item)
	})

	unreleasedVersion.forEach(function(item) {
		document.querySelector('optgroup[label="Unreleased Versions"]').appendChild(item)
	})
})

logo_size = "40px"
var border_radius = "15px"

var element = document.querySelector("#block")
element.style.boxShadow = "0px 8px 16px 0px rgba(0,0,0,0.2)"
element.style.position = "absolute"
element.style.borderRadius = border_radius
element.style.display = "block"
element.style.height = logo_size
element.style.width = logo_size
element.style.zIndex = "100"
element.style.marginTop = "17px"
element.style.transition = 'all 0.5s cubic-bezier(0.73, -0.35, 0, 1.49) 0s'

var logo = document.querySelector("#block #logo")
logo.style.width = logo_size
logo.style.display = "block"
logo.style.option = "absolute"
logo.style.borderRadius = border_radius
// logo.style.animation = 'pulsing 1.5s infinite'
// logo.style.transition = 'all 0.9s cubic-bezier(0.73, -0.55, 0, 1.49) 0s'

var title_logo = document.querySelector("#block #title_logo")
title_logo.style.marginTop = "20px"
title_logo.style.width = "180px"

var blockContent = document.querySelector("#block .content_block")
blockContent.style.backgroundColor = "#e3e3e3"
blockContent.style.borderRadius = "10px"
blockContent.style.textAlign = "center"
blockContent.style.display = "none"

button.addEventListener("mouseup", function(){
	element.style.width = logo_size
	element.style.height = logo_size
	element.style.borderRadius = border_radius
	element.style.backgroundColor = "rgba(0, 0, 0, 0)"
	blockContent.style.display = "none"
	element.style.transition = ".1s"
	logo.style.display = "block"
})

logo.addEventListener("mousedown", function(){
	element.style.width = "220px"
	element.style.height = "auto"
	element.style.borderRadius = "10px"
	element.style.backgroundColor = "#e3e3e3"
	blockContent.style.display = "block"
	element.style.transition = ".1s"
	logo.style.display = "none"
})

if (fix_case.checked == true) {
	document.querySelector('#browsers').style.display = 'none'
	document.querySelector('#box_env').style.display = 'none'
	document.querySelector('#block_version').style.display = 'none'
	// document.querySelector('#block_feature').style.display = 'none'
} else {
	document.querySelector('#block_case_count').style.display = 'none'
}

fix_case.addEventListener('change', function() {
	if (fix_case.checked == true) {
		document.querySelector('#browsers').style.display = 'none'
		document.querySelector('#box_env').style.display = 'none'
		document.querySelector('#block_version').style.display = 'none'
		// document.querySelector('#block_feature').style.display = 'none'
		document.querySelector('#block_case_count').style.display = 'block'
	} else {
		document.querySelector('#browsers').style.display = 'flex'
		document.querySelector('#box_env').style.display = 'block'
		document.querySelector('#block_version').style.display = 'block'
		// document.querySelector('#block_feature').style.display = 'block'
		document.querySelector('#block_case_count').style.display = 'none'
	}
})

var data_env = document.querySelector('#data_env')

document.querySelector('#input_env').addEventListener('click', function() {
	var input_env = document.querySelector('#input_env')

	input_env.select()

	data_env.style.display = "block"
	input_env.style.display = "5px 5px 0 0"

	for (let option of data_env.options) {
		option.onclick = function () {
			input_env.value = option.value
			data_env.style.display = "none"
			input_env.style.borderRadius = "5px"
		}
	}

	input_env.oninput = function () {
		currentFocus = -1
		var text = input_env.value.toUpperCase()
		for (let option of data_env.options) {
			if (option.value.toUpperCase().indexOf(text) > -1) {
				option.style.display = "block"
			} else {
				option.style.display = "none"
			}
		}
	}
})


var data_team = document.querySelector('#data_rcv_team')

document.querySelector('#input_rcv_team').addEventListener('click', function() {
	var input_team = document.querySelector('#input_rcv_team')

	input_team.select()

	data_team.style.display = "block"
	input_team.style.display = "5px 5px 0 0"

	for (let option of data_team.options) {
		option.onclick = function () {
			input_team.value = option.value
			data_team.style.display = "none"
			input_team.style.borderRadius = "5px"
		}
	}

	input_team.oninput = function () {
		currentFocus = -1
		var text = input_team.value.toUpperCase()
		for (let option of data_team.options) {
			if (option.value.toUpperCase().indexOf(text) > -1) {
				option.style.display = "block"
			} else {
				option.style.display = "none"
			}
		}
	}
})

var data_feature = document.querySelector('#data_feature')

document.querySelector('#input_feature').addEventListener('click', function() {
	var input_feature = document.querySelector('#input_feature')

	input_feature.select()

	data_feature.style.display = "block"
	input_feature.style.display = "5px 5px 0 0"

	for (let option of data_feature.options) {
		option.onclick = function () {
			input_feature.value = option.value
			data_feature.style.display = "none"
			input_feature.style.borderRadius = "5px"
		}
	}

	input_feature.oninput = function () {
		currentFocus = -1
		var text = input_feature.value.toUpperCase()
		for (let option of data_feature.options) {
			if (option.value.toUpperCase().indexOf(text) > -1) {
				option.style.display = "block"
			} else {
				option.style.display = "none"
			}
		}
	}
})

// document.querySelector('#input_epic').addEventListener('click', function() {
// 	var input_epic = document.querySelector('#input_epic')
// 	var data_epic = document.querySelector('#data_epic')

// 	input_epic.select()
// 	input_epic.value = ""

// 	data_epic.style.display = "block"
// 	input_epic.style.display = "5px 5px 0 0"

// 	for (let option of data_epic.options) {
// 		option.onclick = function () {
// 			input_epic.value = option.textContent
// 			input_epic.align = option.value
// 			data_epic.style.display = "none"
// 			input_epic.style.borderRadius = "5px"
// 		}
// 	}

// 	input_epic.oninput = function () {
// 		currentFocus = -1
// 		var text = input_epic.value.toUpperCase()
// 		for (let option of data_epic.options) {
// 			if (option.value.toUpperCase().indexOf(text) > -1) {
// 				option.style.display = "block"
// 			} else {
// 				option.style.display = "none"
// 			}
// 		}
// 	}
// })

var data_version = document.querySelector('#data_version')

document.querySelector('#input_version').addEventListener('click', function() {
	var input_version = document.querySelector('#input_version')

	var versions = document.querySelectorAll('#versions option')

	versions.forEach(function(item) {
		document.querySelector('#data_version').appendChild(item)
	})

	input_version.select()

	data_version.style.display = "block"
	input_version.style.display = "5px 5px 0 0"

	for (let option of data_version.options) {
		option.onclick = function () {
			input_version.value = option.text
			data_version.style.display = "none"
			input_version.style.borderRadius = "5px"
		}
	}

	input_version.oninput = function () {
		currentFocus = -1
		var text = input_version.value.toUpperCase()
		console.log(text)
		for (let option of data_version.options) {
			if (option.text.toUpperCase().indexOf(text) > -1) {
				option.style.display = "block"
			} else {
				option.style.display = "none"
			}
		}
	}
})

document.querySelector('#input_case_count').addEventListener('click', function() {
	var input_case_count = document.querySelector('#input_case_count')

	input_case_count.select()
})

let n = setInterval(function() {
	if (document.querySelector('#versions-multi-select')){
    // если нашли останавливаем таймер и вызываем алерт
		clearInterval(n);
		releasedVersion = document.querySelectorAll('#versions [label="Released Versions"] option')
		unreleasedVersion = document.querySelectorAll('#versions [label="Unreleased Versions"] option')
	}
}, 1000);

logo.addEventListener('mouseover', function() {
	// logo.style.transform = 'scale(1.3)'
	element.style.transform = 'scale(1.3)'
})

logo.addEventListener('mouseout', function() {
	// logo.style.transform = 'scale(1.0)'
	element.style.transform = 'scale(1.0)'
})

let list = [data_env, data_version, data_feature, data_team]

document.querySelector('#page').addEventListener("click", function() {
	
	list.forEach(function(item) {
		item.style.display = 'none'
	})
})

button.addEventListener("click", function() {

	list.forEach(function(item) {
		item.style.display = 'none'
	})
})