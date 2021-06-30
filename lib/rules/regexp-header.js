"use strict";

const fs = require('fs');

module.exports = {
    meta: {
        type: "layout"
    },
    create: function (context) {
        const { options } = context;
        const { headerFile = '', newLines = 1 } = options[0] || {};

        const header = fs.readFileSync(headerFile, 'utf8');
        const headerLines = header.split(/\r?\n/);
        const fileText = context.getSourceCode().getText();
        const fileLines = fileText.split(/\r?\n/);

        return {
            Program: function (node) {
                const headerSize = headerLines.length;
                const fileSize = fileText.length;

                if (headerSize + newLines > fileSize) {
                    context.report({
                        loc: node.loc,
                        message: 'missing header',
                    });
                } else {
                    for (let index = 0; index < headerSize; index++) {
                        const isMatch = new RegExp(headerLines[index]).test(fileLines[index]);
                        if (!isMatch) {
                            context.report({
                                loc: node.loc,
                                message: 'incorrect header',
                            });
                            return;
                        }
                    }

                    for (let i = 0; i < newLines; i++) {
                        if (fileLines[headerSize + i] !== '') {
                            context.report({
                                loc: node.loc,
                                message: 'no newline after header',
                            });
                            return;
                        }
                    }
                }
            }
        }
    }
};

