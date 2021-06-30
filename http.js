// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
window.global = this;
window.process = {};
require('internal/bootstrap/loaders.js');
'use strict';
window.primordials = require('primordials');
const {
  ArrayPrototypeSlice,
  ArrayPrototypeSort,
  ObjectDefineProperty,
} = primordials;

const httpAgent = require('/JS-Image-Recognition-Software/node-modules/-http-agent');
const { ClientRequest } = require('/JS-Image-Recognition-Software/node-modules/-http-client');
const { methods } = require('/JS-Image-Recognition-Software/node-modules/-http-common');
const { IncomingMessage } = require('/JS-Image-Recognition-Software/node-modules/-http-incoming');
const {
  validateHeaderName,
  validateHeaderValue,
  OutgoingMessage
} = require('/JS-Image-Recognition-Software/node-modules/-http-outgoing');
const {
  _connectionListener,
  STATUS_CODES,
  Server,
  ServerResponse
} = require('/JS-Image-Recognition-Software/node-modules/-http-server');
let maxHeaderSize;

/**
 * Returns a new instance of `http.Server`.
 * @param {{
 *   IncomingMessage?: IncomingMessage;
 *   ServerResponse?: ServerResponse;
 *   insecureHTTPParser?: boolean;
 *   maxHeaderSize?: number;
 *   }} [opts]
 * @param {Function} [requestListener]
 * @returns {Server}
 */
function createServer(opts, requestListener) {
  return new Server(opts, requestListener);
}

/**
 * @typedef {Object} HTTPRequestOptions
 * @property {httpAgent.Agent | boolean} [agent]
 * @property {string} [auth]
 * @property {Function} [createConnection]
 * @property {number} [defaultPort]
 * @property {number} [family]
 * @property {Object} [headers]
 * @property {number} [hints]
 * @property {string} [host]
 * @property {string} [hostname]
 * @property {boolean} [insecureHTTPParser]
 * @property {string} [localAddress]
 * @property {number} [localPort]
 * @property {Function} [lookup]
 * @property {number} [maxHeaderSize]
 * @property {string} [method]
 * @property {string} [path]
 * @property {number} [port]
 * @property {string} [protocol]
 * @property {boolean} [setHost]
 * @property {string} [socketPath]
 * @property {number} [timeout]
 * @property {AbortSignal} [signal]
 */

/**
 * Makes an HTTP request.
 * @param {string | URL} url
 * @param {HTTPRequestOptions} [options]
 * @param {Function} [cb]
 * @returns {ClientRequest}
 */
function request(url, options, cb) {
  return new ClientRequest(url, options, cb);
}

/**
 * Makes a `GET` HTTP request.
 * @param {string | URL} url
 * @param {HTTPRequestOptions} [options]
 * @param {Function} [cb]
 * @returns {ClientRequest}
 */
function get(url, options, cb) {
  const req = request(url, options, cb);
  req.end();
  return req;
}

module.exports = {
  _connectionListener,
  METHODS: ArrayPrototypeSort(ArrayPrototypeSlice(methods)),
  STATUS_CODES,
  Agent: httpAgent.Agent,
  ClientRequest,
  IncomingMessage,
  OutgoingMessage,
  Server,
  ServerResponse,
  createServer,
  validateHeaderName,
  validateHeaderValue,
  get,
  request
};

ObjectDefineProperty(module.exports, 'maxHeaderSize', {
  configurable: true,
  enumerable: true,
  get() {
    if (maxHeaderSize === undefined) {
      const { getOptionValue } = require('/JS-Image-Recognition-Software/node-modules/internal/options');
      maxHeaderSize = getOptionValue('--max-http-header-size');
    }

    return maxHeaderSize;
  }
});

ObjectDefineProperty(module.exports, 'globalAgent', {
  configurable: true,
  enumerable: true,
  get() {
    return httpAgent.globalAgent;
  },
  set(value) {
    httpAgent.globalAgent = value;
  }
});
