
function SMSreminder() 
{
	//alert('start');
	
	var http = new XMLHttpRequest();
	var url = 'https://hooks.eu.webexconnect.io/events/L7JZ9X1CMH';
	var sms = document.getElementById('mobile');
	var myName = document.getElementById('myname');
	var test = '{"sms" : "' + sms.value + '"}';
	
	test = '{"name": "Stefan Slominski",	"sms": "'+ sms.value + '",';
	test += '"email": "slomi@sws.de", 	"preferred": "sms", 	"termindatum": "31.12.2024", 	"terminzeit": "23:59h", ';
	test += '"text1": "Lieber '+myName.value+', wir möchten Dich an unseren gemeinsamen Termin am 31.12.2024 um 23:59h erinnern.",';
	test += '"text2": "Falls Du diesen Termin nicht wahrnehmen kannst, antworte bitte mit #storno.",';
	test += '"text3": "Ansonsten freuen wir uns und wünschen Dir noch einen angenehmen Tag.",';
	test += '"text4": "Vielen Dank, Dein ACP Team"'; 
	test += '}';
	
	http.open('POST', url, true);
	http.setRequestHeader('Content-type', 'application/json');
	http.onreadystatechange = function() 
	{
		if(http.readyState == 4 && http.status == 200) 
		{
			alert('Webhook initiated...');
		}
	}
	http.send(test);
	
	//alert(test);
	
}

function WebexMessenger() 
{
	//alert('start');
	
	var http = new XMLHttpRequest();
	var url = 'https://hooks.eu.webexconnect.io/events/AMSGAFGIUW';
	var space = document.getElementById('myspace');
	var message = document.getElementById('mymessage');
	
	//alert(message.value);
	//message.value = message.value.replaceAll('\n','\\\\n');
	//alert(message.value);
	
	var test = '';
	test = '{ "roomId": "Y2lzY29zcGFyazovL3VzL1JPT00vNTkwMTlmYzAtZGY4MC0xMWVkLWI2OGEtNTdiYWUwZTI5MGYw",'; // WxCC Demo
	//test = '{ "roomId": "Y2lzY29zcGFyazovL3VzL1JPT00vOTBlZWE0ZTAtZjBiMC0xMWU5LWI0YzMtYjFkY2M2MTUxNTFm",'; // Botmania
	//test = '{"roomId": "Y2lzY29zcGFyazovL3VzL1JPT00vZmNiZjZlMTAtNmVkYS0xMWU4LTg3ZTQtNzFmMDRhZDk5YThi",'; // 24x7	
	//test += '"text": " ",';
	//test += ' "markdown": "'+message.value.replaceAll('\n','\\\\n')+'",';
	test += ' "text": "'+message.value.replaceAll('\n','\\\\n')+'" }';
	
	//test = '{ "roomId": "Y2lzY29zcGFyazovL3VzL1JPT00vOTBlZWE0ZTAtZjBiMC0xMWU5LWI0YzMtYjFkY2M2MTUxNTFm", "markdown": "hello **world**", "text": "hello **world**" }';
	
	http.open('POST', url, true);
	http.setRequestHeader('Content-type', 'application/json');
	http.onreadystatechange = function() 
	{
		if(http.readyState == 4 && http.status == 200) 
		{
			alert('Nachricht verschickt...');
		}
	}
	http.send(test);
	
	//alert(test);
	
}
