'use strict';

var HostsService = require('../service/HostsService');

var ipReg = /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;

var aliasInput = document.querySelector('#alias');
var ipInput = document.querySelector('#ipaddress');
var domainInput = document.querySelector('#domain');
var addHostBtn = document.querySelector('#addHostBtn');

var toggleClass = function(node, bool) {
    node.classList.remove(bool ? 'invalid' : 'valid');
    node.classList.add(bool ? 'valid' : 'invalid');

    if (aliasInput.classList.contains('invalid') ||
        ipInput.classList.contains('invalid') ||
        domainInput.classList.contains('invalid')) {
        addHostBtn.classList.add('disabled');
    } else {
        addHostBtn.classList.remove('disabled');
    }
};

var addHosts = function(rowData, refreshData) {

    aliasInput.addEventListener('input', function(e) {
        toggleClass(e.target, /^\w{0,10}$/.test(e.target.value));
    }, false);

    ipInput.addEventListener('input', function(e) {
        toggleClass(e.target, ipReg.test(e.target.value));
    }, false);

    domainInput.addEventListener('input', function(e) {
        toggleClass(e.target, /^[\w\.\s]{1,50}$/.test(e.target.value));
    }, false);


    addHostBtn.addEventListener('click', function() {
        var d = {
            alias: aliasInput.value,
            ip: ipInput.value,
            domain: domainInput.value
        };
        HostsService
            .add(d)
            .then(host => {
                refreshData([host].concat(rowData));
                aliasInput.value = '';
                ipInput.value = '';
                domainInput.value = '';
            })
            .catch(alert);
    }, false);
};

module.exports = addHosts;
