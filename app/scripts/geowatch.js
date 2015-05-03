var GeoWatch = function GeoWatch(opts) {
    opts = opts || {};
    this._opts = opts;

    var positionOpts = {
        enableHighAccuracy: true,

        // If set to 0, it means that the device cannot use a cached position
        // and must attempt to retrieve the real current position.
        maxAge: 0
    };

    if (!navigator.geolocation) {
        alert('Geolocation is not supported');
    }

    // Start watching
    this._watchId = navigator.geolocation.watchPosition(
        this._onGeoData.bind(this),
        this._onError.bind(this),
        positionOpts
    );
};

GeoWatch.prototype.stop = function stop() {
    navigator.geolocation.clearWatch(this._watchId);
}

GeoWatch.prototype._onGeoData = function _onGeoData(geoData) {
    if (this._opts.onGeoData) {
        this._opts.onGeoData(geoData);
    }
}

GeoWatch.prototype._onError = function _onError(err) {
    alert('Unable to get location: \n' + err.message);
    console.log('Unable to get user location:');
    console.log(err.message);
    console.error(err);
}

module.exports = GeoWatch;
