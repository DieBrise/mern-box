const atlasString = process.env.NODE_ENV === 'test' ? process.env.ATLAS_TEST_URI : process.env.ATLAS_URI;

module.exports = {
	port: process.env.PORT || 5000,
	atlas: atlasString,
};
