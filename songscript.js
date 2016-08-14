/*globals $, Handlebars*/

//This will grab the Carousel Template

var srcCarousel = $('#carouselTemplate').html();

var srcAlbums = $('#template').html();

//This will compile the Carousel Template information
var carouselTemplate = Handlebars.compile(srcCarousel);
var musicTemplate = Handlebars.compile(srcAlbums);
var ranking = 1;


    
 
    
$.getJSON("https://itunes.apple.com/us/rss/topsongs/limit=100/json", function(data) {
    var albums = data.feed.entry;
    console.log(data.feed.entry); 


    $.each(albums, function (index, album) {
 
        var formattedAlbum = {
        	ranking: ranking,
			iTunesLink: album['link'][0].attributes.href,
        	albumArt: album['im:image'][2].label,
            name: album['im:name'].label,
            artist:album['im:artist'].label,
            releaseDate:album['im:releaseDate'].attributes.label,
            
            //details to pull and display for each album in carousel
            //songCount:album['im:itemCount'].label,
            genre:album['category'].attributes.label,
            moreOfGenre:album['category'].attributes.scheme,
            
			//Turning off More of Artist, enable error handling for albums with no artist URL
			//if album.artist.attributes.href=undefined,
				//don't make moreOfArtist at all
			//else
				//moreOfArtist:album['im:artist'].attributes.href,
			
            rights:album['rights'].label
        }
            console.log(album['link'][0].attributes.href);      
              
        //Need to figure out how to put both musicTemplate and carouselTemplate inside this
        var htmlCarouseler = carouselTemplate(formattedAlbum);
        var htmlTemplater = musicTemplate(formattedAlbum);

        ranking = ranking+1;
        
		//$('body').append(htmlCarouseler);
        $('body').append(htmlTemplater);

    });

});
