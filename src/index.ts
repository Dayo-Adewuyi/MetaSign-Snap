import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { heading, panel, text } from '@metamask/snaps-ui';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('Welcome to MetaSign!'),
            text(
              'MetaSign is a decentralized application that allows you to sign documents with your Ethereum wallet.',
            ),
          ]),
        },
      });
    
    case 'alert':
      return snap.request({
        method: 'snap_notify',
        params: {
          type: 'inApp',
          message: 'File signed successfully!',
        },
      });
    case 'notify':
      return await snap.request({
        method: 'snap_notify',
        params: {
          type: 'inApp',
          message: 'File has been transmitted!',
        },
      });
    default:
      throw new Error('Method not found.');
  }
};


