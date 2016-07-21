const getUrlHash = (initial = 'all') => location.hash.split('#/')[1] || initial;

export default getUrlHash;
