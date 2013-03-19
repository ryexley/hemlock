// p-s scripts (https://github.com/kentcdodds/p-s)

module.exports = {
    scripts: {
        lint: "eslint --fix --cache ./",
        redis: "$(which redis-server) --port 6380",
        rethinkdb: "$(which rethinkdb) --directory ./rethinkdb-data --server-name circles --http-port 7100"
    }
};
