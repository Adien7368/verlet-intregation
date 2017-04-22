window.onload = function(){

	var  canvas = document.getElementById("Canvas"),
		 context = canvas.getContext("2d"),
		 width = canvas.width = window.innerWidth,
		 height = canvas.height = window.innerHeight;


		 var points = [],
		 sticks = [],
		 bounce = .9,
		 gravity = 0.1,
		 friction = .99;

		for(var i=0;i<6;++i){
		 points.push({
		 	x : 100+i,
		 	y : 100+i+2,
		 	oldx : 95+i,
		 	oldy : 95+i+2,
		 	move : 1
		 });
		}

		points.push({

			x:200,
			y:200,
			oldx:200,
			oldy:200,
			move:1
		});

		for(var i=0;i<6;++i){
			sticks.push({
				p0 : points[i],
				p1 : points[(i+2)%6],
				distance : i*Math.random()+100
			});
		}
			sticks.push({
				p0 : points[i],
				p1 : points[(i+2)%6],
				distance : i*Math.random()+100
			});

			sticks.push({
				p0 : points[(i+1)%5],
				p1 : points[(i+3)%6],
				distance : i*Math.random()+100
			});


		 



		 

		 
		 

		 


		 update();


		 function update(){
		 	updatePoints();
		 	for(var i=0;i<4;++i){
		 	updateStick();
		 	constrainPoints();}
		 	drawPoints();
		 	renderSticks();
		 	requestAnimationFrame(update);
		 }



		 function updateStick(){

		 	for (var i = sticks.length - 1; i >= 0; i--) {
		 		var s = sticks[i],
		 		dx = s.p0.x - s.p1.x,
		 		dy = s.p0.y - s.p1.y,
		 		distance = Math.sqrt(dx*dx + dy*dy),
		 		difference = s.distance - distance, 
		 		percentage = difference/s.distance/2,
		 		offsetX = percentage*dx,
		 		offsetY = percentage*dy;
		 		if(s.p0.move){
		 		s.p0.x += offsetX;
		 		s.p0.y += offsetY;
		 		}
		 		if(s.p1.move){
		 		s.p1.x -= offsetX;
		 		s.p1.y -= offsetY;
		 		}
		 	}
		 }

		 function renderSticks(){
		 	for (var i = sticks.length - 1; i >= 0; i--) {
		 		var s = sticks[i];
		 		context.moveTo(s.p0.x,s.p0.y);
		 		context.lineTo(s.p1.x,s.p1.y);
		 	}
		 	context.stroke();
		 }

		 function distance(p0,p1){
		 	var x = p0.x - p1.x,
		 	y = p0.y - p1.y;
		 	return Math.sqrt(x*x + y*y);
		 }

		 function updatePoints(){

		 	for (var i = points.length - 1; i >= 0; i--) {
		 		
		 		if(points[i].move)
		 		{var p = points[i],
		 			vx = (p.x-p.oldx)*friction,
		 			vy = p.y-p.oldy;

		 			p.oldx = p.x;
		 			p.oldy = p.y;
		 			p.x+=vx;
		 			p.y+=vy;
		 			p.y+=gravity;

		 			if(p.x > width){
		 				p.x = width;
		 				p.oldx = vx*bounce + p.x; 
		 			}else if(p.x < 0){
		 				p.x = 0;
		 				p.oldx = vx*bounce + p.x;
		 			}

		 			if(p.y>height){
		 				p.y = height;
		 				p.oldy = p.y + vy*bounce;
		 			}else if(p.y < 0){
		 				p.y=0;
		 				p.oldy = p.y + vy*bounce;
		 			}

		 	}}
		 }


		 function constrainPoints(){

		 	for (var i = points.length - 1; i >= 0; i--) {
		 		if(points[i].move)
		 		{
		 		
		 			var p = points[i],
		 			vx = (p.x-p.oldx)*friction,
		 			vy = p.y-p.oldy;

		 			

		 			if(p.x > width){
		 				p.x = width;
		 				p.oldx = vx*bounce + p.x; 
		 			}else if(p.x < 0){
		 				p.x = 0;
		 				p.oldx = vx*bounce + p.x;
		 			}

		 			if(p.y>height){
		 				p.y = height;
		 				p.oldy = p.y + vy*bounce;
		 			}else if(p.y < 0){
		 				p.y=0;
		 				p.oldy = p.y + vy*bounce;
		 			}
		 		}
		    }

		 }

		 function drawPoints(){
		 	context.clearRect(0,0,width,height);
		 	for (var i = points.length - 1; i >= 0; i--) {
		 		var p = points[i];
		 		context.beginPath();
		 		context.arc(p.x,p.y,5,0,Math.PI*2);
		 		context.fill();
		 	}


		 }


};