// This is a plain vanilla JS form designed to be added into any javascript injector, in order to render it on a web browser / HTML.
// Injector used for the demo is a Chrome Extension called scripty.
//import express from "express";
//import axios from 'axios';
//import cors from "cors";

window.onload(primaryCallback());

var axiosresponse;
var Callback_success = false;
function primaryCallback() {
    //variables
    const modifiers = {
        url: "https://wxcc1.demos.efa.ai/", // Localtunnel URL or your public Server
        formTitle: "Ich habe eine Frage",
        /*formSubTitle: "Details zum Rückruf",*/
		formSubTitle: "",
        //formButtonColor: "#FD832F",
        formButtonColor: "#AAC936",
        reasons: ["Bitte wählen", "Rechnung", "Bestellung", "Support", "Sonstiges"],
        buttonColor: "#AAC936", // ie "#002D72" or "red"
        secondColor: "#444444",
        bannerColor: "#C8CBCE",
        buttonTextColor: "#000000",
        buttonPositionTop: "50%",
        buttonPositionRight: "-70px",
        modalWidth: "700px",
        modalHeight: "550px"
    };
    //alert('start');

    // create bottom of page banner
    // let btnBackground = document.createElement("BUTTON");
    // btnBackground.setAttribute("style", `position:fixed; font-family: inherit; bottom: 0px; left: 0px; width: 100%; height: 100px; background: ${modifiers.bannerColor}; color: ${modifiers.buttonTextColor}; cursor: pointer; z-index:99999999;transition: all .4s ease;overflow:hidden; font-size: 1.1em; border: 0px;`);
    // document.body.append(btnBackground);

    // create button on bottom left
    // let btn = document.createElement("BUTTON");
    // btn.textContent = " 📞 Call Me Back";
    // btn.setAttribute("style", `position:fixed; font-family: inherit; bottom: 10px; left: 10px; width: max-content; height: 30px; background: ${modifiers.buttonColor};border-radius: 5px; ;color: ${modifiers.buttonTextColor}; cursor: pointer; z-index:99999999;transition: all .4s ease;overflow:hidden; font-size: 1.1em; border: 0px; box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19); margin-left: 15px;margin-bottom:15px;`);
    // document.body.append(btn);

    let btn = document.createElement("BUTTON");
    //alert('btn created');
    btn.textContent = "Rufen Sie mich zurück";
    btn.setAttribute("style", `transform:rotate(-90deg); position:fixed; font-family: inherit; top:${modifiers.buttonPositionTop}; right:${modifiers.buttonPositionRight}; margin-right: 0px; width: 200px; height: 50px; background: ${modifiers.buttonColor}; border-radius: 5px; ;color: ${modifiers.buttonTextColor}; cursor: pointer; z-index:99999999;transition: all .4s ease;overflow:hidden; font-size: 1.1em; border: 0px;`);
    //alert('btn configured');
    try
    {
        document.body.append(btn);
        //alert('btn added');
    }
    catch (error) {
        alert(error);
    }

    //demo container
    let demoContainer = document.createElement("div");
    document.body.append(demoContainer);

    //Event Listeners
    btn.addEventListener("click", function() {
        let backdrop = document.createElement("div");
        backdrop.style.position = "fixed";
        backdrop.style.width = "100%";
        backdrop.style.height = "100%";
        backdrop.style.top = 0;
        backdrop.style.left = 0;
        backdrop.style.background = "rgb(0,0,0, 0.2)";
        backdrop.style.zIndex = "100";
        document.body.insertBefore(backdrop, demoContainer);
        backdrop.addEventListener("click", closeModal);

        //create Modal
        modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.zIndex = "200";
        modal.style.top = "10%";
        modal.style.left = "28%";
        modal.style.width = `${modifiers.modalWidth}`;
        modal.style.height = `${modifiers.modalHeight}`;
        modal.style.marginBottom = "0px";
        modal.style.background = "white";
        modal.style.boxShadow = "1px 1px 6px rgb(0,0,0,0.4)";
        modal.style.padding = "1rem";
        modal.style.borderRadius = "10px";

        // message area
        let modalMessage = document.createElement("div");
        modalMessage.style.position = "relative";
        modalMessage.style.marginTop = "0px";
        modal.appendChild(modalMessage);

        // modal Heading
        let modalHeading = document.createElement("h1");
        modalHeading.textContent = `${modifiers.formTitle}`;
        modalHeading.style.textAlign = "center";
        modalHeading.style.fontFamily = "inherit";
        modalHeading.style.color = "#521751";
        modalHeading.style.marginTop = "40px";
        modalHeading.style.fontSize = "2.0rem";
        modal.appendChild(modalHeading);

        // modal sub Heading
        let modalSubHeading = document.createElement("h4");
        modalSubHeading.textContent = `${modifiers.formSubTitle}`;
        modalSubHeading.classList.add("modalSubHeading");
        modalSubHeading.style.textAlign = "center";
        modalSubHeading.style.fontFamily = "inherit";
        modalSubHeading.style.color = "#521751";
        modalSubHeading.style.marginBottom = "20px";
        modalSubHeading.style.marginTop = "0px";
        modalSubHeading.style.fontSize = "1.2rem";
        modal.appendChild(modalSubHeading);

        //Input fields of the Form
        let inputFieldContainer = document.createElement("div");
        inputFieldContainer.setAttribute(
            "style",
            ` margin-right: 20px; margin-left: 20px;
      `
        );
        modal.appendChild(inputFieldContainer);

        //create a form
        var startForm = document.createElement("form");
        startForm.id = "callBackForm";
        startForm.setAttribute(
            "style",
            `
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px; 
      `
        );
        inputFieldContainer.appendChild(startForm);

        // form field 1
        let startFN = document.createElement("input");
        startFN.type = "text";
        startFN.name = "Vorname";
        startFN.id = "Vorname";
        startFN.placeholder = "Vorname";
        startFN.setAttribute("style", ` font-size: 12px; border-width: 2px; text-align: left;  margin-bottom: 0px;border-top:0; border-left: 0; border-right: 0; `);
        startFN.addEventListener("input", function() {
            editedQuote = startFN.value;
        });
        startForm.append(startFN);

        // form field 2
        let startLN = document.createElement("input");
        startLN.type = "text";
        startLN.name = "Nachname";
        startLN.id = "Nachname";
        startLN.placeholder = "Nachname";
        startLN.setAttribute("style", `font-size: 12px; border-width: 2px; text-align: left;  left; margin-bottom: 0px;border-top:0; border-left: 0; border-right: 0;`);
        startLN.addEventListener("input", function() {
            editedQuote = startLN.value;
        });
        startForm.append(startLN);

        //form field 3
        let startE = document.createElement("input");
        startE.type = "text";
        startE.name = "Email";
        startE.id = "Email";
        startE.placeholder = "Email";
        startE.setAttribute("style", `font-size: 12px; border-width: 2px;  text-align: left;  margin-bottom: 0px;border-top:0; border-left: 0; border-right: 0;`);
        startE.addEventListener("input", function() {
            editedQuote = startE.value;
        });
        startForm.append(startE);

        //form field 4
        let startP = document.createElement("input");
        startP.type = "text";
        startP.name = "Telefon";
        startP.id = "Telefon";
        startP.placeholder = "Telefon *";
        startP.required = true;
        startP.setAttribute("style", `font-size: 12px; border-width: 2px;  text-align: left;  margin-bottom: 0px; border-top:0; border-left: 0; border-right: 0; `);
        startP.addEventListener("input", function() {
            editedQuote = startP.value;
        });
        startForm.append(startP);

        

        // form field 5
        let startApp = document.createElement("LABEL");
        startApp.setAttribute("for", "requestType");
        startApp.classList.add("startApp");
        startApp.innerHTML = "Mit wem möchten Sie sprechen";
        startApp.setAttribute("style", `margin-bottom: 0px; font-size: 12px; border-width: 2px; text-align: center; border-top:0; border-left: 0; border-right: 0; border-bottom: 0; grid-column: 1 / 3;`);
        startForm.append(startApp);

        //form field 6
        let requestType = document.createElement("select");
        requestType.type = "text";
        requestType.name = "requestType";
        requestType.id = "requestType";
        requestType.required = true;
        requestType.setAttribute("style", `font-size: 12px; border-width: 2px; text-align: center; margin-bottom: 0px; margin-top: 0px; border-top:0; border-left: 0; border-right: 0; grid-column: 1 / 3;`);
        requestType.addEventListener("change", function() {
            editedQuote = requestType.value;
        });
        startForm.append(requestType);

        //Create and append the options
        for (var i = 0; i < modifiers.reasons.length; i++) {
            var option = document.createElement("option");
            option.value = modifiers.reasons[i];
            option.text = modifiers.reasons[i];
            requestType.appendChild(option);
        }

        // create div for checkbox
        let checkboxDiv = document.createElement("div");
        checkboxDiv.setAttribute("style", ` margin-left: 25%; margin-top: 0px; grid-column: 1 / 3;`);
        startForm.append(checkboxDiv);

        //form field 7
        let startCheck = document.createElement("input");
        startCheck.type = "checkbox";
        startCheck.name = "checkboxId";
        startCheck.id = "checkboxId";
        startCheck.setAttribute("style", "position: relative; transform: scale(0.8); margin-left: 20px; margin-right: 5px; font-size: 10px;");
        startCheck.addEventListener("input", function() {
            editedQuote = startCheck.value;
        });
        checkboxDiv.append(startCheck);

        var checkBoxLabel = document.createElement("Label");
        checkBoxLabel.setAttribute("for", "checkboxId");
        checkBoxLabel.innerHTML = "Ich stimme den Bestimmungen zum Datenschutz zu";
        checkBoxLabel.setAttribute("style", " display: inline; font-size: 12px; margin-left: 4px; ");
        checkboxDiv.append(checkBoxLabel);

        //Send Button
        let confirmButton = document.createElement("Button");
        confirmButton.id = "confirmButton";
        confirmButton.textContent = "Anfordern";
        //styles
        confirmButton.setAttribute("style", `font-size: 12px; text-align: center; margin-top: 0px; margin-bottom: 0px; margin-left: 15px; margin-right: 15px; padding: 8px; border: none; background: ${modifiers.formButtonColor}; color: white;  border-radius: 5px; width: 600px; font-weight: bold; text-transform: uppercase; box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19); border: none; cursor: pointer; grid-column: 1 / 3; margin-bottom: 20px;`);
        confirmButton.setAttribute("type", "button");
        startForm.append(confirmButton);


        

        //form field 4a
        /*
		let startAuth = document.createElement("input");
        startAuth.type = "text";
        startAuth.name = "Auth_Token";
        startAuth.id = "Auth_Token";
        startAuth.placeholder = "Auth_Token *";
        startAuth.required = true;
        startAuth.setAttribute("style", `font-size: 12px; border-width: 1px;  text-align: left;  margin-bottom: 0px; border-top:0; border-left: 0; border-right: 0; `);
        startAuth.addEventListener("input", function() {
            editedQuote = startAuth.value;
        });
        startForm.append(startAuth);
		*/


        // form field 4b
        /*
		let startAPI = document.createElement("LABEL");
        startAPI.setAttribute("for", "requestType");
        startAPI.classList.add("startApp");
        startAPI.innerHTML = "<a href='https://developer.webex-cx.com/documentation/auxiliary-code/v1/list-auxiliary-codes' target=_blank>>> API Docs</a>";
        startAPI.setAttribute("style", `margin-bottom: 0px; font-size: 12px; border-width: 2px; text-align: right; border-top:0; border-left: 0; border-right: 0; border-bottom: 0;`);
        startForm.append(startAPI);
		*/




        var MyResult = "fail";

        confirmButton.addEventListener("click", async function validate(e) {
            document.body.style.cursor  = 'wait';

            let callBack = document.forms.callBackForm;
            let formData = new FormData(callBack);
            let firstName = formData.get("Vorname");
            let lastName = formData.get("Nachname");
            let email = formData.get("Email");
            let phone = formData.get("Telefon");
            let AuthToken = formData.get("Auth_Token");
            let locations = formData.get("locations");
            let requestType = formData.get("requestType");
            let appointmentType = formData.get("appointmentType");

            let form = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                locations: locations,
                requestType: requestType,
                appointmentType: appointmentType
            };
            //alert(firstName + " " + lastName + " " + email + " " + phone);
            try
            {
							
                let entryPointId = "";
                switch (requestType) {
                    case "Rechnung":
                        entryPointId = "c24d8c9e-8a5b-410b-af46-7b0d3e88c8c6";
                        break;
                    case "Bestellung":
                        entryPointId = "c24d8c9e-8a5b-410b-af46-7b0d3e88c8c6";
                        break;
                    case "Support":
                        entryPointId = "c24d8c9e-8a5b-410b-af46-7b0d3e88c8c6";
                        break;
                    default:
                        entryPointId = "c24d8c9e-8a5b-410b-af46-7b0d3e88c8c6";
                }
                
                const data = JSON.stringify({
                    destination: `${phone}`,
                    entryPointId: `${entryPointId}`,
                    attributes: {
                        CallReason: `${requestType}`,
                        CallType: "Von Website angeforderter Rückruf",
                        Name: `${firstName} ${lastName}`,
                        Email: `${email}`
                    },
                    outboundType: "CALLBACK",
                    mediaType: "telephony",
                    callback: {
                        callbackOrigin: "web",
                        callbackType: "immediate"
                    }
                });

                const config = {
                    method: "post",
                    url: "https://api.wxcc-eu2.cisco.com/v1/tasks",
                    headers: {
                        // Enter your Access Token...
                        Authorization: "Bearer "+AuthToken,
                        "Content-Type": "application/json"
                    },
                    data: data
                };
                    
				var myjson = '{';
					myjson += '"entryPointId": "c24d8c9e-8a5b-410b-af46-7b0d3e88c8c6", ';
					myjson += '"destination": "'+phone+'", ';
					myjson += '"attributes": { ';
					myjson += '"Grund": "Wechsel AMB_to_Voice" ';
					myjson += '}, ';
					myjson += '"outboundType": "CALLBACK", ';
					myjson += '"mediaType": "telephony", ';
					myjson += '"callback": { ';
					myjson += '"callbackOrigin": "web", ';
					myjson += '"callbackType": "immediate" ';
					myjson += '}';
					myjson += '}';
				//alert ("initiating Callback...");
				if (phone != "")
				{
					InitCallback(myjson);
					if (Callback_success == true)
					{
						MyResult = "success";					
					}
					MyResult = "success";
				}
				else
				{
					Callback_success = false;
					MyResult = "fail";
				}
				
				
				//alert (MyResult);
				
				/*
                try 
                {
                    axiosresponse = await axios(config);
                    //alert("1"+JSON.stringify(axiosresponse.data));
                    MyResult = "success";                    
                } 
                catch (err) 
                {
                    alert("2"+err+"---"+axiosresponse);
                    MyResult = "fail";
                }*/
            }
            catch(myerror)
            {
                alert("3"+myerror);
                MyResult = "fail";
            }

            document.body.style.cursor  = 'default';





            try {
                /*
                // Post data using the Fetch API
                let response = await fetch(`${modifiers.url}/api/callback`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        //Specific for localtunnel
                        "Bypass-Tunnel-Reminder": "true"
                    },
                    referrerPolicy: "no-referrer",
                    body: JSON.stringify(form)
                });
                let data = await response.json();
                let obj = data.msg;
                console.log(obj);
                */
                if (MyResult == "success") {
                    //add message
                    let successMsg = document.createElement("span");
                    successMsg.textContent = `Rückruf erfolgreich eingereicht für: ${phone}`;
                    successMsg.setAttribute("style", ` text-align: center; margin-left: 100px; font-size: 1.0rem; padding: 2px; border-width: 2px; border-top:0; border-left: 0; border-right: 0; border-radius: 5px; color: white; width: 500px; background: #22bb33; position: absolute; z-index:999 `);
                    modalMessage.append(successMsg);

                    setTimeout(() => {
                        startForm.reset();
                        successMsg.remove();
                    }, 8000);
                } else {
                    let failMsg = document.createElement("span");
                    failMsg.textContent = "Das hat leider nicht geklappt";
                    failMsg.setAttribute("style", ` text-align: center; margin-left: 100px; font-size: 1.0rem; padding: 2px; border-width: 2px; border-top:0; border-left: 0; border-right: 0; border-radius: 5px; color: white; width: 500px; background: tomato; position: absolute; z-index:999 `);
                    modalMessage.append(failMsg);
                    setTimeout(() => {
                        startForm.reset();
                        failMsg.remove();
                    }, 8000);
                }

                startForm.reset();
                // Prevent the default form submit
                e.preventDefault();
            } catch (error) {
                let failMsg = document.createElement("span");
                failMsg.textContent = "Das hat leider nicht geklappt";
                failMsg.setAttribute("style", ` text-align: center; margin-left: 100px; font-size: 1.0rem; padding: 2px; border-width: 2px; border-top:0; border-left: 0; border-right: 0; border-radius: 5px; color: white; width: 500px; background: tomato; position: absolute; z-index:999 `);
                modalMessage.append(failMsg);
                setTimeout(() => {
                    startForm.reset();
                    failMsg.remove();
                }, 8000);
            }
        });
        //close Modal
        function closeModal() {
            if (backdrop) {
                backdrop.remove();
            }
            if (modal) {
                modal.remove();
            }
        }
		
		function InitCallback(json) 
		{
			//alert('start');
			
			var http = new XMLHttpRequest();
			var url = 'https://hooks.eu.webexconnect.io/events/TDR4JWUDWK';
			
			http.open('POST', url, true);
			http.setRequestHeader('Content-type', 'application/json');
			http.onreadystatechange = function() 
			{
				if(http.readyState == 4 && http.status == 200) 
				{
					//alert('Rückruf eingereicht...');
					Callback_success = true;
				}
			}
			http.send(json);				
			
		}
        //alert('insertBefore');
        document.body.insertBefore(modal, demoContainer);
    });
}