import axios from "axios";
import cheerio from "cheerio";

const FetchMeta = async (urlToFetch) => {
  const result = await axios.get(
    `https://api-kijiji.code.bqf.ca/${urlToFetch}`
  );
  const $ = cheerio.load(result.data);

  const pageString = $('[data-testid="srp-results"]').text().replace(/,/g, "");
  const startResult = Number(pageString.match(/Results\s(\d+)\s-\s\d+/)[1]);
  const endResult = Number(pageString.match(/Results\s\d+\s-\s(\d+)/)[1]);
  const resultsPerPage = endResult - startResult + 1;
  const totalResults = Number(pageString.match(/of\s(\d+)/)[1]);
  const totalPages = Math.ceil(Number(totalResults) / Number(resultsPerPage));
  const currentPage = Number(
    urlToFetch.match(/page-(\d+)/)
      ? urlToFetch.match(/page-(\d+)/)[1]
      : Math.floor((startResult - 1) / resultsPerPage) + 1
  );

  const pages = [];

  pages.push({
    page: Number(currentPage),
    url: urlToFetch,
  });

  Array.from({ length: totalPages }, (_, i) => {
    const page = i + 1;
    if (page === currentPage) {
      return null;
    }

    const url = (() => {
      if (urlToFetch.match(/page-(\d+)/)) {
        return urlToFetch.replace(/page-(\d+)/, `page-${page}`);
      }
      if (page === 1) {
        return urlToFetch;
      }
      return urlToFetch.replace(/(\/[^/]+)$/, `/page-${page}$1`);
    })();

    pages.push({
      page,
      url,
    });

    return null;
  });

  return pages;
};

export default FetchMeta;
