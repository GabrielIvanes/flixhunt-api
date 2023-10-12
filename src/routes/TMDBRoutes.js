const router = require('express').Router();
const TMDBControllers = require('../controllers/TMDB');
const auth = require('../middleware/auth');

router.get('/baseUrl', auth, TMDBControllers.getBaseUrl);
router.post('/personInformation', auth, TMDBControllers.getPersonInformation);
router.post('/personMovies', auth, TMDBControllers.getPersonMovies);
router.get('/getGenres', auth, TMDBControllers.getGenres);
router.post('/getMoviesByGenre', auth, TMDBControllers.getMoviesByGenre);
router.get('/getTrendingMovies', auth, TMDBControllers.getTrendingMovies);
router.post('/getMovieInformation', auth, TMDBControllers.getMovieInformation);
router.post('/searchForMovie', auth, TMDBControllers.searchForMovie);
router.get('/getPopularMovies', auth, TMDBControllers.getPopularMovies);
router.post('/getTopRatedMovies', auth, TMDBControllers.getTopRatedMovies);
router.post('/getTvInformation', auth, TMDBControllers.getTvInformation);
router.post(
	'/getSeasonInformation',
	auth,
	TMDBControllers.getSeasonInformation
);
router.post(
	'/getEpisodeInformation',
	auth,
	TMDBControllers.getEpisodeInformation
);
router.get('/getPopularTv', auth, TMDBControllers.getPopularTv);
router.get('/getTrendingTv', auth, TMDBControllers.getTrendingTv);
router.post('/getTopRatedTv', auth, TMDBControllers.getTopRatedTv);
router.get('/getTvGenres', auth, TMDBControllers.getTvGenres);
router.get('/getMoviesInTheater', auth, TMDBControllers.getMoviesInTheater);

module.exports = router;
