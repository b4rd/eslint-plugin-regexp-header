"use strict";

const rule = require('../../../lib/rules/regexp-header');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();
ruleTester.run('regexp-header', rule, {
    valid: [
        {
            code: '//\n// Copyright 2021\n// My Company\n//\n',
            options: [{ headerFile: 'tests/support/copyright.txt' }],
        }
    ],
    invalid: []
});
