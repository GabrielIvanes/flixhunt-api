require('dotenv').config();
const axios = require('axios');

const TMDBToken = process.env.TMDB_TOKEN;

const getBaseUrl = async (req, res) => {
	try {
		const response = await axios.get(
			'https://api.themoviedb.org/3/configuration',
			{
				headers: {
					Authorization: `Bearer ${TMDBToken}`,
				},
			}
		);
		res.status(200).json({ baseUrl: response.data.images.secure_base_url });
	} catch (err) {
		res.status(500).json(err);
	}
};

const getPersonInformation = async (req, res) => {
	const personId = req.body.personId;
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/person/${personId}`,
			{
				headers: {
					Authorization: `Bearer ${TMDBToken}`,
				},
			}
		);
		res.status(200).json({ person: response.data });
	} catch (err) {
		res.status(500).json(err);
	}
};

const getPersonMovies = async (req, res) => {
	const { credits, personId } = req.body;
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/person/${personId}/combined_credits?include_adult=false`,
			{
				headers: {
					accept: 'application/json',
					Authorization: `Bearer ${TMDBToken}`,
				},
			}
		);
		if (credits === 'cast')
			res.status(200).json({ movies: response.data.cast });
		else res.status(200).json({ movies: response.data.crew });
	} catch (err) {
		res.status(500).json(err);
	}
};

const getGenres = async (req, res) => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/genre/movie/list`,
			{
				headers: {
					Authorization: `Bearer ${TMDBToken}`,
				},
			}
		);
		res.status(200).json({ genres: response.data.genres });
	} catch (err) {
		res.status(500).json(err);
	}
};

const getMoviesByGenre = async (req, res) => {
	const genreId = req.body.genreId;
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/discover/movie?include_adult=false&sort_by=popularity.desc&with_genres=${genreId}`,
			{
				headers: {
					Authorization: `Bearer ${TMDBToken}`,
				},
			}
		);
		res.status(200).json({ elements: response.data.results });
	} catch (err) {
		res.status(500).json(err);
	}
};

const getTvGenres = async (req, res) => {
	try {
		const response = await axios.get(
			`
https://api.themoviedb.org/3/genre/tv/list`,
			{
				headers: {
					Authorization: `Bearer ${TMDBToken}`,
				},
			}
		);
		res.status(200).json({ genres: response.data.genres });
	} catch (err) {
		res.status(500).json(err);
	}
};

const getTrendingMovies = async (req, res) => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/trending/movie/week`,
			{
				headers: {
					Authorization: `Bearer ${TMDBToken}`,
				},
			}
		);
		res.status(200).json({ trending: response.data.results });
	} catch (err) {
		res.status(500).json(err);
	}
};

const getTrendingTv = async (req, res) => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/trending/tv/week`,
			{
				headers: {
					Authorization: `Bearer ${TMDBToken}`,
				},
			}
		);
		res.status(200).json({ trendingTv: response.data.results });
	} catch (err) {
		res.status(500).json(err);
	}
};

const getMovieInformation = async (req, res) => {
	const movieId = req.body.movieId;
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits,watch/providers,recommendations,videos`,
			{
				headers: {
					Authorization: `Bearer ${TMDBToken}`,
				},
			}
		);
		if (response.data) {
			res.status(200).json({ movie: response.data });
		} else {
			res.status(400).json({ message: "don't exist" });
		}
	} catch (err) {
		res.status(500).json(err);
	}
};

const searchForMovie = async (req, res) => {
	const { query, type, page } = req.body;
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/search/${type}?include_adult=false&query=${query}&page=${page}`,
			{
				headers: {
					Authorization: `Bearer ${TMDBToken}`,
				},
			}
		);
		res.status(200).json({ search: response.data });
	} catch (err) {
		res.status(500).json(err);
	}
};

const getPopularMovies = async (req, res) => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/popular`,
			{
				headers: {
					Authorization: `Bearer ${TMDBToken}`,
				},
			}
		);
		res.status(200).json({ movies: response.data.results });
	} catch (err) {
		res.status(500).json(err);
	}
};

const getPopularTv = async (req, res) => {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/tv/popular`,
			{
				headers: {
					Authorization: `Bearer ${TMDBToken}`,
				},
			}
		);
		res.status(200).json({ tv: response.data.results });
	} catch (err) {
		res.status(500).json(err);
	}
};

const getTopRatedMovies = async (req, res) => {
	const { page, genres } = req.body;
	try {
		const genresString = await genres
			.map((genre) => genre.id !== 0 && genre.id)
			.join(',');

		const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&page=${page}&sort_by=vote_average.desc&vote_count.gte=300&with_genres=${genresString}`;

		const response = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${TMDBToken}`,
			},
		});
		res.status(200).json({
			body: req.body,
			genres: genres,
			genresString: genresString,
			response: response.data,
		});
	} catch (err) {
		res.status(500).json(err);
	}
};

const getTopRatedTv = async (req, res) => {
	const { page, genres } = req.body;
	try {
		const genresString = await genres
			.map((genre) => genre.id !== 0 && genre.id)
			.join(',');

		const response = await axios.get(
			`https://api.themoviedb.org/3/discover/tv?include_adult=false&page=${page}&sort_by=vote_average.desc&vote_count.gte=150&with_genres=${genresString}`,
			{
				headers: {
					Authorization: `Bearer ${TMDBToken}`,
				},
			}
		);
		res.status(200).json({ response: response.data, genres: genres });
	} catch (err) {
		res.status(500).json(err);
	}
};

const getTvInformation = async (req, res) => {
	const tvId = req.body.tvId;
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/tv/${tvId}?append_to_response=aggregate_credits,watch/providers,recommendations,videos`,
			{
				headers: {
					Authorization: `Bearer ${TMDBToken}`,
				},
			}
		);
		if (response.data) {
			res.status(200).json({ tv: response.data });
		} else {
			res.status(400).json({ message: "don't exist" });
		}
	} catch (err) {
		res.status(500).json(err);
	}
};

const getSeasonInformation = async (req, res) => {
	const { tvId, nbSeason } = req.body;
	try {
		const response = await axios.get(
			`
https://api.themoviedb.org/3/tv/${tvId}/season/${nbSeason}?append_to_response=credits,videos,watch/providers`,
			{
				headers: {
					Authorization: `Bearer ${TMDBToken}`,
				},
			}
		);
		res.status(200).json({ season: response.data });
	} catch (err) {
		res.status(500).json(err);
	}
};

const getEpisodeInformation = async (req, res) => {
	const { tvId, nbSeason, nbEpisode } = req.body;
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/tv/${tvId}/season/${nbSeason}/episode/${nbEpisode}?append_to_response=credits,videos,images`,
			{
				headers: {
					Authorization: `Bearer ${TMDBToken}`,
				},
			}
		);
		res.status(200).json({ episode: response.data });
	} catch (err) {
		res.status(500).json(err);
	}
};

const getMoviesInTheater = async (req, res) => {
	const minDate = new Date();
	minDate.setDate(minDate.getDate() - 28);

	const minDateString = `${minDate.getFullYear()}-${(minDate.getMonth() + 1)
		.toString()
		.padStart(2, '0')}-${minDate.getDate().toString().padStart(2, '0')}`;

	const maxDate = new Date();

	const maxDateString = `${maxDate.getFullYear()}-${(maxDate.getMonth() + 1)
		.toString()
		.padStart(2, '0')}-${maxDate.getDate().toString().padStart(2, '0')}`;

	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/discover/movie?include_adult=false&page=1&primary_release_date.gte=${minDateString}&primary_release_date.lte=${maxDateString}&sort_by=popularity.desc&with_release_type=2|3`,
			{
				headers: {
					Authorization: `Bearer ${TMDBToken}`,
				},
			}
		);
		res.status(200).json({ elements: response.data.results });
	} catch (err) {
		res.status(500).json(err);
	}
};

module.exports = {
	getBaseUrl,
	getPersonInformation,
	getPersonMovies,
	getGenres,
	getMoviesByGenre,
	getTrendingMovies,
	getMovieInformation,
	searchForMovie,
	getTopRatedMovies,
	getPopularMovies,
	getTvInformation,
	getSeasonInformation,
	getEpisodeInformation,
	getPopularTv,
	getTrendingTv,
	getTopRatedTv,
	getTvGenres,
	getMoviesInTheater,
};
