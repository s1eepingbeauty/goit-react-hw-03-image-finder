const apiKey = '19951456-e393dc841832362ddd9551c23';
const baseUrl = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12';

const apiService = (searchQuery, page) => {
  const url = `${baseUrl}&q=${encodeURIComponent(searchQuery)}&page=${page}&key=${apiKey}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.hits)
    .catch((error) => console.log(error));
};

export default apiService;
