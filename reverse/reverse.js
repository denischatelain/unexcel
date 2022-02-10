// @ts-check

const dns = require('dns');
const dnsPromises = dns.promises;

module.exports = {
    resolve: async function (records) {
        for (const ip in records) {
            var resolved = [];
            dnsPromises.reverse(ip)
                .then(function (result) {
                    const record = [ip, result[0]];
                    resolved.push(record);
                })
                .catch (function(error) {
                    const record = [ip, ''];
                    resolved.push(record);
                });
        }
        return resolved;
    },

    /**
     * Remove values which are not IPs
     * @param array of strings
     */
    filterIP : function (records) {
        return records.filter( (value) => { return value ? value.match(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/) : 0; });
    },

    /**
     * Remove duplicates
     */
    unique : function (records) {
        const unique = records.filter( (value, index, self) => {return self.indexOf(value) === index});
        return unique;
    }
}