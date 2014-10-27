// start of file

	function loadPage_fontsettings(){
		// debug("LOADING PAGE >> loadPage_fontsettings");
		// SETTINGS
		var ps = _GP.projectsettings;
		var meta = _GP.metadata;

		var content = "<h1 class='pagetitle'>Font Settings</h1><div class='pagecontent textpage'>";

		content += "<h2>Font Name</h2>";
		content += "<input type='text' style='width:300px; padding:8px; font-size:1.2em; margin-bottom:20px;' value='"+meta.font_family+"' onchange='_GP.metadata.font_family = this.value;'/><br>";

		content += "<h2>Character Proportions</h2>";
		
		content += "<h3>Key Metrics</h3>"+
					"<table class='settingstable'>"+
					"<tr><td>Ascent height: </td><td><input type='number' value='"+ps.ascent+"' onchange='updateAscender(this.value);'></td><td><span class='unit'>(em units)</span></td></tr>" +
					"<tr><td>Cap height: </td><td><input type='number' value='"+ps.capheight+"' onchange='_GP.projectsettings.capheight = this.value;'></td><td><span class='unit'>(em units)</span></td></tr>" +
					"<tr><td>x Height: </td><td><input type='number' id='metric-xheight' value='"+ps.xheight+"' onchange='_GP.projectsettings.xheight = this.value'></td><td><span class='unit'>(em units)</span></td></tr>" +
					"<tr><td>Descent height: </td><td><input type='number' id='metric-des' disabled='disabled' value='"+(ps.ascent - ps.upm)+"'/></td><td><span class='unit'>(em units)</span></td></tr>" +
					"<tr><td>Total Units per Em: </td><td><input type='number' disabled='disabled' value='"+ps.upm+"'/></td><td><span class='unit'>(em units)</span></td></tr>" +
					"</table><br>";
/*
		content += "<h3>Line Gap</h3>" +
					"This is the amount of vertical space between characters on separate lines. This is recomended to be 20% to 25% of the total Units per Em."+
					"<table class='settingstable'>"+
					"<tr><td>Line Gap: </td><td><input type='number' value='"+ps.linegap+"' onchange='_GP.projectsettings.linegap = this.value;'></td><td><span class='unit'>(em units)</span></td></tr>"+
					"</table><br>";
*/
		content += "<h3>Default Side Bearings</h3>" +
					"Side Bearings are the amount of blank space that is added to the left or right of characters when they are displayed.  This metric can be set individually per character, but will default to this value if not set. "+
					"<table class='settingstable'>"+
					"<tr><td>Left Side Bearing: </td><td><input type='number' value='"+ps.defaultlsb+"' onchange='_GP.projectsettings.lsb = Math.abs(Math.parseInt(this.value)) || 0;'></td><td><span class='unit'>(em units)</span></td></tr>"+
					"<tr><td>Right Side Bearing: </td><td><input type='number' value='"+ps.defaultrsb+"' onchange='_GP.projectsettings.rsb = Math.abs(Math.parseInt(this.value)) || 0;'></td><td><span class='unit'>(em units)</span></td></tr>"+
					"</table><br>";


		content += "<h2>Grids and Guides</h2>";
		content += "<h3>Grid System</h3>";
		content += "Defining a grid system to use while editing characters in this font makes stuff a whole " +
					"lot easier.  This number is the number of vertical and horizontal divisions to use, it should " +
					"divide evenly into the Units per Em.<br>" +
					"<table class='settingstable'>"+
					"<tr><td>Units per Em:</td><td><input type='number' disabled='disabled' value='" + ps.upm + "'/></td><td><span class='unit'>(total)</span></td></tr>"+
					"<tr><td>Grid Divisions</td><td><input type='number' value='"+ps.griddivisions+"' onchange='updateGridDivisions(this.value);'/></td><td><span class='unit'>(number)</span></td></tr>"+
					"<tr><td>Grid Square Size:</td><td><input type='number' id='metirc-ssize' disabled='disabled' value='" + (ps.upm/ps.griddivisions) + "'/></td><td><span class='unit'>(em units)</span></td></tr>" +
					"</table><br>";

		content += "<h3>Overshoot</h3>"+
					"Round letters usually extend a little above the x height line and below the baseline. " +
					"A light guideline will show this overshoot distance.<br>" +
					"<table class='settingstable'>"+
					"<tr><td>Overshoot:</td><td><input type='number' value='"+ps.overshoot+"' onchange='_GP.projectsettings.overshoot = this.value;'></td><td><span class='unit'>(em units)</span></td></tr>"+
					"</table><br>";



		// CHARACTERS
		content += "<h1>Character Ranges</h1>"+
					"Character ranges are based on the <a href='http://en.wikipedia.org/wiki/Unicode' target=_new>Unicode Standard</a>, which assigns a <a href='http://en.wikipedia.org/wiki/Hexadecimal' target=_new>hexadecimal number</a> to all possible characters in a font. ";

		content += "<br><br><h3>Standard Character Ranges&ensp;"+helpUI(unicodeInputHelp())+"</h3>"+
					"The most common character sets are built into Glyphr Studio, and can be toggled with the checkboxes below.";

		content += "<table class='settingstable'><tr>"+
					"<td>"+checkUI("_GP.projectsettings.charrange.basiclatin")+"</td>"+
					"<td><label for='basiclatin'><b>Basic Latin</b> - Unicode characters 0x0020 through 0x007E</label></td></tr>"+
					"<tr><td>&nbsp;</td><td colspan='2'><div class='charrangepreview'>";
					var bl = _UI.basiclatinorder;
					for(var t=0; t<bl.length; t++){ content += (hexToChar(bl[t]) + " "); }
		content += "</div></td></tr></table>";

		content += "<table class='settingstable'><tr>"+
					"<td style='vertical-align:top;'>"+checkUI("_GP.projectsettings.charrange.latinsuppliment")+"</td>"+
					"<td><label for='latinsuppliment'><b>Latin Suppliment</b> - Unicode characters 0x0080 through 0x00FF<br>Note: characters 0x0080 - 0x00A0 are printing control codes, which fonts may use as other characters.</label></td></tr>"+
					"<tr><td>&nbsp;</td><td colspan='2'><div class='charrangepreview'>";
					for(var s=_UI.charrange.latinsuppliment.begin; s<=_UI.charrange.latinsuppliment.end; s++){ content += (decToHTML(s) + " "); }
		content += "</div></td></tr></table>";

		content += "<table class='settingstable'><tr>"+
					"<td>"+checkUI("_GP.projectsettings.charrange.latinextendeda")+"</td>"+
					"<td><label for='latinextendeda'><b>Latin Extended-A</b> - Unicode characters 0x0100 through 0x017F</label></td></tr>"+
					"<tr><td>&nbsp;</td><td colspan='2'><div class='charrangepreview'>";
					for(var a=_UI.charrange.latinextendeda.begin; a<=_UI.charrange.latinextendeda.end; a++){ content += (hexToChar(a) + " "); }
		content += "</div></td></tr></table>";


		content += "<table class='settingstable'><tr>"+
					"<td>"+checkUI("_GP.projectsettings.charrange.latinextendedb")+"</td>"+
					"<td><label for='latinextendedb'><b>Latin Extended-B</b> - Unicode characters 0x0180 through 0x024F</label></td></tr>"+
					"<tr><td>&nbsp;</td><td colspan='2'><div class='charrangepreview'>";
					for(var b=_UI.charrange.latinextendedb.begin; b<=_UI.charrange.latinextendedb.end; b++){ content += (hexToChar(b) + " "); }
		content += "</div></td></tr></table>";

		content += "<br><h3>Custom Character Ranges&ensp;"+helpUI(unicodeInputHelp())+"</h3>"+
					"Additional character ranges above 0x024F can be included here. "+
					"A nice overview of character ranges can be found at <a href='https://en.wikipedia.org/wiki/Unicode_block' target=_new>Wikipedia's Unicode Block page</a>.<br>" +
					"Custom character ranges are inclusive, must be unique (non-overlapping), must be greater than 0x024F and less than 0xFFFF.<br><br>"+
					"<table class='settingstable'><tr><td>"+checkUI("_GP.projectsettings.charrange.filternoncharpoints")+"</td><td><label for='filternoncharpoints'>Filter out reserved Unicode code points.</label></td></tr></table>"+
					"<table class='settingstable'><tr>"+
					"<td>begin:<br><input type='text' id='customrangebegin'></td>"+
					"<td>end:<br><input type='text' id='customrangeend'></td>"+
					"<td><br><button onclick='addCustomCharacterRange();'>Add Range</button></td>"+
					"<td><br><div id='customrangeerror'>bad range input</div></td>"+
					"</tr></table>"+
					"<div id='customrangetable'></div><br><br>";


		// METADATA
		content += "<br><h1>Font Metadata</h1>" +
			"<p style='margin-bottom:20px;'>These properties are based on the CSS @font-face standard.  More information can be found at the W3C's <a href='http://www.w3.org/TR/CSS2/fonts.html' target=_new>Fonts Page</a> and their <a href='http://www.w3.org/TR/2008/REC-CSS2-20080411/fonts.html#select' target=_new>CSS @font-face Page</a>.";


		content += "<table class='settingstable metadatatable'>";
		for(var m in meta){ if(meta.hasOwnProperty(m) && m!== 'font_family'){
			content += "<tr>";
			content += "<td class='propname' style='width:200px'>" + m.replace(/_/g, '-') + "</td>";
			content += "<td><input type='text' value='"+meta[m]+"' onchange='_GP."+m+" = this.value;'/></td>";
			content += "<td>"+_UI.metadatahelp[m]+"</td>";
			content += "</tr>";
		}}
		content += "</table>";


		// Finish and show table
		content += "</div>";
		getEditDocument().getElementById("mainwrapper").innerHTML = content;
		updateCustomRangeTable();
	}

	function updateAscender(val){
		var ps = _GP.projectsettings;
		ps.ascent = Math.max(0, Math.min(ps.upm, round(val)));
		document.getElementById('metric-des').value = (ps.ascent - ps.upm);
	}

// end of file