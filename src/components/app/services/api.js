import {bands} from './mock-data';
import {albums} from './mock-data';
import {artists} from './mock-data';
import {tracks} from './mock-data';
import {comments} from './mock-data';

export class ApiService {
    url = 'http://localhost:1338/';

    constructor ($http) {
        this.http = $http;
    }

    getBands() {
        console.log("llamada a get bands");
        //return new Promise(resolve => resolve(bands));
    	return this.http({method: 'GET', url: `${this.url}bands`}).then(response => response.data);
    }

    getAlbums(bandId) {
    	console.log("llamada a get albums de banda " + bandId);
    	return new Promise(resolve => resolve(albums));
        //return this.http({method: 'GET', url: `${this.url}bands/${bandId}`}).then(response => response.data.albums);
    }

    getArtists(bandId) {
    	console.log("llamada a get artists de banda " , bandId);
        //let rv = this.http({method: 'GET', url: `${this.url}bands/${bandId}`}).then(response => response.data.artists)
    	let rv = new Promise(resolve => resolve(artists))
            .then(artists => artists.map(artist => {
                artist.name = `${artist.firstName} ${artist.lastName}`;
                console.log(artist.name);
                return artist;
            }));
        return rv;
    }

    getTracks(albumId) {
    	console.log("llamada a get tracks de album " + albumId);
    	return new Promise(resolve => resolve(tracks));
    }

    getComments(trackId) {
    	console.log("llamada a get comments del track " + trackId);
    	return new Promise(resolve => resolve(comments));
    }
}
