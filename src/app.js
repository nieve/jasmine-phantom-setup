var BC = BC || {};
BC.events = {};
_.extend(BC.events, Backbone.Events);

BC.Song = Backbone.Model.extend({});
BC.Songs = Backbone.Collection.extend({
	model: BC.Song,
	initialize: function(){
		this.on('reset', this.publishRefresh);
	},
	publishRefresh: function(){
		BC.events.trigger("songs:refreshed", this);
	}
});

BC.SongView = Backbone.View.extend({
	className: 'song',
	tagName: 'li',
	template: _.template("\
		<div class='title'><%= title %></div>\
		<div class='artist'><%= artist %></div>\
	"),
	initialize: function () {
		// this.model.on('filteredOut', this.hide, this);
		// this.model.on('filteredin', this.show, this);
	},
	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	hide: function () {
		
	},
	show: function () {
		
	}
});
BC.SongsView = Backbone.View.extend({
	el: 'ul.songsList',
	collection: [],
	initialize: function(){
		BC.events.on("songs:refreshed", this.rerender, this);
	},
	rerender: function (songs) {
		this.collection = songs;
		this.render();
	},
	render: function () {
		this.collection.each(this.addOne, this);
		return this;
	},
	addOne: function (model) {
		view = new BC.SongView({model: model});
		view.render();
		this.$el.append(view.$el);
	}
});

BC.app = {
	init: function () {
		var songs = new BC.Songs();
		var songsView = new BC.SongsView();
		songs.reset(BC.songs);
	}
}