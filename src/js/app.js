var [WIDTH, HEIGHT] = [$(window).width(), $(window).height() - $(".top-bar").outerHeight()];

var mainState = {
    preload: function() {

    },

    create: function() {

		this.game.stage.backgroundColor = '#3598db';
        game.physics.startSystem(Phaser.Physics.P2JS);

		this.drawSprites();

		this.nodeGroup = this.game.add.group();

		this.game.input.onDown.add(function(pointer, event) {
			var n = this.newNode(event.offsetX, event.offsetY);
            this.nodeGroup.add(n);
		}, this);

    },

    update: function() {
        var m = this.game.input.mousePointer.position;
        // console.log(m);

        for (var n of this.nodeGroup.children) {
            var v = Phaser.Point.subtract(m, n.position);
            n.body.force.x = 5 * v.x - 2 * n.body.velocity.x;
            n.body.force.y = 5 * v.y - 2 * n.body.velocity.y;
        }
    },

    render: function () {

    },

	drawSprites: function() {
		var graphics = new Phaser.Graphics(0, 0);

	    graphics.beginFill(0xFF3300);
	    graphics.lineStyle(3, 0x000000, 1);
	    graphics.moveTo(0,0);
	    graphics.drawCircle(0, 0, 20);
	    graphics.endFill();

		this.chargeSprite = graphics.generateTexture();
	},

	newNode: function(x, y) {
		var g = this.game.add.sprite(x, y, this.chargeSprite);
		g.anchor = new Phaser.Point(0.5, 0.5);
        game.physics.p2.enable(g);
		return g;
	}
};

// Initialize Phaser
var game = new Phaser.Game(WIDTH, HEIGHT);

// Add the 'mainState' and call it 'main'
game.state.add("main", mainState);

// Start the state to actually start the game
game.state.start("main");
