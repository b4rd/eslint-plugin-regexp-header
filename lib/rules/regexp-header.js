"use strict";

const fs = require("fs");

module.exports = {
    meta: {
        type: "layout"
    },
    schema: [
        {
            oneOf: [
                {
                    type: "object",
                    properties: {
                        headerFile: {
                            type: "string"
                        },
                        charset: {
                            type: "string"
                        },
                    },
                    additionalProperties: false
                },
                {
                    type: "object",
                    properties: {
                        header: {
                            type: "string"
                        },
                    },
                    additionalProperties: false
                }
            ]
        }
    ],
    create: function (context) {
        const {
            header,
            headerFile,
            charset = "utf-8",
            newLines = 1
        } = context.options[0] || {};

        const headerText = header || fs.readFileSync(headerFile, charset);
        const headerLines = headerText.split(/\r?\n/);
        const fileText = context.getSourceCode().getText();
        const fileLines = fileText.split(/\r?\n/);

        return {
            Program: function (node) {
                const headerSize = headerLines.length;
                const fileSize = fileText.length;

                if (headerSize + newLines > fileSize) {
                    context.report({
                        loc: node.loc,
                        message: "missing header",
                    });
                } else {
                    for (let index = 0; index < headerSize; index++) {
                        const isMatch = matchExact(new RegExp(headerLines[index]), fileLines[index]);
                        if (!isMatch) {
                            context.report({
                                loc: node.loc,
                                message: "incorrect header",
                            });
                            return;
                        }
                    }

                    for (let i = 0; i < newLines; i++) {
                        if (fileLines[headerSize + i] !== "") {
                            context.report({
                                loc: node.loc,
                                message: "no newline after header",
                            });
                            return;
                        }
                    }
                }
            }
        }
    }
};

function matchExact(r, str) {
    const match = str.match(r);
    return match && str === match[0];
}
