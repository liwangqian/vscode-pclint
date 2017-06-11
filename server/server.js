/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';
const LangServer           = require('vscode-languageserver');

const connection = LangServer.createConnection(new LangServer.IPCMessageReader(process),
                                               new LangServer.IPCMessageWriter(process));
var documents    = new LangServer.TextDocuments();
var workspaceRoot;

connection.onInitialize((params) => {

    workspaceRoot = params.rootPath;

    return {
        capabilities: {
            // Tell the client that the server works in FULL text document sync mode
            textDocumentSync: documents.syncKind
        }
    };
});

documents.onDidChangeContent((change) => {
    connection.window.showInformationMessage("Open A File.");
});

documents.onDidSave((params) => {
    connection.window.showInformationMessage("File saved.");
});

// The settings have changed. Is send on server activation
// as well.
connection.onDidChangeConfiguration((change) => {
});

documents.listen(connection);
// Listen on the connection
connection.listen();
//# sourceMappingURL=server.js.map