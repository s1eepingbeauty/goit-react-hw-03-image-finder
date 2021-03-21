const apiKey = '19951456-e393dc841832362ddd9551c23';

const apiService = (searchQuery, page) => {
  const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${encodeURIComponent(
    searchQuery,
  )}&page=${page}&per_page=12&key=${apiKey}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.hits)
    .catch((error) => console.log(error));
};

export default apiService;
