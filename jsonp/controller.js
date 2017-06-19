(function(window,document){
	var jsonp = function(url,data,callback){
		var callback_index = Math.random().toString().replace(".","");
		var cbFuncName = "my_jsonp_cb"+callback_index;
		window[cbFuncName] = callback;
		var querystring = url;
		querystring+="?callback="+cbFuncName;
		for(var key in data)
		{
			querystring+="&"+key+"="+data[key];
		}
		// console.log(document.getElementById("jsonp"));
		// if(document.getElementById("jsonp")!=null)
		// {
		// 	document.getElementById("jsonp").outterHTML="";
		// }
		var oScript = document.createElement('script');
		oScript.type = "text/javascript";
		oScript.id = "jsonp";
		oScript.src = querystring;
		document.body.appendChild(oScript);
	}
	window.$jsonp = jsonp;
})(window,document);