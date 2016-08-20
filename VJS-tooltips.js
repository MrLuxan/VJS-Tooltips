window.addEventListener("load", function() {

	tooltip = document.createElement("span");  // Create with DOM;
    document.body.appendChild(tooltip);

    var storedArray;

    var elements = document.querySelectorAll('[data-tooltip]');
    for (var i = 0; i < elements.length; i++) 
    {
		elements[i].onmouseenter=function()
		{
			storedArray = JSON.parse( this.getAttribute("data-tooltip") );

			tooltip.innerHTML = "";
			tooltip.classList.add(storedArray.class);

			// console.log(storedArray);

			tooltip.style.cssText = storedArray.style;

			tooltip.style.display = 'inline';


			if(storedArray.type == "image")
			{
				pic = document.createElement("img"); 
				pic.src = storedArray.src;
				tooltip.appendChild(pic);
			} 
			else if(storedArray.type == "video")
			{
				video = document.createElement("video"); 
				video.with = "420px";

				srcArray = storedArray.src.split(",");
				srcArray.forEach(function(entry) 
				{
					fileArray = entry.toLowerCase().split(".");
					filetype = fileArray[fileArray.length-1];
					if(filetype == "mp4" || filetype == "webm" || filetype == "ogg")
					{
						source = document.createElement("source"); 
						source.src = entry;
						source.type = "video/" + filetype;
						video.appendChild(source);
					}
				}, this);

				tooltip.appendChild(video);

				video.load();
				video.play();
			}
			else if(storedArray.type == "text")
			{
				tooltip.innerHTML = storedArray.text;
			}

			if(storedArray.hasOwnProperty('postion'))
			{
				if(storedArray.postion != "mouse")
				{
					var rect = this.getBoundingClientRect();

					switch(storedArray.postion)
					{
						case "top-left"   : tooltip.style.top = (rect.top + window.scrollY - tooltip.clientHeight - 10) + "px"; tooltip.style.left = rect.left + "px" ;  break;
						case "top-middel" : tooltip.style.top = (rect.top + window.scrollY - tooltip.clientHeight - 10) + "px"; tooltip.style.left = (rect.right - (this.clientWidth/2) - (tooltip.clientWidth/2)) + "px" ;  break;
						case "top-right"  : tooltip.style.top = (rect.top + window.scrollY - tooltip.clientHeight - 10) + "px"; tooltip.style.left = (rect.right - tooltip.clientWidth) + "px" ;  break;

						case "right-top"    : tooltip.style.top = rect.top + window.scrollY + "px"; tooltip.style.left = (rect.right + 10) + "px" ;  break;
						case "right-middel" : tooltip.style.top = (rect.bottom + window.scrollY - (this.clientHeight/2) - (tooltip.clientHeight/2)) + "px"; tooltip.style.left = (rect.right + 10) + "px" ;  break;
						case "right-bottom" : tooltip.style.top = (rect.bottom + window.scrollY  - tooltip.clientHeight) + "px"; tooltip.style.left = (rect.right + 10) + "px" ;  break;

						case "bottom-left"   : tooltip.style.top = (rect.bottom + window.scrollY  + 10) + "px"; tooltip.style.left = rect.left + "px" ;  break;
						case "bottom-middel" : tooltip.style.top = (rect.bottom + window.scrollY  + 10) + "px"; tooltip.style.left = (rect.right - (this.clientWidth/2) - (tooltip.clientWidth/2)) + "px" ;  break;
						case "bottom-right"  : tooltip.style.top = (rect.bottom + window.scrollY  + 10) + "px"; tooltip.style.left = (rect.right - tooltip.clientWidth) + "px" ;  break;

						case "left-top"    : tooltip.style.top = rect.top + window.scrollY  + "px"; tooltip.style.left = (rect.left - tooltip.clientWidth - 10) + "px" ;  break;
						case "left-middel" : tooltip.style.top = (rect.bottom + window.scrollY - (this.clientHeight/2) - (tooltip.clientHeight/2)) + "px"; tooltip.style.left = (rect.left - tooltip.clientWidth - 10) + "px" ;  break;                        
						case "left-bottom" : tooltip.style.top = (rect.bottom + window.scrollY - tooltip.clientHeight) + "px"; tooltip.style.left = (rect.left - tooltip.clientWidth - 10) + "px" ;  break;
					}
				}
			}
    	};


		elements[i].onmouseout=function()
		{
			tooltip.style.display = 'none';

			var storedArray = JSON.parse( this.getAttribute("data-tooltip") );
			tooltip.classList.remove(storedArray.class);
			tooltip.innerHTML = "";
		}; 

		elements[i].onmousemove=function(e)
		{
			if(!storedArray.hasOwnProperty('postion'))
			{
				var mouseX = e.pageX + 10;
				var mouseY = e.pageY + 10;

				tooltip.style.top = mouseY + "px";
				tooltip.style.left = mouseX + "px";
			}
		};
	}

});
