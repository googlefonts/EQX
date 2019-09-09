

var editor = $('#editor-content'),
	item1 = $(".item-1");
	drawing = false,
	oriX = 0, 
	oriy = 0,
	curX = 0, 
	cury = 0,
	newX = 0, 
	newy = 0;

editor
	.on('mousedown', e => {
		oriX = e.clientX;
		oriY = e.clientY;
		drawing = true;
	}).on('mousemove', e => {
	  	if (drawing === true) {
			newX = e.clientX;
			newY = e.clientY;
			console.log((newX - oriX));
			item1.css({
			      "transform": "rotateY("+((newX - oriX)*-0.25)+"deg) rotateX("+((newY - oriY)*0.25)+"deg)"
			   });

	  	}
	}).on('mouseup', e => {
		if (drawing === true) {
	   	drawing = false;
		}
	});


item1.css({
      "font-size": "200px",
      "line-height": "392px",
      "text-align": "center",
      "font-family": "Merriweather",
   });

