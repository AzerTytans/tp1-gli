
//La création d'un Dnd requière un canvas et un interacteur.
//L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
function DnD(canvas, interactor) {
	// Définir ici les attributs de la 'classe'
	this.pos_initial_x = 0;
	this.pos_initial_y = 0;
	this.pos_final_x = 0;
	this.pos_final_y = 0;
	this.isPression = false;
	this.canvas = canvas;
	this.interactor = interactor.onInteractionStart(this);

	// Developper les 3 fonctions gérant les événements
	this.pression = function(evt){
		this.isPression = true;
		this.pos_initial_x = getMousePosition(canvas, evt).x;
		this.pos_initial_y = getMousePosition(canvas, evt).y;
		this.interactor.onInteractionStart(this);
		console.log("x: " + pos_initial_x);
		console.log("y: " + pos_initial_y);
	}.bind(this);

	this.relacher = function(evt){
		if(this.isPression){
			this.pos_final_x = getMousePosition(canvas, evt).x;
			this.pos_final_y = getMousePosition(canvas, evt).y;
			this.interactor.onInteractionEnd(this);
			console.log("x: " + pos_final_x);
			console.log("y: " + pos_final_y);
		}
	}.bind(this);

	this.deplacer = function(evt){
		if (this.pression){
			this.pos_final_x = getMousePosition(this.boundingObject,evt).x;
			this.pos_final_y = getMousePosition(this.boundingObject,evt).y;
			this.interactor.onInteractionUpdate(this);
			console.log("x: " + pos_final_x);
			console.log("y: " + pos_final_y);
		}
	}.bind(this);
	// Associer les fonctions précédentes aux évènements du canvas.
	canvas.addEventListener('mousedown', this.pression, false);
	canvas.addEventListener('mousemove', this.deplacer, false);
	canvas.addEventListener('mouseup', this.relacher, false);
};


//Place le point de l'événement evt relativement à la position du canvas.
function getMousePosition(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
};



