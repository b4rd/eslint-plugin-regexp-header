"use strict";

const rule = require("../../../lib/rules/regexp-header");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();
ruleTester.run("regexp-header", rule, {
    valid: [
        {
            code: "//\n// Copyright 2021\n// My Company\n//\n",
            options: [{
                header: "//\n// Copyright \\d{4}\n// My Company\n//"
            }],
        },
        {
            code: "//\n// Copyright 2021\n// My Company\n//\n",
            options: [{ headerFile: "tests/support/copyright.txt" }],
        }
    ],
    invalid: [
        {
            code: "//\n// Copyright 2021-02-01\n// My Company\n//\n",
            options: [{
                header: "//\n" +
                    "// Copyright \\d{4}\n" +
                    "// My Company\n" +
                    "//"
            }],
            errors: [
                { message: "incorrect header" }
            ],
        },
        {
            code: "//\n// Copyright 2021-02-01\n// My Company\n//\n",
            options: [{ headerFile: "tests/support/copyright.txt" }],
            errors: [
                { message: "incorrect header" }
            ],
        }
    ]
});
