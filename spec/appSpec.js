describe("app", function () {
	BC.songs = [{title: 'song 1', artist: 'big bad wolf'},{title: 'di di di', artist: 'fry'},{title: 'bender is great', artist: 'bender'}];
	describe("when initialised", function () {
		var fakeSub;
		beforeEach(function () {
			fakeSub = jasmine.createSpy('fakeSub');
			BC.events.on("songs:refreshed", fakeSub);
			BC.app.init();
		});
		it("should refresh a song collection", function () {
			expect(fakeSub).toHaveBeenCalledWith(jasmine.any(BC.Songs));
		});
	});
	describe("SongsView", function () {
		var view;
		var songs;
		beforeEach(function () {
			var ul = document.createElement("ul");
			$(ul).attr('class', 'songsList');
			songs = new BC.Songs();
			view = new BC.SongsView();
			view.$el = $(ul);
			songs.reset(BC.songs);
		})
		it("should render a songs list", function () {
			expect(view.$el).toContain('li.song');
		});
		it("should render the 3 songs", function () {
			var titles = view.$('.title');
			var artists = view.$('.artist');
			expect(titles[0]).toHaveText('song 1');
			expect(artists[0]).toHaveText('big bad wolf');
			expect(titles[1]).toHaveText('di di di');
			expect(artists[1]).toHaveText('fry');
			expect(titles[2]).toHaveText('bender is great');
			expect(artists[2]).toHaveText('bender');
		});
	});
	describe("Songs", function () {
		var songs = new BC.Songs();
		beforeEach(function () {
			fakeSub = jasmine.createSpy('fakeSub');
			BC.events.on("songs:refreshed", fakeSub);
		});
		it("should publish a songs refreshed message", function () {
			songs.reset();
			expect(fakeSub).toHaveBeenCalledWith(songs);
		});
	});
	describe("SongView", function () {
		var song = new BC.Song({title: 'oh I do so have a sense of humor', artist: 'thee more shallows'});
		var view = new BC.SongView({model: song});
		it("should render a song template", function () {
			var el = view.render();
			expect(el.$('.title')).toHaveText("oh I do so have a sense of humor");
			expect(el.$('.artist')).toHaveText("thee more shallows");
		});
	});
});